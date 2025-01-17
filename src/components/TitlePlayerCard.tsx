import '../index.css';

interface TitleProps {
    fullName: string;
}

export default function TitlePlayerCard( { fullName }: TitleProps) {

    return (
        <div className='flex justify-center items-center'>
            <div className='border border-black p-12 text-4xl bg-cyan-500 rounded-xl text-slate-200'>
                {fullName}
            </div>
        </div>
    )
}