export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://translync.app/#software",
        name: "Translync",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Real-time AI translation for events, churches, NGOs, and conferences. 70+ languages, no hardware required.",
        url: "https://translync.app",
        offers: {
          "@type": "Offer",
          price: "3.00",
          priceCurrency: "USD",
          description: "Per hour per language. Pay as you go.",
        },
        featureList: [
          "Real-time speech translation",
          "70+ languages supported",
          "No hardware required",
          "QR code audience access",
          "Live organizer dashboard",
          "Session recording included",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "47",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://translync.app/#org",
        name: "Translync",
        url: "https://translync.app",
        logo: "https://translync.app/icon.svg",
        description: "AI-powered real-time translation for events and organizations",
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@translync.app",
          contactType: "customer support",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://translync.app/#website",
        url: "https://translync.app",
        name: "Translync",
        publisher: { "@id": "https://translync.app/#org" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
