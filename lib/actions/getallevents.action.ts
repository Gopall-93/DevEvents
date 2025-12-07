'use server'
import connectDB from "../mongodb" // Ensure this path matches your project
import Event from "@/database/event.model";

export async function getAllEvents() {
  try {
    await connectDB();

    // Query your database directly
    const events = await Event.find({});

    // Parse to JSON to avoid "Plain Object" serialization warnings in Next.js
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error("Error fetching events:", error);
    return []; // Return empty array on error
  }
}