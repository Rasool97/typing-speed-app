import { useEffect, useState } from 'react';

const Timer = ({timeHandler}) => {
    const [time, setTime] = useState({
        milliSecond: 0,
        second: 0,
        minute: 0
      });

    let timer;
    let milliSecond = 0;
    let second = 0;
    let minute = 0;

    const updateTimer = () => {
        timer = setInterval(() => {
            if(milliSecond < 100) {
                milliSecond++;

                setTime(prevTime => ({
                    ...prevTime,
                    milliSecond: milliSecond,
                }))
            }

            if(milliSecond === 100) {
                second++;
                milliSecond = 0;  

                setTime(prevTime => ({
                    ...prevTime,
                    second: second,
                }))
            }

            if(second === 60) {
                minute++;
                second = 0;
                
                setTime(prevTime => ({
                    ...prevTime,
                    minute: minute,
                }))
            }

        }, 10)
    }

    useEffect(() => {
        updateTimer();

        return () => {
            clearInterval(timer);
            timeHandler({milliSecond, second, minute})
        };
    }, [])

    return(
        <div className="text-4xl font-medium text-gray-800">
            <span>{time.minute < 10 ? `0${time.minute}` : time.minute}</span>:
            <span>{time.second < 10 ? `0${time.second}` : time.second}</span>:
            <span>{time.milliSecond < 10 ? `0${time.milliSecond}` : time.milliSecond}</span>
        </div>
    )

};

export default Timer;