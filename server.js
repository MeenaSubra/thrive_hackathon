const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('path'); // Import for file path handling

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formdata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema for the form data
const formSchema = new mongoose.Schema({
  // ... your form data fields (lastName, firstName, etc.)
});

// Create a model for the form data
const FormData = mongoose.model('FormData', formSchema, 'form');

// Endpoint to handle form submissions (optional, if needed)
// ... (similar to previous code)

// Enhanced endpoint to generate PDF (with data and styling)
app.post('/generate-pdf', async (req, res) => {
  try {
    const formData = await FormData.find(); // Fetch all form data

    if (!formData || formData.length === 0) {
      return res.status(404).json({ message: 'No form data found in database' });
    }

    const formDataObject = formData[0]; // Assuming you want the first entry

    // Path to your sample PDF template (replace with your actual path)
    const templatePath = './path/to/your/sample.pdf';

    // Load the PDF template
    const pdfDoc = await PDFDocument.load(templatePath);

    // Get the first page of the template
    const page = pdfDoc.getPages()[0];

    // Define fonts (replace with your desired font names)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Function to create formatted text content (adjust as needed)
    const formatText = (fieldName, value, font, fontSize) => {
      return `${fieldName}: ${value}\n`; // Adjust formatting
    };

    // Extract text fields from the template (replace with actual field names)
    const lastNameField = page.getTextContent().items.find(
      (item) => item.str === 'Last Name:'
    );
    const firstNameField = page.getTextContent().items.find(
      (item) => item.str === 'First Name:'
    );
    // ... (add other field extractions as needed)

    // Update text content with data (adjust coordinates and font sizes)
    page.drawText(formatText('Last Name:', formDataObject.lastName, helveticaBold, 12), {
      x: lastNameField.x,
      y: lastNameField.y,
    });
    page.drawText(formatText('First Name:', formDataObject.firstName, helvetica, 12), {
      x: firstNameField.x,
      y: firstNameField.y - 10, // Adjust vertical spacing
    });
    // ... (update other fields as needed)

    // Serialize the updated PDF to a buffer
    const pdfBytes = await pdfDoc.save();

    // Send PDF buffer as response with correct content type
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBytes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

  app.get('/', (req, res) => {
    res.send('Server is running');
  });
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
});
