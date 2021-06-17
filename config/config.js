const config = {
    env: process.env.NODE_ENV || 'development', //differentiate between dev and prod modes.
    port: process.env.PORT || 3000, //sets port to listen on
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", //default secret key for JWT 
    mongoUri: process.env.MONGODB_URI || //location for mongoDB
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mernproject'
   }

   export default config