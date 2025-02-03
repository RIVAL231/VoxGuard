import mongoose from 'mongoose';

const { Schema } = mongoose;

// Schema for a family member's voice sample data
const FamilySchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  // Store the GridFS file ID as a reference for the audio sample
  voiceSampleUrl: { type: String, required: true }
});

// User schema including a collection of family member voice samples
const UserSchema = new Schema({
  userName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender:   { type: String },
  // Array of family member voice sample objects
  familyVoiceSamples: [FamilySchema]
});

export default mongoose.model('User', UserSchema);