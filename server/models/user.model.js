import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        requred: 'Name is required'
    },
    Email: {
        type: String,
        trim: true,
        unique: 'Email alread exists',
        match:  [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date //I guess you don't need the {} if it's only one k/v pair? 
}) //creates a new schema to map js user objects onto mongoDB documents. takes an object as a schema defition

export default mongoose.model('User', UserSchema)