import { Router } from "express";
import pkg from "express-openid-connect";
const {requiresAuth} = pkg




const calendarRoute = Router();




calendarRoute.get("/create-event", requiresAuth(), appointmentController.getAllAppointment)
calendarRoute.post("/create-event", requiresAuth(), appointmentController.addAppointment)
calendarRoute.put("/create-event", requiresAuth(), appointmentController.updateAppointment)
calendarRoute.delete("/create-event", requiresAuth(), appointmentController.deleteAppointment)



export default calendarRoute