import mongoose from "mongoose";

declare global {
  var mongooseConnection:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global.mongooseConnection ?? { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Please set the MONGODB_URI environment variable.");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri);
  }

  cached.conn = await cached.promise;
  global.mongooseConnection = cached;

  return cached.conn;
}
