import React from 'react'
// Importing the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'
// Importing the useState and useEffect hooks from React
import { useEffect, useState } from 'react'
// Importing axios for making HTTP requests
import axios from 'axios'

function Header() {
  // Initialize the navigation state using the useNavigate hook
  const navigate = useNavigate()
  // Initialize the authentication state using the useState hook
  const [auth, setAuth] = useState('')

  // The useEffect hook is used to make an HTTP request when the component is mounted
  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(res => {
        // If the user is authenticated, set the authentication state to true
        if (res.data.auth) {
          setAuth(true)
        } else {
          setAuth(false)
        }
      })
      .catch(err => console.log(err))}, [])

  // The logout function is called when the "Log Out" button is clicked
  const logout = (e) => {
    axios.get('http://localhost:8000/logout')
      .then(res => {
        console.log(res)
        // If the logout is successful, navigate to the login page
        if (res.status === 200) {
          navigate('/login')
          //setAuth(false)
        }
      })
      .catch(err => console.log(err))}

  // The Header component returns a header with a navigation bar
  return (
    <div className='text-slate-100 px-12 bg-slate-900 md:min-h-20 flex w-full items-center font-bold'>
      <nav className="flex justify-between w-full" id='top'>

        <a className="text-xl " href="/">Tax Calculation </a>

        <ul className='flex gap-10'>
          {/* The authentication state is used to conditionally render the "Log Out" button or the "Login" and "Sign Up" buttons */}
          <li>
            {
              auth ? (
                <button className="px-4 py-1 bg-red-500 rounded-lg" onClick={logout}>Log Out</button>
              ) : (
                <ul className='flex gap-5'>
                  <li className="px-4 py-1  bg-slate-500 rounded-md"><a href="/login">Login</a></li>
                  <li className="px-4 py-1 bg-slate-400 rounded-md"><a href="/register">Sign Up</a></li>
                </ul>

              )
            }
          </li>

