/* eslint-disable react/prop-types */
import StarRating from '@/Shared/StarRating/StarRating';

const FALLBACK_AVATAR = '/images/people.png';

const TestimonialCard = ({
  testiQuote,
  testiProfile,
  testiName,
  testiDesignation,
  testiDesc,
  rating = 5,
}) => {
  return (
    <div className='relative px-2 sm:px-[50px] lg:px-2 xl:px-8 2xl:px-[50px] bg-Secondarycolor-0 bg-[url(/images/test.png)] bg-no-repeat bg-cover bg-center border-2 border-BorderColor2-0 rounded-[30px]'>
      <img src={testiQuote} draggable='false' className='pt-14' />
      <StarRating rating={rating} className='mb-5 mt-9' />
      <p className='font-AlbertSans sm:text-xl lg:text-lg xl:text-xl text-white'>
        {testiDesc}
      </p>
      <div className='flex items-center gap-5 mt-12 lg:mt-[104px] 2xl:mt-[165px] pb-14'>
        <div>
          <img
            src={testiProfile || FALLBACK_AVATAR}
            alt=''
            onError={(e) => {
              e.target.src = FALLBACK_AVATAR;
            }}
          />
        </div>
        <div>
          <h5 className='font-AlbertSans font-semibold inline-block text-white text-2xl mb-1'>
            {testiName}
          </h5>
          <p className='font-DMSans text-[17px] lg:text-base xl:text-[17px] text-TextColor-0'>
            {testiDesignation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
