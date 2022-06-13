import { useEffect, useState } from "react";

const Modal = ({characters, time, onReset}) => {
    const [transition, setTransition] = useState(false);
    
    useEffect(() => {
        setTransition(true);

        return() => setTransition(false);
    }, [])

    return (
       <div className={`fixed inset-0 px-4 bg-gray-900 flex items-center justify-center transition-colors ${transition ? 'bg-opacity-80 backdrop-blur-sm duration-500' : 'bg-opacity-0 backdrop-blur-none duration-500'}`}>
            <div className='bg-gray-50 w-full max-w-md rounded-md py-8 px-4 flex flex-col gap-y-4'>
                <h3 className='text-center text-lg text-gray-800 font-medium border-b py-2 border-gray-200'>آمار سرعت تایپ شما</h3>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-base text-gray-800 flex gap-x-1'>
                        <span>تعداد کاراکتر: </span>
                        <span className='bg-green-400 text-gray-200 px-2 rounded-md'>{characters.length}</span>
                    </p>
                    <p className='text-base text-gray-800 flex gap-x-1'>
                        <span>زمان تایپ: </span>
                        <span className='bg-green-400 text-gray-200 px-2 rounded-md'>
                            <span>{time.minute < 10 ? `0${time.minute}` : time.minute}</span>:
                            <span>{time.second < 10 ? `0${time.second}` : time.second}</span>:
                            <span>{time.milliSecond < 10 ? `0${time.milliSecond}` : time.milliSecond}</span>
                        </span>
                    </p>
                </div>
                <button className='bg-red-500 rounded-md py-2 px-5 text-white' onClick={onReset}>از نو</button>
            </div>
        </div>
    );
};

export default Modal;