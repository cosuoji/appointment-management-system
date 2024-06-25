import * as appointmentService from "../services/appointmentServices.js"




export const getAllAppointment = async(req, res, next) =>{

    try{

        const result = await appointmentService.getAllAppointment();
        const events = result
        res.json(events)
        

    }  catch(error){
        res.status(500).json({message: error.message})
    }

}

export const addAppointment = async(req, res) =>{
    try{
       
        const {title, start}  = req.body
        await appointmentService.addAppointment(title, start)
        res.redirect("/")


    }catch(error){
        res.status(500).json({message: error.message})
    }

}

export const updateAppointment = async(req, res) =>{
    try{
        const {eventId, userId, start} = req.body;
        console.log(eventId, userId, start)
        let userIdToCheck = userId
        const result = await appointmentService.updateAppointment(eventId, userIdToCheck, start);
        res.json(result)

    } catch(error){
      res.status(500).json({message: error.message})

    }
}


export const deleteAppointment = async(req, res) =>{
    try{
        const {eventId, userId} = req.body
        let userIdToCheck = userId
        const result = await appointmentService.deleteAppointment(eventId, userIdToCheck)
        res.json(result)

    } catch(error){
        res.status(500).json({message: error.message})
    }
}
