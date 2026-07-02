import { Box } from '@mui/material';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Features from './components/Features';
import LiveDemo from './components/LiveDemo';
import QuickStart from './components/QuickStart';
import Examples from './components/Examples';
import Footer from './components/Footer';

export default function App() {
  return (
    <Box sx={{ scrollBehavior: 'smooth' }}>
      <NavBar />
      <Hero />
      <Features />
      <LiveDemo />
      <QuickStart />
      <Examples />
      <Footer />
    </Box>
  );
}
