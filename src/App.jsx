import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import ScrollToTop from './components/ScrollToTop';
import IntroSplash from './components/IntroSplash';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import PhotographyVideography from './pages/PhotographyVideography';
import BrandPromotions from './pages/BrandPromotions';
import EventManagement from './pages/EventManagement';
import AdvertisingAgency from './pages/AdvertisingAgency';
import FilmProduction from './pages/FilmProduction';

export default function App() {
  return (
    <>
      <IntroSplash />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/ad-films" element={<PhotographyVideography />} />
          <Route path="/services/social-media-marketing" element={<BrandPromotions />} />
          <Route path="/services/event-management" element={<EventManagement />} />
          <Route path="/services/advertising-agency" element={<AdvertisingAgency />} />
          <Route path="/services/film-production" element={<FilmProduction />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
