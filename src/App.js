import {Component} from 'react';
import Config from './Config';
import Everhour from './components/Everhour';
import Days from './components/Days';

import Display from './components/Display';

import './assets/css/app.css';

class App extends Component {
  
  state = {
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
    isLoaded: false
  };

  currentMonth = 1;

  monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

  async setEverhour(){
  
    const oEverhour = new Everhour(this.currentMonth);

    const tasks = await oEverhour.fetchUserTasks();

    if(tasks.error){
      
      return;

    }

    this.everhour = 0;
    tasks.forEach((task)=>{
      this.everhour += task.time
    })

    let oState = {...this.state};
    oState.isLoaded = true;

    this.setState(oState);

  }

  setDays(){

    const oDays = new Days(this.currentMonth,this.currentDay);

    this.days = oDays.getDays();

  }


  async componentDidMount() {

    const queryParams = new URLSearchParams(window.location.search);
    const month = queryParams.get("month") || 1;
    
    this.currentMonth = Math.min(1,parseInt(month));

    const date = new Date();
		date.setMonth(date.getMonth()+(this.currentMonth>0?0:this.currentMonth));

    if(this.currentMonth !== 1){
      date.setDate(0);
    }

    this.currentDay = date.getDate();

    await this.setEverhour();

    if(!this.state.isLoaded){
      return;
    }

    this.setDays();
    

    //*******************/
    //set state
    //*******************/
    
    let oState = {...this.state};

    oState.user.name = Config.name;
    oState.user.month = this.monthNames[date.getMonth()];
    oState.user.prevmonth = this.monthNames[(date.getMonth()-1)%12];
    oState.user.nextmonth = this.currentMonth < 1 ? this.monthNames[(date.getMonth()+1)%12] : false;
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

    oState.currentMonth = this.currentMonth;

    this.setState(oState);
    
  }


  render() {
    
    return (

      <Display data={this.state}/>

    )
  }
}

export default App;
