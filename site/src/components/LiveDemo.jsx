import { useState } from 'react';
import { Box, Container, Typography, Paper, Stack, CircularProgress, Alert, Link } from '@mui/material';
import { REPO_URL } from '../data/content';

// The embedded app is the published Example2 (standalone Blazor WASM), assembled
// into <base>/demo/ at deploy time. import.meta.env.BASE_URL is '/blazor-ag-grid/'.
const demoUrl = `${import.meta.env.BASE_URL}demo/`;

export default function LiveDemo() {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      id="demo"
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f8fafc', scrollMarginTop: 72 }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 40 }, mb: 1 }}>
          Live demo
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 680 }}>
          The grid below is the real <strong>Example2</strong> Blazor WebAssembly app running in
          your browser. Enterprise features run in watermarked trial mode (no license key).
        </Typography>

        <Paper variant="outlined" sx={{ overflow: 'hidden', borderRadius: 3 }}>
          {/* Faux browser chrome */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ px: 2, py: 1.25, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#fff' }}
          >
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef4444' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f59e0b' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#22c55e' }} />
            <Box
              sx={{
                ml: 2,
                flexGrow: 1,
                bgcolor: '#f1f5f9',
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
                color: 'text.secondary',
                fontFamily: 'monospace',
                fontSize: 13,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {demoUrl}
            </Box>
          </Stack>

          <Box sx={{ position: 'relative', height: { xs: 520, md: 640 }, bgcolor: '#fff' }}>
            {!loaded && (
              <Stack
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{ position: 'absolute', inset: 0 }}
              >
                <CircularProgress />
                <Typography color="text.secondary">Loading the Blazor WASM demo…</Typography>
              </Stack>
            )}
            <Box
              component="iframe"
              title="BlazorAgGrid live demo (Example2)"
              src={demoUrl}
              onLoad={() => setLoaded(true)}
              sx={{ width: '100%', height: '100%', border: 0, display: 'block' }}
            />
          </Box>
        </Paper>

        <Alert severity="info" variant="outlined" sx={{ mt: 2 }}>
          Not loading? The demo is published by the GitHub Pages workflow. Run any example
          locally from the{' '}
          <Link href={REPO_URL} target="_blank" rel="noopener">
            repository
          </Link>{' '}
          with <code>dotnet run</code>.
        </Alert>
      </Container>
    </Box>
  );
}
