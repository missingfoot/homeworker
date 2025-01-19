import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Homework Analyzer
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            History
          </Button>
          <Button color="inherit" component={RouterLink} to="/upload">
            Upload
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 