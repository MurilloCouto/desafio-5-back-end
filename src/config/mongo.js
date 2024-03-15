import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://murilloacouto:murillo97@cluster1.idmwgqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

export default mongoose;
