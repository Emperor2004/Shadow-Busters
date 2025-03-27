const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Enable CORS for all routes (adjust for production as needed)
app.use(cors());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use the original name; you can modify to avoid conflicts
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// API endpoint to handle image uploads
app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ result: "No file uploaded" });
  }

  // Path to the uploaded image file
  const filePath = req.file.path;
  
  // TODO: Integrate your trained AI model here.
  // For demonstration, we simulate the model's prediction.
  // Replace this with your model inference code.
  const simulateInference = () => {
    return Math.random() > 0.5 ? "Real" : "Fake";
  };

  const result = simulateInference();

  // Optionally, you can delete the file after processing.
  // fs.unlinkSync(filePath);

  res.json({ result });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
