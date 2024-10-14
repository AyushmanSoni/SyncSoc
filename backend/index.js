const express = require('express')
const app = express()
// const process = require('process')
// constants 
const port = 5000
const cors = require("cors");

require("dotenv").config();

// predefined middleware
app.use(cors());
app.use(express.urlencoded({ extended: false}))
app.use(express.json());


// Database Connection
const { connect } = require('./db.js');

const dbConnectionUrl = `mongodb+srv://ayushman:${process.env.password}@cluster0.z8hwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectToDatabase = async () => {
    try {
        await connect(dbConnectionUrl);
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Exit the process if the database connection fails
    }
};

connectToDatabase();


// middleware importing
const {check_login}  = require('./middlewares/token_verify.js')


// model importing 
const user = require('./models/Personal_details.js')
const events = require('./models/Event_register.js')

// router importing 
const Signup_and_login = require('./routes/Signup_and_login.js')
const Event = require('./routes/Events.js')
const Participants = require('./routes/Event_participation.js')
const Team = require('./routes/Teams_making.js')
const Interview = require('./routes/Interview.js')
const  front_page_event = require('./routes/past_present_future.js')

app.use("/" , Signup_and_login )

app.use('/team',check_login, Team)
app.use('/event' , check_login ,   Event )
app.use('/participants' , check_login , Participants )
app.use('/interview' , check_login , Interview)
app.use('/front_page' , front_page_event)

// Route to list all events
app.get("/list_of_event", async (req, res) => {
  try {
      const Events = await events.find({});
      return res.status(200).json(Events);
  } catch (error) {
      console.error("Error fetching events:", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/event_details/:id", async (req, res) => {
  try {
      const eventId = req.params.id;

      // Validate if eventId is a valid MongoDB ObjectId
      if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ message: "Invalid Event ID" });
      }

      const eventDetails = await events.findById(eventId);

      if (!eventDetails) {
          return res.status(404).json({ message: "Event not found" });
      }

      return res.status(200).json(eventDetails);
  } catch (error) {
      console.error("Error fetching event details:", error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))