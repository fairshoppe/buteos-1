'use client';

import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { checkAvailability, bookAppointment } from '@/services/calendarService';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [bookingStatus, setBookingStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSelectSlot = async ({ start }: { start: Date }) => {
    const availability = await checkAvailability(start);
    if (availability.isAvailable) {
      setSelectedDate(start);
    } else {
      setBookingStatus({
        type: 'error',
        message: availability.reason || 'This time slot is not available.',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !name || !email || !service) {
      setBookingStatus({
        type: 'error',
        message: 'Please fill in all fields.',
      });
      return;
    }

    try {
      const result = await bookAppointment(selectedDate, service, name);
      if (result.success) {
        setBookingStatus({
          type: 'success',
          message: result.confirmationMessage,
        });
        // Reset form
        setSelectedDate(null);
        setName('');
        setEmail('');
        setService('');
      } else {
        setBookingStatus({
          type: 'error',
          message: result.confirmationMessage,
        });
      }
    } catch (error) {
      setBookingStatus({
        type: 'error',
        message: 'An error occurred while booking. Please try again.',
      });
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={[]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable
            onSelectSlot={handleSelectSlot}
            views={['month', 'week', 'day']}
            min={new Date(0, 0, 0, 9, 0, 0)} // 9 AM
            max={new Date(0, 0, 0, 18, 30, 0)} // 6:30 PM
            step={30} // 30 minute slots
            timeslots={2}
          />
        </div>

        <div className="booking-form">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Selected Date & Time</label>
              <input
                type="text"
                value={selectedDate ? selectedDate.toLocaleString() : 'Select a time slot'}
                readOnly
                className="w-1/2 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-1/2 p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-1/2 p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Service</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-1/2 p-2 border rounded"
                required
              >
                <option value="">Select a service</option>
                <option value="Foundation">Buteos Nest</option>
                <option value="Growth">Buteos Flight</option>
                <option value="Transformation">Buteos Talon</option>
                <option value="Open">I don't know</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              disabled={!selectedDate}
            >
              Book Appointment
            </button>
          </form>

          {bookingStatus.type && (
            <div
              className={`mt-4 p-4 rounded ${
                bookingStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {bookingStatus.message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
