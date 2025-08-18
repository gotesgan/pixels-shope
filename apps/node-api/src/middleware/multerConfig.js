import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the directory where files will be uploaded
const direcName = path.join(__dirname, "../../public/upload");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Set the destination folder
    callback(null, direcName);
  },
  filename: (req, file, callback) => {
    // Extract the original file extension
    const extension = path.extname(file.originalname);
    // Generate a unique filename with the same extension
    callback(null, `image${Date.now()}${extension}`);
  },
});

// Create the multer instance with the defined storage
const upload = multer({ storage });

// Export variables for use in other modules
export default upload;
