import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://murilloacouto:PzJLzPihVvt3xnbG@cluster1.idmwgqi.mongodb.net";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
