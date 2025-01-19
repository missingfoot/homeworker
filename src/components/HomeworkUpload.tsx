import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';

interface HomeworkEntry {
  id: string;
  imageUrl: string;
  text: string;
  timestamp: number;
}

const HomeworkUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    try {
      // Create a local URL for the image display
      const imageUrl = URL.createObjectURL(file);
      
      // Convert image to base64 for API
      const base64Image = await convertToBase64(file);
      
      // Call the AI analysis function
      const response = await fetch('/.netlify/functions/analyzeHomework', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      // Store in local storage
      const homework: HomeworkEntry = {
        id: Date.now().toString(),
        imageUrl,
        text: data.analysis,
        timestamp: Date.now(),
      };

      const existingHomework = JSON.parse(localStorage.getItem('homework') || '[]');
      localStorage.setItem('homework', JSON.stringify([...existingHomework, homework]));

      setResult(data.analysis);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error processing homework: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Upload Homework
        </Typography>
        <Box sx={{ my: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Select Image
            </Button>
          </label>
          {file && (
            <Typography variant="body1" sx={{ mt: 1 }}>
              Selected: {file.name}
            </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload and Analyze'}
        </Button>
        {result && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Analysis Result:</Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {result}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default HomeworkUpload; 