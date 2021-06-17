import mongoose from 'mongoose'

//creates a new schema to map js user objects onto mongoDB documents. takes an object as a schema defition
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        requred: 'Name is required'
    },
    email: {
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

//handles the plaintext password as a virtual field
//I'd guess that .set and .get take getter and setter functions as arguments. And the setter has to generate a salt to add to the hash 
//and I'd guess that the _ before password indicates it's a virtual field. 
UserSchema.virtual('password').set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
}).get(function() {
    return this._password
})

//defines *extra/extended of the methods associated with a User object. It already has methods like .find(), etc.
UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf()) * Math.random()) + ''
    }
}

UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
    }
   }, null)

export default mongoose.model('User', UserSchema)