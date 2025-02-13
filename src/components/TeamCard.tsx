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
                flex flex-col
                md:grid md:grid-rows-2 md:grid-cols-4
                text-center
                w-4/5
                rounded-xl'>
                <div className='text-2xl'>{conference}</div>
                <div className='row-start-2 mb-1.5'>Conference</div>
                <div className='text-2xl'>{division}</div>
                <div className='row-start-2 mb-1.5'>Division</div>
                <div className='text-2xl'>{location}</div>
                <div className='row-start-2 mb-1.5'>Location</div>
                <div className='text-2xl'>{name}</div>
                <div className='row-start-2 mb-1.5'>Name</div>
            </div>
        </div>
    )
}