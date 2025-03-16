import React, { useState } from "react";
import './CustomerDashboard.css';

function CustomerDashboard() {
  // Sample ticket data with events
  const [ticketQueue, setTicketQueue] = useState([
    { ticketId: 1, eventName: "Concert A", ticketPrice: 50 },
    { ticketId: 2, eventName: "Concert A", ticketPrice: 50 },
    { ticketId: 3, eventName: "Concert B", ticketPrice: 30 },
    { ticketId: 4, eventName: "Concert C", ticketPrice: 40 },
  ]);

  const [bookedTickets, setBookedTickets] = useState([]);

  // Group tickets by event name
  const ticketsByEvent = ticketQueue.reduce((acc, ticket) => {
    if (!acc[ticket.eventName]) acc[ticket.eventName] = [];
    acc[ticket.eventName].push(ticket);
    return acc;
  }, {});

  const bookTicket = (ticket) => {
    setBookedTickets([...bookedTickets, ticket]); // Add to booked tickets
    setTicketQueue(ticketQueue.filter((t) => t.ticketId !== ticket.ticketId)); // Remove from queue
  };

  const cancelTicket = (ticket) => {
    setBookedTickets(bookedTickets.filter((t) => t.ticketId !== ticket.ticketId)); // Remove from booked
    setTicketQueue([...ticketQueue, ticket]); // Add back to queue
  };

  return (
    <div className="customer-dashboard">
      <h2>Customer Dashboard</h2>

      {/* Display available tickets grouped by event */}
      <h3>Available Events and Tickets</h3>
      {Object.keys(ticketsByEvent).map((eventName) => (
        <div key={eventName} className="event-card">
          <h4>{eventName}</h4>
          <div className="ticket-list">
            {ticketsByEvent[eventName].map((ticket) => (
              <div key={ticket.ticketId} className="ticket-item">
                <div className="ticket-details">
                  <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>
                  <p><strong>Price:</strong> ${ticket.ticketPrice}</p>
                </div>
                <button onClick={() => bookTicket(ticket)} className="book-btn">
                  Book Ticket
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Display booked tickets */}
      <h3>Your Booked Tickets</h3>
      <div className="booked-tickets-list">
        {bookedTickets.map((ticket) => (
          <div key={ticket.ticketId} className="ticket-item">
            <div className="ticket-details">
              <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>
              <p><strong>Event:</strong> {ticket.eventName}</p>
              <p><strong>Price:</strong> ${ticket.ticketPrice}</p>
            </div>
            <button onClick={() => cancelTicket(ticket)} className="cancel-btn">
              Cancel Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;
