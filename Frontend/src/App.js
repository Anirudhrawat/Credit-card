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
      loading: false
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
          loading: false // set loading to false in the setState callback function
        });
      });
  }
  render() {
    if(!this.state.isPopup){
      return (
      <>
        {this.state.loading && <Loading/>}
        <Starter onChildChange={this.handleChildChange} onStateChange={this.handleChildStateChange}/>
        <MainPage Name={this.state.Name} Phone={this.state.Phone} Balance={this.state.Balance} Withdrawn={this.state.Withdrawn}/>
      </>
      );
    }
    else {
      return <><MainPage/></>;
    }
  }
}

export default App
