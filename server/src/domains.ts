// Domain-specific translation contexts and glossaries

export interface DomainConfig {
  name: string;
  description: string;
  systemPrompt: string;
  // Terms that must be translated exactly this way: { "source term": { "es": "translation", "fr": "..." } }
  glossary: Record<string, Record<string, string>>;
  // Terms that should NOT be translated (acronyms, program names)
  doNotTranslate: string[];
}

export const DOMAINS: Record<string, DomainConfig> = {
  ngo: {
    name: "NGO / Humanitarian",
    description: "UN agencies, humanitarian orgs, development sector",
    systemPrompt: `You are interpreting at a humanitarian/NGO event. Use standard humanitarian sector terminology. Be precise with technical terms. Maintain formal but accessible register. Key principles:
- Use established humanitarian terminology (IASC, Sphere Standards)
- Preserve acronyms as-is unless they have an established translation
- "Accountability" means accountability to affected populations, not financial
- "Protection" refers to protection of civilians/rights, not physical security
- "Capacity building" is a standard term, translate as the established equivalent`,
    glossary: {
      // Core humanitarian terms
      "accountability": { "es": "rendición de cuentas", "fr": "redevabilité", "ru": "подотчётность", "ar": "المساءلة", "de": "Rechenschaftspflicht" },
      "capacity building": { "es": "fortalecimiento de capacidades", "fr": "renforcement des capacités", "ru": "наращивание потенциала", "ar": "بناء القدرات", "de": "Kapazitätsaufbau" },
      "resilience": { "es": "resiliencia", "fr": "résilience", "ru": "устойчивость", "ar": "المرونة", "de": "Resilienz" },
      "food security": { "es": "seguridad alimentaria", "fr": "sécurité alimentaire", "ru": "продовольственная безопасность", "ar": "الأمن الغذائي", "de": "Ernährungssicherheit" },
      "livelihoods": { "es": "medios de vida", "fr": "moyens de subsistance", "ru": "средства к существованию", "ar": "سبل العيش", "de": "Lebensgrundlagen" },
      "gender-based violence": { "es": "violencia de género", "fr": "violence basée sur le genre", "ru": "гендерное насилие", "ar": "العنف القائم على النوع الاجتماعي", "de": "geschlechtsspezifische Gewalt" },
      "internally displaced persons": { "es": "personas desplazadas internas", "fr": "personnes déplacées internes", "ru": "внутренне перемещённые лица", "ar": "النازحون داخلياً", "de": "Binnenvertriebene" },
      "refugee": { "es": "refugiado", "fr": "réfugié", "ru": "беженец", "ar": "لاجئ", "de": "Flüchtling" },
      "asylum seeker": { "es": "solicitante de asilo", "fr": "demandeur d'asile", "ru": "лицо, ищущее убежище", "ar": "طالب لجوء", "de": "Asylbewerber" },
      "humanitarian corridor": { "es": "corredor humanitario", "fr": "corridor humanitaire", "ru": "гуманитарный коридор", "ar": "ممر إنساني", "de": "humanitärer Korridor" },
      "needs assessment": { "es": "evaluación de necesidades", "fr": "évaluation des besoins", "ru": "оценка потребностей", "ar": "تقييم الاحتياجات", "de": "Bedarfsanalyse" },
      "cluster": { "es": "clúster", "fr": "cluster", "ru": "кластер", "ar": "مجموعة", "de": "Cluster" },
      "stakeholder": { "es": "parte interesada", "fr": "partie prenante", "ru": "заинтересованная сторона", "ar": "صاحب المصلحة", "de": "Interessengruppe" },
      "beneficiary": { "es": "beneficiario", "fr": "bénéficiaire", "ru": "бенефициар", "ar": "المستفيد", "de": "Begünstigter" },
      "monitoring and evaluation": { "es": "monitoreo y evaluación", "fr": "suivi et évaluation", "ru": "мониторинг и оценка", "ar": "الرصد والتقييم", "de": "Monitoring und Evaluierung" },
      "terms of reference": { "es": "términos de referencia", "fr": "termes de référence", "ru": "техническое задание", "ar": "الاختصاصات", "de": "Aufgabenbeschreibung" },
      "do no harm": { "es": "no hacer daño", "fr": "ne pas nuire", "ru": "не навреди", "ar": "عدم الإضرار", "de": "keinen Schaden anrichten" },
      "duty of care": { "es": "deber de diligencia", "fr": "devoir de diligence", "ru": "обязанность проявлять осторожность", "ar": "واجب الرعاية", "de": "Sorgfaltspflicht" },
      "safeguarding": { "es": "salvaguarda", "fr": "sauvegarde", "ru": "обеспечение защиты", "ar": "الحماية", "de": "Schutzmaßnahmen" },
      "cash transfer": { "es": "transferencia de efectivo", "fr": "transfert monétaire", "ru": "денежный перевод", "ar": "التحويل النقدي", "de": "Bargeldtransfer" },
      "psychosocial support": { "es": "apoyo psicosocial", "fr": "soutien psychosocial", "ru": "психосоциальная поддержка", "ar": "الدعم النفسي الاجتماعي", "de": "psychosoziale Unterstützung" },
      "local partner": { "es": "socio local", "fr": "partenaire local", "ru": "местный партнёр", "ar": "الشريك المحلي", "de": "lokaler Partner" },
      "donor": { "es": "donante", "fr": "donateur", "ru": "донор", "ar": "المانح", "de": "Geber" },
      "grant": { "es": "subvención", "fr": "subvention", "ru": "грант", "ar": "منحة", "de": "Zuschuss" },
      "proposal": { "es": "propuesta", "fr": "proposition", "ru": "заявка", "ar": "مقترح", "de": "Antrag" },
      "field office": { "es": "oficina de campo", "fr": "bureau de terrain", "ru": "полевой офис", "ar": "المكتب الميداني", "de": "Außenstelle" },
      "humanitarian access": { "es": "acceso humanitario", "fr": "accès humanitaire", "ru": "гуманитарный доступ", "ar": "الوصول الإنساني", "de": "humanitärer Zugang" },
      "early recovery": { "es": "recuperación temprana", "fr": "relèvement précoce", "ru": "раннее восстановление", "ar": "التعافي المبكر", "de": "Frühwiederherstellung" },
      "disaster risk reduction": { "es": "reducción del riesgo de desastres", "fr": "réduction des risques de catastrophe", "ru": "снижение риска бедствий", "ar": "الحد من مخاطر الكوارث", "de": "Katastrophenvorsorge" },
    },
    doNotTranslate: [
      "UNHCR", "UNICEF", "WHO", "WFP", "OCHA", "UNDP", "UNFPA", "IOM", "ICRC",
      "IFRC", "MSF", "IRC", "NRC", "CARE", "Oxfam", "Save the Children",
      "WASH", "GBV", "IDP", "NFI", "PSEA", "AAP", "CHS", "CERF",
      "HRP", "HNO", "SRP", "IASC", "ERC", "HC", "HCT", "INGO",
      "M&E", "ToR", "MoU", "PoC", "RRM", "MEAL", "PDM", "DTM",
      "SDG", "COP", "UNFCCC", "GCR", "GCM",
    ],
  },

  general: {
    name: "General",
    description: "General-purpose interpretation",
    systemPrompt: "You are interpreting general speech. Use natural, clear language appropriate for the context.",
    glossary: {},
    doNotTranslate: [],
  },
};

export function getDomain(domainId: string): DomainConfig {
  return DOMAINS[domainId] || DOMAINS.general;
}

// Build glossary instruction string for a specific target language
export function buildGlossaryPrompt(domain: DomainConfig, targetLang: string): string {
  const entries: string[] = [];

  // Glossary terms
  for (const [term, translations] of Object.entries(domain.glossary)) {
    const translation = translations[targetLang];
    if (translation) {
      entries.push(`"${term}" → "${translation}"`);
    }
  }

  // Do-not-translate terms
  const dnt = domain.doNotTranslate;

  let prompt = "";
  if (entries.length > 0) {
    prompt += `\n\nGlossary (use these exact translations):\n${entries.join("\n")}\n`;
  }
  if (dnt.length > 0) {
    prompt += `\nDo NOT translate these terms (keep as-is): ${dnt.join(", ")}\n`;
  }
  return prompt;
}
