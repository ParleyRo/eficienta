import {Component} from 'react';
import Config from './Config';
import Everhour from './components/Everhour';
import Days from './components/Days';

import Display from './components/Display';

import './assets/css/app.css';

const MonthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
class App extends Component {

  constructor(){
    
    super();

    this.state = {
      user:{
        name: ''
      },
      time: {
        everhour: 0,
        freedays: 0,
        daysoff: 0,
        workHours: 0
      },
      daysoff: [],
      freedays: [],
      weekendDays: 0,
      totalDays: 0,
      isLoaded: null
    };

    const queryParams = new URLSearchParams(window.location.search);
    const month = queryParams.get("month") || 1;
    
    this.monthPosition = Math.min(1,parseInt(month));

    const date = new Date();
		date.setMonth(date.getMonth()+(this.monthPosition>0?0:this.monthPosition));

    if(this.monthPosition !== 1){
      date.setDate(0);
    }

    this.currentDay = date.getDate();
    this.currentMonth = date.getMonth();

    const oDays = new Days(this.monthPosition,this.currentDay);

    this.days = oDays.getDays();

  }

  async setEverhour(){
  
    const oEverhour = new Everhour(this.monthPosition);
    
    const tasks = await oEverhour.fetchUserTasks();

    if(tasks.error){
      
      return false;

    }

    this.everhour = 0;
    tasks.forEach((task)=>{
      this.everhour += task.time
    });

    return true;

  }

  setData(){
  
    let oState = {...this.state};

    oState.isLoaded = true;

    oState.user.name = Config.name;
    oState.user.month = MonthNames[this.currentMonth];
    oState.user.prevmonth = MonthNames[(this.currentMonth-1)%12];
    oState.user.nextmonth = this.monthPosition < 1 ? MonthNames[(this.currentMonth+1)%12] : false;
    oState.user.day = this.currentDay;

    oState.time.everhour = Math.round(this.everhour / 3600);
    
    oState.time.freedays = this.days.freedays*8;
    oState.freedays = [...this.days.freedaysList];
    oState.weekendDays = this.days.weekendDays;
    oState.totalDays = this.days.totalDays;
    oState.workDays = this.days.totalDays - this.days.weekendDays;
    oState.workedDays = this.days.workedDays;

    oState.time.daysoff = this.days.daysoff*8;
    oState.daysoff = [...this.days.daysoffList];
    oState.daysoffView = oState.daysoff.length ? ':'+oState.daysoff.join(',') : '';

    oState.time.workHours = oState.workDays*8;
    oState.time.workedHours = oState.workedDays*8;

    oState.efficiency = Math.round(((oState.time.everhour+oState.time.freedays+oState.time.daysoff) * 100 ) / oState.time.workHours);

    const freedaysToday = oState.freedays.reduce((index,day) =>{
      
      if(this.currentDay >= day){
        return index+1;
      }

      return index;

    },0);

    const daysoffToday = oState.daysoff.reduce((index,day) =>{
      
      if(this.currentDay >= day){
        return index+1;
      }

      return index;

    },0);

    oState.efficiencyToday = Math.round(((oState.time.everhour+(freedaysToday*8)+(daysoffToday*8)) * 100 ) / oState.time.workedHours);

    oState.currentMonth = this.monthPosition;

    return oState;
  }

  async componentDidMount() {

    console.log('componentDidMount');

    const bEverhour = await this.setEverhour();

    if(bEverhour === false){
      
      let oState = {...this.state};

      oState.isLoaded = false;

      this.setState(oState);

      return;
    }
    
    const oState = this.setData();

    this.setState(oState);
    
  }

  render() {

    return (

        <div>

          {this.state.isLoaded === null && <h1>Loading....</h1>}

          {this.state.isLoaded === true && <Display data={this.state}/>}
          
          {this.state.isLoaded === false && <h2>Error on Everhour</h2>}

        </div>
      

    )
  }
}

export default App;
