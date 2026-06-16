import { FaArrowRightLong } from 'react-icons/fa6';
import Appointment from './Appointment';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
// import Subscribe from '../../../Component1/Subscribe/Subscribe';

const AppointmentInner = () => {
  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Đặt Lịch Khám'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Đặt Lịch Khám'}
      />
      <Appointment />
      {/* <Subscribe /> */}
    </>
  );
};

export default AppointmentInner;
