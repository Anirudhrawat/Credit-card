import React, { Component } from 'react'
import {Starter, Loading, MainPage} from './components/Index';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isPopup: false,
      Name: "",
      Phone: "",
      Balance: "",
      Withdrawn: "",
      loading: false,
      insufficientBalance: null,
    }
  }
  handleChildChange = () => {
    this.setState({ isPopup: true });
  }

  handleChildStateChange = (childState) => {
    this.setState({ 
      loading: true
    });

    this.setState({
      Name : childState.Name,
      Phone: childState.Phone,
      Balance: childState.Balance,
      Withdrawn: childState.withdrawn
      },()=>{
        this.setState({ 
          loading: false, // set loading to false in the setState callback function
          insufficientBalance: this.state.Withdrawn > this.state.Balance? true:false
        });
      });
  }

  sendSMS = (data) => {    
    console.log("You are here" + data)
    const user = {
      Name: this.state.Name,
      Phone: this.state.Phone,
      Balance: this.state.Balance,
      Withdrawn: this.state.Withdrawn,
      InsufficientBalance : this.state.insufficientBalance
    }
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => console.log(response.json()))
    .then(data => console.log(data))
    .catch(error => console.error(error));  
  }

  render() {
    if(!this.state.isPopup){
      return (
      <>
        {this.state.loading && <Loading/>}
        <Starter onChildChange={this.handleChildChange} onStateChange={this.handleChildStateChange}/>
        <MainPage insufficientBalance={this.state.insufficientBalance} sendSMS = {this.sendSMS}/>
      </>
      );
    }
    else {
      return <><MainPage insufficientBalance={this.state.insufficientBalance}  sendSMS = {this.sendSMS}/></>;
    }
  }
}

export default App
