import { Outlet, useLocation } from 'react-router-dom';
import Footer3 from '../Shared/Footer/Footer3';
// import Cursor from '../Shared/Cursor/Cursor';
import HelmetChanger from '../Shared/Helmet/Helmet';
import BackToTop from '../Shared/BackToTop/BackToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import Navbar from '../Shared/Navbar/Navbar';

const Main4 = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const lenis = new Lenis();

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const getPageTitle = (pathname) => {
    if (pathname === '/') return 'Home';
    if (pathname.includes('/about')) return 'About Us';
    if (pathname.includes('/service')) return 'Services';
    if (pathname.includes('/project')) return 'Projects';
    if (pathname.includes('/testimonial')) return 'Testimonials';
    if (pathname.includes('/team')) return 'Our Team';
    if (pathname.includes('/doctor-ai')) return 'AI Doctor Finder';
    if (pathname.includes('/blog')) return 'Blog';
    if (pathname.includes('/appointment')) return 'Book Appointment';
    if (pathname.includes('/faqs')) return 'FAQs';
    if (pathname.includes('/community-qa')) return 'Community Q&A';
    if (pathname.includes('/contact')) return 'Contact Us';
    if (pathname.includes('/patient_lookup')) return 'Patient Lookup';
    return 'Medicalink';
  };

  return (
    <>
      <HelmetChanger title={getPageTitle(location.pathname)} />
      <Navbar />
      {/* <Cursor /> */}
      <BackToTop />
      <div>
        <Outlet />
      </div>
      <Footer3 />
    </>
  );
};
export default Main4;

