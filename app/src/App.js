import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { SvgCircle } from './Svg';
import { TheDay } from './TheDay';

function App() {
  const [months, setMonths] = useState(0)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  
  const today = new Date();
  const getBirthday = () => {
    if(new Date() < new Date(2021, new Date().getMonth(), 7)){
      return moment(`07 10 ${moment().get('year')} 0:00 am`, 'DD MM YYYY, h:mm a')
    }else{
      return moment(`07 10 ${(moment().get('year'))+1} 0:00 am`, 'DD MM YYYY, h:mm a')
    }
  }
  const then = getBirthday();
  const now = moment()
  const countdown = moment(then - now)

  
  
  useEffect(()=>{
    const interval = setInterval(()=>{
    const then = getBirthday();
    const now = moment()
    const countdown = moment(then - now)
    
   
    const iMonths = countdown.format('M') - 1
    const iDays = countdown.format('D');
    const iHours = countdown.format('HH');
    const iMinutes = countdown.format('mm');
    const iSeconds = countdown.format('ss');

    setMonths(iMonths)
    setDays(iDays)
    setHours(iHours)
    setMinutes(iMinutes)
    setSeconds(iSeconds)

    }, 1000)
  }, [])

        const monthRadius = mapNumber(months, 12, 0, 0, 360)
        const daysRadius = mapNumber(days, 31, 0, 0, 360);
        const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

       
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {(getBirthday().get('date') === now.get('date') )&&(getBirthday().get('month') === now.get('month')) ? (<TheDay />) : ('')}
        <div id="countdown">
        <div className="block">
            <SvgCircle radius={monthRadius} />
            <div className="value">{months}</div>
            <div className="time">MOIS</div>  
          </div>
          
          <div className="block">
            <SvgCircle radius={daysRadius} />
            <div className="value">{days}</div>
            <div className="time">JOURS</div>  
          </div>
          <div className="block">
          <SvgCircle radius={hoursRadius} />
          <div className="value">{hours}</div>
            <div className="time">HEURES</div>
          </div>
          <div className="block">
          <SvgCircle radius={minutesRadius} />
          <div className="value">{minutes}</div>
            <div className="time">MINUTES</div>
          </div>
          <div className="block">
          <SvgCircle radius={secondsRadius} />
          <div className="value">{seconds}</div>
            <div className="time">SECONDES</div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}