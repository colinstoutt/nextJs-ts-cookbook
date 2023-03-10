import * as Mongoose from "mongoose";

let db: Mongoose.Connection;

const dbConnect = async () => {
  if (db) {
    return;
  }
  // conenct to mongoDb
  await Mongoose.connect(process.env.MONGODB_URI!);

  db = Mongoose.connection;
  // console msgs and errs
  db.on("open", () =>
    console.log(`Connected to MongoDB on ${db.host}:${db.port}`)
  )
    .on("close", () => console.log("Connection Closed"))
    .on("error", (error) => console.log(error));
};
// remove strict query warning msg
Mongoose.set("strictQuery", true);

export default dbConnect;
