export default function SegmentTestimonial({
  testimonial,
}: {
  testimonial: { quote: string; author: string; role: string };
}) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <svg
          className="w-10 h-10 text-blue-200 mx-auto mb-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
        </svg>
        <blockquote className="text-xl sm:text-2xl text-gray-800 leading-relaxed font-medium mb-8">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div>
          <div className="font-bold text-gray-900">{testimonial.author}</div>
          <div className="text-sm text-gray-500 mt-1">{testimonial.role}</div>
        </div>
      </div>
    </section>
  );
}
