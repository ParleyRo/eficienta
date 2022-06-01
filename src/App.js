import {Component} from 'react';

import Everhour from './components/Everhour';
import Days from './components/Days';

import Display from './components/views/Display';
import UserData from './components/views/UserData';

import './assets/css/app.css';
import './assets/css/animations.css';

const MonthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
class App extends Component {

  constructor(){
    
    super();

    this.state = {
      user:{
        savedData:{}
      },
      time: {
        everhour: null,
        freedays: 0,
        daysoff: 0,
        workHours: 0
      },
      daysoff: [],
      freedays: [],
      weekendDays: 0,
      monthDays: 0,
      isLoaded: false
    };

    const queryParams = new URLSearchParams(window.location.search);
    const month = queryParams.get("month") || 0;
    
    this.monthPosition = Math.min(0,parseInt(month));

    this.date  = new Date();

    if(this.monthPosition < 0 ){
      this.date.setDate(15);
		  this.date.setMonth(this.date.getMonth()+this.monthPosition+1);
      this.date.setDate(0);
      
    }
    
    console.log(1,`Apps: ${this.date}`)
    
    this.everhourStats = {
      requestStarted: false,
      requestFinish: false,
      value: 0
    }

    this.userStats = {
      requestStarted: false,
      requestFinish: false,
      value: null
    }

    this.changedData= this.changedData.bind(this);

  }

  setData(){
  
    let oState = {...this.state};

    oState.isLoaded = true;

    oState.user.month = MonthNames[this.date.getMonth()];
    oState.user.prevmonth = MonthNames[(this.date.getMonth()+12-1)%12];
    oState.user.nextmonth = this.monthPosition < 0 ? MonthNames[(this.date.getMonth()+12+1)%12] : false;
    oState.user.day = this.date.getDate();
    oState.user.year = this.date.getFullYear();

    oState.time.everhour = Math.round(this.everhourStats.value / 3600);
    
    oState.time.freedays = this.days.freedays*8;
    oState.freedays = [...this.days.freedaysList];
    
    oState.workDays = this.days.monthDays - this.days.weekendDays;
    oState.workedDays = this.days.workedDays;

    oState.weekendDays = this.days.weekendDays;
    oState.monthDays = this.days.monthDays;
    
    oState.time.daysoff = this.days.daysoff*8;
    oState.daysoff = [...this.days.daysoffList];

    oState.time.workHours = oState.workDays*8;
    oState.time.workedHours = oState.workedDays*8;

    oState.efficiency = Math.round(((oState.time.everhour+oState.time.freedays+oState.time.daysoff) * 100 ) / oState.time.workHours);

    const freedaysToday = oState.freedays.reduce((index,day) =>{
      
      if(this.date.getDate() >= day){
        return index+1;
      }

      return index;

    },0);

    const daysoffToday = oState.daysoff.reduce((index,day) =>{
      
      if(this.date.getDate() >= day){
        return index+1;
      }

      return index;

    },0);

    oState.efficiencyToday = Math.round(((oState.time.everhour+(freedaysToday*8)+(daysoffToday*8)) * 100 ) / oState.time.workedHours);

    oState.currentMonth = this.monthPosition;

    oState.user.savedData = this.userStats

    return oState;
  }

  async setEverhour(apikey){

    if(!apikey){
      return false;
    }

    if(this.userStats.requestFinish === false){
      return true;
    }
    
    if(this.everhourStats.requestStarted === true){
      return true;
    }

    this.everhourStats.requestStarted = true;

    const oEverhour = new Everhour(apikey,this.date);
    const tasks = await oEverhour.fetchUserTasks();

    if(tasks.error){
      
      this.everhourStats.requestFinish = true;
      return false;

    }

    tasks.forEach((task)=>{
      this.everhourStats.value += task.time
    });

    this.everhourStats.requestFinish = true;

    return true;

  }

  async setUserData(secret){

    if(this.userStats.requestStarted === true){
      return true;
    }

    this.userStats.requestStarted = true;

    const url = `${window.location.protocol}//${window.location.hostname}:5001/user/${secret}`;

    const res = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
		});

    const userData = await res.json();
    
    this.userStats.requestFinish = true;
    
    if(userData.error){
      return false;
    }

    this.userStats.value = userData;

    return true;

  }
  
  async componentDidMount() {

    const secret = localStorage.getItem("ef_secret");

    if(secret == null){

      this.setState({isLoaded: false});

      return ;
    }

    await this.setUserData(secret);
    
    const bEverhour = await this.setEverhour(this.userStats.value?.everhour?.apikey);

    if(bEverhour === false && this.userStats.value != null){

        let oState = {isLoaded: false}
  
        if(this.userStats.value != null){
          oState['user']= {
            savedData: this.userStats.value
          }

           this.setState(oState);
        }

      return;
    }

    Days.daysoff = this.userStats.value?.daysoff;

    const oDays = new Days(this.date);

    this.days = oDays.getDays();

    const oState = this.setData();

    this.setState(oState);
    
  }

  changedData(data){

    if(data.name != null){

      this.setState({
        user: {
          ...this.state.user,
          savedData: {
            ...this.state.user.savedData,
            value: {
              ...this.state.user.savedData.value,
              name: data.name
            }
          }
        }
      });
    }

    if(data.daysoff != null){

      let daysoff = 0;
      let daysoffList = [];

      if(data.daysoff?.[this.date.getMonth()+1]?.length){

        const date = new Date();
        
        
        data.daysoff?.[this.date.getMonth()+1].forEach(day =>{

          date.setDate(day);

          if(!Days.isWeekendDay(date.getDay())){
            daysoff++;
            daysoffList.push(day);
          }

        })
      }

      const efficiency = Math.round(((this.state.time.everhour+this.state.time.freedays+(daysoff*8)) * 100 ) / this.state.time.workHours);

      const freedaysToday = this.state.freedays.reduce((index,day) =>{
      
        if(this.date.getDate() >= day){
          return index+1;
        }

        return index;

      },0);
      const daysoffToday = daysoffList.reduce((index,day) =>{
      
        if(this.date.getDate() >= day){
          return index+1;
        }

        return index;

      },0);

      const efficiencyToday = Math.round(((this.state.time.everhour+(freedaysToday*8)+(daysoffToday*8)) * 100 ) / this.state.time.workedHours);

      this.setState({
        user: {
          ...this.state.user,
          savedData: {
            ...this.state.user.savedData,
            value: {
              ...this.state.user.savedData.value,
              daysoff: data.daysoff
            }
          }
        },
        time:{
          ...this.state.time,
          daysoff: daysoff*8
        },
        efficiency: efficiency,
        efficiencyToday: efficiencyToday,
        daysoff: daysoffList
      });

    }

    if(data.invoice != null){
      this.setState({
        user: {
          ...this.state.user,
          savedData: {
            ...this.state.user.savedData,
            value: {
              ...this.state.user.savedData.value,
              invoice: {
                ...this.state.user.savedData.value.invoice,
                general: data.invoice.general, 
                buyer: data.invoice.buyer
              }
            }
          }
        }
      });
    }
    
  }

  render() {

    console.log(2,'Apps',this.state)
    return (

        <>

          {/*           
            {!this.everhourStats.finish && 
            <h1 className="loading text-center green">Getting data from Everhour api</h1>
            } 
          */}


          { this.state.isLoaded && 
              <Display data={this.state} changedData={this.changedData}/>
          }
          
          { !this.state.isLoaded &&
               <UserData data={this.userStats.value}/>
          }

        </>
      

    )
  }
}

export default App;
