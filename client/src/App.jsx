import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favourite from './pages/Favourite'
import {Toaster} from "react-hot-toast" // we need to use notification in all components
import Footer from './components/Footer'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import { useAppContext } from './context/AppContext'
import { SignIn } from '@clerk/react'
import Loading from './components/Loading'

const App = () => {
  // navbar component will only be displayed in user profile , in admin there should be not
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  const {user} = useAppContext();
  return (
    <>
      <Toaster/>
      {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/movies/:id" element={<MovieDetails/>}/>
        <Route path="/movies/:id/:date" element={<SeatLayout/>}/>
        <Route path="/my-bookings" element={<MyBookings/>}/>
        <Route path="/loading/:nextUrl" element={<Loading/>}/>
        <Route path="/favourite" element={<Favourite/>}/>
        {/* for all paths after admin that's why * put so display the layout component which includes header and sidebar so oosmai ye childs ko mount karne ke liye use Outlet component provided by react router dom */}
        <Route path="/admin/*" element={user?<Layout/>:(
          <div className='min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl={'/admin'} />
          </div>
        )}> 

          <Route index element={<Dashboard/>} /> {/*same path as Layout so Dashboard child will also be mounted*/}
          <Route path="add-shows" element={<AddShows/>} />
          <Route path="list-shows" element={<ListShows/>} />
          <Route path="list-bookings" element={<ListBookings/>} />
          
        </Route>
      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  )
}

export default App