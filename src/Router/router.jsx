import Home1 from '../Pages/Home1/Home1';
import ErrorPage from '../Shared/ErrorPage/ErrorPage';
import AboutInner from '../Pages/InnerPage/AboutInner/AboutInner';
import ProjectDetails from '../Pages/InnerPage/ProjectDetails/ProjectDetails';
import ServiceInner from '../Pages/InnerPage/ServiceInner/ServiceInner';
import BlogDetails from '../Pages/InnerPage/BlogDetails/BlogDetails';
import ServiceDetails from '../Pages/InnerPage/ServiceDetails/ServiceDetails';
import BlogGrid from '../Pages/InnerPage/BlogGrid/BlogGrid';
import ContactInner from '../Pages/InnerPage/ContactInner/ContactInner';
import TeamInner from '../Pages/InnerPage/TeamInner/TeamInner';
import AppointmentInner from '../Pages/InnerPage/Appointment/AppointmentInner';
import ProjectInner from '../Pages/InnerPage/ProjectInner/ProjectInner';
import TestimonialInner from '../Pages/InnerPage/TestimonialInner/TestimonialInner';
import FaqInner from '../Pages/InnerPage/Faq/FaqInner';
import TeamDetails from '../Pages/InnerPage/TeamDetails/TeamDetails';
import BlogLeftSidebar from '../Pages/InnerPage/BlogLeftSidebar/BlogLeftSidebar';
import BlogRightSidebar from '../Pages/InnerPage/BlogRightSidebar/BlogRightSidebar';
import PatientLookup from '../Pages/InnerPage/PatientLookup/PatientLookup';
import { createBrowserRouter } from 'react-router-dom';
import Main4 from '../Main/Main4';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main4 />,
    children: [
      { path: '', element: <Home1 /> },
      { path: 'about', element: <AboutInner /> },
      { path: 'project_details/:id', element: <ProjectDetails /> },
      { path: 'service', element: <ServiceInner /> },
      { path: 'service_details/:id', element: <ServiceDetails /> },
      { path: 'project', element: <ProjectInner /> },
      { path: 'testimonial', element: <TestimonialInner /> },
      { path: 'team', element: <TeamInner /> },
      { path: 'team_details/:id', element: <TeamDetails /> },
      { path: 'blog_grid', element: <BlogGrid /> },
      { path: 'blog_left_sidebar', element: <BlogLeftSidebar /> },
      { path: 'blog_right_sidebar', element: <BlogRightSidebar /> },
      { path: 'blog_details/:slug', element: <BlogDetails /> },
      { path: 'appointment', element: <AppointmentInner /> },
      { path: 'faqs', element: <FaqInner /> },
      { path: 'contact', element: <ContactInner /> },
      { path: 'patient_lookup', element: <PatientLookup /> },
    ],
  },
  { path: '*', element: <ErrorPage /> },
]);

export default router;
