import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../static/styles.css'; // Your global styles
import '../static/calender.css'; // Your calendar styles

const Reservation = () => {
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    check_in: '',
    check_out: '',
    guests: 1,
    room: 'single',
    specialRequests: '',
  });

  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('reservations')) || [];
    setReservations(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const isOverlapping = (newCheck_in, newCheck_out) => {
    const newStart = new Date(newCheck_in);
    const newEnd = new Date(newCheck_out);
    return reservations.some(({ check_in, check_out }) => {
      const start = new Date(check_in);
      const end = new Date(check_out);
      return (
        (newStart >= start && newStart < end) ||
        (newEnd > start && newEnd <= end)
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { check_in, check_out } = reservationData;

    if (!check_in || !check_out) {
      setError('Please select both check-in and check-out dates.');
      return;
    }

    if (isOverlapping(check_in, check_out)) {
      setError('The selected dates are already booked.');
      return;
    }

    setError('');
    const createdAt = new Date().toISOString();
    const newReservation = { ...reservationData, createdAt };
    const updated = [...reservations, newReservation];
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
    setReservationData({
      name: '',
      email: '',
      check_in: '',
      check_out: '',
      guests: 1,
      room: 'single',
      specialRequests: '',
    });
  };

  const handleDelete = (index) => {
    const updated = reservations.filter((_, i) => i !== index);
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
  };

  const handleUpdate = (index) => {
    setReservationData(reservations[index]);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const generateMonthDates = (month, year) => {
    const firstDay = getFirstDayOfMonth(month, year);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dates = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) dates.push(i);
    return dates;
  };

  const getReservedDays = () => {
    return reservations.flatMap(({ check_in, check_out }) => {
      const inDate = new Date(check_in).getDate();
      const outDate = new Date(check_out).getDate();
      const range = [];
      for (let d = inDate; d <= outDate; d++) range.push(d);
      return range;
    });
  };

  // Function to render the calendar grid
  const renderCalendar = () => {
    const today = new Date();
    const monthDates = generateMonthDates(today.getMonth(), today.getFullYear());
    const reservedDays = getReservedDays();

    // Days of the Week
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const calendarDays = monthDates.map((date, index) => (
      <div
        key={index}
        className={`calendar-day ${date === null ? 'empty-day' : ''} ${
          reservedDays.includes(date) ? 'reserved' : 'available'
        }`}
        title={reservedDays.includes(date) ? 'Reserved' : 'Available'}
      >
        {date}
      </div>
    ));

    return (
      <>
        {/* Render the days of the week across the top */}
        {weekDays.map((day, index) => (
          <div key={index} className="calendar-day-name">
            {day}
          </div>
        ))}

        {/* Render the days of the month */}
        {calendarDays}
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid reservation-page">
        <div className="row">
          {/* Reservation Form */}
          <div className="col-md-4 mb-4">
            <h1>Make a Reservation</h1>
            <p>Fill out your info and reserve your stay!</p>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <input name="name" placeholder="Full Name" value={reservationData.name} onChange={handleChange} className="form-control mb-2" />
              <input name="email" type="email" placeholder="Email" value={reservationData.email} onChange={handleChange} className="form-control mb-2" />
              <input name="check_in" type="date" value={reservationData.check_in} onChange={handleChange} className="form-control mb-2" />
              <input name="check_out" type="date" value={reservationData.check_out} onChange={handleChange} className="form-control mb-2" />
              <input name="guests" type="number" min="1" value={reservationData.guests} onChange={handleChange} className="form-control mb-2" />
              <select name="room" value={reservationData.room} onChange={handleChange} className="form-control mb-2">
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </select>
              <textarea name="specialRequests" placeholder="Special Requests" value={reservationData.specialRequests} onChange={handleChange} className="form-control mb-3" />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>

          {/* Reservation List */}
          <div className="col-md-4 mb-4">
            <h3>Booked Reservations</h3>
            {reservations.length === 0 ? <p>No reservations yet.</p> : (
              <ul>
                {reservations.map((res, i) => (
                  <li key={i}>
                    <strong>{res.name}</strong> ({res.room})<br />
                    Check-in: {formatDateTime(res.check_in)}<br />
                    Check-out: {formatDateTime(res.check_out)}<br />
                    Guests: {res.guests}<br />
                    Requests: {res.specialRequests || 'None'}<br />
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleUpdate(i)}>Update</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(i)}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Calendar */}
          <div className="col-md-4">
            <h2>Monthly Calendar</h2>
            <div className="calendar-container">
              {renderCalendar()} {/* This will render your calendar */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;
