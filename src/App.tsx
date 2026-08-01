import Header from './components/Header/Header';
import CelestialCarousel from './components/CelestialCarousel/CelestialCarousel';
import GamesSection from './components/GamesSection/GamesSection';
import LeadForm from './components/LeadForm/LeadForm';
import Footer from './components/Footer/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';
import './styles/globals.css';

function App() {
  useScrollReveal();

  return (
    <div className="app-container">
      <Header />
      <CelestialCarousel />
      <GamesSection />
      <LeadForm />
      <Footer />
    </div>
  );
}

export default App;
