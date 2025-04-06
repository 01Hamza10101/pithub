
  const repositorySchema = new mongoose.Schema({
    // id: { type: Number, required: true },
    name: { type: String, required: true , unique:true},
    status: { type: String, required: true, enum: ["Public", "Private"] },
    description: { type: String, required: false },
    stars: { type: Number, default: 0 },
    watchers: { type: Number, default: 0 },
    branches: { type: [String], required: true },
    commits: { type: [String], default: [] },
    createdAt: { type: Number, required: true }
  });

export default mongoose.models.repository || mongoose.model("repository", repositorySchema);