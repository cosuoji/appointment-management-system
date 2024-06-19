import { auth } from "express-openid-connect";
import { Router } from "express";
import dotenv from "dotenv"
import pkg from "express-openid-connect";
const {requiresAuth} = pkg


dotenv.config()
const authRoute = Router()

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: 'https://dev-53cut7r7puvotgqa.us.auth0.com'
};

authRoute.use(auth(config))
authRoute.use((req,res, next)=>{
   res.locals.user = req.oidc.user;
   next()
})

authRoute.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Calendar app',
    isAuthenticated: req.oidc.isAuthenticated()
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