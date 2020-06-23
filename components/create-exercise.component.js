import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export default class CreateExercise extends Component {
    //link is router element to link to the desired component to display
    constructor(props){
        super(props);

        this.state = {
            username : '',
            description : '',
            duration : 0,
            date : new Date(),
            users : []   //list of users to select
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeUsername(e) {    //function which set the state to the value entered in textbox which is target
        this.setState({
          username: e.target.value
        })
      }
    
      onChangeDescription(e) {  //function which set the state to the value entered in textbox which is target
        this.setState({
          description: e.target.value
        })
      }
    
      onChangeDuration(e) {  //function which set the state to the value entered in textbox which is target
        this.setState({
          duration: e.target.value
        })
      }
      //http://localhost:5000/exercises/add
      componentDidMount(){  //this is the react life cycle function that immediately call when constructor calls
        //   this.setState(
        //       {
        //       users : ['test-user'],   //test data before connecting to backend
        //       username : 'test user'
        //       }
        //   )
        //axios.get(url[, config])
        // axios.delete(url[, config])
        // axios.head(url[, config])
        // axios.options(url[, config])
        // axios.post(url[, data[, config]])
        // axios.put(url[, data[, config]])
        // axios.patch(url[, data[, config]
        axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data.username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      }

      onChangeDate(date) {
        this.setState({           //function which set the state to the value entered in textbox which is target
          date: date
        })
      }
    
      onSubmit(e) {         //this function runs on form submit event
        e.preventDefault();                     //prevent defualt acts
    
        const exercise = {                   //this contains all the variables with the desired and updated values
          username: this.state.username,
          description: this.state.description,
          duration: this.state.duration,
          date: this.state.date
        }
        axios.post('http://localhost:5000/exercises/add', exercise)  //its the API from Backend and one mor thing api can be tested through postman software or insomnia
        .then(res => console.log(res.data));
    //The bind() function creates a new bound function, which is an exotic function object
        console.log(exercise);
    
        // axios.post('http://localhost:5000/exercises/add', exercise)
        //   .then(res => console.log(res.data));
    
        // window.location = '/';   //after creation of the excersise it moves to the home page
      }
    render(){        
        return(
            <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) {
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>
              <div className="form-group">
                <label>Duration (in minutes): </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                    />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
      
              <div className="form-group">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}