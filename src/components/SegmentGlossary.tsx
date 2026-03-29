export default function SegmentGlossary({
  glossary,
}: {
  glossary: { headline: string; description: string; terms: string[] };
}) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-12 border border-blue-100">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                Domain Glossary
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {glossary.headline}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {glossary.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-blue-700">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.558" />
                  </svg>
                  <span className="font-semibold">19 languages</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="font-semibold">Consistent every time</span>
                </div>
              </div>
            </div>

            <div className="lg:w-80 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Built-in terms include
                </p>
                <div className="flex flex-wrap gap-2">
                  {glossary.terms.map((term) => (
                    <span
                      key={term}
                      className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-lg border border-blue-100"
                    >
                      {term}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  + dozens more domain-specific terms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
