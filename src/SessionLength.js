import React from 'react';


class SessionLength extends React.Component{
    //console.dir(props);
    constructor(props){
    
        super(props);
    
        this.onDecrementButtonClick = this.onDecrementButtonClick.bind(this);
        this.onIncrementButtonClick = this.onIncrementButtonClick.bind(this);
    }
    
    onDecrementButtonClick(){
        console.log("right is clicked : " + this.props.sessionLengthProp);
        //this.props.break = this.props.break + 1;
        let val = this.props.sessionLengthProp;
        val--;
        if(val < 1)
        val = 1;
        this.props.getSessionLengthVal(val);
        
    }
    
    onIncrementButtonClick(){
        console.log("left is clicked");
        //this.props.break = this.props.break + 1;
        let val = this.props.sessionLengthProp;
        val++;
        if(val > 60)
        val =60;
        this.props.getSessionLengthVal(val);
    }
    
render(){

    return (

    <div className="session-length-div">
        <h6>Session Length</h6>
        <div className="session-button-panel">
        <button className="ui icon button" onClick={this.onIncrementButtonClick}>
            <i className="plus icon"></i>
        </button>
        <a className="ui large label">
            {this.props.sessionLengthProp}
        </a>
        <button className="ui icon button" onClick={this.onDecrementButtonClick}>
            <i className="minus icon"></i>
        </button>
        </div>

    </div>
        
        );

}


}

export default SessionLength;