import { Box, Container, Typography, Card, CardContent, CardActions, Button, Chip, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { examples } from '../data/content';

export default function Examples() {
  return (
    <Box
      id="examples"
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f8fafc', scrollMarginTop: 72 }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 40 }, mb: 1 }}>
          Examples
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 5, maxWidth: 680 }}>
          Three runnable sample apps, one per Blazor hosting model — all on .NET 10.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          }}
        >
          {examples.map((e) => (
            <Card key={e.name} variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h6">{e.name}</Typography>
                    <Chip label={e.kind} size="small" color="primary" variant="outlined" />
                  </Stack>
                  <Typography color="text.secondary">{e.body}</Typography>
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button href={e.href} target="_blank" rel="noopener" endIcon={<LaunchIcon />}>
                  View source
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
