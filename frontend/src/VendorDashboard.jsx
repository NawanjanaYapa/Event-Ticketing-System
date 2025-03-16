import React, { useState, useRef } from "react";
import './VendorDashboard.css';

function VendorDashboard() {
  const [config, setConfig] = useState({
    totalTickets: "",
    releaseRate: "",
    maxCapacity: "",
    eventName: "",
    ticketPrice: "",
    customerRetrievalRate: "",
  });
  const [ticketQueue, setTicketQueue] = useState([]);
  const [systemStatus, setSystemStatus] = useState("Stopped");
  const intervalId = useRef(null); // To store the interval ID

  const handleStart = () => {
    if (systemStatus === "Running") return; // Prevent multiple intervals
    setSystemStatus("Running");

    // Start ticket release at the specified release rate
    intervalId.current = setInterval(() => {
      setTicketQueue((queue) => {
        if (queue.length < config.maxCapacity) {
          return [
            ...queue,
            {
              ticketId: queue.length + 1,
              eventName: config.eventName,
              ticketPrice: config.ticketPrice,
            },
          ];
        }
        clearInterval(intervalId.current); // Stop when max capacity is reached
        return queue;
      });
    }, config.releaseRate * 1000);
  };

  const handleStop = () => {
    if (systemStatus === "Running") {
      clearInterval(intervalId.current); // Stop the interval
      setSystemStatus("Paused");
    }
  };

  const handleReset = () => {
    clearInterval(intervalId.current); // Stop the interval
    setTicketQueue([]); // Clear the ticket queue
    setSystemStatus("Stopped");
  };

  return (
    <div className="dashboard-container">
      <h2>Vendor Dashboard</h2>

      <div className="config-ticket-container">
        {/* Left Section: Configuration Form */}
        <div className="config-section">
          <h3>Configuration Form</h3>
          <form>
            <label>Total Tickets</label>
            <input
              type="number"
              value={config.totalTickets}
              onChange={(e) => setConfig({ ...config, totalTickets: e.target.value })}
            />
            <label>Ticket Release Rate (seconds)</label>
            <input
              type="number"
              value={config.releaseRate}
              onChange={(e) => setConfig({ ...config, releaseRate: e.target.value })}
            />
            <label>Customer Retriavel Rate (seconds)</label>
            <input
              type="number"
              value={config.customerRetrievalRate}
              onChange={(e) => setConfig({ ...config, customerRetrievalRate: e.target.value })}
            />
            <label>Max Capacity</label>
            <input
              type="number"
              value={config.maxCapacity}
              onChange={(e) => setConfig({ ...config, maxCapacity: e.target.value })}
            />
            <label>Event Name</label>
            <input
              type="text"
              value={config.eventName}
              onChange={(e) => setConfig({ ...config, eventName: e.target.value })}
            />
            <label>Ticket Price</label>
            <input
              type="number"
              step="0.01"
              value={config.ticketPrice}
              onChange={(e) => setConfig({ ...config, ticketPrice: e.target.value })}
            />
            <div className="button-group">
              <button type="button" onClick={handleStart} className="start-button">
                Start
              </button>
              <button type="button" onClick={handleStop} className="stop-button">
                Stop
              </button>
              <button type="button" onClick={handleReset} className="reset-button">
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Right Section: Ticket Queue */}
        <div className="ticket-queue-section">
          <h3>Ticket Queue</h3>
          <div className="ticket-list">
            {ticketQueue.map((ticket) => (
              <div key={ticket.ticketId} className="ticket-item">
                <div>
                  <strong>Ticket ID:</strong> {ticket.ticketId} | <strong>Event:</strong> {ticket.eventName} |{" "}
                  <strong>Price:</strong> ${ticket.ticketPrice}
                </div>
                <button className="book-button">Book Ticket</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="system-status">
        <h4>Status: {systemStatus}</h4>
        <p>Tickets Released: {ticketQueue.length}</p>
      </div>
    </div>
  );
}

export default VendorDashboard;
