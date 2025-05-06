import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  location: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  profile: {
    url: { type: String },
    username: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    pronouns: { type: String, default: "" },
  },
  security: {
    password: { type: String, required: true },
    sessions: [sessionSchema],
  },
  activity: {
    repositories: { type: [String], default: [] },
    starred: { type: [String], default: [] },
    socialLinks: { type: [String], default: [] },
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);