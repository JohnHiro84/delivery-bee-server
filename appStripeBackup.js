// const express = require("express");
// const app = express();
// const mongoose = require('mongoose');
// const db = require('./config/keys').mongoURI;
// // const tweets = require("./routes/api/tweets");
//
// const bodyParser = require('body-parser');
//
// const users = require("./routes/api/users");
// const User = require('./models/User');
//
//
// const events = require("./routes/api/events");
// const Event = require('./models/Event');
// // const Tweet = require('./models/Tweet');
//
// const comments = require("./routes/api/comments");
// const Comment = require('./models/Comment');
//
//
// const orders = require("./routes/api/orders");
// const Order = require('./models/Order');
//
//
//
// const passport = require('passport');
//
// const stripe = require("stripe")("sk_test_51H6pQPKx4XF3FVjgHPJi6Kjex0wWejUYoDKBm81VA2bEsZ2ArGb9FL5x09fdSKpUIWDNoepTfu5V7WDjRgoMgo7N001e4saCNW");
//
// const cors = require("cors");
// const uuid = require("uuid/v4");
//
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log("Connected to MongoDB successfully"))
//   .catch(err => console.log(err));
//
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
//
// app.use(cors());
//
// app.get("/", (req, res) => {
//
//       // const newEvent = new Event({
//       //   organizer: "5d4dff0e446df212481a9ec",
//       //   title: "aaaa",
//       //   description: "aaaaaaa",
//       //   location: "aaaaaaa",
//       //   image_url: "aaaaaaa",
//       //   requirements: "raaaaaaas",
//       //   event_date: "aaaaaaa",
//       //   event_time: "aaaaaaa",
//       // });
//       // console.log("aaaaaaaaaaaaaaaaa");
//       // console.log(newEvent);
//       // newEvent.save().then(the_event => res.json(the_event));
//
//
// });
//
//
// app.post("/payment", (req, res) => {
//
//   const { product, token } = req.body;
//   console.log(req.body);
//   console.log("PRODUCT", product);
//   console.log("PRICE", product.price);
//
//   const idempotencyKey = uuid();
//
//   return stripe.customers
//   .create({
//     email: token.email,
//     source: token.id
//   }).then(customer => {
//     stripe.charges.create({
//
//       amount: product.price * 100,
//       currency: "usd",
//       customer: customer.id,
//       receipt_email: token.receipt_email,
//       description: product.name
//       // shipping: {
//       //   name: token.card.name,
//       //   address: {
//       //     address_line1: token.card.address_line1,
//       //     country: token.card.address_country
//       //   }
//       // }
//     }, {idempotencyKey})
//
//   })
//   .then(result => res.status(200).send({ success: result }))
//   .catch(err => console.log(err))
//   // .then(result => res.status(200).json(result))
//
//
// })
//
//
//
//
// app.use(passport.initialize());
// require('./config/passport')(passport);
//
// // app.use("/api/tweets", tweets);
// app.use("/api/users", users);
// app.use("/api/events", events);
// app.use("/api/comments", comments);
// app.use("/api/orders", orders);
//
//
// const port = process.env.PORT || 5000;
//
// app.listen(port, () => console.log(`Server is running on port ${port}`));
