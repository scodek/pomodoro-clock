import React from 'react';

class BreakLength extends React.Component{
//console.dir(props);
constructor(props){

    super(props);

    this.onDecrementButtonClick = this.onDecrementButtonClick.bind(this);
    this.onIncrementButtonClick = this.onIncrementButtonClick.bind(this);
}

onDecrementButtonClick(){
    console.log("right is clicked : " + this.props.break);
    //this.props.break = this.props.break + 1;
    let val = this.props.break;
    val--;
    if(val <1)
    val = 1;
    this.props.getBreakLengthVal(val);
    
}

onIncrementButtonClick(){
    console.log("left is clicked");
    //this.props.break = this.props.break + 1;
    let val = this.props.break;
    val++;
    if(val > 60)
    val = 60;
    this.props.getBreakLengthVal(val);
}

render(){

    let divStyle = {
        marginBottom:'70px',
        paddingTop:0
    };

    return (
        <div className="break-length-div">
        <h6>Break Length</h6>
    
        <div className="break-button-panel">
        <button className="ui icon button" onClick={this.onIncrementButtonClick}>
            <i className="plus icon"></i>
        </button>
        <a className="ui large label">
          {this.props.break}
    </a>
        <button className="ui icon button" onClick={this.onDecrementButtonClick}>
            <i className="minus icon"></i>
        </button>
        
        </div>
        </div>
        
        );

}


}



export default BreakLength;