import User from "../Models/user.js";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// Existing login function
export async function userLogin (req, res) {
  const { email, password } = req.body;
  
  try {
    // Find the user by email
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Optionally, generate a session or token here before sending the response
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}

export async function userSignup(req, res) {
  const { userName, email, password, gender } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User with this email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      gender
    });

    await newUser.save();

    res.status(201).json({ message: "User signed up successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to sign up user", details: error.message });
  }
}

export function downloadAudioSample(req, res) {
  const fileId = req.params.id;
  if (!fileId) {
    return res.status(400).json({ error: "Missing file id" });
  }

  const db = mongoose.connection.db;
  const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'audioFiles' });

  try {
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
    res.set('Content-Type', 'audio/mpeg');
    res.set('Content-Disposition', 'attachment; filename="audioSample.mp3"');
    
    downloadStream.on('error', error => {
      res.status(500).json({ error: "Error downloading file", details: error.message });
    });
    
    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving file", details: error.message });
  }
}

// New function to add a family voice sample using async/await
export async function addFamilyVoiceSample(req, res) {
  // Expecting userId, family member name, and email in req.body
  // And the audio file is uploaded via multer middleware and available as req.file
  try {
    const { userId, familyName, familyEmail } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    // Store the GridFS file id as a string reference
    const voiceSampleId = req.file.id.toString();

    // Update the user document by pushing into familyVoiceSamples array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { familyVoiceSamples: { userName: familyName, email: familyEmail, voiceSampleUrl: voiceSampleId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Family voice sample stored successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user", details: error.message });
  }
}