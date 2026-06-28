import { Link } from 'react-router-dom';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import serviceDetailsThumb from '/images/service.jpg';
import {
  FaArrowRight,
  FaArrowRightLong,
  FaRegFolderOpen,
  FaUserDoctor,
} from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import icon from '/images/dtls-icn.png';
import icon2 from '/images/dtls-icn2.png';
import callIcon from '/images/call3..png';
import Faq from './Accordion/Faq';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import Subscribe from '../../../Component1/Subscribe/Subscribe';

const ServiceDetails2 = () => {
  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Chi Tiết Dịch Vụ'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Chi Tiết Dịch Vụ'}
      />
      <section className='py-[120px] bg-BodyBg-0'>
        <div className='Container'>
          <div className='grid grid-cols-3 gap-[50px] lg:gap-8 xl:gap-[50px]'>
            <div className='col-span-3 lg:col-span-2'>
              <div
                className='rounded-[30px] overflow-hidden'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <img
                  src={serviceDetailsThumb}
                  draggable='false'
                  className='w-full'
                />
              </div>
              <h2
                className='font-AlbertSans font-bold text-[28px] text-HeadingColor-0 capitalize mt-8'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                Cung Cấp Dịch Vụ Dược Lý Hàng Đầu Thế Giới
              </h2>
              <p
                className='font-AlbertSans text-TextColor2-0 mt-5'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                Đổi mới liên tục mang đến kết quả vượt trội với các phương pháp y tế hàng đầu. Kiến tạo các cơ hội phát triển lấy bệnh nhân làm trung tâm, đảm bảo triển khai đáng tin cậy và xuất sắc.
              </p>
              <p
                className='font-AlbertSans text-TextColor2-0 mt-7 mb-11'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                Không ngừng xây dựng các kỹ năng lãnh đạo xuất sắc và áp dụng các tiêu chuẩn quản lý tiên tiến. Nâng cao chất lượng dịch vụ trên toàn cầu thay vì chỉ giải quyết từng phần. Tích hợp chủ động các kiến trúc phát triển hướng tới khách hàng và cung cấp các dịch vụ trọn gói. Tương tác hiệu quả nhằm tối ưu hóa ROI cùng các sản phẩm tiện ích.
              </p>
              <div className='grid grid-cols-1 sm:grid-cols-2 sm:items-center gap-8 mb-14'>
                <div
                  className='flex gap-6 rounded-2xl border-2 border-white bg-white bg-opacity-25 px-[30px] py-8'
                  data-aos='fade-up'
                  data-aos-duration='1000'
                >
                  <div className='size-20 rounded-full border-2 border-white bg-white bg-opacity-25 flex items-center justify-center'>
                    <img
                      src={icon}
                      draggable='false'
                    />
                  </div>
                  <div className='flex-1'>
                    <h5 className='font-AlbertSans font-bold text-[22px] text-HeadingColor-0'>
                      Đặt Lịch Hẹn
                    </h5>
                    <p className='font-AlbertSans text-TextColor2-0 mt-1'>
                      Xây dựng các giải pháp y tế hiệu quả và triển khai các cơ hội chăm sóc sức khỏe đáng tin cậy.
                    </p>
                  </div>
                </div>
                <div
                  className='flex gap-6 rounded-2xl border-2 border-white bg-white bg-opacity-25 px-[30px] py-8'
                  data-aos='fade-up'
                  data-aos-duration='1000'
                >
                  <div className='size-20 rounded-full border-2 border-white bg-white bg-opacity-25 flex items-center justify-center'>
                    <img
                      src={icon2}
                      draggable='false'
                    />
                  </div>
                  <div className='flex-1'>
                    <h5 className='font-AlbertSans font-bold text-[22px] text-HeadingColor-0'>
                      Nhận Tư Vấn
                    </h5>
                    <p className='font-AlbertSans text-TextColor2-0 mt-1'>
                      Xây dựng các giải pháp y tế hiệu quả và triển khai các cơ hội chăm sóc sức khỏe đáng tin cậy.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className='flex items-center gap-[64px] bg-PrimaryColor-0 rounded-2xl px-10 py-7'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <div className='text-white relative before:absolute before:top-0 before:-right-8 before:w-[2px] before:h-[48px] before:bg-white before:bg-opacity-25'>
                  <FaUserDoctor size={'50'} />
                </div>
                <h4 className='font-DMSans font-medium text-[22px] text-white italic'>
                  Kiến tạo xuất sắc các dịch vụ y tế chuyên sâu, đáp ứng liên tục mọi nhu cầu của khách hàng
                </h4>
              </div>
              <h2
                className='font-AlbertSans font-bold text-[28px] text-HeadingColor-0 capitalize mt-24'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                Lợi Ích Là Gì?
              </h2>
              <p
                className='font-AlbertSans text-TextColor2-0 mt-6 mb-11'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                Trao quyền hiệu quả. Cải tiến đột phá các quy trình dành cho đối tác, thiết lập các tiêu chuẩn vượt trội nhằm mang lại kết quả tốt nhất. Tối ưu hóa các dịch vụ tiện ích để nâng cao trải nghiệm người dùng.
              </p>
              <Faq />
            </div>
            <div className='col-span-3 lg:col-span-1'>
              <div
                className='rounded-2xl px-7 pt-7 pb-6 overflow-hidden bg-white bg-opacity-30 border-2 border-white border-opacity-80 mb-7'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <h4 className='font-AlbertSans font-semibold text-2xl text-HeadingColor-0 pb-2 mb-8 relative before:absolute before:bottom-0 before:left-0 before:w-7 before:h-[2px] before:bg-PrimaryColor-0'>
                  Danh Mục
                </h4>
                <ul className='mt-8'>
                  <li>
                    <Link to={'/service_details'}>
                      <button className='w-full font-AlbertSans text-left text-HeadingColor-0 transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded-md bg-white bg-opacity-30 border-2 border-white border-opacity-80 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-PrimaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:border-PrimaryColor-0 hover:text-white'>
                        <span className='flex items-center gap-3 lg:gap-1 xl:gap-3'>
                          <FaRegFolderOpen className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white' />
                          Chăm Sóc Răng Miệng
                        </span>
                        <FaArrowRightLong className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white' />
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/service_details2'}>
                      <button className='w-full font-AlbertSans text-left text-white transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded-md bg-PrimaryColor-0 bg-opacity-100 border-2 border-PrimaryColor-0 border-opacity-100 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-PrimaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:border-PrimaryColor-0 hover:text-white'>
                        <span className='flex items-center gap-3 lg:gap-1 xl:gap-3'>
                          <FaRegFolderOpen className='text-white transition-all duration-500 group-hover:text-white' />
                          Dược Lý
                        </span>
                        <FaArrowRightLong className='text-white transition-all duration-500 group-hover:text-white' />
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/service_details3'}>
                      <button className='w-full font-AlbertSans text-left text-HeadingColor-0 transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded-md bg-white bg-opacity-30 border-2 border-white border-opacity-80 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-PrimaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:border-PrimaryColor-0 hover:text-white'>
                        <span className='flex items-center gap-3 lg:gap-1 xl:gap-3'>
                          <FaRegFolderOpen className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white' />
                          Phẫu Thuật Thẩm Mỹ
                        </span>
                        <FaArrowRightLong className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white' />
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/service_details4'}>
                      <button className='w-full font-AlbertSans text-left text-HeadingColor-0 transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded-md bg-white bg-opacity-30 border-2 border-white border-opacity-80 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-PrimaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:border-PrimaryColor-0 hover:text-white'>
                        <span className='flex items-center gap-3 lg:gap-1 xl:gap-3'>
                          <FaRegFolderOpen className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white' />
                          Chăm Sóc Tâm Lý
                        </span>
                        <FaArrowRightLong className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white' />
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/service_details5'}>
                      <button className='w-full font-AlbertSans text-left text-HeadingColor-0 transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded-md bg-white bg-opacity-30 border-2 border-white border-opacity-80 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-PrimaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:border-PrimaryColor-0 hover:text-white'>
                        <span className='flex items-center gap-3 lg:gap-1 xl:gap-3'>
                          <FaRegFolderOpen className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white' />
                          Huyết Học
                        </span>
                        <FaArrowRightLong className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white' />
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className='rounded-2xl px-7 pt-7 pb-6 overflow-hidden bg-white bg-opacity-20 border-2 border-white border-opacity-80 mb-7'
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <h4 className='font-AlbertSans font-semibold text-2xl text-HeadingColor-0 pb-2 mb-8 relative before:absolute before:bottom-0 before:left-0 before:w-7 before:h-[2px] before:bg-PrimaryColor-0'>
                  Tài Liệu Tải Xuống
                </h4>
                <ul className='mt-8'>
                  <li>
                    <Link to={'/'}>
                      <button className='w-full font-AlbertSans bg-HeadingColor-0 text-left text-white transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded-lg bg-HoverColor-0 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-PrimaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:text-white'>
                        <span className='flex items-center gap-3'>
                          <BsFileEarmarkPdf
                            size={'20'}
                            className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white'
                          />
                          Báo Cáo Dịch Vụ
                        </span>
                        <HiDownload
                          size={'24'}
                          className='text-white'
                        />
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                      <button className='w-full font-AlbertSans bg-HeadingColor-0 text-left text-white transition-all duration-500 group px-7 py-4 flex items-center justify-between rounded-lg bg-HoverColor-0 mb-3 overflow-hidden z-[1] relative before:absolute before:top-0 before:right-0 before:w-0 before:-z-[1] before:h-full before:bg-PrimaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:text-white'>
                        <span className='flex items-center gap-3'>
                          <BsFileEarmarkPdf
                            size={'20'}
                            className='text-PrimaryColor-0 transition-all duration-500 group-hover:text-white'
                          />
                          Danh Sách Dịch Vụ
                        </span>
                        <HiDownload
                          size={'24'}
                          className='text-white'
                        />
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className="rounded-2xl px-9 overflow-hidden bg-[url('/images/company-bg.png')] bg-cover bg-no-repeat bg-center py-[50px]"
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <div className='relative before:absolute before:size-[90px] before:-top-[10px] before:-left-[10px] before:animate-rotational before:rounded-full before:border-[3px] before:border-dashed before:border-PrimaryColor-0 '>
                  <img
                    src={callIcon}
                    draggable='false'
                  />
                </div>
                <h6 className='font-AlbertSans font-medium text-lg text-white mt-9 mb-2'>
                  Gọi Cho Chúng Tôi Bất Cứ Lúc Nào
                </h6>
                <Link to={'/'}>
                  <button className='font-AlbertSans font-semibold text-2xl text-white'>
                    +123 (4567) 890
                  </button>
                </Link>
                <Link to={'/'}>
                  <button className='font-AlbertSans text-white flex gap-2 items-center mt-4 mb-[52px]'>
                    <MdEmail className='text-xl text-PrimaryColor-0' />
                    example@gmail.com
                  </button>
                </Link>
                <Link to={'/contact'}>
                  <button className='font-AlbertSans text-white flex gap-2 items-center bg-PrimaryColor-0 w-full h-[58px] rounded-md justify-center z-10 relative before:absolute before:top-0 before:right-0 before:scale-0 before:-z-10 before:w-full before:h-full before:bg-SecondaryColor-0 before:rounded before:transition-all before:duration-500 hover:before:scale-100 hover:text-white'>
                    Liên Hệ
                    <FaArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Subscribe />
    </>
  );
};

export default ServiceDetails2;
