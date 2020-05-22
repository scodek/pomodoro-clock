import React from 'react';

class ButtonPanel extends React.Component{

    constructor(props){
        super(props);
        this.timeStart = this.timeStart.bind(this);
        this.timeStop = this.timeStop.bind(this);
        this.timeReload = this.timeReload.bind(this);
    }

    timeStart(){
        this.props.setStart(1);
    }

    timeStop(){
        this.props.setStart(0);
    }

    timeReload(){
        this.props.setStart(100);
        this.props.setStart(0);
    }


    
    render(){
        return(
            
            <div className="ui buttons button-panel">
                <button className="ui button"><i className="pause icon" onClick={this.timeStop}></i></button>
                <button className="ui button"><i className="play icon" onClick={this.timeStart}></i></button>
                <button className="ui button"><i className="redo icon" onClick={this.timeReload}></i></button>
            </div>
            
        );
    }
}

export default ButtonPanel;