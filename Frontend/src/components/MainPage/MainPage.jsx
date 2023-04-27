import React, { Component } from 'react'
import './MainPage.css';
import ATMimg from '../../Photos/atmpin.png';
import Fingerprintimg from '../../Photos/fingerprint.svg';
import {FingerprintOption, FingerprintValidation, ATM} from '../Index';


class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      //Fingerprint
      Fingerprint_disable: false,
      fingerprintTestCase: false,
      fingerprintCheck : false,
      fingerprintResult: null,
      openFingerprintModal: false,
      //PIN
      openATMModal: false,
      PINAttempts: 3,
      //other
      errorMessage: "",
      paymentApproveMessage: "",
      paymentApprove: false,
      error: false,
      
    };
  }

  // -------------------------------------------------------------
  // Fingerprint
  fingerprintModalOpen = () => {
    this.setState({
      fingerprintCheck: true
    });
  }

  fingerprintModalClose = () => {
    if(this.state.fingerprintResult){
      if(!this.props.insufficientBalance)
      {
          this.setState({
            paymentApproveMessage: "Transaction approved",
            fingerprintResult: null,
            paymentApprove: true
          },()=>{
          console.log("Its all chill1"+this.props);
          this.props.sendSMS(true);
        });
      }
      else{
        this.setState({
            paymentApproveMessage: "Insufficient Balance",
            fingerprintResult: null,
            paymentApprove: true
          },()=>{
          console.log("Its all chill1"+this.props);
          this.props.sendSMS(true);
        });
      }
    }
    if(this.state.fingerprintResult==false) {
      this.setState({
        errorMessage: "Fingerprint didn't approve. Please use enter pin method.",
        fingerprintResult: null,
        Fingerprint_disable: true
      });
      }
    }

  setResultFingerprint = (data) => {
    this.setState({
        fingerprintResult: data
    });
} 

  close = () => {
    //  g("It should close");
    this.setState({
      fingerprintCheck: false
    });
  }
//   -------------------------------------------------------------
// ATM
PINModalOpen = () => {
  this.setState({
    openATMModal: true,
  });
}

PINModalClose = () => {
  this.setState({
    openATMModal: false,
  });
  }

setResultATM = (data) =>{
  if(data) {
    if(!this.props.insufficientBalance)
    {
        this.setState({
          paymentApprove: true,
          paymentApproveMessage: "Transaction approved",
          errorMessage: "" ,
        });
        const {sendSMS} = this.props;
        sendSMS(true);
    }
    else{
      this.setState({
          paymentApprove: true,
          paymentApproveMessage: "Insufficient Balance",
          errorMessage: "" ,
        });
        const {sendSMS} = this.props;
        sendSMS(true);
    }
  }
  if(!data) {
    this.setState(prev => ({
      PINAttempts: prev.PINAttempts - 1,
    }),()=>{
      if(this.state.PINAttempts !=0)
      this.setState({
        errorMessage: "Incorrect pin. You have " + (this.state.PINAttempts) + " more attempts." ,
      });
      if(this.state.PINAttempts ==0)
      this.setState({
        errorMessage: "Multiple attempts taken. Please contact bank to unblock your card." ,
      });
    });
  }
}
 

  render() {
    return (
    <div className='MainPage'> 
        <div className='title_main'>
            Easy Payment
        </div>
        <div className="error_display" style={{height: this.state.errorMessage ? '30px' : '30px'}}>{this.state.errorMessage}</div>
        
          {this.state.paymentApprove ? (
            <div className='body_approve'>
            {this.state.paymentApproveMessage}
            </div>
          ):(
        <div className='body_main'>
        <button disabled={this.state.PINAttempts<=0} onClick={this.PINModalOpen}><img src={ATMimg} alt="ATMPIN image" />Enter PIN</button>
        <button disabled={(this.state.Fingerprint_disable) || (this.state.PINAttempts <= 0)} onClick={this.fingerprintModalOpen}><img src={Fingerprintimg} alt="Fingerprint image"/>Fingerprint</button>
        <FingerprintValidation open={this.state.fingerprintCheck} setResult={this.setResultFingerprint} onClose = {this.close}/>
        <FingerprintOption open = {this.state.fingerprintResult === null || typeof this.state.fingerprintResult === 'undefined'}  onClose={this.fingerprintModalClose}/>
        <ATM open={this.state.openATMModal} onClose={this.PINModalClose} setResult={this.setResultATM}/>
        </div>
          )}
    </div>
    );
  }
}

export default MainPage
