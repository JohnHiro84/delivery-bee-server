const express = require("express");
const router = express.Router();
const passport = require('passport');
const Tweet = require("../../models/Tweet");
const validateTweetInput = require('../../validation/tweets');

// require('./passport')(passport);

router.get("/test", (req, res) => {
  res.json({ msg: "This is the tweets route" });
});

router.get("/", (req, res) => {
  Tweet.find()
  .sort({ date: -1})
  .then(tweets => res.json(tweets))
  .catch(err => res.status(400).json(err))
})

router.get("/user/:user_id", (req, res) => {
  // console.log(req.param.user_id);
  Tweet
    .find({ user: req.params.user_id} )
    .then(tweets => res.json(tweets))
    .catch(err => res.status(400).json(err));
} );

router.get("/:id", (req, res) => {
  Tweet
  .findById(req.params.id)
  .then(tweet => res.json(tweet))
  .catch(err => res.status(400).json(err));
})

router.post("/",
  passport.authenticate('jwt', { session: false}),
  (req, res) => {
    const {isValid, errors } = validateTweetInput(req.body);
    console.log(isValid);
     if(!isValid) {
       return res.status(400).json(errors);
     }
      const newTweet = new Tweet({
        user: req.user.id,
        text: req.body.text
      });
      // console.log("aaaaaaaaaaaaaaaaa");
      // console.log(newTweet);
      newTweet.save().then(tweet => res.json(tweet));
  }
)

module.exports = router;
