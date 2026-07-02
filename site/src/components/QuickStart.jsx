import { useState } from 'react';
import { Box, Container, Typography, Paper, IconButton, Tooltip, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { quickStartImports, quickStartPage } from '../data/content';

function CodeBlock({ label, code }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable (e.g. insecure context) — no-op */
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" color="text.secondary">
        {label}
      </Typography>
      <Paper
        variant="outlined"
        sx={{ position: 'relative', bgcolor: '#0f172a', color: '#e2e8f0', borderRadius: 2, overflow: 'hidden' }}
      >
        <Tooltip title={copied ? 'Copied' : 'Copy'}>
          <IconButton
            onClick={copy}
            size="small"
            sx={{ position: 'absolute', top: 8, right: 8, color: 'grey.400' }}
            aria-label="Copy code"
          >
            {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2.5,
            overflowX: 'auto',
            fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 13.5,
            lineHeight: 1.6,
          }}
        >
          <code>{code}</code>
        </Box>
      </Paper>
    </Box>
  );
}

export default function QuickStart() {
  return (
    <Box id="quickstart" component="section" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 72 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 40 }, mb: 1 }}>
          Quick start
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 5, maxWidth: 680 }}>
          Add the package, expose the component in <code>_Imports.razor</code>, then drop a grid
          onto any page. No <code>&lt;head&gt;</code> changes, no CSS references — the interop and
          styling are bundled.
        </Typography>

        <Stack sx={{ maxWidth: 820 }}>
          <CodeBlock label="_Imports.razor" code={quickStartImports} />
          <CodeBlock label="Pages/GridDemo.razor" code={quickStartPage} />
        </Stack>
      </Container>
    </Box>
  );
}
