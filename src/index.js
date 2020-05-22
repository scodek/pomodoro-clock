import React from 'react';
import ReactDOM from 'react-dom';
import BreakLength from './BreakLength';
import SessionLength from './SessionLength';
import Session from './Session';
import ButtonPanel from './ButtonPanel';

class App extends React.Component{
    constructor(props){
       super(props);

       this.state = {
           fixedSessionTime:25,
           fixedBreakTime:5,
           defaultBreakTimeLength : 5,
           defaultSessionTimeLength : 25,
           defaultSessionContent : '25:00',
           defaultBreakSessionContent : '5:00',
           sessionTimeLength : 25,
           sessionContent : '25:00',
           breakTimeLength : 5,
           breakContent : '5',
           sessionRunning : 1,
           breakRunning : 0
       };

       this.receiveBreakVal = this.receiveBreakVal.bind(this);
       this.receiveSessionLengthVal = this.receiveSessionLengthVal.bind(this);
       //this.receiveSessionContent = this.receiveSessionContent.bind(this);
       this.receiveStart = this.receiveStart.bind(this);
       this.timer = this.timer.bind(this);
       this.breakTimer = this.breakTimer.bind(this);
       this.breakTimerStart = this.breakTimerStart.bind(this);
       this.sessionTimerStart = this.sessionTimerStart.bind(this);
       //this.playBeep = this.playBeep.bind(this);
       //this.countdown = this.countdown.bind(this);
    }

    receiveBreakVal(val){
        
        let content = val + ':' + '00';
        
        this.setState({
            breakTimeLength : val,
            breakContent : content,
            defaultBreakTimeLength : val,
            defaultBreakSessionContent : content
        });
    }

receiveSessionLengthVal(val){
        
        let content = val + ':' + '00';
        this.setState({
            sessionTimeLength : val,
            sessionContent : content,
            defaultSessionTimeLength : val,
            defaultSessionContent : content
        });
}

    /*receiveSessionContent(val){
        this.setState({sessionContent : val});
    }*/

    breakTimer(){

    const timeArr = this.state.breakContent.split(':');
    let currTime = (60*parseInt(timeArr[0]) + parseInt(timeArr[1])) - 1;
    if(currTime === 0){
        clearInterval(this.countdown);
        //this.playBeep();
        this.sessionTimerStart();
        //this.timer();
    }
    
    let sec = parseInt(currTime,10)%60;
    if(sec < 10)
    sec = '0' + sec;
    let min = Math.floor(parseInt(currTime,10)/60);
    currTime = min + ':' + sec;
    this.setState({breakContent: currTime});
}

    timer(){
        const timeArr = this.state.sessionContent.split(':');
        let currTime = (60*parseInt(timeArr[0]) + parseInt(timeArr[1])) - 1;
        //if(currTime === 0){
        if(currTime === 0){
            clearInterval(this.countdown);
            this.breakTimerStart();
        }
    
        let sec = parseInt(currTime,10)%60;
if(sec < 10)
sec = '0' + sec;
let min = Math.floor(parseInt(currTime,10)/60);
currTime = min + ':' + sec;
this.setState({sessionContent: currTime}); 
        //currTime = (60*parseInt(timeArr[0]) + parseInt(timeArr[1])) - 1;

    }

    breakTimerStart(){
        this.setState({
            sessionRunning : 0,
            defaultBreakTimeLength : this.state.defaultBreakTimeLength,
            defaultSessionTimeLength : this.state.defaultSessionTimeLength,
            breakTimeLength : this.state.defaultBreakTimeLength,
            sessionTimeLength : this.state.defaultSessionTimeLength,
            sessionContent : this.state.defaultSessionContent,
            breakContent : this.state.defaultBreakSessionContent  

        },() => {
            this.receiveStart(1, 0)
        });

    }

sessionTimerStart(){
    this.setState({
        sessionRunning : 1,
        defaultBreakTimeLength : this.state.defaultBreakTimeLength,
        defaultSessionTimeLength : this.state.defaultSessionTimeLength,
        breakTimeLength : this.state.defaultBreakTimeLength,
        sessionTimeLength : this.state.defaultSessionTimeLength,
        sessionContent : this.state.defaultSessionContent,
        breakContent : this.state.defaultBreakSessionContent 

    },() => {this.receiveStart(1, 1)});
}

receiveStart(val,sessionRunning){
    if(val === 1){
        if(sessionRunning === 0){
            this.countdown = setInterval(this.breakTimer,1000);
        }else{
            this.countdown = setInterval(this.timer,1000);
        }
        
    }else if(val === 0){
    //stop timer
        clearInterval(this.countdown);
        this.setState({
            defaultBreakTimeLength : this.state.defaultBreakTimeLength,
            defaultSessionTimeLength : this.state.defaultSessionTimeLength,
            breakTimeLength : this.state.defaultBreakTimeLength,
            sessionTimeLength : this.state.defaultSessionTimeLength,
            sessionContent : this.state.defaultSessionContent,
            breakContent : this.state.defaultBreakSessionContent
        });
        
    }else if(val === 100){
        this.setState({
        breakTimeLength : this.state.fixedBreakTime,
        sessionTimeLength : this.state.fixedSessionTime,
        sessionContent : this.state.fixedSessionTime + ':00',
        breakContent : this.state.fixedBreakTime + ':00'
        });
    }
}
        

    render(){
        let displayContent = "";
        let displayStr = "";
        if(this.state.sessionRunning){
            displayContent = this.state.sessionContent;
            displayStr = "Session";
        }else{
            //show breakSession content
            displayContent = this.state.breakContent;
            displayStr = "Break";
        }

return (
    
    <div className="clock-main-div">
       <h1 className="heading">Pomodoro Clock</h1>
        <div className="content-div">
            <BreakLength break={this.state.breakTimeLength} getBreakLengthVal={this.receiveBreakVal}/>
            <SessionLength sessionLengthProp={this.state.sessionTimeLength} getSessionLengthVal={this.receiveSessionLengthVal}/>
            <Session content={displayContent} displaystr = {displayStr}/>
            <ButtonPanel currentTime={this.state.sessionContent} setStart={this.receiveStart}/>
        </div>
    </div>
);

    }
}


ReactDOM.render(<App />, document.getElementById('root'));


