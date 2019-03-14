import React, { Component} from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import {socket} from "../index";
import {activeIcon, deactiveIcon} from './Icons'

class LatLngSender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lng: '',
      activated: false,
      message: ''
    };
    this.changeMarker = this.changeMarker.bind(this);
    this.sendLatLng = this.sendLatLng.bind(this);

    this.props.socket.on('changeMarkerColor', (data) => {
        this.setState({
          activated: true,
          message: 'Your location is accepted.'
        })
    })

    this.props.socket.on('ignore', (data) => {
        this.setState({message: 'Your location is ignored. Choose new location.'})
    })
  }

  changeMarker(e) {
    this.setState({activated: false})
    document.getElementById('lat').innerHTML = e.latlng.lat;
    document.getElementById('lng').innerHTML = e.latlng.lng;
    this.setState(e.latlng)
  }

  sendLatLng(){
    const location = {
      lat: this.state.lat,
      lng: this.state.lng
    }
    socket.emit("handleLatLng", location);
    this.setState({message: 'Wait ...'})
  }

  render() {
    const marker = (
      <Marker position={this.state} icon={this.state.activated? activeIcon: deactiveIcon}>
        <Popup>
          <span>{"Your Location is: {lat: " + this.state.lat + ", lng: " + this.state.lng + "}"}</span>
        </Popup>
      </Marker>
    )

    return (
      <div className="container">
        <div className='row'>
          <Map center={[40.476, 44.746]} onClick={this.changeMarker} zoom={8}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
            {marker}
          </Map>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <h3>lat: <span id='lat'></span></h3>
            <h3>lng: <span id='lng'></span></h3>
          </div>
          <div className='col-md-6'>
            {
              this.state.lat !== '' && this.state.lng !== '' &&
                <button type="button" className="btn btn-dark" onClick={this.sendLatLng}>
                  {"Send Location"}
                </button>
            }
          </div>
        </div>
        <br/>
        <h5 style={{textAlign:'center'}}>{this.state.message}</h5>
      </div>
    );
  }
}

export default LatLngSender;
