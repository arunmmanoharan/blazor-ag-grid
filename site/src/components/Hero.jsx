import { Box, Container, Typography, Stack, Button, Chip, Link } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GitHubIcon from '@mui/icons-material/GitHub';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { REPO_URL, NUGET_URL, UPSTREAM_URL } from '../data/content';

export default function Hero() {
  return (
    <Box
      sx={{
        color: 'common.white',
        background:
          'radial-gradient(1200px 500px at 70% -10%, #1e3a8a 0%, transparent 60%), linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} sx={{ maxWidth: 820 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="ag-Grid v36" color="primary" size="small" />
            <Chip label=".NET 10" variant="outlined" size="small" sx={{ color: 'grey.300', borderColor: 'grey.700' }} />
            <Chip label="Community + Enterprise" variant="outlined" size="small" sx={{ color: 'grey.300', borderColor: 'grey.700' }} />
          </Stack>

          <Typography variant="h1" sx={{ fontSize: { xs: 40, md: 62 }, lineHeight: 1.05 }}>
            The ag-Grid data grid,<br />wrapped for Blazor.
          </Typography>

          <Typography variant="h6" sx={{ color: 'grey.300', fontWeight: 400, maxWidth: 680 }}>
            A Blazor component over the ag-Grid v36 JavaScript data grid — client-side and
            infinite row models, sorting, filtering, pagination, selection, the Theming API,
            and Enterprise features. Works with Blazor WebAssembly and Server.
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ pt: 1 }}>
            <Button size="large" variant="contained" href="#demo" startIcon={<PlayArrowIcon />}>
              Live demo
            </Button>
            <Button
              size="large"
              variant="outlined"
              href={REPO_URL}
              target="_blank"
              rel="noopener"
              startIcon={<GitHubIcon />}
              sx={{ color: 'common.white', borderColor: 'grey.600' }}
            >
              View on GitHub
            </Button>
            <Button
              size="large"
              variant="text"
              href={NUGET_URL}
              target="_blank"
              rel="noopener"
              startIcon={<Inventory2Icon />}
              sx={{ color: 'grey.300' }}
            >
              NuGet package
            </Button>
          </Stack>

          <Typography variant="body2" sx={{ color: 'grey.400', pt: 2 }}>
            A fork of{' '}
            <Link href={UPSTREAM_URL} target="_blank" rel="noopener" color="inherit" underline="always">
              ebekker/blazor-ag-grid
            </Link>
            . Huge thanks to @ebekker for the original package — this fork upgrades it to
            ag-Grid v36 (Enterprise) and .NET 10.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
