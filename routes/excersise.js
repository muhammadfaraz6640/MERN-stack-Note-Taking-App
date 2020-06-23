const router = require('express').Router();  //Routing refers to how an application’s endpoints (URIs) respond to client requests
let Exercise = require('../models/Excersise.model');  //importing excersise class record

router.route('/').get((req, res) => {   //here get method is called and / means that url/ then work required functionality
  Exercise.find()    //find is the method of mongodb which finds the entire table
    .then(exercises => res.json(exercises))  //convert then in json
    .catch(err => res.status(400).json('Error: ' + err));  //if then will not work then catch will run the error message
});

router.route('/add').post((req, res) => {    //here if you type the address with /add then add the user with post request
  const username = req.body.username;
  const description = req.body.description;         //these are the attributes passed
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()  //save method save the entire record
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)                //get by id
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {           //delete by id
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {                             //update by id
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))      //then save after updating
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;