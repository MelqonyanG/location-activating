import React, { Component} from 'react'

class ActivateLocation extends Component {
  constructor(props){
    super(props);
    this.state = {
      addresses: []
    }

    this.props.socket.on('activateAddress', (data) => {
        const addresses = this.state.addresses;
        addresses.push(data);
        this.setState({addresses: addresses});
    })

    this.props.socket.on('unhandledLocations', (data) => {
        const new_locations = this.state.addresses.concat(data);
        this.setState({addresses: new_locations})
    })

    this.activateAddress = this.activateAddress.bind(this);
    this.ignoreAddress = this.ignoreAddress.bind(this);
  }

  activateAddress(sid){
    document.getElementById(sid).disabled="disabled";
    this.props.socket.emit('activate', sid);
  }

  ignoreAddress(sid){
    const current_locations = this.state.addresses;
    var new_locations = [];

    for (var i = 0; i < current_locations.length; i++){
      if(current_locations[i].sid !== sid){
        new_locations.push(current_locations[i]);
      }
    }

    this.setState({addresses: new_locations});
    this.props.socket.emit('ignore', sid);
  }

  render() {
    const addresses = this.state.addresses.map((address, idx) =>
      <li key={`address-${idx}`} className="list-group-item">
        <div className='row'>
          <div className='col-md-9'>
            {address['address']}
          </div>
          <div className='col-md-3'>
            <button type="button" className="btn btn-light" id={address['sid']}
                onClick={(addressSid) => this.activateAddress(address['sid'])}>
              Activate
            </button>
            <button type="button" className="btn btn-light" id={address['sid']}
                onClick={(addressSid) => this.ignoreAddress(address['sid'])}>
              Ignore
            </button>
          </div>
        </div>
      </li>
    )
    return (
      <div className="container">
        <ul className="list-group">
          {
            addresses.length > 0 ? addresses : <h1>There is no requests.</h1> 
          }
        </ul>
      </div>
    );
  }
}

export default ActivateLocation;
