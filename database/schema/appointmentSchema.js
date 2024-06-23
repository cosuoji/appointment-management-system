import mongoose from "mongoose";


const appointmemtSchema = mongoose.Schema({
    auth0Id:{
        type: String
    },
    name:{
        type: String
    },
    nickname:{
        type: String
    },
    id:{
        type: String,
    },
    title:{
     type: String, 
     requred: true, 
     trim: true,
    }, 
    start:{
        type: String,
        required: true,
    }, 
    end:{
     type: Date,
     required: true,
    }

}, {timestamps: true})

const Appointments = mongoose.model("appointments", appointmemtSchema)
export default Appointments