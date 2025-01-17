import { Link } from 'react-router';

import '../index.css';

interface TitleProps {
    fullName: string;
    id: string;
}

export default function TitleCard( { fullName, id }: TitleProps) {

    const splitName = fullName.split(" ");

    return (
        <div className='flex justify-center items-center'>
            <div className='border border-black p-12 text-4xl bg-cyan-500 rounded-xl text-slate-200'>
                {fullName}
                <Link to={`/games/${splitName[0]}/${splitName[1]}/${id}`} className='text-sm text-center block'>View Games</Link>
            </div>
        </div>
    )
}