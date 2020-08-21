const express = require("express");
const router = express.Router();
const passport = require('passport');
const Event = require("../../models/Event");
// const validateTweetInput = require('../../validation/tweets');
const Comment = require("../../models/Comment");
// require('./passport')(passport);
//
router.get("/test", (req, res) => {
  res.json({ msg: "This is the events route" });
});

router.get("/", (req, res) => {

  Event.find()
  .sort({ date: -1})
  .then(events => res.json(events))
  .catch(err => res.status(400).json(err))
})

// 
// router.get("/user/:user_id", (req, res) => {
//   console.log(req.params.user_id);
//   Event
//     .find({ organizer: req.params.user_id} )
//     .then(events => res.json(events))
//     .catch(err => res.status(400).json(err));
// } );

router.get("/:id", (req, res) => {
  Event
  .findById(req.params.id)
  .then(event => res.json(event))
  .catch(err => res.status(400).json(err));
})
//

router.put("/:id", (req, res) => {

  console.log(req.params.id);
  console.log(req.body.whos_going);
  Event.findByIdAndUpdate(
  req.params.id,
  {whos_going: req.body.whos_going },
  {new: true},
  (err, eve) => {
    if (err) return res.status(500).send(err);
    return res.send(eve);
  }
)

})

//
// router.get("/experiment", (req, res) => {
//   Event.findByIdAndUpdate(
//   "5d5731be4bc1b23474dac725",
//   {whos_going: ["tom", "mark"] },
//   {new: true},
//   (err, eve) => {
//     if (err) return res.status(500).send(err);
//     return res.send(eve);
//   }
// )
// })

//////////////////////////////////
router.post("/",
  passport.authenticate('jwt', { session: false}),
  (req, res) => {
    // const {isValid, errors } = validateTweetInput(req.body);
    // console.log(isValid);
    //  if(!isValid) {
    //    return res.status(400).json(errors);
    //  }
      const newEvent = new Event({
        organizer: req.user.id,
        organizer_name: req.body.organizer_name,
        title: req.body.title,
        description: req.body.description,
        requirements: req.body.requirements,
        image_url: req.body.image_url,
        event_date: req.body.event_date,
        event_time: req.body.event_time,
        location: req.body.location,
        whos_going: req.body.whos_going
      });
      // console.log("aaaaaaaaaaaaaaaaa");
      console.log(newEvent);
      newEvent.save().then(event => res.json(event));
  }
)

//comments experiment
router.get("/:id/comments", (req, res) => {
  Comment
  .find({ event_id: req.params.id})
  .then(comment => res.json(comment))
  .catch(err => res.status(400).json(err));

  // Comment.find()
  // .sort({ date: -1})
  // .then(events => res.json(events))
  // .catch(err => res.status(400).json(err))
})

module.exports = router;
