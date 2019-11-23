import React from "react";
import "./Appointments.scss";

function Appointments({ physicianName, email, targetAppointments }) {
  return (
    <div className="appointments">
      <h4>Dr. {physicianName}</h4>
      <p className="email">{email}</p>
      <div className="table-wrapper">
        <div className="table-header flex">
          <div className="col">#</div>
          <div className="col col-30">Name</div>
          <div className="col col-30">Time</div>
          <div className="col col-30">Kind</div>
        </div>
        {targetAppointments.map((targetAppointment, index) => {
          return (
            <div className="table-inner flex" key={index}>
              <div className="col">{index + 1}</div>
              <div className="col col-30">{targetAppointment.patientName}</div>
              <div className="col col-30">{targetAppointment.time}</div>
              <div className="col col-30">{targetAppointment.kind}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Appointments;
