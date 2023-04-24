import React, { Component } from 'react'
import './FingerprintValidation.css'
import { FingerprintOption } from '../Index';

class FingerprintValidation extends Component {
    constructor(props){
        super(props);
        const { open,setResult, onClose } = props;
        this.state = {
            fingerprintCheck : false,
        }
    }

    handleYesClick() {
        //  g("You2");
        const {setResult, onClose} = this.props;
        setResult(true);
        onClose();
      }
    
    handleNoClick() {
        //  g("You1");
        const {setResult, onClose} = this.props;
        setResult(false);
        onClose();
      }

  render() {
    const {open} = this.props;
    if (!open){
        return null;
    }
    

    return (
        <div className='modalBackground_validation'>
            <div
            className='modalContainer_validation'
            onClick={(e) => {
                e.stopPropagation();
            }}
            >
                <div className='title_validation'>
                    MAKE A TEST CASE
                </div>
                <div className='content_validation'>
                    Do you want fingerprint to accept?
                </div>
                <div className='footer_validation'>

                <button onClick={this.handleNoClick.bind(this)} className='btn btn-danger'>No</button>
                <button onClick={this.handleYesClick.bind(this)} className='btn btn-success'>Yes</button>
                
                </div>
            </div>
        </div>
    )
}
  
}

export default FingerprintValidation
