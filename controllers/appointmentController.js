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
       
        const {title, start, end}  = req.body
        console.log(title, start, end)
        let result = await appointmentService.addAppointment(title, start, end)
        res.redirect("/")


    }catch(error){
        res.status(500).json({message: error.message})
    }

}
// export const updateAppointment = async(req, res) =>{
//     try{
//         const updateAppoint = req.body.todoId;
//         const {update} = req.body
//         const result = await appointmentService.updateAppointment(updateAppoint, result);
//         res.json(result)

//     } catch(error){
//       res.status(500).json({message: error.message})

//     }
// }


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
