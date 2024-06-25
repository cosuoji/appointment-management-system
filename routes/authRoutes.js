import { auth } from "express-openid-connect";
import { Router } from "express";
import dotenv from "dotenv"
import pkg from "express-openid-connect";
const {requiresAuth} = pkg
export let userId, nickname, name
import { getAllAppointment } from "../services/appointmentServices.js";

dotenv.config()
const authRoute = Router()

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'https://appointment-management-system.onrender.com/',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: 'https://dev-53cut7r7puvotgqa.us.auth0.com'
};



authRoute.use(auth(config))
authRoute.use((req,res, next)=>{
   res.locals.user = req.oidc.user;
   next()
})

authRoute.get('/', async(req, res)=> {
  if(req.oidc.isAuthenticated()) {
    userId = req.oidc.user.sub
    nickname = req.oidc.user.nickname
    name = req.oidc.user.name
  }

 
 let listOfEvents = await getAllAppointment()
 
 //console.log(listOfEvents)

    res.render('index', {
    title: 'Calendar app',
    isAuthenticated: req.oidc.isAuthenticated(),
    listOfEvents: JSON.stringify(listOfEvents.result)
  });
});

authRoute.get("/login", (req, res)=>{
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})

authRoute.get("/logout", (req, res)=>{
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})

authRoute.get('/profile', requiresAuth(), (req, res) => {
  res.render("profile", {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  })   
});



export default authRoute