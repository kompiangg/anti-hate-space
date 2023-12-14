import mongoose from "mongoose";

let isConnected = false;

export async function initDBConnection() {
  mongoose.set("strictQuery");

  if (isConnected) {
    console.log("mongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "promptopia",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
  } catch (error) {
    console.log(error);
  }
}
