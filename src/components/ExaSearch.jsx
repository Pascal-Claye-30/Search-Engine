import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
  CssBaseline,
  Box,
  ThemeProvider,
  createTheme
} from '@mui/material';
import fetch, { Headers } from 'cross-fetch';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#242424',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
});

const ExaSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResults([]);

    const response = await fetch('https://api.exa.ai/search', {
      method: 'POST',
      headers: new Headers({
        'x-api-key': 'EXA_API_KEY',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        query,
        numResults: 7,
        useAutoprompt: true, // Ensures the query is adapted to Exa's search style
      }),
    });

    const data = await response.json();
    setResults(data.results);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className="container">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Embeddings-based Search Engine</Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ my: 1, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Secret Search
          </Typography>
          <TextField
            className="search-field"
            label="Search query"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            InputLabelProps={{
              style: { color: theme.palette.text.primary },
            }}
            InputProps={{
              style: { color: theme.palette.text.primary },
            }}
          />
          <Button
            className="search-button"
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
          {loading && <CircularProgress sx={{ mt: 2 }} />}
          <List className="results-list">
            {results.map((result) => (
              <ListItem
                className="result-item"
                ListItemButton
                component="a"
                href={result.url}
                target="_blank"
                key={result.id}
              >
                <ListItemText
                  primary={result.title}
                  secondary={result.url}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ExaSearch;