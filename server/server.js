require("dotenv").config();
const express = require('express')
const cors = require("cors");
const app = express()
const PORT = 5000;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const SampleAdmins = require("./SampleAdmins.js")

// To identify the type of user

function isStudent(email){
    if(/*!SampleAdmins.includes(email)&&*/(email.startsWith("f20")||email.startsWith("h20"))){
        return "Student";
    }
    return false
}

function isAdmin(email){
    if(SampleAdmins.includes(email)){
        return "Admin";
    }
    return false;
}

let userType = "";
let redirectURL = "http://localhost:3000/new_complaint";

// Connect to MongoDB
const db = require('./db/conn');
db.connect();

const students = require('./db/students');

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());

app.use(session({
    secret: "bitscms123",
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

// Use this later with .env file. Also need to debug this code a little.
const clientID=String(process.env.GOOGLE_AUTH_CLIENT_ID);
const clientSecret=String(process.env.GOOGLE_AUTH_CLIENT_SECRET);

passport.use(
    new OAuth2Strategy({
        clientID: "554379131077-61f3ssotvgo8rbvnkt0ckas6q4pis3vg.apps.googleusercontent.com",  
        clientSecret: "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",   
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            if(!isAdmin(profile.email) && !isStudent(profile.email)){
                userType = "Technician";
            }
            userType = isAdmin(profile.email);
            if(!userType) {
                userType = isStudent(profile.email);
            }
            console.log("Log In Successful");
            console.log("User type: ", userType);
            console.log("Name: ",profile.displayName);
            console.log("Email: ", profile.email, "\n");
            try {
                user = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                };
                return done(null, user)
            } catch (error) {
                return done(error, null)
            }
        }
    )
)


passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
});

// initial google ouath login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/testbackend",
    failureRedirect: "http://localhost:3000/testbackend"
}))


app.get("/login/success", async (req, res) => {

    if (req.user) {
        res.status(200).json({ message: "user Login", user: req.user })
    } else {
        res.status(400).json({ message: "Not Authorized" })
    }
})

app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        res.redirect("http://localhost:3000");
    })
})

app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})

// <---------------------------------------------------Admin Requests----------------------------------------------------------> //

// Get complaints

app.get("/api/student/complaints/", async (req, res) => {
    try {
        const studentComplaints = await students.getAllStudentComplaints();
        res.json(studentComplaints);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update student complaint status and attendants
app.post("/api/student/complaints/update", async (req, res) => {
    const updatedComplaints = req.body;

    try {
        // Loop through updated complaints and update status/attendant of each one in the database
        for (const complaint of updatedComplaints) {
            await students.updateStudentComplaints(complaint);
        }
        
        // Send a success response
        res.status(200).json({ message: "Complaints updated successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error updating complaints:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// <---------------------------------------------------Student Requests----------------------------------------------------------> //

// Get complaints for the student

app.get("/api/student/complaints/:username", async (req, res) => {
    
    const userName = req.params.username;
    try {
        const studentComplaints = await students.getStudentComplaints(userName);
        res.json(studentComplaints);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Insert new complaint for the student

app.post("/api/student/complaints/:username", async (req, res) => {
    const username = req.params.username;
    const complaintData = req.body; 

    try {
        // Insert the complaint into the database
        const result = await students.insertStudentComplaints(complaintData);
        // Send a success response
        res.status(200).json({ message: "Complaint submitted successfully of user", complaint: result });
    } catch (error) {
        // Handle errors
        console.error("Error submitting complaint:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Printing starting date and time of server, useful for adding new complaints with dateString
const currentDate = new Date();
const dateString = currentDate.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
});

console.log(dateString);

const sampleData = [
    {
        Complaint_Id: -10,
        Complaint_logged_On: dateString,
        Student_IdNo: "12345",
        username: "f20220157@goa.bits-pilani.ac.in",
        fullname: "John Doe",
        Category: "Academic",
        sub_category: "Assignment",
        sub_sub_category: "Late Submission",
        User_department: "Computer Science",
        location: "Building A",
        location_no: "Room 101",
        Mobile_no: "1234567890",
        available_day: "Monday",
        description: "I couldn't submit my assignment on time due to technical issues.",
        status: "Pending",
        Forwarded_To_Incharge: "Professor Smith",
        Remarks: "Will be fixed soon"
    },
    {
        Complaint_Id: 11,
        Complaint_logged_On: dateString,
        Student_IdNo: "54321",
        username: "f20220157@goa.bits-pilani.ac.in",
        fullname: "Jane Doe",
        Category: "Facilities",
        sub_category: "Infrastructure",
        sub_sub_category: "Internet Connection",
        User_department: "Electrical Engineering",
        location: "Building B",
        location_no: "Room 202",
        Mobile_no: "9876543210",
        available_day: "Wednesday",
        description: "test test test",
        status: "Pending",
        Forwarded_To_Incharge: "IT Department",
        Remarks: "Will be fixed soon"
    }
];

// To test insert data into DB
// students.insertStudentComplaints(sampleData[0]);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} \n`)
})


