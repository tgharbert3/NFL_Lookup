import '../index.css'

interface TeamCardProps {
    conference: string
    division: string
    location: string
    name: string
}

export default function TeamCard( { conference, division, location, name }: TeamCardProps ) {
    return (
        <div className='flex justify-center items-center'>
            <div className='
                border border-black 
                p-12
                bg-cyan-500 text-slate-200
                grid grid-rows-2 grid-cols-4
                text-center
                w-4/5
                rounded-xl'>
                <div className='text-3xl'>{conference}</div>
                <div className='row-start-2'>Conference</div>
                <div className='text-3xl'>{division}</div>
                <div className='row-start-2'>Division</div>
                <div className='text-3xl'>{location}</div>
                <div className='row-start-2'>Location</div>
                <div className='text-3xl'>{name}</div>
                <div className='row-start-2'>Name</div>
            </div>
        </div>
    )
}