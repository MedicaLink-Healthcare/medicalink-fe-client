const Map = () => {
  return (
    <section className='bg-BodyBg-0 pb-[120px]'>
      <div className='Container'>
        <div
          className='relative'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8997713444705!2d108.19725807457212!3d16.07069008460901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421852305f2481%3A0xce421714551517f6!2zMjU5IFRy4bqnbiBDYW8gVsOibiwgVGhhbmggS2jDqiwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaWV0bmFt!5e0!3m2!1sen!2sbd!4v1781796731585!5m2!1sen!2sbd"
            width='100%'
            height='500'
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='rounded-3xl w-full border-2 border-white'
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Map;
