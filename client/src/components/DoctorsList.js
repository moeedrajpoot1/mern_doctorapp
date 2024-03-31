import React from 'react'
import { useNavigate } from 'react-router-dom'
const DoctorsList = ({doctor}) => {
  const navigate=useNavigate()
  return (
   <>
<div className="card m-2 border-0 mx-auto" style={{ maxWidth: "18rem", borderRadius: "15px", overflow: "hidden", boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)", transition: "0.3s" }} >
<div className='card-header bg-primary text-white'>
        Dr. <b>{doctor.firstName} {doctor.lastName}</b>
      </div>
     
      <div className="card-body">
       
        <p className="card-text"><strong>Specialization:</strong> {doctor.specialization}</p>
        <p className="card-text"><strong>Experience:</strong> {doctor.experience} years</p>
        <p className="card-text"><strong>Fee:</strong> ${doctor.feePerConsultation}</p>
        <p className="card-text"><strong>Timings:</strong> {doctor.timings[0]} - {doctor.timings[1]}</p>
        <button className="btn btn-primary btn-sm mt-3" onClick={()=>navigate(`/doctor/book-appoitment/${doctor._id}`)}    >Book Appointment</button>
      </div>
</div>



   </>
  )
}

export default DoctorsList

