import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCreateReviewMutation } from '@/api/hooks/review/useReviewMutations';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';

const DoctorReviews = ({ doctorId }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    body: '',
    authorName: '',
    authorEmail: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending } = useCreateReviewMutation();

  const handleRating = (rate) => setFormData({ ...formData, rating: rate });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { ...formData, doctorId },
      {
        onSuccess: () => {
          setIsSuccess(true);
          setFormData({ rating: 5, title: '', body: '', authorName: '', authorEmail: '' });
          setTimeout(() => setIsSuccess(false), 5000);
        },
      }
    );
  };

  return (
    <div className='max-w-3xl mx-auto py-4'>
      <div className='text-center mb-10'>
        <h3 className='font-AlbertSans font-bold text-3xl text-HeadingColor-0 mb-3'>Share Your Experience</h3>
        <p className='text-TextColor2-0 font-AlbertSans'>Your feedback helps others find the right care.</p>
      </div>

      <form onSubmit={handleSubmit} className='bg-white/60 border-2 border-white rounded-[40px] p-8 sm:p-12 shadow-xl'>
        {/* Rating Selection */}
        <div className='flex flex-col items-center gap-3 mb-10'>
          <span className='font-AlbertSans font-semibold text-HeadingColor-0'>How would you rate your visit?</span>
          <div className='flex gap-2 text-3xl'>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type='button'
                onClick={() => handleRating(star)}
                className='transition-transform hover:scale-125'
              >
                {star <= formData.rating ? (
                  <FaStar className='text-yellow-500 shadow-yellow-200' />
                ) : (
                  <FaRegStar className='text-gray-300' />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <input
            type='text'
            placeholder='Full Name*'
            required
            className='font-AlbertSans text-HeadingColor-0 bg-white/80 border-2 border-white rounded-2xl py-2 px-6 h-[60px] focus:outline-none focus:border-PrimaryColor-0 shadow-sm'
            value={formData.authorName}
            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
          />
          <input
            type='email'
            placeholder='Email Address*'
            required
            className='font-AlbertSans text-HeadingColor-0 bg-white/80 border-2 border-white rounded-2xl py-2 px-6 h-[60px] focus:outline-none focus:border-PrimaryColor-0 shadow-sm'
            value={formData.authorEmail}
            onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
          />
        </div>

        <input
          type='text'
          placeholder='Subject / Title*'
          required
          className='font-AlbertSans text-HeadingColor-0 bg-white/80 border-2 border-white rounded-2xl py-2 px-6 h-[60px] w-full mb-6 focus:outline-none focus:border-PrimaryColor-0 shadow-sm'
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <textarea
          placeholder='Your detailed review...'
          required
          className='font-AlbertSans text-HeadingColor-0 bg-white/80 border-2 border-white rounded-[30px] p-6 h-[180px] w-full mb-8 focus:outline-none focus:border-PrimaryColor-0 resize-none shadow-sm'
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        />

        <div className="flex flex-col items-center gap-4">
          <button
            type='submit'
            disabled={isPending}
            className='primary-btn w-full md:w-auto px-12 group disabled:opacity-50'
          >
            {isPending ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
            <GoArrowRight size='22' className='-rotate-45 group-hover:rotate-0 transition-transform' />
          </button>
          
          {isSuccess && (
            <p className="text-green-600 font-AlbertSans font-semibold animate-fadeIn">
              Thank you! Your review has been submitted successfully.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

DoctorReviews.propTypes = {
  doctorId: PropTypes.string.isRequired,
};

export default DoctorReviews;
