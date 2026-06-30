import FaqAccordion from './FaqAccordion';

const Faq = () => {
  //  All Faqs and  answers.
  const Faqs = [
    {
      faqNumber: '01',
      title: 'Phải làm sao nếu bệnh nhân của tôi không có người hiến tủy phù hợp?',
      text: 'Các giải pháp thay thế trong mạng lưới môi trường linh hoạt giúp đội ngũ của chúng tôi đạt được kết quả tối ưu thông qua các phương pháp tiên tiến. Kiến tạo mạnh mẽ các cơ hội phát triển hoặc áp dụng các phương pháp thiết kế hàng đầu.',
      active: false,
    },
    {
      faqNumber: '02',
      title: 'Khoa Cấp cứu được bố trí nhân sự như thế nào?',
      text: 'Các giải pháp thay thế trong mạng lưới môi trường linh hoạt giúp đội ngũ của chúng tôi đạt được kết quả tối ưu thông qua các phương pháp tiên tiến. Kiến tạo mạnh mẽ các cơ hội phát triển hoặc áp dụng các phương pháp thiết kế hàng đầu.',
      active: false,
    },
    {
      faqNumber: '03',
      title: 'Tôi nên mang theo những gì cho lần hẹn khám đầu tiên?',
      text: 'Các giải pháp thay thế trong mạng lưới môi trường linh hoạt giúp đội ngũ của chúng tôi đạt được kết quả tối ưu thông qua các phương pháp tiên tiến. Kiến tạo mạnh mẽ các cơ hội phát triển hoặc áp dụng các phương pháp thiết kế hàng đầu.',
      active: true,
    },
  ];

  return (
    <div className='w-full mx-auto'>
      <div
        data-aos='fade-up'
        data-aos-duration='1000'
      >
        {Faqs.map((faq, index) => (
          <FaqAccordion
            key={index}
            title={faq.title}
            faqNumber={faq.faqNumber}
            id={`faqs-${index}`}
            active={faq.active}
          >
            {faq.text}
          </FaqAccordion>
        ))}
      </div>
    </div>
  );
};

export default Faq;
