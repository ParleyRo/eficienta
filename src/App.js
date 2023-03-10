import {Component} from 'react';

import Everhour from './modules/Everhour.js';
import Days from './modules/Days.js';

import Display from './components/Display.js';
import LoginRegister from './components/LoginRegister.js';

import './assets/css/app.css';
import './assets/css/animations.css';

const MonthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
class App extends Component {

  constructor(){
    
    super();

    const queryParams = new URLSearchParams(window.location.search);
    const month = queryParams.get("month") || 0;
    
    this.monthPosition = Math.min(0,parseInt(month));

    this.date  = new Date();

    if(this.monthPosition < 0 ){

      this.date.setDate(15);
		  this.date.setMonth(this.date.getMonth()+this.monthPosition+1);
      this.date.setDate(0);
      
    }

    this.state = {
      user:{
        name: null,
        invoice:{},
        daysoff:{},
        invoices:{},
        isEverhourOn: false
      },
      time: {
        everhour: null,
        freedays: 0,
        daysoff: 0,
        workHours: 0,
        missingHours: 0
      },
      monthInfo:{
        position: this.monthPosition,
        name: MonthNames[this.date.getMonth()],
        prevmonth: MonthNames[(this.date.getMonth()+12-1)%12],
        nextmonth: this.monthPosition < 0 ? MonthNames[(this.date.getMonth()+12+1)%12] : false,
        day: this.date.getDate(),
        year: this.date.getFullYear()
      },
      efficiency:{

      },
      isLoaded: true
    };

    this.everhourStats = {
      requestStarted: false,
      requestFinish: false,
      value: 0,
      isOn: false
    }

    this.userStats = {
      requestStarted: false,
      requestFinish: false,
      value: {}
    }

    this.changedData= this.changedData.bind(this);

    this.stateList = [];
  }

  setData(){

    if(this.userStats.requestFinish === false){
      return;
    }

    if(this.everhourStats.requestFinish === false){
      return;
    }

    let oState = {...this.state};

    oState.isLoaded = true;

    oState.user = {...oState.user,...this.userStats.value};

    oState.time.everhour = Math.round(this.everhourStats.value / 3600);
    
    oState.time.freedays = this.days.freedays*8;
    oState.monthInfo.freedays = [...this.days.freedaysList];
    
    oState.monthInfo.workDays = this.days.monthDays - this.days.weekendDays;
    oState.monthInfo.workedDays = this.days.workedDays;

    oState.monthInfo.weekendDays = this.days.weekendDays;
    oState.monthInfo.monthDays = this.days.monthDays;
    
    oState.time.daysoff = this.days.daysoff*8;

    oState.time.workHours = oState.monthInfo.workDays*8;
    oState.time.workedHours = oState.monthInfo.workedDays*8;

    oState.efficiency.total = Math.round(((oState.time.everhour+oState.time.freedays+oState.time.daysoff) * 100 ) / oState.time.workHours);

    oState.user.isEverhourOn = this.everhourStats.isOn;

    const freedaysToday = oState.monthInfo.freedays.reduce((index,day) =>{
      
      if(this.date.getDate() >= day){
        return index+1;
      }

      return index;

    },0);

    const daysoffToday = (oState.user.daysoff?.[this.date.getMonth()+1]||[]).reduce((index,day) =>{
      
      if(this.date.getDate() >= day){
        return index+1;
      }

      return index;

    },0);

    oState.efficiency.current = Math.round(((oState.time.everhour+(freedaysToday*8)+(daysoffToday*8)) * 100 ) / oState.time.workedHours);
    oState.time.missingHours = oState.time.workedHours - (freedaysToday*8) - (oState.time.everhour + (daysoffToday*8));
    
    return oState;
  }

  async setEverhour(apikey){

    if(apikey == null){
      
      this.everhourStats.requestStarted = true;
      this.everhourStats.requestFinish = true;
      this.everhourStats.value = 0;
      
      return false;
    }
    
    if(this.everhourStats.requestStarted === true){
      return true;
    }

    this.everhourStats.requestStarted = true;

    const oEverhour = new Everhour(apikey,this.date);
    const tasks = await oEverhour.fetchUserTasks();
    const currentTime = this.state.monthInfo.position === 0 ? await oEverhour.getCurrentTime() : {};

    if(tasks.error){
      
      this.everhourStats.requestFinish = true;
      this.everhourStats.value = 0;

      return false;
    }

    tasks.forEach((task)=>{
      this.everhourStats.value += task.time
    });

    if(currentTime.duration != null){
      this.everhourStats.value += currentTime.duration;
      this.everhourStats.isOn = true;
    }

    this.everhourStats.requestFinish = true;

    return true;

  }

  async setUserData(secret){

    if(this.userStats.requestStarted === true){
      return true;
    }

    this.userStats.requestStarted = true;

    const url = `${window.location.protocol}//${window.location.hostname}:3001/user/${secret}`;

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
    
    const $this = this;

    if(this.userStats.requestStarted === true){
      return;
    }
      new Promise(async function(resolve, reject) {

          await $this.setUserData(secret);
          
          resolve();
      
      }).then(async function(result) {

          await $this.setEverhour($this.userStats.value.everhour?.apikey);
          
      }).then(function(result) {
      
          Days.daysoff = $this.userStats.value.daysoff;

          const oDays = new Days($this.date);

          $this.days = oDays.getDays();

          const oState = $this.setData();

          $this.setState(oState);

      }).catch(err => {

          $this.setState({isLoaded: true});

          console.error(err)
      
      });
    
    
    
  }

  async changedData(data){

    if(data.invoicesAdd != null){
     
      let invoices = {...this.state.user.invoices}
     
      invoices[data.invoicesAdd.number] = data.invoicesAdd.invoice;

      this.setState({
        ...this.state.user,
        invoices
      });

      delete data.invoicesAdd
    
    }

    if(data.invoicesDelete != null){
      
      let invoices = {...this.state.user.invoices}

      delete invoices[data.invoicesDelete.number];

      this.setState({
        ...this.state.user,
        invoices
      });    

      delete data.invoicesDelete;
    }

    if(data.everhour != null){

      const efficiencyTotal = Math.round(((parseInt(data.everhour)+this.state.time.freedays+this.state.time.daysoff) * 100 ) / this.state.time.workHours);

      const freedaysCurrent = this.state.monthInfo.freedays.reduce((index,day) =>{
      
        if(this.date.getDate() >= day){
          return index+1;
        }

        return index;

      },0);

      const daysoffCurrent = (this.state.user.daysoff?.[this.date.getMonth()+1]||[]).reduce((index,day) =>{
      
        if(this.date.getDate() >= day){
          return index+1;
        }

        return index;

      },0);

      const efficiencyCurrent = Math.round(((parseInt(data.everhour)+(freedaysCurrent*8)+(daysoffCurrent*8)) * 100 ) / this.state.time.workedHours);

      this.setState({
        time: {
          ...this.state.time,
          everhour: parseInt(data.everhour),
          missingHours: this.state.time.workedHours - (freedaysCurrent*8) - (parseInt(data.everhour) + (daysoffCurrent*8) )
        },
        efficiency: {
          total: efficiencyTotal,
          current: efficiencyCurrent
        }
      })
      
      delete data.everhour;
    }

    if(data.name != null){

      this.setState({
        user: {
          ...this.state.user,
          name: data.name
        }
      });

      delete data.name;
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

      const efficiencyTotal = Math.round(((this.state.time.everhour+this.state.time.freedays+(daysoff*8)) * 100 ) / this.state.time.workHours);

      const freedaysCurrent = this.state.monthInfo.freedays.reduce((index,day) =>{
      
        if(this.date.getDate() >= day){
          return index+1;
        }

        return index;

      },0);

      const daysoffCurrent = daysoffList.reduce((index,day) =>{
      
        if(this.date.getDate() >= day){
          return index+1;
        }

        return index;

      },0);

      const efficiencyCurrent = Math.round(((this.state.time.everhour+(freedaysCurrent*8)+(daysoffCurrent*8)) * 100 ) / this.state.time.workedHours);

      this.setState({
        user: {
          ...this.state.user,
          daysoff: data.daysoff
        },
        time:{
          ...this.state.time,
          daysoff: daysoff*8,
          missingHours: this.state.time.workedHours - (freedaysCurrent*8) - (this.state.time.everhour + (daysoffCurrent*8) )
        },
        efficiency: {
          total: efficiencyTotal,
          current: efficiencyCurrent
        }
      });

      delete data.daysoff;
    }

    if(data.invoice != null){
      this.setState({
        user: {
          ...this.state.user,
          invoice: {
            ...this.state.user.invoice,
            general: data.invoice.general, 
            buyer: data.invoice.buyer
          }
        }
      });
      
      delete data.invoice;
    }

    if(data.stopEverhour != null){

      await Everhour.stopTimer();

      this.setState({
        user: {
          ...this.state.user,
          isEverhourOn: false
        }
      });

      delete data.stopEverhour;
    }
    
    if(Object.entries(data).length){
      throw new Error(`Missing data change: ${Object.entries(data).toString()}`);
    }

  }

  render() {
    //console.log(1,'Apps Rendered')
    return (

        <>

          { this.state.isLoaded && 
              <Display data={this.state} changedData={this.changedData}/>
          }
          
          { !this.state.isLoaded &&
               <LoginRegister data={this.userStats.value}/>
          }

        </>
      

    )
  }
}

export default App;
