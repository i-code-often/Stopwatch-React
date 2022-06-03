import logo from './logo.svg';
import './App.css';
import { useState, useCallback } from 'react';

function App() {

  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerHistory, setTimerHistory] = useState([]);
  const [interv, setInterv] = useState();
  
  const formatTime = (val, ...rest) => {
    let value = val.toString();
    if (value.length < 2) {
      value = '0' + value;
    }
    if (rest[0] === 'ms' && value.length < 3) {
      value = '0' + value;
    }
    return value;
  };

  const timeStr = `${formatTime(time.hours)} : ${formatTime(time.minutes)} : ${formatTime(time.seconds)} : ${formatTime(time.milliseconds, 'ms')}`;

  function run(){
    
    setTime((latestTime)=>{
      let hours = latestTime.hours;
      let minutes = latestTime.minutes;
      let seconds = latestTime.seconds;
      let milliseconds = latestTime.milliseconds;
      
      milliseconds += 10;
      if(milliseconds===1000){
        seconds += 1;
        milliseconds = 0;
      }
      if(seconds===60){
        minutes += 1;
        seconds = 0;
      }
      if(minutes===60){
        hours += 1;
        minutes = 0;
      }
      return {
        hours,
        minutes,
        seconds,
        milliseconds,
      }
    });
  }

  const startHandler = () => {
    if(isActive) return;
    console.log('hello');
    setIsPaused(false);
    setIsActive(true);
    run();
    setInterv(setInterval(run, 10));
  };

  const pauseHandler = () => {
    if(!isActive) return;
    console.log('pause');
    setIsPaused(true);
    setIsActive(false);
    clearInterval(interv);
  };

  const stopHandler = () => {
    if(!isActive && !isPaused) return;
    clearInterval(interv);
    setIsActive(false);
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    setTimerHistory((t)=>{
      return [...t, timeStr];
    })
  };

  const resetHandler = () => {
    clearInterval(interv);
    setIsActive(false);
    setIsPaused(false);
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  };

  return (
    <div className='container'>
      <div className='time'>
        {timeStr}
      </div>
      <div className="actions">
        {<button onClick={startHandler}>Start</button>}
        <button onClick={pauseHandler}>Pause</button>
        <button onClick={stopHandler}>Stop</button>
        <button onClick={resetHandler}>Reset</button>
      </div>
      <ul>
        {timerHistory.map(ele=>{
          return <li key={Math.random()}><p>{ele}</p></li>
        })}
      </ul>
    </div>
  );
}

export default App;
