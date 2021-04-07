import './App.css';
import React, { Component } from 'react';


export default class Datepicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      today: new Date().toLocaleDateString(),
      month: '',
      day: '',
      year: '',
      numericalmonth: '',
    }
  }
  componentDidMount() {

    if (localStorage === null) {
      this.getCurrentDate();
    } else {

      this.getLocalStorage();
    }
  }

  getCurrentDate = () => {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const numericalmonth = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    const today = new Date().toLocaleDateString();
    this.setState({ month: month, year: year, day: day, today: today, numericalmonth: numericalmonth });
  };

  getLocalStorage = () => {
    this.setState({
      month: localStorage.getItem("month"),
      day: localStorage.getItem("day"),
      year: localStorage.getItem("year"),
      numericalmonth: localStorage.getItem("numericalmonth"),
    })
  }

  daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  calculateDays = () => {
    let date1 = new Date(this.state.today);
    let date2 = new Date(this.state.numericalmonth + '/' + this.state.day + '/' + this.state.year);
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.round(Difference_In_Days)
  }

  componentDidUpdate() {
    this.calculateDays();

    localStorage.setItem('year', this.state.year);
    localStorage.setItem('month', this.state.month);
    localStorage.setItem('numericalmonth', this.state.numericalmonth);
    localStorage.setItem('day', this.state.day);
    localStorage.setItem('today', this.state.today);


    let daysinmonth = this.daysInMonth(this.state.numericalmonth, this.state.year);

    let selectBox = document.querySelector('#dayofmonth');

    selectBox.textContent = '';

    for (var i = 0; i < daysinmonth; i++) {

      const newOption = document.createElement('option');
      const optionText = document.createTextNode([i + 1]);

      newOption.appendChild(optionText);

      newOption.setAttribute('value', [i + 1]);

      selectBox.appendChild(newOption);
    }
  };

  render() {

    const {
      year, month, day, numericalmonth,
    } = this.state

    return (
      <div>

        <div className="datewrapper">

          <select value={month + ',' + numericalmonth} onChange={(e) => { this.setState({ month: e.target.value.split(',')[0], numericalmonth: e.target.value.split(',')[1] }) }} >

            <option value="January,1">January</option>
            <option value="February,2">February</option>
            <option value="March,3">March</option>
            <option value="April,4">April</option>
            <option value="May,5">May</option>
            <option value="June,6">June</option>
            <option value="July,7">July</option>
            <option value="August,8">August</option>
            <option value="September,9">September</option>
            <option value="October,10">October</option>
            <option value="November,11">November</option>
            <option value="December,12">December</option>
          </select>

          <select id="dayofmonth" onChange={(e) => { this.setState({ day: e.target.value }) }}></select>

          <input type="number" defaultValue={year} onInput={(e) => { if (e.target.value.length == 4) { this.setState({ year: e.target.value }) } }} ></input>

          <div className="output">{numericalmonth}/{day}/{year} is {this.calculateDays()} days from now </div>
        </div>

      </div>
    )
  }
};
