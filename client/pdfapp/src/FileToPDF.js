import React, { useState } from 'react';

const FileToPDF = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setHtmlContent(event.target.result);
      setPdfGenerated(false);
    };

    reader.readAsText(file);
  };

  const generatePDF = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ htmlContent }),
      });

      if (response.ok) {
        setPdfGenerated(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>HTML to PDF Converter</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={generatePDF}>Generate PDF</button>
      {pdfGenerated && (
        <a href="http://localhost:5000/output.pdf" download>
          Download PDF
        </a>
      )}
    </div>
  );
};

export default FileToPDF;
