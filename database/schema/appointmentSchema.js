import mongoose from "mongoose";


const appointmemtSchema = mongoose.Schema({
    userId:{
        type: String
    },
    appointmentSummary:{
     type: String, 
    }, 
    date:{
        type: Date,
        default: "false"
    }
}, {timestamps: true})

const toDos = mongoose.model("toDos", toDoSchema)
export default toDos