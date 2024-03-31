import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Layout from "../components/Layout"
import { Row } from 'antd'
import DoctorsList from '../components/DoctorsList'
const Home = () => {
  const[doctors,setDoctors]=useState([])
////Login User DAta
const getUserData=async()=>{
try {
  const res= await  axios.get('http://localhost:9090/api/getAllDoctors',{
    headers:{
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  })
if(res.data.success){
  setDoctors(res.data.data)
}





} catch (error) {
  console.log(error)
}


}
useEffect(()=>{

getUserData()


},[])

  return (
  <Layout>
      <h1 className='  text-center mt-2 display-6 font-weight-bold            '   >Meet Our Specialist <hr className=' text-purple border-2'/></h1>
      <Row>
{doctors && doctors.map(doctor=>(
<DoctorsList doctor={doctor}   />


))}




      </Row>
      </Layout>
  )
}

export default Home
