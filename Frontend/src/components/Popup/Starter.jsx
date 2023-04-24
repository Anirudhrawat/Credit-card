import React, { Component } from 'react'
import 'reactjs-popup/dist/index.css';
import './Starter.css'

class Starter extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      Name: "",
      Phone: "",
      Balance: "",
      withdrawn: "",
      isValidPhone: true,
      isValidBalance: true,
      isValidwithdrawn: true,
      disableButton: true,
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.Name !== this.state.Name ||
      prevState.Phone !== this.state.Phone ||
      prevState.Balance !== this.state.Balance ||
      prevState.withdrawn !== this.state.withdrawn ||
      prevState.isValidPhone !== this.state.isValidPhone ||
      prevState.isValidBalance !== this.state.isValidBalance ||
      prevState.isValidwithdrawn !== this.state.isValidwithdrawn
    ) {
      this.setState({
        disableButton:
          !this.state.isValidPhone ||
          !this.state.isValidBalance ||
          !this.state.isValidwithdrawn ||
          this.state.Name.trim() === '' ||
          this.state.Phone.trim() === '' ||
          this.state.Balance.trim() === '' ||
          this.state.withdrawn.trim() === '',
      });
    }
  }

  handleClick = () => {
    const someData = this.state;
    this.props.onChildChange();
    this.props.onStateChange(someData);
  }


  handleNameChange = (event) => {
    this.setState({
      Name: event.target.value
    })
  }

  handlePhoneChange = (event) => {
    const pattern = /^\d{10}$/;
    this.setState({
      Phone: event.target.value,
      isValidPhone: pattern.test(event.target.value)
    })
  }

  handleBalanceChange = (event) => {
    this.setState({
      Balance: event.target.value,
      isValidBalance: !isNaN(event.target.value)
    })
  }

  handleWithdrawnChange = (event) => {
    this.setState({
      withdrawn: event.target.value,
      isValidwithdrawn: !isNaN(event.target.value)
    })
  }

  render() {
    return (
      <div className='modalBackground_starter'>
        <div className='modalContainer_starter'>
          <div className='title_starter'>MAKE A TEST CASE</div>
          <div className='body_starter'>
            <form>
              <div className='row_starter form-group'>
              <label>Name:</label>
              <input type='text' className='form-control' value = {this.state.Name} onChange={(event)=>this.handleNameChange(event)}/>
              </div>
              <div className='row_starter'>
              <label>Phone:</label>
              <input type='text' className='form-control' value = {this.state.Phone} onChange={(event)=>this.handlePhoneChange(event)}/>
              </div>
              <div className='error-row_starter'>
              {!this.state.isValidPhone && (
                <span style={{ color: "red" }}>Please enter a valid input</span>
              )}
              </div>
              
              <div className='row_starter'>
              <label>Balance:</label>
              <span>$</span>
              <input type='text' className='form-control dollar-sign' value = {this.state.Balance} onChange={(event)=>this.handleBalanceChange(event)}/>
              </div>
              <div className='error-row_starter'>
                {!this.state.isValidBalance && (
                <span style={{ color: "red" }}>Please enter a valid input</span>
                )}
                </div>
              
              <div className='row_starter'>
              <label>Withdrawn:</label>
              <span>$</span>
              <input type='text' className='form-control dollar-sign_starter' value = {this.state.withdrawn} onChange={(event)=>this.handleWithdrawnChange(event)}/>
              </div>
              <div className='error-row_starter'>
              {(!this.state.isValidwithdrawn) && (
                <span style={{ color: "red" }}>Please enter a valid input</span>
              )}
              </div>
             
            </form>
            <div className="info_starter">
            <p><strong>Note: </strong>Here we assume you have inserted the credit card <p className='p-inner_starter'>in card reader.</p></p>
            </div>
          </div>
          <div className='footer_starter'>
            <button disabled={this.state.disableButton} onClick={this.handleClick} className={this.state.disableButton ?'btn btn-secondary': 'btn btn-success'}>Submit</button>
          </div>
        </div>
      </div>
      );
    }
  }

export default Starter
