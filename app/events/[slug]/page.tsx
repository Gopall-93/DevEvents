import BookEvent from '@/components/BookEvent'
import EventCard from '@/components/EventCard'
import { IEvent } from '@/DataBase/event.model'
import { getSimilarEventBySlug } from '@/lib/actions/event.actions'
import { cacheLife } from 'next/cache'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventDetailItem = ({icon,alt,label}:{icon:string,alt:string,label:string})=>(
    <div className='flex-row-gap-2 items-center'>
        <Image src={icon} alt={alt} width={17} height={17}/>
        <p>{label}</p>
    </div>
)

const EventAgenda = ({agendaItems}:{agendaItems:string[]})=>(
    <div className='agenda'>
        <h2>Agenda</h2>
        <ul>
            {
                agendaItems.map((item)=>(
                    <li key={item}>{item}</li>
                ))
            }
        </ul>
    </div>
)

const EventTags=({tags}:{tags:string[]})=>(
    <div className='flex flex-row gap-1.5 flex-wrap'>
        {
            tags.map((tag)=>(
                <div className='pill' key={tag}>{tag}</div>
            ))
        }
    </div>
)

const EventDetailsPage = async({params}:{params:Promise<{slug:string}>}) => {
    'use cache'
    cacheLife('hours')
    const {slug} = await params

    let events;
    try {
        const request = await fetch(`${BASE_URL}/api/events/${slug}`,{next:{revalidate:60}})
        if(!request.ok){
            if(request.status===404){
                return notFound()
            }
            throw new Error(`Failed to fetch event: ${request.statusText}`)
        }
        const response = await request.json()
        events =response.event;

        if(!events){
            return notFound()
        }
    } catch (error) {
        console.error('Error fetching event',error)
        return notFound();
    }
    
    const {description,image,overview,date,time,mode,agenda,location,audience,tags,organizer,_id} = events

    if(!description) return notFound();

    const bookings = 10

    const similarEvents : IEvent[]= await getSimilarEventBySlug(slug)

    console.log(similarEvents);
  return (
    <section id='event' className='m-3'>
        <div className='header'>
            <h1>Event Description</h1>
            <p className='mt-2'>{description}</p>
        </div>

        <div className='details'>
            <div className='content'>
                <Image src={image} alt = "event banner" width={800} height={800} className='banner'/>
                <section className='flex-col-gap-2'>
                    <h2>Overview</h2>
                    <p>{overview}</p>
                </section>
                <section className='flex-col-gap-2'>
                    <h2>Event Details</h2>
                    <EventDetailItem icon='/icons/calendar.svg' alt='calendar' label={date}/>
                    <EventDetailItem icon='/icons/clock.svg' alt='time' label={time}/>
                    <EventDetailItem icon='/icons/pin.svg' alt='location' label={location}/>
                    <EventDetailItem icon='/icons/mode.svg' alt='mode' label={mode}/>
                    <EventDetailItem icon='/icons/audience.svg' alt='audience' label={audience}/>
                   
                </section>
                <EventAgenda agendaItems={agenda}/>
                 <EventTags tags={tags}/>

                <section className='flex-col-gap-2'>
                    <h2>About the organizer</h2>
                    <p>{organizer}</p>
                </section>
            </div>
            <aside className='booking'>
                <div className='signup-card'>
                    <h2>Book Your Spot</h2>
                    {bookings>0?(
                        <p className='text-sm'>
                            Join {bookings} people who have already booked their spot!
                        </p>):
                        (
                            <p className='text-sm'>Be the first to book you spot</p>
                        )
                        
                    }
                    <BookEvent slug={slug} eventId={_id} />
                </div>
            </aside>
        </div>
        <div className='flex w-full flex-col gap-4 pt-20'>
            <h2>Similar Events</h2>
            <div className='events'>
                {
                     
                    similarEvents.length>0&&similarEvents.map((similarEvent:IEvent)=>(
                       
                        <EventCard key={`${similarEvent._id}`} title={similarEvent.title} image={similarEvent.image} slug = {similarEvent.slug} location={similarEvent.location} date = {similarEvent.date} time={similarEvent.time}/>
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default EventDetailsPage