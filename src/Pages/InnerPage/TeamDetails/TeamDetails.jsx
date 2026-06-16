import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import TeamDetailsMain from './TeamDetailsMain';
// import Subscribe from '../../../Component1/Subscribe/Subscribe';
import { useParams } from 'react-router-dom';
import { useDoctorDetailQuery } from '../../../api/hooks/doctor/useDoctorQueries';
import Loading from '../../../Shared/Loading/Loading';
import HelmetChanger from '../../../Shared/Helmet/Helmet';

const TeamDetails = () => {
  const { id } = useParams();
  const { data: response, isLoading, isError } = useDoctorDetailQuery(id);

  const doctor = response?.data && !Array.isArray(response.data) ? response.data : null;

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-BodyBg-0'>
        <Loading />
      </div>
    );
  }

  if (isError || !doctor) {
    return (
      <>
        <BreadCrumb
          breadCrumbTitle={'Thông tin chi tiết'}
          breadCrumbIcon={<FaArrowRightLong />}
          breadCrumbLink={'Thông tin chi tiết'}
        />
        <section className='py-28 bg-BodyBg-0'>
          <div className='Container'>
            <p className='font-AlbertSans text-TextColor2-0 text-center text-xl'>
              Không tìm thấy bác sĩ hoặc không tải được.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <HelmetChanger
        title={doctor.fullName || 'Thông tin chi tiết'}
        description={`${doctor.fullName} - ${doctor.specialty?.name || 'Bác sĩ'}`}
        image={doctor.imageUrl}
        url={`/team-details/${id}`}
        type="profile"
      />
      <BreadCrumb
        breadCrumbTitle={'Thông tin chi tiết'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={doctor.fullName || 'Chi tiết bác sĩ'}
        url={`/team-details/${id}`}
      />
      <TeamDetailsMain doctor={doctor} />
      {/* <Subscribe /> */}
    </>
  );
};

export default TeamDetails;
