'use client';

import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './booking.css';
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
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>Book an Appointment</h1>
          <p>Schedule a consultation to discuss your digital marketing needs</p>
        </div>
      </section>
      
      <section className="content-section">
        <div className="container">
          <div className="booking-grid">
            <div className="calendar-container">
              <Calendar
                localizer={localizer}
                events={selectedDate ? [{
                  title: 'Selected',
                  start: selectedDate,
                  end: new Date(selectedDate.getTime() + 30 * 60000), // 30 minutes
                  resource: 'selected'
                }] : []}
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
                eventPropGetter={(event) => ({
                  className: event.resource === 'selected' ? 'selected-slot' : ''
                })}
              />
            </div>

            <div className="booking-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Selected Date & Time</label>
                  <input
                    type="text"
                    value={selectedDate ? selectedDate.toLocaleString() : 'Select a time slot'}
                    readOnly
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="form-input"
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
                  className="cta-button"
                  disabled={!selectedDate}
                >
                  Book Appointment
                </button>
              </form>

              {bookingStatus.type && (
                <div className={`status-message ${bookingStatus.type}`}>
                  {bookingStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
