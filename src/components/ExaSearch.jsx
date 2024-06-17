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
  CssBaseline,
  Box,
} from '@mui/material';
import fetch, { Headers } from 'cross-fetch';

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
    <Container className="container">
      <CssBaseline />
      <Box sx={{ my: 1, width: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lucky 7 Links
        </Typography>
        <TextField
          className="search-field"
          label="Search query"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
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
  );
};

export default ExaSearch;