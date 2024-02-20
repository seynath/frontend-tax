import React from 'react'
// import { Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
function Header() {
  const navigate = useNavigate()
const [auth, setAuth] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(res => {
        if (res.data.auth) {
          setAuth(true)
         
        } else {
          setAuth(false)
        }
      })
      .catch(err => console.log(err))}, [])


  const logout = (e) => {
    axios.get('http://localhost:8000/logout')
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          navigate('/login')
          //setAuth(false)

        }
      })
      .catch(err => console.log(err))}

  return (
    <div className='text-slate-100 px-12 bg-slate-900 md:min-h-20 flex w-full items-center font-bold'>
      <nav className="flex justify-between w-full" id='top'>

        <a className="text-xl " href="/">Tax Calculation </a>
       
        <ul className='flex gap-10'>
         
        
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
          
        </ul>

        
      </nav>
      
    </div>
  )
}

export default Header
