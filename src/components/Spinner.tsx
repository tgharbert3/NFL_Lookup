import { ClipLoader } from "react-spinners";

interface SpinnerProps {
    loading: boolean;
}

export default function Spinner( { loading }: SpinnerProps ) {
    return (
        <div className="h-screen bg-slate-200 flex justify-center items-center">
            <ClipLoader loading={loading}/>
        </div>
        
    )
}