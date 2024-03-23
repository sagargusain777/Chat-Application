import mongoose from 'mongoose';

const DB_name = "Chat-Application"

const connectDB = async()=>{

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_name}`)
         console.log(`Database Connection Successful : ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.error(`Database Connection Failed : ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;