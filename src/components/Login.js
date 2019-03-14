import React, { Component} from 'react'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({name: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.addUsername(this.state.name);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={this.handleChange} />
        </div>
        <button type="submit" value='Submit' className="btn btn-dark">Login</button>
      </form>
    );
  }
}

export default Login;
