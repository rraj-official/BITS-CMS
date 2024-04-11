//require("dotenv").config();
const express=require('express')
const cors = require("cors");
const app= express()
const PORT = 5000;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const clientid="554379131077-61f3ssotvgo8rbvnkt0ckas6q4pis3vg.apps.googleusercontent.com"
const clientsecret="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"

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(express.json());

app.use(session({
    secret:"bitscms123",
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        console.log(profile)
        try {
            user ={
                googleId:profile.id,
                displayName:profile.displayName,
                email:profile.emails[0].value,
                image:profile.photos[0].value
            }; 
            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)


passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/new_complaint",
    failureRedirect:"http://localhost:3000/testbackend"
}))


app.get("/login/success",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000");
    })
})

app.get("/api", (req, res)=>{
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})


