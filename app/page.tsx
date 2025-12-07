import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { IEvent } from '@/database/event.model'
import { cacheLife } from 'next/cache'

// 1. Import the new function
import { getAllEvents } from '@/lib/actions/getallevents.action'

const page = async() => {
  'use cache'
  cacheLife('hours')

  const events = await getAllEvents(); 

  return (
    <section>
      <h1 className='text-center'>The Hub For Every Dev <br /> Event You Can't Miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups and Conferences, All in one Place</p>
      <ExploreBtn/>
      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <ul className='events list-none'>
          {
            // Add a safety check to ensure events is an array
            Array.isArray(events) && events.length > 0 && events.map((event: IEvent) => (
              <li key={event.title}>
                <EventCard {...event}/>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default page