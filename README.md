# 🚀 Dev Events — Developer Event Discovery & Booking Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Logic-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

**The Hub For Every Dev Event You Mustn't Miss.**

Dev Events is a full-stack event discovery and booking system designed with a **backend-first architecture mindset**.  
The platform demonstrates database modeling, API route structuring, server-side logic handling, and scalable system design patterns.

---

## 🎯 Problem Statement

Developers miss hackathons, tech meetups, and conferences due to scattered information sources.  
**Dev Events** centralizes event discovery and enables structured participation through a database-driven booking engine.

---

## 🏗 System Overview

The platform follows a **modular full-stack architecture**:

User → Frontend (Next.js) → API Routes / Server Actions → MongoDB

The backend is designed to handle:
- Data consistency
- Clean separation of concerns
- Scalable feature expansion

---

## 🛠 Tech Stack

### Backend & Data Layer
- Next.js App Router (Server-first architecture)
- MongoDB (NoSQL database)
- Mongoose (Schema modeling)
- REST-style API Routes
- Server Actions for secure server execution

### Frontend
- React.js
- Tailwind CSS
- Component-driven UI architecture

---

## ✨ Core Functionalities

| Capability | Engineering Significance |
|------------|--------------------------|
| Dynamic Event Listings | Real-time database-driven UI |
| Event Detail Pages | SEO-friendly dynamic routing (`/events/[slug]`) |
| Booking Engine | Atomic booking logic & relationship tracking |
| API Layer | Backend endpoints for extensibility |
| Server Actions | Reduced client exposure & secure logic execution |

---

## 🧠 Backend Engineering Highlights

### 1️⃣ Database Modeling

| Model | Purpose |
|------|---------|
| Event | Stores event metadata (title, slug, location, capacity) |
| Booking | Maintains user-event relationship & seat tracking |

---

### 2️⃣ API Layer

Located in:
-app/api/events/[slug]/route.ts


Responsibilities:
- Fetching event details
- Data formatting
- Server-side request handling

---

### 3️⃣ Server Actions

Located in:
-lib/actions/


Handles:
- Booking creation
- Event retrieval
- Secure server logic execution

---

## 🔄 Request Lifecycle Example

1. User opens event page  
2. Dynamic route fetches event data  
3. API route queries MongoDB  
4. Data returned to server component  
5. Booking action triggers server-side write operation  

---

## 🔐 Security Considerations

- Server-side logic via Server Actions  
- No direct database exposure  
- Environment variable protection  
- Structured schema validation  

---

## 📂 Folder Structure

```Folder
app/
├── api/events/[slug]  # Backend route handling
├── events/            # Dynamic event detail pages
├── create/            # Event creation interface
database/
├── event.model.ts     # Mongoose Event Schema
├── booking.model.ts   # Mongoose Booking Schema
lib/
├── actions/           # Server-side business logic
├── mongodb.ts         # Singleton Database connection
components/            # Reusable UI (EventCard, BookEvent, etc.)

```

## ⚙️ Running the Project

```bash
npm install
npm run dev
```

`.env.local`


---

## 📈 What This Project Demonstrates

- Backend-oriented full-stack architecture
- Database schema design
- API route structuring
- Server-side execution patterns
- Clean code organization

---

## 👨‍💻 Author

Gopall Sharma  
Backend Developer | API Systems | Database Architecture

