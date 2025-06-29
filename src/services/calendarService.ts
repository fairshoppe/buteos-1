'use server';
/**
 * @fileOverview Calendar service for appointment booking using Google Calendar API.
 */

import { google } from 'googleapis';
import type { calendar_v3 } from 'googleapis';
import { getSecret } from '@/utils/secrets';

// --- Google Calendar API Setup ---
let calendar: calendar_v3.Calendar | null = null;

async function getGoogleCalendarClient(): Promise<calendar_v3.Calendar | null> {
  if (calendar) {
    return calendar;
  }

  try {
    // Get secrets from Google Secret Manager
    const serviceAccountKey = await getSecret('GOOGLE_SERVICE_ACCOUNT_KEY_JSON');
    const calendarId = await getSecret('GOOGLE_CALENDAR_ID');

    if (!serviceAccountKey || !calendarId) {
      console.error('Required Google Calendar secrets are not set.');
      return null;
    }

    try {
      const credentials = JSON.parse(serviceAccountKey);
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
      });

      const authClient = await auth.getClient();
      calendar = google.calendar({ version: 'v3', auth: authClient as any });
      console.log('Google Calendar client initialized successfully.');
      return calendar;
    } catch (error) {
      console.error('Error parsing service account key or initializing calendar client:', error);
      return null;
    }
  } catch (error) {
    console.error('Failed to access Google Calendar secrets:', error);
    return null;
  }
}

export async function checkAvailability(dateTime: Date, durationMinutes: number = 30): Promise<{ isAvailable: boolean; reason?: string }> {
  const gCalendar = await getGoogleCalendarClient();
  const calendarId = await getSecret('GOOGLE_CALENDAR_ID');
  
  if (!gCalendar || !calendarId) {
    return { isAvailable: false, reason: "Calendar service is not configured." };
  }

  console.log(`Checking Google Calendar availability for: ${dateTime.toISOString()} with duration ${durationMinutes} minutes.`);

  const requestedStartTime = new Date(dateTime);
  const requestedEndTime = new Date(requestedStartTime.getTime() + durationMinutes * 60 * 1000);

  if (requestedStartTime < new Date()) {
    return { isAvailable: false, reason: "Cannot book appointments in the past." };
  }

  // Convert to local time for business hours check
  const localStart = new Date(requestedStartTime.toLocaleString());
  const localEnd = new Date(requestedEndTime.toLocaleString());
  
  const day = localStart.getDay();
  const startHour = localStart.getHours();
  const startMinutes = localStart.getMinutes();
  const endHour = localEnd.getHours();
  const endMinutes = localEnd.getMinutes();

  // Check weekdays only
  if (day === 0 || day === 6) {
    return { isAvailable: false, reason: "Appointments can only be booked on weekdays." };
  }
  
  // Check business hours: 9 AM to 6:30 PM (18:30)
  if (startHour < 9 || startHour > 18 || (startHour === 18 && startMinutes > 30)) {
    return { isAvailable: false, reason: "Appointments can only be booked between 9:00 AM and 6:30 PM." };
  }
  
  if (endHour > 18 || (endHour === 18 && endMinutes > 30)) {
    return { isAvailable: false, reason: "Appointment would end after business hours (6:30 PM)." };
  }

  try {
    // Check for conflicts in a wider window to catch overlapping events
    const checkStart = new Date(requestedStartTime.getTime() - 30 * 60 * 1000); // 30 min before
    const checkEnd = new Date(requestedEndTime.getTime() + 30 * 60 * 1000); // 30 min after
    
    const response = await gCalendar.events.list({
      calendarId: calendarId,
      timeMin: checkStart.toISOString(),
      timeMax: checkEnd.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    // Check for actual conflicts
    if (response.data.items && response.data.items.length > 0) {
      for (const event of response.data.items) {
        if (!event.start?.dateTime || !event.end?.dateTime) continue;
        
        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);
        
        // Check if there's an overlap
        if (requestedStartTime < eventEnd && requestedEndTime > eventStart) {
          console.log(`Conflict found with event: ${event.summary} (${eventStart.toISOString()} - ${eventEnd.toISOString()})`);
          return { isAvailable: false, reason: 'The time slot conflicts with an existing appointment.' };
        }
      }
    }

    console.log(`Time slot ${requestedStartTime.toISOString()} to ${requestedEndTime.toISOString()} is available.`);
    return { isAvailable: true };
  } catch (error: any) {
    console.error('Error checking Google Calendar availability:', error);
    return { isAvailable: false, reason: `Error checking calendar: ${error.message}` };
  }
}

export async function bookAppointment(
  dateTime: Date,
  serviceDetails: string,
  userName?: string,
  durationMinutes?: number
): Promise<{ success: boolean; bookingId?: string; confirmationMessage: string; error?: string }> {
  const gCalendar = await getGoogleCalendarClient();
  const calendarId = await getSecret('GOOGLE_CALENDAR_ID');
  
  if (!gCalendar || !calendarId) {
    return { success: false, confirmationMessage: "Booking failed: Calendar service is not configured.", error: "Calendar service not configured."};
  }

  console.log(`Attempting to book Google Calendar appointment for: ${dateTime.toISOString()}, Service: ${serviceDetails}, Duration: ${durationMinutes}`);

  const availability = await checkAvailability(dateTime, durationMinutes || 60); // Default to 60 minutes if not provided
  if (!availability.isAvailable) {
    return { success: false, confirmationMessage: `Failed to book: ${availability.reason || 'Slot not available.'}`, error: availability.reason };
  }

  const startTime = new Date(dateTime);
  const endTime = new Date(startTime.getTime() + (durationMinutes || 60) * 60 * 1000); // Default to 60 minutes if not provided
  
  const eventTitle = userName ? `${serviceDetails} for ${userName}` : serviceDetails;
  const eventDescription = `Appointment booked via ButeoBot AI.\nService: ${serviceDetails}\n${userName ? `Client: ${userName}` : ''}`;

  const event: calendar_v3.Schema$Event = {
    summary: eventTitle,
    description: eventDescription,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  try {
    const response = await gCalendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
    });

    const bookingId = response.data.id || `gcal-${Date.now()}`;
    const confirmationMessage = `Appointment for "${eventTitle}" on ${startTime.toLocaleString()} successfully booked. Event ID: ${bookingId}.`;
    console.log(confirmationMessage);
    return { success: true, bookingId, confirmationMessage };

  } catch (error: any) {
    console.error('Error booking Google Calendar appointment:', error);
    const errorMessage = error.response?.data?.error?.message || error.message || 'Failed to create event.';
    return { success: false, confirmationMessage: `An unexpected error occurred while booking: ${errorMessage}`, error: errorMessage };
  }
}
