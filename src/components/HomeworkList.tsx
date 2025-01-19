import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';

interface HomeworkEntry {
  id: string;
  imageUrl: string;
  text: string;
  timestamp: number;
}

const HomeworkList: React.FC = () => {
  const homeworkList: HomeworkEntry[] = JSON.parse(localStorage.getItem('homework') || '[]');

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Homework History
      </Typography>
      <Grid container spacing={3}>
        {homeworkList.map((homework) => (
          <Grid item xs={12} key={homework.id}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <img 
                      src={homework.imageUrl} 
                      alt="Homework" 
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {homework.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(homework.timestamp).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeworkList; 