import { Box, Container, Typography, Card, CardContent, Stack } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ViewListIcon from '@mui/icons-material/ViewList';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PaletteIcon from '@mui/icons-material/Palette';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { features } from '../data/content';

const icons = {
  Storage: StorageIcon,
  FilterAlt: FilterAltIcon,
  ViewList: ViewListIcon,
  CheckBox: CheckBoxIcon,
  Palette: PaletteIcon,
  WorkspacePremium: WorkspacePremiumIcon,
};

export default function Features() {
  return (
    <Box id="features" component="section" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 72 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 40 }, mb: 1 }}>
          Everything you need from ag-Grid
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 5, maxWidth: 640 }}>
          A curated, strongly-typed surface over the ag-Grid options — configured from C#,
          wired through JS interop.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
          }}
        >
          {features.map((f) => {
            const Icon = icons[f.icon];
            return (
              <Card
                key={f.title}
                variant="outlined"
                sx={{
                  height: '100%',
                  transition: 'box-shadow .2s, transform .2s',
                  '&:hover': { boxShadow: 6, transform: 'translateY(-3px)' },
                }}
              >
                <CardContent>
                  <Stack spacing={1.5}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        display: 'grid',
                        placeItems: 'center',
                        bgcolor: 'primary.main',
                        color: 'common.white',
                      }}
                    >
                      {Icon ? <Icon /> : null}
                    </Box>
                    <Typography variant="h6">{f.title}</Typography>
                    <Typography color="text.secondary">{f.body}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
