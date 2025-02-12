if(process.env.NODE_ENV !="production") {
  require ('dotenv').config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require ("ejs-mate");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const review = require ("./models/review.js");
const {listingSchema} = require ("./models/listing.js")
const flash = require('connect-flash');
const passportStrategy = require ("passport-local")
const User = require ("./models/user.js")
const LocalStrategy = require ("passport-local").Strategy
const passport = require ("passport")
const session = require("express-session");
const Login = require ("./views/user/loggin.ejs")
const MongoStore = require('connect-mongo');


const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });


  
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
const listingsRouter = require ("./routes/listing.js")
const reviewsRouter = require ("./routes/review.js");
const userRouter = require ("./routes/user.js")


async function main() {
  await mongoose.connect(dbUrl);
}const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) =>el.message).join(",");
        throw new express(400, errmsg);
    } else {
        next();
    }
 }

 app.use(session({
  secret: "my_secret_key",  // Secret key for signing the session ID cookie
  resave: false,            // Prevents session from being saved back to the store if unmodified
  saveUninitialized: true,  // Forces an uninitialized session to be stored
  cookie: { secure: false } // Set `secure: true` if using HTTPS
}));



app.use (passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

const store = MongoStore.create{{
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter: 24 * 3600,
}}

const sessionOption = {
  store,
  secret: "process.env.SECRET",
  resave: false,
  saveUninitialized: true,
  cookie:{ expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 *60 *60 * 1000,
    httOnly : true
  }
}

app.use(session (sessionOption));

app.use(flash());

// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

app.use((req, res, next) =>{
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings/:id/reviews", reviewsRouter)
app.use("/listings", listingsRouter)
app.use("/", userRouter)

passport.serializeUser(User.serializeUser())
passport.deserializeUser (User.deserializeUser())



// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log(username, password)
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false), {message:"incorrect username"}; }
//       if (!user.password == password) { return done(null, false, {message:"incorrect password"}); }
//       return done(null, user);
//     });
//   }
// ));






// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});