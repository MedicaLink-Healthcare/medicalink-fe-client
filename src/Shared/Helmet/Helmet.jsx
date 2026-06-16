/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';

const HelmetChanger = ({ title, description, image, url, type = 'website' }) => {
  const siteTitle = title ? `Medicalink - ${title}` : 'Medicalink - Đặt lịch khám bác sĩ AI & tư vấn sức khỏe';
  const siteDescription = description || 'Tìm kiếm bác sĩ AI với gợi ý chuyên khoa thông minh và đặt lịch hẹn trực tuyến. Nền tảng y tế RAG hàng đầu cho người Việt';
  const siteImage = image ? (image.startsWith('http') ? image : `https://medicalink.online${image}`) : 'https://medicalink.online/og-image.png';
  const siteUrl = url ? (url.startsWith('http') ? url : `https://medicalink.online${url}`) : 'https://medicalink.online/';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={siteImage} />
    </Helmet>
  );
};

export default HelmetChanger;
