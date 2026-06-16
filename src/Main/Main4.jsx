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
    if (pathname === '/') return 'Trang chủ';
    if (pathname.includes('/about')) return 'Về chúng tôi';
    if (pathname.includes('/service')) return 'Chuyên khoa';
    if (pathname.includes('/testimonial')) return 'Đánh giá';
    if (pathname.includes('/team')) return 'Đội ngũ bác sĩ';
    if (pathname.includes('/doctor-ai')) return 'AI Tìm Bác sĩ';
    if (pathname.includes('/blog')) return 'Tin tức';
    if (pathname.includes('/appointment')) return 'Đặt lịch khám';
    if (pathname.includes('/faqs')) return 'Câu hỏi thường gặp';
    if (pathname.includes('/community-qa')) return 'Cộng đồng Q&A';
    if (pathname.includes('/contact')) return 'Liên hệ';
    if (pathname.includes('/patient_lookup')) return 'Tra cứu hồ sơ';
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

