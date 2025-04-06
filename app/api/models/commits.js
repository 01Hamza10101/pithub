
const commitSchema = new mongoose.Schema({
    id: { type: String, required: true },
    message: { type: String, required: true },
    filePath: { type: String, required: true },
    changes: [
      {
        line: { type: Number, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true }
      }
    ],
    branch: { type: String, required: true },
    timestamp: { type: Number, required: true }
  });

export default mongoose.models.commit || mongoose.model("commit", commitSchema);