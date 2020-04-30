/** @format */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  githubId: Number,
  email: String,
  avatarUrl: String,
  name: String,
});

const model = mongoose.model("User", UserSchema);

export default model;
