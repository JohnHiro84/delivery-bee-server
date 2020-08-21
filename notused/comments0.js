const express = require("express");
const router = express.Router();
const passport = require('passport');
const Comment = require("../../models/Comment");
// const validateTweetInput = require('../../validation/tweets');

// require('./passport')(passport);
//
router.get("/test", (req, res) => {
  res.json({ msg: "This is the comments route" });
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
      const newComment = new Comment({
        handle: req.body.handle,
        text: req.body.text,
        event_id: req.body.event_id

      });
      // console.log("aaaaaaaaaaaaaaaaa");
      console.log(newComment);
      newComment.save().then(comment => res.json(comment));
  }
)

module.exports = router;
