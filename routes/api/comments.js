const express = require("express");
const router = express.Router();
const passport = require('passport');
const Comment = require("../../models/Comment");


////////////////////////////////// create new comment route

router.post("/",
  passport.authenticate('jwt', { session: false}),
  (req, res) => {
      const newComment = new Comment({
        handle: req.body.handle,
        text: req.body.text,
        order_id: req.body.order_id

      });
      newComment.save().then(comment => res.json(comment));
  }
)


////////////////also a route in orders: (api/orders/:id/comments)



////////////////////
//
//
// router.get("/:id", (req, res) => {
//   Order
//   .findById(req.params.id)
//   .then(order => res.json(order))
//   .catch(err => res.status(400).json(err));
// })


// get all comments route (not used)

// router.get("/", (req, res) => {
//
//   Order.find()
//   .sort({ date: -1})
//   .then(events => res.json(events))
//   .catch(err => res.status(400).json(err))
// })

module.exports = router;
