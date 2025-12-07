'use server'

import { Event } from "@/database";
import connectDB from "../mongodb"

export const getSimilarEventBySlug = async(slug:string)=>{
    try {
        await connectDB();

        const event = await Event.findOne({slug})
        const similarEvents =  await Event.find({
            _id:{$ne:event._id},
            tags:{$in:event.tags}
        })

       return similarEvents;
    } catch (error) {
        return[]
    }
}
export async function getEventBySlug(slug: string) {
  try {
    await connectDB();
    
    // Find the event by slug
    const event = await Event.findOne({ slug });
    
    if (!event) return null;

    // Convert to plain JSON object
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error("Error getting event by slug:", error);
    return null;
  }
}