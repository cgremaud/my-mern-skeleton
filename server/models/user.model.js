import mongoose from 'mongoose'

//creates a new schema to map js user objects onto mongoDB documents. takes an object as a schema defition
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
    updated: Date,
    hashed_password: {
        type: String,
        required: 'Password is required'
    },
    salt: String
}) 

UserSchema.virtual('password').set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
}).get(function() {
    return this._password
})

export default mongoose.model('User', UserSchema)