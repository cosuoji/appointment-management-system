import mongoose from "mongoose";


const appointmemtSchema = mongoose.Schema({
    userId:{
        type: String
    },
    title:{
     type: String, 
    }, 
    start:{
        type: Date,
    }, 
    end:{
     type: Date,
    }

}, {timestamps: true})

const Appointments = mongoose.model("toDos", appointmemtSchema)
export default Appointments