import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema({
    // id: { type: Number, required: true },
    name: { type: String, required: true , unique:true},
    status: { type: String, required: true, enum: ["public", "private"] },
    description: { type: String, required: false },
    stars: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    branches: { type: [String], required: true },
    commits: { type: [String], default: [] },
},{
    timestamps: true,
    versionKey: false
});
  
export default mongoose.models.repository || mongoose.model("repository", repositorySchema);