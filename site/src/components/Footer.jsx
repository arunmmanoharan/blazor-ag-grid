import { Box, Container, Typography, Stack, Link, Divider } from '@mui/material';
import { REPO_URL, UPSTREAM_URL, AG_GRID_URL, NUGET_URL } from '../data/content';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#0f172a', color: 'grey.400', py: 6 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Box>
            <Typography sx={{ color: 'common.white', fontWeight: 700, mb: 0.5 }}>
              BlazorAgGrid
            </Typography>
            <Typography variant="body2">
              MIT licensed. ag-Grid Enterprise features require a commercial ag-Grid license.
            </Typography>
          </Box>
          <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
            <Link href={REPO_URL} target="_blank" rel="noopener" color="inherit">GitHub</Link>
            <Link href={NUGET_URL} target="_blank" rel="noopener" color="inherit">NuGet</Link>
            <Link href={AG_GRID_URL} target="_blank" rel="noopener" color="inherit">ag-Grid</Link>
            <Link href={UPSTREAM_URL} target="_blank" rel="noopener" color="inherit">Upstream</Link>
          </Stack>
        </Stack>
        <Divider sx={{ my: 3, borderColor: 'grey.800' }} />
        <Typography variant="body2">
          A fork of{' '}
          <Link href={UPSTREAM_URL} target="_blank" rel="noopener" color="inherit" underline="always">
            ebekker/blazor-ag-grid
          </Link>
          {' '}— all original credit to @ebekker. Upgraded to ag-Grid v36 and .NET 10.
        </Typography>
      </Container>
    </Box>
  );
}
