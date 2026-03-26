export default function SegmentSocialProof({ orgs }: { orgs: string[] }) {
  return (
    <section className="py-12 bg-gray-50 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-500 mb-8 uppercase tracking-wider font-medium">
          Trusted by organizations worldwide
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {orgs.map((org) => (
            <span
              key={org}
              className="text-gray-400 font-semibold text-sm tracking-wide"
            >
              {org}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
