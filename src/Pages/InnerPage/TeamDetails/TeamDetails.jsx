import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import TeamDetailsMain from './TeamDetailsMain';
import Subscribe from '../../../Component1/Subscribe/Subscribe';
import { useParams } from 'react-router-dom';
import { useDoctorDetailQuery } from '../../../api/hooks/doctor/useDoctorQueries';
import Loading from '../../../Shared/Loading/Loading';

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
          breadCrumbTitle={'Team Details'}
          breadCrumbIcon={<FaArrowRightLong />}
          breadCrumbLink={'Team Details'}
        />
        <section className='py-28 bg-BodyBg-0'>
          <div className='Container'>
            <p className='font-AlbertSans text-TextColor2-0 text-center text-xl'>
              Doctor not found or failed to load.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Team Details'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={doctor.fullName || 'Chi tiết bác sĩ'}
        url={`/team-details/${id}`}
      />
      <TeamDetailsMain doctor={doctor} />
      <Subscribe />
    </>
  );
};

export default TeamDetails;
