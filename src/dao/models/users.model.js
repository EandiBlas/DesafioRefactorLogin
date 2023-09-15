import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String, required: true
    },
    last_name: {
        type: String, required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    age: {
        type: Number
    },
    role: {
        default: 'user',
        type: ['admin', 'user']
    },
    fromGithub: {
        type: Boolean,
        default:false
    }
})

export const usersModel = mongoose.model('Users',usersSchema)