import React, { Component } from 'react'
import './ATM.css'

class ATM extends Component {
  constructor(props){
    super(props);
    this.state ={
      PIN: "0000",
      enterPIN:"",
      correctPin: null,
      enterDigit : 4,
      shownPIN : "----",
    }
  }

 digitSelected = (data) => {
  //  g(data);
    this.setState(prevState =>({
      enterPIN : prevState.enterPIN + data,
      enterDigit: prevState.enterDigit - 1 
    }), ()=>{
      if(this.state.enterDigit==3)
      {
        this.setState({
          shownPIN: "*---"
        });
      }

      if(this.state.enterDigit==2)
      {
        this.setState({
          shownPIN: "**--"
        });
      }

      if(this.state.enterDigit==1)
      {
        this.setState({
          shownPIN: "***-"
        });
      }

      if(this.state.enterDigit==0)
      {
        this.setState({
          shownPIN: "***-"
        });
      }

      if(this.state.enterDigit==0)
      {
        const {setResult,onClose} = this.props;
        if(this.state.PIN === this.state.enterPIN) {
          setResult(true);
        }
        else{
          setResult(false);
        }
        this.setState({
          shownPIN: "----",
          enterPIN:"",
          enterDigit : 4,
        });
        onClose();
      }
    });
  } 

  deleteDigit = () => {
    if (this.state.enterPIN.length >= 1){
      this.setState(prevState => ({
        enterPIN: prevState.enterPIN.slice(0,-1),
        enterDigit: prevState.enterDigit+1
      }), ()=>{
        if(this.state.enterPIN.length==3)
      {
        this.setState({
          shownPIN: "***-"
        });
      }

      if(this.state.enterPIN.length==2)
      {
        this.setState({
          shownPIN: "**--"
        });
      }

      if(this.state.enterPIN.length==1)
      {
        this.setState({
          shownPIN: "*---"
        });
      }

      if(this.state.enterPIN.length==0)
      {
        this.setState({
          shownPIN: "----"
        });
      }
      });

    }
    else{
      return null;
    }
  }

  render() {
    const { open,onClose} = this.props;
    
        if (!open) {
          return null;
        }

    return (
      <div className='containerBackground-ATM'>
        <div className='container-ATM'>
            <div className='outputscreen-ATM'>
              {this.state.shownPIN}
            </div>
            <div className='digits-ATM'>
                <div className="board-row">
                  <button onClick={()=>this.digitSelected(1)} className='col-md-3 button-atm'>1</button>
                  <button onClick={()=>this.digitSelected(2)} className='col-md-3 button-atm'>2</button>
                  <button onClick={()=>this.digitSelected(3)} className='col-md-3 button-atm'>3</button>
                </div>
                <div className="board-row">
                  <button onClick={()=>this.digitSelected(4)} className='col-md-3 button-atm'>4</button>
                  <button onClick={()=>this.digitSelected(5)} className='col-md-3 button-atm'>5</button>
                  <button onClick={()=>this.digitSelected(6)} className='col-md-3 button-atm'>6</button>
                </div>
                <div className="board-row">
                  <button onClick={()=>this.digitSelected(7)} className='col-md-3 button-atm'>7</button>
                  <button onClick={()=>this.digitSelected(8)} className='col-md-3 button-atm'>8</button>
                  <button onClick={()=>this.digitSelected(9)} className='col-md-3 button-atm'>9</button>
                </div>
                <div className="board-row">
                  <button onClick={onClose} className='col-md-3 button-atm'>Back</button>
                  <button onClick={()=>this.digitSelected(0)} className='col-md-3 button-atm'>0</button>
                  <button onClick={this.deleteDigit} className='col-md-3 button-atm'>Delete</button>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default ATM
