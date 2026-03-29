/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ServiceCard = ({
  serviceIcon,
  serviceIcon2,
  serviceButton,
  serviceUrl,
  serviceTitle,
  serviceDesc,
}) => {
  return (
    <div className='rounded-xl bg-white bg-opacity-20 border-2 border-white border-opacity-75 group relative z-10 pt-10 px-4 sm:px-9 md:px-6 lg:px-4 xl:px-9 pb-9'>
      <div className='flex items-center gap-5'>
        <div className='size-[72px] rounded-full bg-white bg-opacity-20 border-2 border-white border-opacity-75 relative flex items-center justify-center overflow-hidden'>
          <img
  src={serviceIcon}
  draggable="true"
  className="w-10 h-10 object-contain absolute opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 select-none"
/>

<img
  src={serviceIcon2}
  draggable="true"
  className="w-10 h-10 object-contain absolute opacity-100 scale-100 transition-all duration-500 group-hover:opacity-0 group-hover:scale-75 select-none"
/>
        </div>
        <div className='flex-1 inline-block'>
          <Link to={serviceUrl}>
            <button className='font-AlbertSans font-bold text-left text-HeadingColor-0 text-[19px] sm:text-2xl md:text-xl lg:text-lg xl:text-[21px] 2xl:text-2xl transition-all duration-500 group-hover:text-PrimaryColor-0'>
              {serviceTitle}
            </button>
          </Link>
        </div>
      </div>
      <p className='font-AlbertSans text-TextColor2-0 pt-6 pb-7 mb-7 border-b-2 border-white border-opacity-75'>
        {serviceDesc}
      </p>
      <Link to={serviceUrl}>
        <button className='font-AlbertSans text-TextColor2-0 font-medium uppercase transition-all duration-500 group-hover:text-PrimaryColor-0 relative z-10 before:absolute before:left-0 before:bottom-0 before:-z-10 before:w-0 before:h-[1px] before:bg-PrimaryColor-0 before:rounded-full before:transition-all before:duration-500 before:scale-100 group-hover:before:w-full'>
          {serviceButton}
        </button>
      </Link>
    </div>
  );
};

export default ServiceCard;
