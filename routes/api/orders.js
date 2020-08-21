const express = require("express");
const router = express.Router();
const passport = require('passport');


const Order = require("../../models/Order");
const Comment = require("../../models/Comment");
const Review = require("../../models/Review");



//helper - get all available orders that no helper has accepted yet

router.get("/helper/available", (req, res) => {
  Order
    .find({ helper: "" })
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json(err));
});


/////////////////////////////////////////////////////// customer

//get a customer's orders
router.get("/customer/:user_id", (req, res) => {
  Order
    .find({ user: req.params.user_id} )
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json(err));
});

//get a customer's orders that are in progress and havent been signed off
router.get("/customer/inprogress/:user_id", (req, res) => {
  Order
    .find({
      user: req.params.user_id,
      final_confirmation: false
    })
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json(err));
});

//get a customer's orders that have been confirmed completed
router.get("/customer/completed/:user_id", (req, res) => {
  Order
    .find({
      user: req.params.user_id,
      final_confirmation: true
    })
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json(err));
});



/////////////////////////////////////////////////////////// helper


///helper completed an order
router.put("/confirmed/:id", (req, res) => {

  Order.findByIdAndUpdate(
    req.params.id,
    {
      final_confirmation: true
    },
    {new: true},
    (err, eve) => {
      if (err) return res.status(500).send(err);
      return res.send(eve);
    }
  )
})

//get a helper's orders
router.get("/helper/:user_id", (req, res) => {
  Order
    .find({ helper: req.params.user_id} )
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json(err));
});



// get a helper's orders - accepted
router.get("/helper/accepted/:user_id", (req, res) => {
  Order
    .find({
      helper: req.params.user_id,
      order_completed: false
    })
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json(err));
} );



//get a helper's orders - completed
router.get("/helper/completed/:user_id", (req, res) => {
  Order
    .find({
      helper: req.params.user_id,
      order_completed: true
    })
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json(err));
});




///route used to update the order record when the helper accepts the order
//it will update with the helper's id and the time_accepted

router.put("/:id", (req, res) => {

  Order.findByIdAndUpdate(
    req.params.id,
    {
      helper: req.body.helper,
      helper_handle: req.body.helper_handle,
      time_accepted: req.body.time_accepted
    },
    {new: true},
    (err, eve) => {
      if (err) return res.status(500).send(err);
      return res.send(eve);
    }
  )
})


///when helper completes an order updates time and order completed

router.put("/completed/:id", (req, res) => {

  Order.findByIdAndUpdate(
    req.params.id,
    {
      time_completed: req.body.time_completed,
      order_completed: true
    },
    {new: true},
    (err, eve) => {
      if (err) return res.status(500).send(err);
      return res.send(eve);
    }
  )
})

///////////////////////////////////////////////////////// comments and reviews

//get all comments associated with an order

router.get("/:id/comments", (req, res) => {
  Comment
  .find({ order_id: req.params.id})
  .then(comment => res.json(comment))
  .catch(err => res.status(400).json(err));

})

//get all reviews associated with an order


router.get("/:id/reviews", (req, res) => {
  Review
  .find({ order_id: req.params.id})
  .then(review => res.json(review))
  .catch(err => res.status(400).json(err));

})

////////// order detail

router.get("/:id", (req, res) => {
  Order
  .findById(req.params.id)
  .then(order => res.json(order))
  .catch(err => res.status(400).json(err));
})



//show all the orders

router.get("/", (req, res) => {
  // Order.remove().then(orders => res.json(orders))
  console.log("get all")
  Order.find()
  .sort({ date: -1})
  .then(orders => res.json(orders))
  .catch(err => res.status(400).json(err))
})

module.exports = router;
