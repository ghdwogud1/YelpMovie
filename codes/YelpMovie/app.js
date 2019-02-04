var express                 = require("express"),
    seedDB                  = require("./seeds"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    flash                   = require("connect-flash"),
    localStrategy           = require("passport-local"),
    methodOverride          = require("method-override"),
    Comment                 = require("./models/comment"),
    Campground              = require("./models/campground"),
    passportLocalMongoose   = require("passport-local-mongoose")
    
//requiring routes
var indexRoutes             = require("./routes/index"),
    commentRoutes           = require("./routes/comments"),
    campgroundRoutes        = require("./routes/campgrounds")
    
mongoose.connect("mongodb://localhost:27017/yelp_movie", {useNewUrlParser: true});
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); 
//seedDB(); //seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I love you Lord",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error"); 
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);



// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("The YelpCamp Server Has Started! at PORT", process.env.PPORT);
// })

app.listen(3333, function(){
    console.log("The YelpCamp Server Has Started! at PORT 5555");
})