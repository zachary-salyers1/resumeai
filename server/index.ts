import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { Buffer } from 'buffer';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// Dynamically import pdf-parse to avoid the test file issue
const getPdfParse = async () => {
  try {
    const pdfParse = await import('pdf-parse/lib/pdf-parse.js');
    return pdfParse.default;
  } catch (error) {
    console.error('Failed to import pdf-parse:', error);
    throw new Error('PDF parsing module not available');
  }
};

app.post('/api/parse-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file provided' });
    }

    const pdfParse = await getPdfParse();
    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);
    
    return res.json({ text: data.text });
  } catch (error) {
    console.error('PDF parsing error:', error);
    return res.status(500).json({ error: 'Failed to parse PDF' });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
