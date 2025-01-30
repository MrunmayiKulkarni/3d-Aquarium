const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uploadFile = require('./uploadFile');
const { v4: uuidv4 } = require('uuid');
const User = require('./models/User');
const Aquarium = require('./models/Aquarium');

const app = express();

// Set up MongoDB connection
const uri = 'mongodb+srv://new-user:IzCsEXx5ibpVSQCZ@cluster1.okufw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully!');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer for file uploads (stores file temporarily)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Sign-Up Route
app.post('/api/signup', async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, email });
  await user.save();
  res.status(201).send('User signed up');
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

app.post('/api/upload', upload.array('files', 10), async (req, res) => {
  try {
    const files = req.files; // Array of uploaded files
    const userId = req.body.userId;
    const customizations = req.body.customizations ? JSON.parse(req.body.customizations) : {};

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    if (!userId || !customizations) {
      return res.status(400).json({ message: 'userId and customizations are required' });
    }

    // Loop through each file and upload to Google Cloud Storage
    const uploadedFiles = [];
    for (const file of files) {
      const destination = `models/${userId}/${file.originalname}`;
      await storage.bucket(bucketName).upload(file.path, { destination });
      uploadedFiles.push(`https://storage.googleapis.com/${bucketName}/${destination}`);
    }

    // Save metadata to MongoDB
    const Aquarium = require('./models/Aquarium');
    const aquarium = new Aquarium({
      userId,
      aquariumId: uuidv4(),
      customizations,
      modelUrl: uploadedFiles[0], // Assuming the first file is the main model
      createdAt: new Date(),
    });

    await aquarium.save();

    // Clean up local files
    files.forEach((file) => {
      fs.promises.unlink(file.path); // Use async file deletion
    });

    res.status(200).json({
      message: 'Files uploaded successfully',
      files: uploadedFiles,
      customization: aquarium,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading files', error });
  }
});

// Get Customizations Route
app.get('/api/customizations', async (req, res) => {
  const { userId } = req.query; 
  const customizations = await Aquarium.find({ userId });
  res.status(200).json(customizations);
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
