import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Timer from './components/Timer';

function App() {
  const [term, setTerm] = useState(null);
  const [text, setText] = useState('');
  const [time, setTime] = useState({
    milliSecond: 0,
    second: 0,
    minute: 0
  });
  const [isStartedTyping, setIsStartedTyping] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const changeHandler = event => {
    setText(event.target.value);
    if(!isStartedTyping) {
      setIsStartedTyping(true);
    }

    if(term.includes(event.target.value)) {
      setIsClose(true);
    } else {
      setIsClose(false);
    }
    
    if(term === event.target.value) {
      setIsStartedTyping(false);
      setOpenModal(true);
    }
  }

  const timeHandler = (newTime) => {
    setTime(newTime);
  }

  const resetHandler = () => {
    setText('');
    setIsClose(false);
    setIsStartedTyping(false);
    setTerm(null);
    setTime({
      milliSecond: 0,
      second: 0,
      minute: 0
    })
    setOpenModal(false);
  }

  const copyHandler = event => {
    event.preventDefault();
    alert('تقلب ممنوع!!! 🚫⛔😉');
  }

  useEffect(() => {
    const fetchData = async () => {
     try {
      const randomId = Math.floor(Math.random() * 250);
      const response = await fetch(`https://jsonplaceholder.ir/comments?id=${randomId}`);
      const data = await response.json();
      setTerm(data[0].body);
     } catch (error) {
       setTerm('خب مثل اینکه در ارتباط شما مشکلی پیش آمده پس همین متن رو تایپ کن')
     }
    }

    if(!term) {
      fetchData();
    }
  }, [term])


  return (
    <>
      <div className="w-full bg-gray-800 text-white text-center py-4">
        <p className="max-w-xs sm:max-w-sm md:max-w-lg mx-auto text-lg font-medium">
          تست سنجش سرعت تایپ
        </p>
      </div>
      <div className="bg-green-700 py-4">
        <div className="max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
          <p className="text-white text-lg text-justify">فرآیند سنجش سرعت تایپ بدین گونه است که با شروع تایپ کاربر، تایمر شروع به شمارش زمان می کند!!! و با تایپ هر کاراکتر توسط کاربر مطابقت متن کاربر با متن نمایش داده شده چک می شود.</p>
        </div>
      </div>
      <div className="max-w-xs sm:max-w-sm md:max-w-lg mx-auto py-4 flex flex-col gap-y-4">
        <p className="mt-4 text-gray-800 text-lg">متن الگو</p>
        <div className="bg-gray-200 rounded-md p-4">
          <p className="text-lg text-gray-800" onCopy={copyHandler}>{term ? term : 'صبر کنید ...'}</p>
        </div>
        <textarea onChange={changeHandler} value={text} cols="30" rows="8" className="p-2 border-2 border-gray-300 rounded-md text-lg text-gray-800 resize-none focus:outline-none focus:border-gray-500"></textarea>
        <small className="text-lg text-gray-800 font-medium">{isStartedTyping ? isClose ? "نزدیک شدی" : "دور شدی" : ''}</small>
        <div className="flex justify-between">
          <button className="bg-red-500 rounded-md py-2 px-5 text-white" onClick={resetHandler}>از نو</button>
          {isStartedTyping ? <Timer timeHandler={timeHandler}  /> : (
            <div className="text-4xl font-medium text-gray-800">
            <span>{time.minute < 10 ? `0${time.minute}` : time.minute}</span>:
            <span>{time.second < 10 ? `0${time.second}` : time.second}</span>:
            <span>{time.milliSecond < 10 ? `0${time.milliSecond}` : time.milliSecond}</span>
            </div>
          )}
          
        </div>
      </div>
      {openModal && <Modal time={time} characters={term} onReset={resetHandler} />}
    </>
  );
}

export default App;
