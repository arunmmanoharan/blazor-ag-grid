import { AppBar, Toolbar, Container, Box, Button, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GridOnIcon from '@mui/icons-material/GridOn';
import { REPO_URL } from '../data/content';

const links = [
  ['Features', '#features'],
  ['Demo', '#demo'],
  ['Quick start', '#quickstart'],
  ['Examples', '#examples'],
];

export default function NavBar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{ borderBottom: '1px solid', borderColor: 'divider', backdropFilter: 'blur(8px)' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ fontWeight: 800 }}>
            <GridOnIcon color="primary" />
            <Box component="span" sx={{ fontSize: 18 }}>BlazorAgGrid</Box>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {links.map(([label, href]) => (
              <Button key={href} href={href} color="inherit">
                {label}
              </Button>
            ))}
          </Stack>
          <Button
            variant="contained"
            href={REPO_URL}
            target="_blank"
            rel="noopener"
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
