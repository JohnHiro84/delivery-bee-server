const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const stripeKey = require('./config/keys').stripeKey;

const bodyParser = require('body-parser');

const users = require("./routes/api/users");
const User = require('./models/User');

const comments = require("./routes/api/comments");
const Comment = require('./models/Comment');


const orders = require("./routes/api/orders");
const Order = require('./models/Order');

const reviews = require("./routes/api/reviews");
const Review = require('./models/Review');

const passport = require('passport');

const stripe = require("stripe")(stripeKey);

const cors = require("cors");
const uuid = require("uuid/v4");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.post("/payment", (req, res) => {

  const { order, token } = req.body;

  const idempotencyKey = uuid();

  //////////////saving the newOrder to the mongoDb

  async function generateMongoOrder(order){

    const newOrder = new Order({
      // user: req.user.id,
      user: order.user,
      user_handle: order.user_handle,
      helper: order.helper,
      pick_up_lat: order.pick_up_lat,
      pick_up_long: order.pick_up_long,
      pick_up_address: order.pick_up_address,
      pick_up_neighborhood: order.pick_up_neighborhood,
      drop_off_lat: order.drop_off_lat,
      drop_off_long: order.drop_off_long,
      drop_off_address: order.drop_off_address,
      drop_off_neighborhood: order.drop_off_neighborhood,
      time_accepted: "",
      time_completed: "",
      instructions: order.instructions,
      distance: order.distance,
      cost: order.cost,
      vehicle: order.vehicle,
      order_completed: order.order_completed,
      final_confirmation: order.final_confirmation
    });

    let status = await newOrder.save().then(order => res.json(order))
    .catch(err => res.status(400).json(err));

  }

  generateMongoOrder(order);




  ////////generating the stripe record

  return stripe.customers
  .create({
    email: token.email,
    source: token.id
  }).then(customer => {
    stripe.charges.create({

      amount:order.cost * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.receipt_email,
      description: "Delivery App Charge"

    }, {idempotencyKey})

  })
  .catch(err => console.log(err))

})




app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/orders", orders);
app.use("/api/reviews", reviews);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
