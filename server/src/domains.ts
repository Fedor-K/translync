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
    systemPrompt: `You are interpreting at a humanitarian/NGO event. Use standard humanitarian sector terminology (IASC, Sphere Standards, UNHCR). Be precise with technical terms. Maintain formal but accessible register. Key principles:
- Use established humanitarian terminology consistently
- Preserve acronyms as-is unless they have an established translation in the target language
- "Accountability" means accountability to affected populations, not financial accountability
- "Protection" refers to protection of civilians/rights in humanitarian law, not physical security
- "Food security" is about access to food, not food safety/hygiene
- Keep legal/convention references in their established form
- "Beneficiary" is the standard term; some orgs prefer "affected person" or "participant"`,

    glossary: {
      // ═══ DISPLACEMENT & PROTECTION ═══
      "refugee": {
        es: "refugiado", fr: "réfugié", ru: "беженец",
        ar: "لاجئ", de: "Flüchtling", pt: "refugiado",
      },
      "asylum seeker": {
        es: "solicitante de asilo", fr: "demandeur d'asile", ru: "лицо, ищущее убежище",
        ar: "طالب لجوء", de: "Asylbewerber", pt: "solicitante de asilo",
      },
      "internally displaced person": {
        es: "persona desplazada interna", fr: "personne déplacée interne", ru: "внутренне перемещённое лицо",
        ar: "نازح داخلي", de: "Binnenvertriebene", pt: "pessoa internamente deslocada",
      },
      "stateless person": {
        es: "apátrida", fr: "apatride", ru: "лицо без гражданства",
        ar: "عديم الجنسية", de: "Staatenloser",
      },
      "host community": {
        es: "comunidad de acogida", fr: "communauté d'accueil", ru: "принимающее сообщество",
        ar: "مجتمع مضيف", de: "Aufnahmegemeinschaft",
      },
      "person of concern": {
        es: "persona de interés", fr: "personne relevant de la compétence", ru: "лицо, вызывающее обеспокоенность",
        ar: "شخص موضع اهتمام", de: "Person von Belang",
      },
      "repatriation": {
        es: "repatriación", fr: "rapatriement", ru: "репатриация",
        ar: "إعادة إلى الوطن", de: "Rückführung",
      },
      "resettlement": {
        es: "reasentamiento", fr: "réinstallation", ru: "переселение",
        ar: "إعادة التوطين", de: "Neuansiedlung",
      },
      "durable solution": {
        es: "solución duradera", fr: "solution durable", ru: "долгосрочное решение",
        ar: "حل دائم", de: "dauerhafte Lösung",
      },
      "local integration": {
        es: "integración local", fr: "intégration locale", ru: "местная интеграция",
        ar: "الاندماج المحلي", de: "lokale Integration",
      },
      "non-refoulement": {
        es: "no devolución", fr: "non-refoulement", ru: "невозвращение",
        ar: "عدم الإعادة القسرية", de: "Non-Refoulement",
      },
      "humanitarian corridor": {
        es: "corredor humanitario", fr: "corridor humanitaire", ru: "гуманитарный коридор",
        ar: "ممر إنساني", de: "humanitärer Korridor",
      },
      "humanitarian access": {
        es: "acceso humanitario", fr: "accès humanitaire", ru: "гуманитарный доступ",
        ar: "الوصول الإنساني", de: "humanitärer Zugang",
      },

      // ═══ HUMANITARIAN PRINCIPLES & STANDARDS ═══
      "accountability": {
        es: "rendición de cuentas", fr: "redevabilité", ru: "подотчётность",
        ar: "المساءلة", de: "Rechenschaftspflicht",
      },
      "do no harm": {
        es: "no hacer daño", fr: "ne pas nuire", ru: "не навреди",
        ar: "عدم الإضرار", de: "keinen Schaden anrichten",
      },
      "capacity building": {
        es: "fortalecimiento de capacidades", fr: "renforcement des capacités", ru: "наращивание потенциала",
        ar: "بناء القدرات", de: "Kapazitätsaufbau",
      },
      "resilience": {
        es: "resiliencia", fr: "résilience", ru: "устойчивость",
        ar: "المرونة", de: "Resilienz",
      },
      "empowerment": {
        es: "empoderamiento", fr: "autonomisation", ru: "расширение прав и возможностей",
        ar: "تمكين", de: "Ermächtigung",
      },
      "vulnerability": {
        es: "vulnerabilidad", fr: "vulnérabilité", ru: "уязвимость",
        ar: "هشاشة", de: "Vulnerabilität",
      },
      "gender mainstreaming": {
        es: "transversalización de género", fr: "intégration du genre", ru: "гендерный мейнстриминг",
        ar: "تعميم مراعاة المنظور الجنساني", de: "Gender-Mainstreaming",
      },
      "safeguarding": {
        es: "salvaguarda", fr: "sauvegarde", ru: "обеспечение защиты",
        ar: "الحماية", de: "Schutzmaßnahmen",
      },
      "duty of care": {
        es: "deber de diligencia", fr: "devoir de diligence", ru: "обязанность проявлять заботу",
        ar: "واجب الرعاية", de: "Sorgfaltspflicht",
      },
      "protection": {
        es: "protección", fr: "protection", ru: "защита",
        ar: "حماية", de: "Schutz",
      },

      // ═══ FOOD, HEALTH, WASH ═══
      "food security": {
        es: "seguridad alimentaria", fr: "sécurité alimentaire", ru: "продовольственная безопасность",
        ar: "الأمن الغذائي", de: "Ernährungssicherheit",
      },
      "livelihoods": {
        es: "medios de vida", fr: "moyens de subsistance", ru: "средства к существованию",
        ar: "سبل العيش", de: "Lebensgrundlagen",
      },
      "psychosocial support": {
        es: "apoyo psicosocial", fr: "soutien psychosocial", ru: "психосоциальная поддержка",
        ar: "الدعم النفسي الاجتماعي", de: "psychosoziale Unterstützung",
      },
      "cash transfer": {
        es: "transferencia de efectivo", fr: "transfert monétaire", ru: "денежный перевод",
        ar: "التحويل النقدي", de: "Bargeldtransfer",
      },
      "disaster risk reduction": {
        es: "reducción del riesgo de desastres", fr: "réduction des risques de catastrophe", ru: "снижение риска бедствий",
        ar: "الحد من مخاطر الكوارث", de: "Katastrophenvorsorge",
      },
      "early recovery": {
        es: "recuperación temprana", fr: "relèvement précoce", ru: "раннее восстановление",
        ar: "التعافي المبكر", de: "Frühwiederherstellung",
      },

      // ═══ GBV & SENSITIVE TERMS ═══
      "gender-based violence": {
        es: "violencia de género", fr: "violence basée sur le genre", ru: "гендерное насилие",
        ar: "العنف القائم على النوع الاجتماعي", de: "geschlechtsspezifische Gewalt",
      },
      "sexual and gender-based violence": {
        es: "violencia sexual y de género", fr: "violence sexuelle et basée sur le genre", ru: "сексуальное и гендерное насилие",
        ar: "العنف الجنسي والقائم على النوع الاجتماعي", de: "sexuelle und geschlechtsspezifische Gewalt",
      },

      // ═══ PROGRAM MANAGEMENT ═══
      "needs assessment": {
        es: "evaluación de necesidades", fr: "évaluation des besoins", ru: "оценка потребностей",
        ar: "تقييم الاحتياجات", de: "Bedarfsanalyse",
      },
      "monitoring and evaluation": {
        es: "monitoreo y evaluación", fr: "suivi et évaluation", ru: "мониторинг и оценка",
        ar: "الرصد والتقييم", de: "Monitoring und Evaluierung",
      },
      "terms of reference": {
        es: "términos de referencia", fr: "termes de référence", ru: "техническое задание",
        ar: "الاختصاصات", de: "Aufgabenbeschreibung",
      },
      "logical framework": {
        es: "marco lógico", fr: "cadre logique", ru: "логическая матрица",
        ar: "الإطار المنطقي", de: "logischer Rahmen",
      },
      "theory of change": {
        es: "teoría del cambio", fr: "théorie du changement", ru: "теория изменений",
        ar: "نظرية التغيير", de: "Theorie des Wandels",
      },
      "baseline": {
        es: "línea de base", fr: "situation de référence", ru: "базовый показатель",
        ar: "خط الأساس", de: "Ausgangslage",
      },
      "due diligence": {
        es: "diligencia debida", fr: "diligence raisonnable", ru: "должная осмотрительность",
        ar: "العناية الواجبة", de: "Sorgfaltspflicht",
      },
      "situation report": {
        es: "informe de situación", fr: "rapport de situation", ru: "ситуационный отчёт",
        ar: "تقرير الوضع", de: "Lagebericht",
      },
      "results framework": {
        es: "marco de resultados", fr: "cadre de résultats", ru: "рамки результатов",
        ar: "إطار النتائج", de: "Ergebnisrahmen",
      },

      // ═══ STAKEHOLDERS & PARTNERSHIPS ═══
      "stakeholder": {
        es: "parte interesada", fr: "partie prenante", ru: "заинтересованная сторона",
        ar: "صاحب المصلحة", de: "Interessengruppe",
      },
      "beneficiary": {
        es: "beneficiario", fr: "bénéficiaire", ru: "бенефициар",
        ar: "المستفيد", de: "Begünstigter",
      },
      "local partner": {
        es: "socio local", fr: "partenaire local", ru: "местный партнёр",
        ar: "الشريك المحلي", de: "lokaler Partner",
      },
      "donor": {
        es: "donante", fr: "donateur", ru: "донор",
        ar: "المانح", de: "Geber",
      },
      "grant": {
        es: "subvención", fr: "subvention", ru: "грант",
        ar: "منحة", de: "Zuschuss",
      },
      "proposal": {
        es: "propuesta", fr: "proposition", ru: "заявка",
        ar: "مقترح", de: "Antrag",
      },
      "field office": {
        es: "oficina de campo", fr: "bureau de terrain", ru: "полевой офис",
        ar: "المكتب الميداني", de: "Außenstelle",
      },
      "cluster": {
        es: "clúster", fr: "cluster", ru: "кластер",
        ar: "مجموعة", de: "Cluster",
      },
    },

    doNotTranslate: [
      // UN Agencies
      "UNHCR", "UNICEF", "WHO", "WFP", "OCHA", "UNDP", "UNFPA", "IOM",
      "FAO", "UNOPS", "UN Women", "UNRWA", "UNAIDS",
      // Red Cross/Red Crescent
      "ICRC", "IFRC",
      // Major INGOs
      "MSF", "IRC", "NRC", "CARE", "Oxfam", "Save the Children",
      "World Vision", "Mercy Corps", "Action Against Hunger",
      // Sector/Cluster Acronyms
      "WASH", "GBV", "SGBV", "CCCM", "NFI", "DRR", "ETC", "HLP", "MHPSS",
      // Operational Acronyms
      "IDP", "PoC", "M&E", "MEAL", "ToR", "MoU", "AAP", "CHS",
      "SitRep", "HNO", "HRP", "HPC", "5W", "3W",
      "PDM", "DTM", "RRM", "CERF",
      // Coordination
      "IASC", "ERC", "HC", "HCT", "INGO", "NNGO",
      // Frameworks
      "SDG", "COP", "UNFCCC", "GCR", "GCM",
      // Standards
      "Sphere", "CHS", "PSEA",
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

// Pre-filter: scan source text, return only matching glossary terms + DNT
export function buildGlossaryPrompt(
  domain: DomainConfig,
  targetLang: string,
  sourceText?: string
): string {
  const textLower = sourceText?.toLowerCase() || "";

  // Find matching glossary terms in source text
  const matchedEntries: string[] = [];
  for (const [term, translations] of Object.entries(domain.glossary)) {
    const translation = translations[targetLang];
    if (!translation) continue;
    // Only include if term appears in source text (or no text provided → include all)
    if (!sourceText || textLower.includes(term.toLowerCase())) {
      matchedEntries.push(`"${term}" → "${translation}"`);
    }
  }

  // Find matching DNT terms in source text
  const matchedDnt: string[] = [];
  for (const dnt of domain.doNotTranslate) {
    if (!sourceText || textLower.includes(dnt.toLowerCase())) {
      matchedDnt.push(dnt);
    }
  }

  let prompt = "";
  if (matchedEntries.length > 0) {
    prompt += `\n\nGlossary — use these exact translations:\n${matchedEntries.join("\n")}\n`;
  }
  if (matchedDnt.length > 0) {
    prompt += `\nDo NOT translate (keep as-is): ${matchedDnt.join(", ")}\n`;
  }
  return prompt;
}
