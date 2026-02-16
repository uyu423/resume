import { TestimonialPayload } from '../types/testimonial';

const testimonial: TestimonialPayload = {
  disable: false,
  list: [
    {
      name: 'John Doe',
      title: 'CTO at TechCorp',
      relation: 'Former Manager',
      quote:
        'One of the most reliable engineers I have worked with. Exceptional problem-solving skills and a great team player who consistently delivers high-quality results.',
    },
    {
      name: 'Jane Smith',
      title: 'VP of Engineering at StartupXYZ',
      relation: 'Project Collaborator',
      quote:
        'A rare combination of deep technical expertise and strong business acumen. Their contributions were instrumental in the success of our platform migration.',
    },
  ],
};

export default testimonial;
