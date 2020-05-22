import React from 'react';

class Session extends React.Component{
    render(){
        return(

       <div className="session-div">
           <div className="display-str">{this.props.displaystr}</div>
           <div className="display-screen">{this.props.content}</div>
       </div>

        );
    }
}
export default Session;