import { Router } from "express";
import pkg from "express-openid-connect";
const {requiresAuth} = pkg
import * as appointmentController from "../controllers/appointmentController.js"




const calendarRoute = Router();
calendarRoute.get("/",  requiresAuth(), appointmentController.getAllAppointment)
calendarRoute.post("/",  requiresAuth(), appointmentController.addAppointment)
calendarRoute.put("/",  requiresAuth(), appointmentController.updateAppointment)
calendarRoute.delete("/",  requiresAuth(), appointmentController.deleteAppointment)



export default calendarRoute