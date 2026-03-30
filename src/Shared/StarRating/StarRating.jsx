import { MdOutlineStarPurple500 } from 'react-icons/md';

/* eslint-disable react/prop-types */
export default function StarRating({
  rating = 5,
  max = 5,
  className = '',
  sizeClass = 'text-2xl',
}) {
  const n = Math.min(Math.max(Math.round(Number(rating) || 0), 0), max);
  return (
    <ul className={`flex gap-1 items-center ${className}`}>
      {Array.from({ length: max }).map((_, i) => (
        <li
          key={i}
          className={`${sizeClass} ${i < n ? 'text-[#ffb609]' : 'text-gray-300'}`}
        >
          <MdOutlineStarPurple500 />
        </li>
      ))}
    </ul>
  );
}
