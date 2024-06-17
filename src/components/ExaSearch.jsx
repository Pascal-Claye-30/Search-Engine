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

    const jobSpecificQuery = `${query} new job openings not filled`;

    const response = await fetch('https://api.exa.ai/search', {
      method: 'POST',
      headers: new Headers({
        'x-api-key': 'YOUR_API_KEY_HERE',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        query: jobSpecificQuery,
        numResults: 10,
        useAutoprompt: true, // Ensures the query is adapted to Exa's search style
        category: 'company', // Focus on company-related data if applicable
      }),
    });

    const data = await response.json();

    // Filter results to show only new job positions not filled
    const filteredResults = data.results.filter(result =>
      result.title && result.title.toLowerCase().includes('job')
    );

    setResults(filteredResults);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container>
      <CssBaseline />
      <Box sx={{ my: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Find Hidden Job Positions
        </Typography>
        <TextField
          fullWidth
          label="Search job positions"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        <List sx={{ mt: 2 }}>
          {results.map((result) => (
            <ListItem
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