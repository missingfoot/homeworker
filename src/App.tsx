import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeworkUpload from './components/HomeworkUpload';
import HomeworkList from './components/HomeworkList';
import StudentDashboard from './components/StudentDashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<HomeworkList />} />
            <Route path="/upload" element={<HomeworkUpload />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App; 