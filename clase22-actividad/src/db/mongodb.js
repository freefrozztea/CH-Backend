import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default function mongoConnect() { 
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
}