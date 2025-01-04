import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

global.mongoose = global.mongoose || { conn: null, promise: null };

export default async function connectToDatabase(): Promise<mongoose.Connection> {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose
      .connect(MONGODB_URI as string)
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    global.mongoose.conn = (await global.mongoose.promise).connection;
    return global.mongoose.conn;
  } catch (error) {
    global.mongoose.promise = null; 
    throw error;
  }
}

