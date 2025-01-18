interface PlyaerCardProps {
    position: string;
    position_abbreviation: string;
    height: string;
    weight: string;
    jersey_number: string;
    college: string;
    experience: string;
    full_name: string;
}

export default function PlayerCard( { position, position_abbreviation, height, weight, jersey_number, college, experience, full_name }: PlyaerCardProps ) {

    return(
        <section className="flex justify-center items-center">
            <div className="
                w-11/12 rounded-xl p-4 text-center
                border border-black bg-cyan-500 text-slate-200
                flex flex-col md:grid md:grid-rows-2 md:grid-cols-8">
                <div>{position}</div>
                <div className='row-start-2 text-sm mb-1.5'>Position</div>
                <div>{position_abbreviation}</div>
                <div className='row-start-2 text-sm mb-1.5'>Position Abbreviation</div>
                <div>{height}</div>
                <div className='row-start-2 text-sm mb-1.5'>Height</div>
                <div>{weight}</div>
                <div className='row-start-2 text-sm mb-1.5'>Weight</div>
                <div>{jersey_number}</div>
                <div className='row-start-2 text-sm mb-1.5'>Jersey Number</div>
                <div>{college}</div>
                <div className='row-start-2 text-sm align-text-bottom'>College</div>
                <div>{experience}</div>
                <div className='row-start-2 text-sm mb-1.5'>Experence</div>
                <div>{full_name}</div>
                <div className='row-start-2 text-sm mb-1.5'>Team</div>
            </div>
        </section>
    )
}