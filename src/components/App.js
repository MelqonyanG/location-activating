import React, { Component} from 'react'
import {socket} from "../index";
import Login from './Login'
import LatLngSender from './LatLngSender'
import ActivateLocation from './ActivateLocation'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }

    this.addUsername = this.addUsername.bind(this);
  }

  addUsername(name){
    if(name === 'admin'){
      socket.emit('saveAdminSid')
    }
    this.setState({username: name});
  }

  render() {
    return (
      <div className="container">
        {
          this.state.username === '' ?(
            <Login addUsername={this.addUsername}/>
          ):(
            this.state.username === 'admin' ?(
              <ActivateLocation socket={this.props.socket} />
            ):(
              <LatLngSender socket={this.props.socket} />
            )
          )
        }
      </div>
    );
  }
}

export default App;
