const express = require("express");
const router = express.Router();
const passport = require('passport');
const Review = require("../../models/Review");


////////////pull single review info for order details

router.get("/:id", (req, res) => {
  Order
  .findById(req.params.id)
  .then(order => res.json(order))
  .catch(err => res.status(400).json(err));
})
//

//get all of a helper's reviews

router.get("/helper/:user_id", (req, res) => {
  Review
    .find({ helper_id: req.params.user_id} )
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json(err));
} );


////////////////////////////////// create new review

router.post("/",
  passport.authenticate('jwt', { session: false}),
  (req, res) => {
      const newReview = new Review({
        createdAt: req.body.createdAt,
        order_id: req.body.order_id,
        user_id: req.body.user_id,
        helper_id: req.body.helper_id,
        user_handle: req.body.user_handle,
        helper_handle: req.body.helper_handle,
        stars: req.body.stars,
        message: req.body.message

      });
      newReview.save().then(review => res.json(review));
  }
)


///////////get all reviews
//
// router.get("/", (req, res) => {
//
//   // Review.remove().then(reviews => res.json(reviews))
//   Review.find()
//   .sort({ date: -1})
//   .then(events => res.json(events))
//   .catch(err => res.status(400).json(err))
// })

module.exports = router;
