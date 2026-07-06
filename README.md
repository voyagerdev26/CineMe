# Movie Ticket Booking System

A **Full Stack Movie Ticket Booking System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The application allows users to browse movies, select their preferred seats, book tickets securely, and manage bookings through an intuitive interface. It also includes a dedicated admin dashboard for movie and booking management, secure authentication with Clerk, and background job processing using Inngest.

This project demonstrates the implementation of real-world features such as seat reservation, online booking workflows, authentication, background email automation, and scalable backend architecture.

---

# 🚀 Features

## 🎬 User Features

Users can:

* Sign up and log in securely using Clerk.
* Browse currently available movies.
* View movie details including posters, descriptions, and show timings.
* Select preferred seats from an interactive seating layout.
* Book movie tickets online.
* View booking details and booking history.
* Receive booking confirmation emails.
* Receive reminder emails before the movie starts.

---

## 🔐 Authentication

The project uses **Clerk Authentication**, providing a secure and seamless login experience.

Supported authentication methods include:

* Email & Password Authentication
* Google Sign-In
* Social Login Providers
* Phone Number Authentication
* Multi-Session Authentication

Users can maintain multiple accounts and switch between them without signing out.

---

## 🎟️ Seat Selection & Booking

The booking system includes a real-world seat reservation workflow.

Features include:

* Interactive seat selection.
* Real-time seat availability.
* Prevention of double booking.
* Seat reservation during payment.
* Booking confirmation after successful payment.

---

## ⏳ Temporary Seat Reservation

To improve the booking experience, the application temporarily reserves selected seats.

Workflow:

* Seats are reserved immediately after the booking process begins.
* If payment succeeds, the reservation becomes a confirmed booking.
* If payment fails or is cancelled, the seats remain reserved for **10 minutes**.
* Users can retry the payment without losing their selected seats.
* If payment is not completed within 10 minutes, the reserved seats are automatically released for other users.

---

## 👨‍💼 Admin Dashboard

The administrator has complete control over the platform.

Admin can:

* Add new movies.
* Update movie details.
* Remove movies.
* Manage movie listings.
* View all bookings.
* Monitor booking information.
* Manage platform content from a centralized dashboard.

---

## ⚡ Background Jobs with Inngest

The application uses **Inngest** to execute asynchronous workflows and scheduled background tasks.

Implemented background jobs include:

* Send email notifications whenever a new movie is added.
* Send booking confirmation emails after successful bookings.
* Send reminder emails a few hours before the movie show starts.
* Automatically release reserved seats after the reservation timeout.
* Execute long-running tasks without affecting application performance.

---

## 🌐 REST API

The backend is built using RESTful APIs.

Implemented APIs include:

* Authentication APIs
* Movie Management APIs
* Booking APIs
* User APIs
* Seat Availability APIs

The frontend communicates with the backend using JSON-based APIs.

---

## 🗄️ Database

MongoDB is used as the primary database.

Collections include:

* Users
* Movies
* Bookings
* Shows
* Seat Reservations

The database is structured to efficiently manage movie information, bookings, and seat availability.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* HTML5
* CSS3
* Axios

### Backend

* Node.js
* Express.js
* Clerk Authentication
* Inngest

### Database

* MongoDB
* Mongoose

---

## 📂 Project Highlights

* Full Stack MERN Architecture
* Secure Clerk Authentication
* Multi-Session Login Support
* Role-Based Admin Dashboard
* Interactive Seat Selection
* Real-Time Seat Reservation
* Booking Management
* Automated Email Notifications
* Background Job Processing with Inngest
* RESTful APIs
* Responsive User Interface
* Scalable Backend Design

---

## 🎯 Purpose of the Project

This project was built to understand how modern online movie ticket booking platforms operate. It demonstrates real-world concepts such as secure authentication, seat reservation, booking workflows, background job processing, automated email notifications, REST API development, and scalable full-stack application architecture.

The project showcases practical implementation of authentication, database design, CRUD operations, asynchronous workflows, and user-friendly booking experiences, making it a strong portfolio project for Full Stack Developer roles.

---


## 👨‍💻 Author

Developed by **Dev Sharma**

If you found this project useful, consider giving it a ⭐ on GitHub!
