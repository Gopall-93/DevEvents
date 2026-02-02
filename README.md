# 🚀 Dev Events — Developer Event Discovery Platform

**The Hub For Every Dev Event You Mustn't Miss**

Dev Events is a full stack platform where developers can discover, explore, and book seats for tech events.  
The system focuses on structured backend architecture, database modeling, API handling, and scalable server-side design.

This project demonstrates real-world backend engineering concepts through an event booking system.

---

## 📌 What Problem It Solves

Developers often miss important hackathons, tech meetups, and conferences.  
Dev Events centralizes event discovery and allows users to explore event details and book participation through a structured system.

---

## 🛠 Tech Stack

### Backend Logic
- Next.js API Routes
- MongoDB (Database)
- Mongoose Models
- Server Actions
- REST-style API structure

### Frontend
- Next.js (App Router)
- React Components
- Modular UI Architecture

---

## ✨ Core Features

✔ Dynamic Event Listing  
✔ Individual Event Detail Pages  
✔ Event Booking System  
✔ Database-Driven Content  
✔ Modular Component Architecture  
✔ Backend API Route Handling  
✔ Structured Model-Based Data Storage  

---

## 🧠 Backend Architecture Highlights

### Database Models
- **Event Model** → Stores event details
- **Booking Model** → Tracks user event bookings

### API Layer
Located in:
app/api/events/[slug]/route.ts

Handles:
- Fetching event details
- Server-side data processing

### Server Actions
-lib/actions/
Used for:
- Creating bookings
- Fetching all events
- Handling server-side logic cleanly

---

## 📂 Folder Structure (Important)
app/
├── api/events/[slug] → Backend route handling
├── events/ → Dynamic event pages
├── create/ → Event creation page

database/
├── event.model.ts
├── booking.model.ts

lib/
├── actions/ → Server-side logic
├── mongodb.ts → DB connection

components/
├── EventCard
├── EventDetails
├── BookEvent


This structure separates UI, logic, database, and API responsibilities like a production system.

---

## ⚙️ How To Run
npm install
npm run dev

Create `.env.local`

MONGODB_URI=your_database_url


---

## 🔐 Backend Concepts Demonstrated

- Database modeling with Mongoose
- Dynamic route-based API handling
- Server-side data operations
- Clean project architecture
- Modular code organization

---

## 🎯 What This Project Shows

This project proves ability in:
- Backend data handling
- API structure understanding
- Database design
- Full-stack integration
- Writing scalable project architecture

---

## 👨‍💻 Author

Gopall Sharma  
Backend Developer | API Systems | Database Architecture
