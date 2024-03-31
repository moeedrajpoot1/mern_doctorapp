import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { SetUser } from '../redux/features/userSlice';

export default function ProtectedRoutes({children}) {
    const dispatch=useDispatch()
    const {user}= useSelector(state =>state.user)
//////get User///

const getUser=async()=>{
try {
dispatch(showLoading())
const response= await axios.post('http://localhost:9090/api/getUser',{
    token: localStorage.getItem('token')
},{
headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
}
})
dispatch(hideLoading())
if(response.data.success){
dispatch(SetUser(response.data.data))}
else{
    <Navigate  to="/login" />;
    localStorage.clear()
}
} catch (error) {
    dispatch(hideLoading())
    localStorage.clear()
    console.log(error)
}};

useEffect(()=>{
if(!user){
    getUser()
}



},[user])


 if(localStorage.getItem("token")){
    return children;
 }else{
    return <Navigate to="/login"  />;
 }

}

