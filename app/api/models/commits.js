
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

// export default mongoose.models.commit || mongoose.model("commit", commitSchema);

import mongoose from 'mongoose';

const ContributionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contributions: [
    {
      date: {
        type: Date,
        required: true
      },
      count: {
        type: Number,
        required: true,
        default: 0
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const ContributionRecord = mongoose.models.ContributionRecord || mongoose.model('ContributionRecord', ContributionSchema);

export default ContributionRecord;
