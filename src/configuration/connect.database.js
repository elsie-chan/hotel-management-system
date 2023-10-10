import mongoose from 'mongoose';
import variables from "./variables.js";

const connectDatabase = async () => {
    await mongoose.connect(variables.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log(err);
    });
}
export default connectDatabase;