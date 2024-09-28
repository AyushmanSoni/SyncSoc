const express = require('express')
const app = express()
// const process = require('process')
// constants 
const port = 5000
const cors = require("cors");
app.use(cors());

require("dotenv").config();

// const PORT = process.env.PORT || 5000;
// db -> mongodb+srv://ayushman:sAnsksrsoni3660@cluster0.z8hwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// predefined middleware
app.use(express.urlencoded({ extended: false}))
app.use(express.json());


const  {connect} = require('./db.js')
// const {get_password} = require()
// pass = get_password()
connect(`mongodb+srv://ayushman:${process.env.password}@cluster0.z8hwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

// middleware importing
const {check_login}  = require('./middlewares/token_verify.js')


// model importing 
const user = require('./models/Personal_details.js')

// router importing 
const Signup_and_login = require('./routes/Signup_and_login.js')
const Event = require('./routes/Events.js')
const Participants = require('./routes/Event_participation.js')

app.use("/" , Signup_and_login )

app.get("/list_of_event" , async (req, res) => {
  const Events = await events.find()
  return res.status(200).json(Events)
})


app.use('/event' , check_login ,   Event )
app.use('/participants' , check_login , Participants )

// app.get("/",(req,res)=>{
//     res.send("gondia");
// });


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


