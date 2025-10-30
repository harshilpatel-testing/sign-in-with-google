import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  picture: String,
  googleId: { type: String, unique: true, sparse: true }, // 👈 store Google ID
  authType: { type: String, enum: ["local", "google"], default: "local" },
  password: String // only for local users
});

export default mongoose.model("User", userSchema);
