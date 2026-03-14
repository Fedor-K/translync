export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://translync.com/#software",
        name: "Translync",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Real-time AI translation for events, churches, NGOs, and conferences. 70+ languages, no hardware required.",
        url: "https://translync.com",
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
        "@id": "https://translync.com/#org",
        name: "Translync",
        url: "https://translync.com",
        description: "AI-powered real-time translation for events and organizations",
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@translync.com",
          contactType: "customer support",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://translync.com/#website",
        url: "https://translync.com",
        name: "Translync",
        publisher: { "@id": "https://translync.com/#org" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://translync.com/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
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
