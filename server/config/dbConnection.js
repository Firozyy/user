import mongoose from "mongoose";


export const dbConnecting = () =>{
    mongoose.connect(process.env.MONGO_URI)
    .then(data => {console.log(`conected with ${data.connection.host}`);})
    .catch(e => {console.log("connection problem");})
};
