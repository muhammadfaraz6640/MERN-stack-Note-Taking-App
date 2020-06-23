import React, { Component } from 'react';
import axios from 'axios';
export default class CreateUser extends Component {
    //link is router element to link to the desired component to display

    constructor(props){
        super(props);

        this.state = {
            username : ''
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeUsername(e) {    //function which set the state to the value entered in textbox which is target
        this.setState({
          username: e.target.value
        })
      }

      onSubmit(e) {         //this function runs on form submit event
        e.preventDefault();                     //prevent defualt acts
    
        const user = {                   //this contains all the variables with the desired and updated values
          username: this.state.username,          
        }
    //The bind() function creates a new bound function, which is an exotic function object
        console.log(user);
         
        
        axios.post('http://localhost:5000/users/add', user)  //its the API from Backend and one mor thing api can be tested through postman software or insomnia
        .then(res => console.log(res.data));
      }
    render(){
        return(
            <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>             
              <div className="form-group"> 
                <label>username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    />
              </div>              
              <div className="form-group">
                <input type="submit" value="Create New User" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}