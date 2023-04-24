import React, { Component } from 'react'
import FingerprintScan from '../../Photos/fingerprint_scan.gif'
import { FingerprintValidation } from '../Index';
import './fingerprintOption.css'
class FingerprintOption extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: 0
    };

    
    // this.state = {
    //     // fingerprintCheck : true,
    //     // fingerprintResult: null
    // };
}

componentDidMount(){
  this.timerId = setInterval(
    () =>this.tick(),
    1000
  );
}

componentWillUnmount() {
  clearInterval(this.timerID);
}

tick() {
  this.setState({
    time: this.state.time + 1
  }, () => {
    if(this.state.time == 10){
      //  g("% seconds complere");
      const {onClose} = this.props;
      onClose();
    }
  });
}

  // setResultFingerprint = (data) => {
  //     this.setState({
  //         fingerprintResult: data
  //     })
  //   }

  //   close = () => {
  //      g("It should close");
  //     this.setState({
  //       fingerprintCheck: false
  //     });
  //   }
    render() {
        //  g("You are here");
        const { open} = this.props;
    
        if (open) {
          return null;
        }


        return (
          <>
          <div className='overlay-fingerprintOption'>
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className='modalContainer-fingerprintOption'
            >
              <div className='content-fingerprintOption'>
                <img src={FingerprintScan} alt='Fingerprint Scan'  />
              </div>
            </div>
          </div>
          </>
        );
      }
          
}

export default FingerprintOption
