import Event, { IEvent } from "@/database/event.model"
import connectDB from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

type RouteParams={
    params:Promise<{
        slug:string
    }>
}

export async function GET(
    req:NextRequest,
    {params}:RouteParams
):Promise<NextResponse>{
    try {
        await connectDB();
        const {slug} = await params;

        if(!slug || typeof slug !=='string' || slug.trim()===''){
            return NextResponse.json({
                message:'Invalid or missing slug parammeter'
            },
            {
                status:400
            }
        )

        }

        const sanitizedSlug = slug.trim().toLowerCase();

        const event :IEvent|null = await Event.findOne({slug:sanitizedSlug}).lean();

        if(!event){
            return NextResponse.json(
                {message:`Event with slug ${sanitizedSlug} not found`},
                {status:404}
            )
        }

        return NextResponse.json(
            {message:'Event fetched successfully', event},
            {status:201}
        )
    } catch (error) {
        if(process.env.NODE_EVN==='development'){
            console.log(error)
        }
        if(error instanceof Error){
            if(error.message.includes('MONGODB_URI')){
                return NextResponse.json(
                    {message:'Failed to fetch event ',error:error.message},
                    {status:500}
                )
            }
        }
        return NextResponse.json(
            {message:'An unexpected error occured'},
            {status:500}
        )
    }
}