import './App.css';
import React, { useState } from 'react';

export default function Datepicker() {
  const today = new Date();
  const monthlist = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const todaystring = today.toLocaleDateString();
  const [mydate, setMydate] = useState(JSON.parse(localStorage.getItem('mydate')) || { 'month': today.getMonth() + 1, 'day': today.getDate(), 'year': today.getFullYear() });

  let daysInMonth = new Date(mydate.year, mydate.month, 0).getDate();

  let daysinmontharray = Array.apply(null, { length: daysInMonth + 1 }).map(Number.call, Number);
  daysinmontharray.shift();

  let Calculate = Math.round((new Date(mydate.month + '/' + mydate.day + '/' + mydate.year) - new Date(todaystring)) / (1000 * 3600 * 24));

  let isCalcNegative = Math.sign(Calculate) === 1 || Calculate === 0; let isCalcOne = Math.sign(Calculate) === 1 || Calculate === -1

  return (
    <div>
      <div className="wrapper">
        <div className="datewrapper">

          <div><label>Month</label>
            <select className="p" id="month" value={mydate.month} onChange={(e) => { localStorage.setItem('mydate', JSON.stringify({ ...mydate, 'month': e.target.value })); setMydate({ ...mydate, 'month': e.target.value }) }} >
              {monthlist.map((item, i) =>
                <option key={i} value={i + 1}>{item}</option>
              )}
            </select></div>

          <div><label style={{ marginLeft: '-15px' }}>Day</label>
            <select className="p" id="day" value={mydate.day} onChange={(e) => { localStorage.setItem('mydate', JSON.stringify({ ...mydate, 'day': e.target.value })); setMydate({ ...mydate, 'day': e.target.value }) }}>
              {
                daysinmontharray.map((item, i) =>
                  <option key={i} value={item}>{item}</option>
                )
              }
            </select></div>

          <div id="yr"><label style={{ marginLeft: '-20px' }}>Year</label>
            <input className="p" id="year" type="number" defaultValue={mydate.year} onInput={(e) => { if (e.target.value < 275759) { localStorage.setItem('mydate', JSON.stringify({ ...mydate, 'year': Math.abs(e.target.value) })); setMydate({ ...mydate, 'year': Math.abs(e.target.value) }) } }}></input>
          </div></div>

        <div className="output">
          {mydate.month + '/' + mydate.day + '/' + mydate.year} {(isCalcNegative) ? <span>is</span> : <span>was</span>} {Math.abs(Calculate)} {(isCalcOne) ? <span>day</span> : <span>days</span>} {(isCalcNegative) ? <span>from today</span> : <span>ago</span>}</div>
      </div>
    </div >
  )
}
