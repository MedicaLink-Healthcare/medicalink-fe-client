import circleShape from '/images/crcle-bg.png';
import AppointmentBooking from './AppointmentBooking';

const Appointment = () => {
  return (
    <section className='relative z-10 overflow-hidden bg-BodyBg-0 px-5 pt-[106px] pb-[120px] 2xl:px-20'>
      <div className='absolute -top-1/2 left-1/2 -z-10 -translate-x-1/2'>
        <img
          src={circleShape}
          draggable='false'
          className='w-[inherit] max-w-[inherit]'
          alt=''
        />
      </div>
      <div className='mb-12 text-center'>
        <h1 className='font-AlbertSans text-xl leading-[30px] font-bold uppercase text-HeadingColor-0 sm:text-3xl sm:leading-[40px] md:text-[40px] md:leading-[50px] lg:text-[50px] lg:leading-[60px] xl:text-[52px] xl:leading-[62px] 2xl:text-[60px] 2xl:leading-[70px]'>
          Đặt Lịch Khám
        </h1>
        <p className='font-DMSans text-TextColor2-0 mx-auto mt-3 max-w-2xl text-sm md:text-base'>
          Chọn bác sĩ, chọn thời gian phù hợp, sau đó xác nhận với thông tin liên hệ của bạn. Chỉ sử dụng một địa điểm phòng khám — không có bước chọn địa điểm riêng.
        </p>
      </div>
      <div className='rounded-[30px] border-2 border-white border-opacity-80 bg-white bg-opacity-20 py-12 md:py-[72px]'>
        <div className='Container'>
          <AppointmentBooking />
        </div>
      </div>
    </section>
  );
};

export default Appointment;
