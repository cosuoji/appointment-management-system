import ErrorWithStatus from "../exceptions/errorStatus.js";
import Appointments from "../database/schema/appointmentSchema.js"
import {userId, name, nickname} from "../routes/authRoutes.js"



export const getAllAppointment = async() =>{
   try{
     const appointments = await Appointments.find({});
     //console.log(appointments)
     let appointmentObj = [];

     for(let i = 0; i < appointments.length; i++){
        let objToUseToPopulate = {}
         objToUseToPopulate.userId = appointments[i].auth0Id
         objToUseToPopulate.id = appointments[i]._id.toHexString()
         objToUseToPopulate.title = appointments[i].title
         objToUseToPopulate.start = appointments[i].start
         objToUseToPopulate.end = appointments[i].end
         appointmentObj.push(objToUseToPopulate)

        }
        

        return {
        result: appointmentObj
    }

   }catch(error){
          throw new ErrorWithStatus(error.message, 500)
   }
}

export const addAppointment = async(title, start, end) =>{
    try{
       // const userToUpDate = await Appointments.findOne({auth0Id: userId})
        const newAppointment = new Appointments({title:title, name: name, nickname: nickname, start: start, end: end, auth0Id: userId, });
        await newAppointment.save();

        let result = await getAllAppointment()
        return {
            message: "appointment added",
            data: {
                appointments: result,

            }
        }
        
    } catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}

// export const updateAppointment = async(appointmentToUpdate) =>{
//     try{
//         const appointmentToUpdate = await Appointments.findOne({_id: appointmentToUpdate})

//        if(!appointmentToUpdate){
//             throw new ErrorWithStatus("appointment not found", 400)
//         }

//         // if(appointmentToUpdate.userId !== userId){
//         //     throw new ErrorWithStatus("You don't have permission to edit this", 400)
//         // }

//         //await appointmentToUpdate.findOneAndUpdate({_id:appointmentToUpdate})
//         return {
//             message: "Changes Saved",
//             appointments: await getAllAppointment()
//         }


//     } catch(error){
//         throw new ErrorWithStatus(err.message, 500)
//     }
// }

export const deleteAppointment = async(eventId, userIdToCheck) =>{
    try{

        const appointmentChecker = await Appointments.find({_id: eventId})

        if(appointmentChecker.length < 1){
            throw new ErrorWithStatus("appointment not found", 400)
        }

        console.log(userId, userIdToCheck)

        if(userIdToCheck !== userId){
            throw new ErrorWithStatus("You don't have permission to edit this", 400)
        }

        
        await Appointments.findOneAndDelete({_id: eventId})
        return {
            message: "Appointment Deleted",
            appointments: await getAllAppointment()
        }

    }catch(error){
        throw new ErrorWithStatus(error.message, 500) 
    }
}