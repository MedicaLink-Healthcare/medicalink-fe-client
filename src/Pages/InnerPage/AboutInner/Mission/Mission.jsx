import MissionCard from './MissionCard';
import missionIcon from '/images/m-icon2.png';
import missionIcon2 from '/images/m-icon.png';

const MissionData = [
  {
    id: 1,
    missionIcon: missionIcon,
    missionTitle: 'Sứ mệnh',
    missionDesc: 'Cam kết mang đến dịch vụ y tế chuyên nghiệp, tận tâm và không ngừng đổi mới công nghệ vì sức khỏe cộng đồng.',
  },  {
    id: 2,
    missionIcon: missionIcon2,
    missionTitle: 'Kế hoạch',
    missionDesc: 'Cam kết mang đến dịch vụ y tế chuyên nghiệp, tận tâm và không ngừng đổi mới công nghệ vì sức khỏe cộng đồng.',
  },  {
    id: 3,
    missionIcon: missionIcon,
    missionTitle: 'Tầm nhìn',
    missionDesc: 'Cam kết mang đến dịch vụ y tế chuyên nghiệp, tận tâm và không ngừng đổi mới công nghệ vì sức khỏe cộng đồng.',
  },
];

const Mission = () => {
  return (
    <section className='bg-BodyBg-0'>
      <div className='Container'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-center'>
          {MissionData.map(({ id, missionIcon, missionTitle, missionDesc }) => {
            return (
              <div
                key={id}
                data-aos='fade-up'
                data-aos-duration='1000'
              >
                <MissionCard
                  missionIcon={missionIcon}
                  missionTitle={missionTitle}
                  missionDesc={missionDesc}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Mission;
