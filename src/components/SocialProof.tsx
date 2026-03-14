export default function SocialProof() {
  const orgs = [
    "🏛️ Community Church NYC",
    "🌍 Global Outreach NGO",
    "🎤 TechConf Europe",
    "✝️ Hillside Fellowship",
    "🤝 United Nations Forum",
    "🏢 StartupWeek Berlin",
  ];

  return (
    <section className="py-10 bg-gray-50 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider font-medium">
          Trusted by 500+ organizations worldwide
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {orgs.map((org) => (
            <span key={org} className="text-gray-400 font-medium text-sm">
              {org}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
