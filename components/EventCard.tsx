import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface Props{
    title:string,
    image:string,
    sluge:string,
    location:string,
    date:string,
    time:string
}

const EventCard = ({title,image,sluge,location,date,time}:Props) => {
  return (
    <Link href={`/events`} id='event-card'>
        <Image src={image} alt={title} width={410} height={300} className='poster'/>
    </Link>
  )
}

export default EventCard