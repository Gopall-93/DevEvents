import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { IEvent } from '@/database/event.model'

// Force SSR so fetch doesn't run at build time
export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = async () => {

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Fallback for local dev
  const safeUrl = BASE_URL 
    ? `${BASE_URL}/api/events`
    : `http://localhost:3000/api/events`;

  let events: IEvent[] = [];

  try {
    const response = await fetch(safeUrl, { cache: "no-store" });
    const data = await response.json();
    events = data.events ?? [];
  } catch (error) {
    console.error("[Home Fetch Error]:", error);
  }

  return (
    <section>
      <h1 className='text-center'>The Hub For Every Dev <br /> Event You Can't Miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups and Conferences, All in one Place</p>
      <ExploreBtn/>
      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <ul className='events list-none'>
          {events.length > 0 ? (
            events.map((event: IEvent) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <p className="text-light-200">No events found.</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default page;
