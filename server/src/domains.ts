// Domain-specific translation contexts and glossaries

export type DomainId = "general" | "ngo" | "churches" | "universities" | "communities";

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
  // ═══════════════════════════════════════════════════════════════
  // NGO / HUMANITARIAN
  // ═══════════════════════════════════════════════════════════════
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
      "refugee": {
        es: "refugiado", fr: "réfugié", de: "Flüchtling", it: "rifugiato", pt: "refugiado",
        ru: "беженец", zh: "难民", ja: "難民", ko: "난민", ar: "لاجئ", hi: "शरणार्थी",
        nl: "vluchteling", pl: "uchodźca", tr: "mülteci", sv: "flykting",
        uk: "біженець", ro: "refugiat", cs: "uprchlík", hu: "menekült",
      },
      "asylum seeker": {
        es: "solicitante de asilo", fr: "demandeur d'asile", de: "Asylbewerber", it: "richiedente asilo", pt: "solicitante de asilo",
        ru: "лицо, ищущее убежище", zh: "寻求庇护者", ja: "庇護申請者", ko: "망명 신청자", ar: "طالب لجوء", hi: "शरण चाहने वाला",
        nl: "asielzoeker", pl: "osoba ubiegająca się o azyl", tr: "sığınmacı", sv: "asylsökande",
        uk: "шукач притулку", ro: "solicitant de azil", cs: "žadatel o azyl", hu: "menedékkérő",
      },
      "internally displaced person": {
        es: "persona desplazada interna", fr: "personne déplacée interne", de: "Binnenvertriebene", it: "sfollato interno", pt: "pessoa internamente deslocada",
        ru: "внутренне перемещённое лицо", zh: "境内流离失所者", ja: "国内避難民", ko: "국내 실향민", ar: "نازح داخلي", hi: "आंतरिक रूप से विस्थापित व्यक्ति",
        nl: "intern ontheemde", pl: "osoba wewnętrznie przesiedlona", tr: "ülke içinde yerinden edilmiş kişi", sv: "internflykting",
        uk: "внутрішньо переміщена особа", ro: "persoană strămutată intern", cs: "vnitřně vysídlená osoba", hu: "belső menekült",
      },
      "stateless person": {
        es: "apátrida", fr: "apatride", de: "Staatenloser", it: "apolide", pt: "apátrida",
        ru: "лицо без гражданства", zh: "无国籍人", ja: "無国籍者", ko: "무국적자", ar: "عديم الجنسية", hi: "राज्यविहीन व्यक्ति",
        nl: "staatloze", pl: "bezpaństwowiec", tr: "vatansız kişi", sv: "statslös",
        uk: "особа без громадянства", ro: "apatrid", cs: "osoba bez státní příslušnosti", hu: "hontalan személy",
      },
      "host community": {
        es: "comunidad de acogida", fr: "communauté d'accueil", de: "Aufnahmegemeinschaft", it: "comunità ospitante", pt: "comunidade anfitriã",
        ru: "принимающее сообщество", zh: "东道社区", ja: "受入れ地域社会", ko: "수용 지역사회", ar: "مجتمع مضيف", hi: "मेज़बान समुदाय",
        nl: "gastgemeenschap", pl: "społeczność przyjmująca", tr: "ev sahibi topluluk", sv: "värdsamhälle",
        uk: "приймаюча громада", ro: "comunitate gazdă", cs: "hostitelská komunita", hu: "befogadó közösség",
      },
      "repatriation": {
        es: "repatriación", fr: "rapatriement", de: "Rückführung", it: "rimpatrio", pt: "repatriação",
        ru: "репатриация", zh: "遣返", ja: "送還", ko: "본국 송환", ar: "إعادة إلى الوطن", hi: "प्रत्यावर्तन",
        nl: "repatriëring", pl: "repatriacja", tr: "geri dönüş", sv: "repatriering",
        uk: "репатріація", ro: "repatriere", cs: "repatriace", hu: "hazatelepítés",
      },
      "resettlement": {
        es: "reasentamiento", fr: "réinstallation", de: "Neuansiedlung", it: "reinsediamento", pt: "reassentamento",
        ru: "переселение", zh: "重新安置", ja: "再定住", ko: "재정착", ar: "إعادة التوطين", hi: "पुनर्वास",
        nl: "hervestiging", pl: "przesiedlenie", tr: "yeniden yerleştirme", sv: "vidarebosättning",
        uk: "переселення", ro: "relocare", cs: "přesídlení", hu: "áttelepítés",
      },
      "durable solution": {
        es: "solución duradera", fr: "solution durable", de: "dauerhafte Lösung", it: "soluzione duratura", pt: "solução duradoura",
        ru: "долгосрочное решение", zh: "持久解决方案", ja: "恒久的解決策", ko: "항구적 해결책", ar: "حل دائم", hi: "टिकाऊ समाधान",
        nl: "duurzame oplossing", pl: "trwałe rozwiązanie", tr: "kalıcı çözüm", sv: "varaktig lösning",
        uk: "довгострокове рішення", ro: "soluție durabilă", cs: "trvalé řešení", hu: "tartós megoldás",
      },
      "non-refoulement": {
        es: "no devolución", fr: "non-refoulement", de: "Non-Refoulement", it: "non-refoulement", pt: "não devolução",
        ru: "невозвращение", zh: "不驱回原则", ja: "ノン・ルフールマン", ko: "강제송환 금지", ar: "عدم الإعادة القسرية", hi: "गैर-प्रत्यावर्तन",
        nl: "non-refoulement", pl: "non-refoulement", tr: "geri göndermeme", sv: "non-refoulement",
        uk: "невидворення", ro: "non-refoulement", cs: "non-refoulement", hu: "visszaküldés tilalma",
      },
      "accountability": {
        es: "rendición de cuentas", fr: "redevabilité", de: "Rechenschaftspflicht", it: "responsabilità", pt: "prestação de contas",
        ru: "подотчётность", zh: "问责制", ja: "説明責任", ko: "책임성", ar: "المساءلة", hi: "जवाबदेही",
        nl: "verantwoording", pl: "odpowiedzialność", tr: "hesap verebilirlik", sv: "ansvarsskyldighet",
        uk: "підзвітність", ro: "responsabilitate", cs: "odpovědnost", hu: "elszámoltathatóság",
      },
      "do no harm": {
        es: "no hacer daño", fr: "ne pas nuire", de: "keinen Schaden anrichten", it: "non nuocere", pt: "não causar dano",
        ru: "не навреди", zh: "不伤害原则", ja: "害を与えない", ko: "해를 끼치지 않기", ar: "عدم الإضرار", hi: "कोई नुकसान न करें",
        nl: "geen kwaad doen", pl: "nie szkodzić", tr: "zarar vermeme", sv: "inte skada",
        uk: "не нашкодь", ro: "a nu face rău", cs: "neškodit", hu: "ne árts",
      },
      "capacity building": {
        es: "fortalecimiento de capacidades", fr: "renforcement des capacités", de: "Kapazitätsaufbau", it: "sviluppo delle capacità", pt: "fortalecimento de capacidades",
        ru: "наращивание потенциала", zh: "能力建设", ja: "能力構築", ko: "역량 강화", ar: "بناء القدرات", hi: "क्षमता निर्माण",
        nl: "capaciteitsopbouw", pl: "budowanie potencjału", tr: "kapasite geliştirme", sv: "kapacitetsuppbyggnad",
        uk: "розбудова спроможності", ro: "consolidarea capacităților", cs: "budování kapacit", hu: "kapacitásfejlesztés",
      },
      "resilience": {
        es: "resiliencia", fr: "résilience", de: "Resilienz", it: "resilienza", pt: "resiliência",
        ru: "устойчивость", zh: "韧性", ja: "レジリエンス", ko: "회복력", ar: "المرونة", hi: "लचीलापन",
        nl: "veerkracht", pl: "odporność", tr: "dayanıklılık", sv: "resiliens",
        uk: "стійкість", ro: "reziliență", cs: "odolnost", hu: "reziliencia",
      },
      "vulnerability": {
        es: "vulnerabilidad", fr: "vulnérabilité", de: "Vulnerabilität", it: "vulnerabilità", pt: "vulnerabilidade",
        ru: "уязвимость", zh: "脆弱性", ja: "脆弱性", ko: "취약성", ar: "هشاشة", hi: "संवेदनशीलता",
        nl: "kwetsbaarheid", pl: "wrażliwość", tr: "kırılganlık", sv: "sårbarhet",
        uk: "вразливість", ro: "vulnerabilitate", cs: "zranitelnost", hu: "sebezhetőség",
      },
      "gender-based violence": {
        es: "violencia de género", fr: "violence basée sur le genre", de: "geschlechtsspezifische Gewalt", it: "violenza di genere", pt: "violência de género",
        ru: "гендерное насилие", zh: "基于性别的暴力", ja: "ジェンダーに基づく暴力", ko: "성별 기반 폭력", ar: "العنف القائم على النوع الاجتماعي", hi: "लिंग आधारित हिंसा",
        nl: "gendergerelateerd geweld", pl: "przemoc ze względu na płeć", tr: "toplumsal cinsiyete dayalı şiddet", sv: "könsbaserat våld",
        uk: "гендерне насильство", ro: "violență bazată pe gen", cs: "genderově podmíněné násilí", hu: "nemi alapú erőszak",
      },
      "food security": {
        es: "seguridad alimentaria", fr: "sécurité alimentaire", de: "Ernährungssicherheit", it: "sicurezza alimentare", pt: "segurança alimentar",
        ru: "продовольственная безопасность", zh: "粮食安全", ja: "食料安全保障", ko: "식량 안보", ar: "الأمن الغذائي", hi: "खाद्य सुरक्षा",
        nl: "voedselzekerheid", pl: "bezpieczeństwo żywnościowe", tr: "gıda güvenliği", sv: "livsmedelstrygghet",
        uk: "продовольча безпека", ro: "securitate alimentară", cs: "potravinová bezpečnost", hu: "élelmiszerbiztonság",
      },
      "livelihoods": {
        es: "medios de vida", fr: "moyens de subsistance", de: "Lebensgrundlagen", it: "mezzi di sussistenza", pt: "meios de subsistência",
        ru: "средства к существованию", zh: "生计", ja: "生計", ko: "생계", ar: "سبل العيش", hi: "आजीविका",
        nl: "bestaansmiddelen", pl: "środki do życia", tr: "geçim kaynakları", sv: "försörjning",
        uk: "засоби до існування", ro: "mijloace de trai", cs: "prostředky obživy", hu: "megélhetés",
      },
      "psychosocial support": {
        es: "apoyo psicosocial", fr: "soutien psychosocial", de: "psychosoziale Unterstützung", it: "supporto psicosociale", pt: "apoio psicossocial",
        ru: "психосоциальная поддержка", zh: "社会心理支持", ja: "心理社会的支援", ko: "심리사회적 지원", ar: "الدعم النفسي الاجتماعي", hi: "मनोसामाजिक सहायता",
        nl: "psychosociale ondersteuning", pl: "wsparcie psychospołeczne", tr: "psikososyal destek", sv: "psykosocialt stöd",
        uk: "психосоціальна підтримка", ro: "sprijin psihosocial", cs: "psychosociální podpora", hu: "pszichoszociális támogatás",
      },
      "needs assessment": {
        es: "evaluación de necesidades", fr: "évaluation des besoins", de: "Bedarfsanalyse", it: "valutazione dei bisogni", pt: "avaliação de necessidades",
        ru: "оценка потребностей", zh: "需求评估", ja: "ニーズ・アセスメント", ko: "수요 평가", ar: "تقييم الاحتياجات", hi: "आवश्यकता मूल्यांकन",
        nl: "behoeftebeoordeling", pl: "ocena potrzeb", tr: "ihtiyaç değerlendirmesi", sv: "behovsbedömning",
        uk: "оцінка потреб", ro: "evaluarea nevoilor", cs: "hodnocení potřeb", hu: "szükségletfelmérés",
      },
      "monitoring and evaluation": {
        es: "monitoreo y evaluación", fr: "suivi et évaluation", de: "Monitoring und Evaluierung", it: "monitoraggio e valutazione", pt: "monitoramento e avaliação",
        ru: "мониторинг и оценка", zh: "监测与评估", ja: "モニタリングと評価", ko: "모니터링 및 평가", ar: "الرصد والتقييم", hi: "निगरानी और मूल्यांकन",
        nl: "monitoring en evaluatie", pl: "monitoring i ewaluacja", tr: "izleme ve değerlendirme", sv: "uppföljning och utvärdering",
        uk: "моніторинг та оцінка", ro: "monitorizare și evaluare", cs: "monitoring a hodnocení", hu: "monitoring és értékelés",
      },
      "stakeholder": {
        es: "parte interesada", fr: "partie prenante", de: "Interessengruppe", it: "portatore di interessi", pt: "parte interessada",
        ru: "заинтересованная сторона", zh: "利益相关方", ja: "ステークホルダー", ko: "이해관계자", ar: "صاحب المصلحة", hi: "हितधारक",
        nl: "belanghebbende", pl: "interesariusz", tr: "paydaş", sv: "intressent",
        uk: "зацікавлена сторона", ro: "parte interesată", cs: "zainteresovaná strana", hu: "érdekelt fél",
      },
      "beneficiary": {
        es: "beneficiario", fr: "bénéficiaire", de: "Begünstigter", it: "beneficiario", pt: "beneficiário",
        ru: "бенефициар", zh: "受益人", ja: "受益者", ko: "수혜자", ar: "المستفيد", hi: "लाभार्थी",
        nl: "begunstigde", pl: "beneficjent", tr: "yararlanıcı", sv: "förmånstagare",
        uk: "бенефіціар", ro: "beneficiar", cs: "příjemce", hu: "kedvezményezett",
      },
      "humanitarian corridor": {
        es: "corredor humanitario", fr: "corridor humanitaire", de: "humanitärer Korridor", it: "corridoio umanitario", pt: "corredor humanitário",
        ru: "гуманитарный коридор", zh: "人道主义走廊", ja: "人道回廊", ko: "인도주의 통로", ar: "ممر إنساني", hi: "मानवीय गलियारा",
        nl: "humanitaire corridor", pl: "korytarz humanitarny", tr: "insani yardım koridoru", sv: "humanitär korridor",
        uk: "гуманітарний коридор", ro: "coridor umanitar", cs: "humanitární koridor", hu: "humanitárius folyosó",
      },
      "cash transfer": {
        es: "transferencia de efectivo", fr: "transfert monétaire", de: "Bargeldtransfer", it: "trasferimento di denaro", pt: "transferência monetária",
        ru: "денежный перевод", zh: "现金转移", ja: "現金給付", ko: "현금 지원", ar: "التحويل النقدي", hi: "नकद हस्तांतरण",
        nl: "geldoverdracht", pl: "transfer gotówkowy", tr: "nakit transferi", sv: "kontantöverföring",
        uk: "грошовий переказ", ro: "transfer de numerar", cs: "peněžní převod", hu: "készpénzátutalás",
      },
      "disaster risk reduction": {
        es: "reducción del riesgo de desastres", fr: "réduction des risques de catastrophe", de: "Katastrophenvorsorge", it: "riduzione del rischio di catastrofi", pt: "redução do risco de desastres",
        ru: "снижение риска бедствий", zh: "减少灾害风险", ja: "防災", ko: "재난 위험 경감", ar: "الحد من مخاطر الكوارث", hi: "आपदा जोखिम न्यूनीकरण",
        nl: "rampenrisicobeperking", pl: "redukcja ryzyka katastrof", tr: "afet riskinin azaltılması", sv: "katastrofriskreducering",
        uk: "зменшення ризику катастроф", ro: "reducerea riscului de dezastre", cs: "snižování rizika katastrof", hu: "katasztrófakockázat-csökkentés",
      },
      "donor": {
        es: "donante", fr: "donateur", de: "Geber", it: "donatore", pt: "doador",
        ru: "донор", zh: "捐助方", ja: "ドナー", ko: "공여국", ar: "المانح", hi: "दाता",
        nl: "donor", pl: "darczyńca", tr: "bağışçı", sv: "givare",
        uk: "донор", ro: "donator", cs: "dárce", hu: "donor",
      },
      "grant": {
        es: "subvención", fr: "subvention", de: "Zuschuss", it: "sovvenzione", pt: "subvenção",
        ru: "грант", zh: "拨款", ja: "助成金", ko: "보조금", ar: "منحة", hi: "अनुदान",
        nl: "subsidie", pl: "dotacja", tr: "hibe", sv: "bidrag",
        uk: "грант", ro: "grant", cs: "grant", hu: "támogatás",
      },
      "cluster": {
        es: "clúster", fr: "cluster", de: "Cluster", it: "cluster", pt: "cluster",
        ru: "кластер", zh: "集群", ja: "クラスター", ko: "클러스터", ar: "مجموعة", hi: "क्लस्टर",
        nl: "cluster", pl: "klaster", tr: "küme", sv: "kluster",
        uk: "кластер", ro: "cluster", cs: "klastr", hu: "klaszter",
      },
      "protection": {
        es: "protección", fr: "protection", de: "Schutz", it: "protezione", pt: "proteção",
        ru: "защита", zh: "保护", ja: "保護", ko: "보호", ar: "حماية", hi: "सुरक्षा",
        nl: "bescherming", pl: "ochrona", tr: "koruma", sv: "skydd",
        uk: "захист", ro: "protecție", cs: "ochrana", hu: "védelem",
      },
      "safeguarding": {
        es: "salvaguarda", fr: "sauvegarde", de: "Schutzmaßnahmen", it: "salvaguardia", pt: "salvaguarda",
        ru: "обеспечение защиты", zh: "保障措施", ja: "セーフガーディング", ko: "보호 조치", ar: "الحماية", hi: "सुरक्षा उपाय",
        nl: "waarborging", pl: "zabezpieczenie", tr: "koruma önlemleri", sv: "skyddsåtgärder",
        uk: "забезпечення захисту", ro: "salvgardare", cs: "ochranná opatření", hu: "védelmi intézkedések",
      },
    },

    doNotTranslate: [
      "UNHCR", "UNICEF", "WHO", "WFP", "OCHA", "UNDP", "UNFPA", "IOM",
      "FAO", "UNOPS", "UN Women", "UNRWA", "UNAIDS",
      "ICRC", "IFRC",
      "MSF", "IRC", "NRC", "CARE", "Oxfam", "Save the Children",
      "World Vision", "Mercy Corps", "Action Against Hunger",
      "WASH", "GBV", "SGBV", "CCCM", "NFI", "DRR", "ETC", "HLP", "MHPSS",
      "IDP", "PoC", "M&E", "MEAL", "ToR", "MoU", "AAP", "CHS",
      "SitRep", "HNO", "HRP", "HPC", "5W", "3W",
      "PDM", "DTM", "RRM", "CERF",
      "IASC", "ERC", "HC", "HCT", "INGO", "NNGO",
      "SDG", "COP", "UNFCCC", "GCR", "GCM",
      "Sphere", "CHS", "PSEA",
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CHURCHES
  // ═══════════════════════════════════════════════════════════════
  churches: {
    name: "Churches",
    description: "Church services, sermons, worship events, religious gatherings",
    systemPrompt: `You are interpreting at a church service or religious gathering. Use respectful, reverent language appropriate for worship. Key principles:
- Use established religious/liturgical terminology for the target language
- Scripture references should use commonly accepted translations for the target language
- Preserve the warmth and pastoral tone of the speaker
- "Grace" in spiritual context means divine grace, not elegance
- "Fellowship" means communal spiritual gathering, not a scholarship
- Maintain the devotional register — this is worship, not a lecture
- When in doubt, use the more traditional/reverent term`,

    glossary: {
      "sermon": {
        es: "sermón", fr: "sermon", de: "Predigt", it: "sermone", pt: "sermão",
        ru: "проповедь", zh: "讲道", ja: "説教", ko: "설교", ar: "عظة", hi: "उपदेश",
        nl: "preek", pl: "kazanie", tr: "vaaz", sv: "predikan",
        uk: "проповідь", ro: "predică", cs: "kázání", hu: "prédikáció",
      },
      "congregation": {
        es: "congregación", fr: "assemblée", de: "Gemeinde", it: "congregazione", pt: "congregação",
        ru: "прихожане", zh: "会众", ja: "会衆", ko: "교인", ar: "جماعة المصلين", hi: "मण्डली",
        nl: "gemeente", pl: "zgromadzenie", tr: "cemaat", sv: "församling",
        uk: "парафіяни", ro: "congregație", cs: "shromáždění", hu: "gyülekezet",
      },
      "baptism": {
        es: "bautismo", fr: "baptême", de: "Taufe", it: "battesimo", pt: "batismo",
        ru: "крещение", zh: "洗礼", ja: "洗礼", ko: "세례", ar: "معمودية", hi: "बपतिस्मा",
        nl: "doop", pl: "chrzest", tr: "vaftiz", sv: "dop",
        uk: "хрещення", ro: "botez", cs: "křest", hu: "keresztség",
      },
      "communion": {
        es: "comunión", fr: "communion", de: "Abendmahl", it: "comunione", pt: "comunhão",
        ru: "причастие", zh: "圣餐", ja: "聖餐", ko: "성찬", ar: "مناولة", hi: "प्रभु भोज",
        nl: "avondmaal", pl: "komunia", tr: "komünyon", sv: "nattvard",
        uk: "причастя", ro: "împărtășanie", cs: "přijímání", hu: "úrvacsora",
      },
      "pastor": {
        es: "pastor", fr: "pasteur", de: "Pastor", it: "pastore", pt: "pastor",
        ru: "пастор", zh: "牧师", ja: "牧師", ko: "목사", ar: "قسيس", hi: "पास्टर",
        nl: "dominee", pl: "pastor", tr: "papaz", sv: "pastor",
        uk: "пастор", ro: "pastor", cs: "pastor", hu: "lelkész",
      },
      "deacon": {
        es: "diácono", fr: "diacre", de: "Diakon", it: "diacono", pt: "diácono",
        ru: "дьякон", zh: "执事", ja: "執事", ko: "집사", ar: "شماس", hi: "डीकन",
        nl: "diaken", pl: "diakon", tr: "diyakoz", sv: "diakon",
        uk: "диякон", ro: "diacon", cs: "jáhen", hu: "diakónus",
      },
      "sanctuary": {
        es: "santuario", fr: "sanctuaire", de: "Heiligtum", it: "santuario", pt: "santuário",
        ru: "святилище", zh: "圣所", ja: "聖域", ko: "성소", ar: "حرم", hi: "पवित्रस्थान",
        nl: "heiligdom", pl: "sanktuarium", tr: "kutsal mekân", sv: "helgedom",
        uk: "святилище", ro: "sanctuar", cs: "svatyně", hu: "szentély",
      },
      "worship": {
        es: "adoración", fr: "adoration", de: "Gottesdienst", it: "culto", pt: "adoração",
        ru: "поклонение", zh: "崇拜", ja: "礼拝", ko: "예배", ar: "عبادة", hi: "उपासना",
        nl: "eredienst", pl: "nabożeństwo", tr: "ibadet", sv: "gudstjänst",
        uk: "поклоніння", ro: "închinare", cs: "bohoslužba", hu: "istentisztelet",
      },
      "prayer": {
        es: "oración", fr: "prière", de: "Gebet", it: "preghiera", pt: "oração",
        ru: "молитва", zh: "祷告", ja: "祈り", ko: "기도", ar: "صلاة", hi: "प्रार्थना",
        nl: "gebed", pl: "modlitwa", tr: "dua", sv: "bön",
        uk: "молитва", ro: "rugăciune", cs: "modlitba", hu: "ima",
      },
      "grace": {
        es: "gracia", fr: "grâce", de: "Gnade", it: "grazia", pt: "graça",
        ru: "благодать", zh: "恩典", ja: "恵み", ko: "은혜", ar: "نعمة", hi: "अनुग्रह",
        nl: "genade", pl: "łaska", tr: "lütuf", sv: "nåd",
        uk: "благодать", ro: "har", cs: "milost", hu: "kegyelem",
      },
      "salvation": {
        es: "salvación", fr: "salut", de: "Erlösung", it: "salvezza", pt: "salvação",
        ru: "спасение", zh: "救恩", ja: "救い", ko: "구원", ar: "خلاص", hi: "उद्धार",
        nl: "verlossing", pl: "zbawienie", tr: "kurtuluş", sv: "frälsning",
        uk: "спасіння", ro: "mântuire", cs: "spasení", hu: "üdvösség",
      },
      "repentance": {
        es: "arrepentimiento", fr: "repentance", de: "Buße", it: "pentimento", pt: "arrependimento",
        ru: "покаяние", zh: "悔改", ja: "悔い改め", ko: "회개", ar: "توبة", hi: "पश्चाताप",
        nl: "berouw", pl: "pokuta", tr: "tövbe", sv: "omvändelse",
        uk: "покаяння", ro: "pocăință", cs: "pokání", hu: "bűnbánat",
      },
      "fellowship": {
        es: "comunión fraternal", fr: "communion fraternelle", de: "Gemeinschaft", it: "comunione fraterna", pt: "comunhão fraterna",
        ru: "братское общение", zh: "团契", ja: "交わり", ko: "교제", ar: "شركة", hi: "संगति",
        nl: "gemeenschap", pl: "wspólnota", tr: "paydaşlık", sv: "gemenskap",
        uk: "братське спілкування", ro: "părtășie", cs: "společenství", hu: "közösség",
      },
      "Scripture": {
        es: "Escritura", fr: "Écriture", de: "Heilige Schrift", it: "Scrittura", pt: "Escritura",
        ru: "Писание", zh: "经文", ja: "聖書", ko: "성경", ar: "الكتاب المقدس", hi: "पवित्रशास्त्र",
        nl: "Schrift", pl: "Pismo Święte", tr: "Kutsal Yazılar", sv: "Skriften",
        uk: "Писання", ro: "Scriptură", cs: "Písmo", hu: "Szentírás",
      },
      "Gospel": {
        es: "Evangelio", fr: "Évangile", de: "Evangelium", it: "Vangelo", pt: "Evangelho",
        ru: "Евангелие", zh: "福音", ja: "福音", ko: "복음", ar: "إنجيل", hi: "सुसमाचार",
        nl: "Evangelie", pl: "Ewangelia", tr: "İncil", sv: "Evangelium",
        uk: "Євангеліє", ro: "Evanghelie", cs: "Evangelium", hu: "Evangélium",
      },
      "Holy Spirit": {
        es: "Espíritu Santo", fr: "Saint-Esprit", de: "Heiliger Geist", it: "Spirito Santo", pt: "Espírito Santo",
        ru: "Святой Дух", zh: "圣灵", ja: "聖霊", ko: "성령", ar: "الروح القدس", hi: "पवित्र आत्मा",
        nl: "Heilige Geest", pl: "Duch Święty", tr: "Kutsal Ruh", sv: "Helig Ande",
        uk: "Святий Дух", ro: "Duhul Sfânt", cs: "Duch Svatý", hu: "Szentlélek",
      },
      "blessing": {
        es: "bendición", fr: "bénédiction", de: "Segen", it: "benedizione", pt: "bênção",
        ru: "благословение", zh: "祝福", ja: "祝福", ko: "축복", ar: "بركة", hi: "आशीर्वाद",
        nl: "zegen", pl: "błogosławieństwo", tr: "bereket", sv: "välsignelse",
        uk: "благословення", ro: "binecuvântare", cs: "požehnání", hu: "áldás",
      },
      "resurrection": {
        es: "resurrección", fr: "résurrection", de: "Auferstehung", it: "risurrezione", pt: "ressurreição",
        ru: "воскресение", zh: "复活", ja: "復活", ko: "부활", ar: "قيامة", hi: "पुनरुत्थान",
        nl: "opstanding", pl: "zmartwychwstanie", tr: "diriliş", sv: "uppståndelse",
        uk: "воскресіння", ro: "înviere", cs: "vzkříšení", hu: "feltámadás",
      },
      "tithe": {
        es: "diezmo", fr: "dîme", de: "Zehnter", it: "decima", pt: "dízimo",
        ru: "десятина", zh: "十一奉献", ja: "什一献金", ko: "십일조", ar: "عُشر", hi: "दशमांश",
        nl: "tiende", pl: "dziesięcina", tr: "ondalık", sv: "tionde",
        uk: "десятина", ro: "zeciuială", cs: "desátek", hu: "tized",
      },
      "offering": {
        es: "ofrenda", fr: "offrande", de: "Opfergabe", it: "offerta", pt: "oferta",
        ru: "пожертвование", zh: "奉献", ja: "献金", ko: "헌금", ar: "تقدمة", hi: "भेंट",
        nl: "offergave", pl: "ofiara", tr: "sunu", sv: "offergåva",
        uk: "пожертва", ro: "ofrandă", cs: "obětní dar", hu: "felajánlás",
      },
      "testimony": {
        es: "testimonio", fr: "témoignage", de: "Zeugnis", it: "testimonianza", pt: "testemunho",
        ru: "свидетельство", zh: "见证", ja: "証し", ko: "간증", ar: "شهادة", hi: "गवाही",
        nl: "getuigenis", pl: "świadectwo", tr: "tanıklık", sv: "vittnesbörd",
        uk: "свідчення", ro: "mărturie", cs: "svědectví", hu: "bizonyságtétel",
      },
      "anointing": {
        es: "unción", fr: "onction", de: "Salbung", it: "unzione", pt: "unção",
        ru: "помазание", zh: "膏抹", ja: "油注ぎ", ko: "기름부음", ar: "مسحة", hi: "अभिषेक",
        nl: "zalving", pl: "namaszczenie", tr: "mesh", sv: "smörjelse",
        uk: "помазання", ro: "ungere", cs: "pomazání", hu: "felkenés",
      },
      "altar": {
        es: "altar", fr: "autel", de: "Altar", it: "altare", pt: "altar",
        ru: "алтарь", zh: "祭坛", ja: "祭壇", ko: "제단", ar: "مذبح", hi: "वेदी",
        nl: "altaar", pl: "ołtarz", tr: "sunak", sv: "altare",
        uk: "вівтар", ro: "altar", cs: "oltář", hu: "oltár",
      },
      "hymn": {
        es: "himno", fr: "hymne", de: "Kirchenlied", it: "inno", pt: "hino",
        ru: "гимн", zh: "赞美诗", ja: "賛美歌", ko: "찬송가", ar: "ترنيمة", hi: "भजन",
        nl: "lofzang", pl: "hymn", tr: "ilahi", sv: "psalm",
        uk: "гімн", ro: "imn", cs: "hymna", hu: "himnusz",
      },
      "faith": {
        es: "fe", fr: "foi", de: "Glaube", it: "fede", pt: "fé",
        ru: "вера", zh: "信心", ja: "信仰", ko: "믿음", ar: "إيمان", hi: "विश्वास",
        nl: "geloof", pl: "wiara", tr: "iman", sv: "tro",
        uk: "віра", ro: "credință", cs: "víra", hu: "hit",
      },
      "forgiveness": {
        es: "perdón", fr: "pardon", de: "Vergebung", it: "perdono", pt: "perdão",
        ru: "прощение", zh: "饶恕", ja: "赦し", ko: "용서", ar: "مغفرة", hi: "क्षमा",
        nl: "vergeving", pl: "przebaczenie", tr: "bağışlama", sv: "förlåtelse",
        uk: "прощення", ro: "iertare", cs: "odpuštění", hu: "megbocsátás",
      },
      "righteousness": {
        es: "justicia", fr: "justice", de: "Gerechtigkeit", it: "giustizia", pt: "justiça",
        ru: "праведность", zh: "公义", ja: "義", ko: "의로움", ar: "بر", hi: "धार्मिकता",
        nl: "gerechtigheid", pl: "sprawiedliwość", tr: "doğruluk", sv: "rättfärdighet",
        uk: "праведність", ro: "dreptate", cs: "spravedlnost", hu: "igazságosság",
      },
      "redemption": {
        es: "redención", fr: "rédemption", de: "Erlösung", it: "redenzione", pt: "redenção",
        ru: "искупление", zh: "救赎", ja: "贖い", ko: "구속", ar: "فداء", hi: "छुटकारा",
        nl: "verlossing", pl: "odkupienie", tr: "kurtuluş", sv: "återlösning",
        uk: "викуплення", ro: "răscumpărare", cs: "vykoupení", hu: "megváltás",
      },
      "Eucharist": {
        es: "Eucaristía", fr: "Eucharistie", de: "Eucharistie", it: "Eucaristia", pt: "Eucaristia",
        ru: "Евхаристия", zh: "圣体圣事", ja: "聖体拝領", ko: "성체성사", ar: "القربان المقدس", hi: "यूकेरिस्ट",
        nl: "Eucharistie", pl: "Eucharystia", tr: "Efkaristiya", sv: "Eukaristi",
        uk: "Євхаристія", ro: "Euharistie", cs: "Eucharistie", hu: "Eucharisztia",
      },
      "Pentecost": {
        es: "Pentecostés", fr: "Pentecôte", de: "Pfingsten", it: "Pentecoste", pt: "Pentecostes",
        ru: "Пятидесятница", zh: "五旬节", ja: "ペンテコステ", ko: "오순절", ar: "العنصرة", hi: "पिन्तेकुस्त",
        nl: "Pinksteren", pl: "Zielone Świątki", tr: "Pentikost", sv: "Pingst",
        uk: "П'ятидесятниця", ro: "Rusalii", cs: "Letnice", hu: "Pünkösd",
      },
      "Advent": {
        es: "Adviento", fr: "Avent", de: "Advent", it: "Avvento", pt: "Advento",
        ru: "Адвент", zh: "将临期", ja: "アドベント", ko: "대림절", ar: "زمن المجيء", hi: "आगमन",
        nl: "Advent", pl: "Adwent", tr: "Advent", sv: "Advent",
        uk: "Адвент", ro: "Advent", cs: "Advent", hu: "Advent",
      },
      "Lent": {
        es: "Cuaresma", fr: "Carême", de: "Fastenzeit", it: "Quaresima", pt: "Quaresma",
        ru: "Великий пост", zh: "四旬期", ja: "四旬節", ko: "사순절", ar: "الصوم الكبير", hi: "लेंट",
        nl: "Vastentijd", pl: "Wielki Post", tr: "Büyük Perhiz", sv: "Fastan",
        uk: "Великий піст", ro: "Postul Mare", cs: "Postní doba", hu: "Nagyböjt",
      },
      "ordination": {
        es: "ordenación", fr: "ordination", de: "Ordination", it: "ordinazione", pt: "ordenação",
        ru: "рукоположение", zh: "按立", ja: "叙任", ko: "안수", ar: "سيامة", hi: "अभिषेक",
        nl: "wijding", pl: "święcenia", tr: "ruhban takdisi", sv: "ordination",
        uk: "рукопокладення", ro: "hirotonisire", cs: "ordinace", hu: "ordináció",
      },
      "missionary": {
        es: "misionero", fr: "missionnaire", de: "Missionar", it: "missionario", pt: "missionário",
        ru: "миссионер", zh: "传教士", ja: "宣教師", ko: "선교사", ar: "مبشر", hi: "मिशनरी",
        nl: "missionaris", pl: "misjonarz", tr: "misyoner", sv: "missionär",
        uk: "місіонер", ro: "misionar", cs: "misionář", hu: "misszionárius",
      },
      "parable": {
        es: "parábola", fr: "parabole", de: "Gleichnis", it: "parabola", pt: "parábola",
        ru: "притча", zh: "比喻", ja: "たとえ話", ko: "비유", ar: "مثل", hi: "दृष्टान्त",
        nl: "gelijkenis", pl: "przypowieść", tr: "mesel", sv: "liknelse",
        uk: "притча", ro: "parabolă", cs: "podobenství", hu: "példabeszéd",
      },
      "ministry": {
        es: "ministerio", fr: "ministère", de: "Dienst", it: "ministero", pt: "ministério",
        ru: "служение", zh: "事工", ja: "ミニストリー", ko: "사역", ar: "خدمة", hi: "सेवकाई",
        nl: "bediening", pl: "posługa", tr: "hizmet", sv: "tjänst",
        uk: "служіння", ro: "slujire", cs: "služba", hu: "szolgálat",
      },
    },

    doNotTranslate: [
      "Amen", "Hallelujah", "Hosanna", "Maranatha", "Selah",
      "Alpha", "Omega", "Agape",
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // UNIVERSITIES
  // ═══════════════════════════════════════════════════════════════
  universities: {
    name: "Universities",
    description: "Academic lectures, seminars, campus events, educational settings",
    systemPrompt: `You are interpreting at a university lecture, seminar, or academic event. Key principles:
- Use standard academic terminology for the target language
- Preserve precision of technical and scientific language
- Maintain the educational register — clear, explanatory, but not overly casual
- Academic titles (Professor, Dr.) should be adapted to the target language's conventions
- "Faculty" can mean department or teaching staff depending on context — use the local academic term
- Latin/Greek academic terms (cum laude, thesis, etc.) may be kept or translated depending on local convention
- Field-specific terms should use the established translation in the target language's academic tradition`,

    glossary: {
      "lecture": {
        es: "clase magistral", fr: "cours magistral", de: "Vorlesung", it: "lezione", pt: "aula",
        ru: "лекция", zh: "讲座", ja: "講義", ko: "강의", ar: "محاضرة", hi: "व्याख्यान",
        nl: "hoorcollege", pl: "wykład", tr: "ders", sv: "föreläsning",
        uk: "лекція", ro: "curs", cs: "přednáška", hu: "előadás",
      },
      "seminar": {
        es: "seminario", fr: "séminaire", de: "Seminar", it: "seminario", pt: "seminário",
        ru: "семинар", zh: "研讨会", ja: "ゼミナール", ko: "세미나", ar: "ندوة", hi: "संगोष्ठी",
        nl: "seminarie", pl: "seminarium", tr: "seminer", sv: "seminarium",
        uk: "семінар", ro: "seminar", cs: "seminář", hu: "szeminárium",
      },
      "syllabus": {
        es: "programa del curso", fr: "programme de cours", de: "Lehrplan", it: "programma del corso", pt: "programa da disciplina",
        ru: "учебный план", zh: "教学大纲", ja: "シラバス", ko: "강의계획서", ar: "منهج دراسي", hi: "पाठ्यक्रम",
        nl: "collegeprogramma", pl: "sylabus", tr: "müfredat", sv: "kursplan",
        uk: "навчальний план", ro: "programă de curs", cs: "sylabus", hu: "tanterv",
      },
      "dissertation": {
        es: "tesis doctoral", fr: "thèse de doctorat", de: "Dissertation", it: "tesi di dottorato", pt: "dissertação",
        ru: "диссертация", zh: "博士论文", ja: "博士論文", ko: "학위논문", ar: "أطروحة", hi: "शोध प्रबंध",
        nl: "proefschrift", pl: "rozprawa doktorska", tr: "doktora tezi", sv: "doktorsavhandling",
        uk: "дисертація", ro: "disertație", cs: "disertace", hu: "disszertáció",
      },
      "thesis": {
        es: "tesis", fr: "mémoire", de: "Abschlussarbeit", it: "tesi", pt: "tese",
        ru: "дипломная работа", zh: "论文", ja: "論文", ko: "논문", ar: "رسالة", hi: "थीसिस",
        nl: "scriptie", pl: "praca dyplomowa", tr: "tez", sv: "uppsats",
        uk: "дипломна робота", ro: "teză", cs: "diplomová práce", hu: "szakdolgozat",
      },
      "tutorial": {
        es: "tutoría", fr: "travaux dirigés", de: "Tutorium", it: "esercitazione", pt: "tutoria",
        ru: "практическое занятие", zh: "辅导课", ja: "チュートリアル", ko: "튜토리얼", ar: "درس تعليمي", hi: "ट्यूटोरियल",
        nl: "werkcollege", pl: "ćwiczenia", tr: "öğretici ders", sv: "handledning",
        uk: "практичне заняття", ro: "tutorial", cs: "cvičení", hu: "gyakorlat",
      },
      "dean": {
        es: "decano", fr: "doyen", de: "Dekan", it: "preside", pt: "decano",
        ru: "декан", zh: "院长", ja: "学部長", ko: "학장", ar: "عميد", hi: "डीन",
        nl: "decaan", pl: "dziekan", tr: "dekan", sv: "dekan",
        uk: "декан", ro: "decan", cs: "děkan", hu: "dékán",
      },
      "provost": {
        es: "rector adjunto", fr: "vice-recteur", de: "Prorektor", it: "prorettore", pt: "pró-reitor",
        ru: "проректор", zh: "教务长", ja: "学長補佐", ko: "부총장", ar: "نائب رئيس الجامعة", hi: "प्रोवोस्ट",
        nl: "rector", pl: "prorektor", tr: "rektör yardımcısı", sv: "prorektor",
        uk: "проректор", ro: "prorector", cs: "prorektor", hu: "rektorhelyettes",
      },
      "faculty": {
        es: "facultad", fr: "faculté", de: "Fakultät", it: "facoltà", pt: "faculdade",
        ru: "факультет", zh: "学院", ja: "学部", ko: "학부", ar: "كلية", hi: "संकाय",
        nl: "faculteit", pl: "wydział", tr: "fakülte", sv: "fakultet",
        uk: "факультет", ro: "facultate", cs: "fakulta", hu: "kar",
      },
      "enrollment": {
        es: "matrícula", fr: "inscription", de: "Einschreibung", it: "iscrizione", pt: "matrícula",
        ru: "зачисление", zh: "注册", ja: "入学登録", ko: "등록", ar: "تسجيل", hi: "नामांकन",
        nl: "inschrijving", pl: "rekrutacja", tr: "kayıt", sv: "inskrivning",
        uk: "зарахування", ro: "înmatriculare", cs: "zápis", hu: "beiratkozás",
      },
      "curriculum": {
        es: "plan de estudios", fr: "programme d'études", de: "Studienplan", it: "piano di studi", pt: "currículo",
        ru: "учебная программа", zh: "课程体系", ja: "カリキュラム", ko: "교육과정", ar: "مناهج دراسية", hi: "पाठ्यचर्या",
        nl: "curriculum", pl: "program nauczania", tr: "öğretim programı", sv: "läroplan",
        uk: "навчальна програма", ro: "curriculum", cs: "studijní plán", hu: "tananyag",
      },
      "scholarship": {
        es: "beca", fr: "bourse", de: "Stipendium", it: "borsa di studio", pt: "bolsa de estudo",
        ru: "стипендия", zh: "奖学金", ja: "奨学金", ko: "장학금", ar: "منحة دراسية", hi: "छात्रवृत्ति",
        nl: "beurs", pl: "stypendium", tr: "burs", sv: "stipendium",
        uk: "стипендія", ro: "bursă", cs: "stipendium", hu: "ösztöndíj",
      },
      "undergraduate": {
        es: "estudiante de grado", fr: "étudiant en licence", de: "Bachelor-Student", it: "studente triennale", pt: "estudante de graduação",
        ru: "студент бакалавриата", zh: "本科生", ja: "学部生", ko: "학부생", ar: "طالب جامعي", hi: "स्नातक छात्र",
        nl: "bachelorstudent", pl: "student studiów licencjackich", tr: "lisans öğrencisi", sv: "grundutbildningsstudent",
        uk: "студент бакалаврату", ro: "student la licență", cs: "student bakalářského studia", hu: "alapképzéses hallgató",
      },
      "graduate student": {
        es: "estudiante de posgrado", fr: "étudiant en master", de: "Masterstudent", it: "studente magistrale", pt: "estudante de pós-graduação",
        ru: "аспирант", zh: "研究生", ja: "大学院生", ko: "대학원생", ar: "طالب دراسات عليا", hi: "स्नातकोत्तर छात्र",
        nl: "masterstudent", pl: "doktorant", tr: "lisansüstü öğrenci", sv: "forskarstuderande",
        uk: "аспірант", ro: "masterand", cs: "postgraduální student", hu: "mesterképzéses hallgató",
      },
      "tenure": {
        es: "titularidad", fr: "titularisation", de: "Festanstellung", it: "ruolo", pt: "titularidade",
        ru: "постоянная должность", zh: "终身教职", ja: "テニュア", ko: "종신 재직권", ar: "تثبيت أكاديمي", hi: "कार्यकाल",
        nl: "vast dienstverband", pl: "stała posada", tr: "kadro", sv: "fast tjänst",
        uk: "безстрокова посада", ro: "post permanent", cs: "trvalý úvazek", hu: "véglegesítés",
      },
      "peer review": {
        es: "revisión por pares", fr: "examen par les pairs", de: "Peer-Review", it: "revisione paritaria", pt: "revisão por pares",
        ru: "рецензирование", zh: "同行评审", ja: "査読", ko: "동료 심사", ar: "مراجعة الأقران", hi: "सहकर्मी समीक्षा",
        nl: "peer review", pl: "recenzja naukowa", tr: "hakemli değerlendirme", sv: "kollegial granskning",
        uk: "рецензування", ro: "evaluare colegială", cs: "recenzní řízení", hu: "szakmai lektorálás",
      },
      "campus": {
        es: "campus", fr: "campus", de: "Campus", it: "campus", pt: "campus",
        ru: "кампус", zh: "校园", ja: "キャンパス", ko: "캠퍼스", ar: "حرم جامعي", hi: "परिसर",
        nl: "campus", pl: "kampus", tr: "kampüs", sv: "campus",
        uk: "кампус", ro: "campus", cs: "kampus", hu: "kampusz",
      },
      "commencement": {
        es: "ceremonia de graduación", fr: "cérémonie de remise des diplômes", de: "Abschlussfeier", it: "cerimonia di laurea", pt: "colação de grau",
        ru: "церемония вручения дипломов", zh: "毕业典礼", ja: "卒業式", ko: "졸업식", ar: "حفل التخرج", hi: "दीक्षान्त समारोह",
        nl: "diploma-uitreiking", pl: "uroczystość wręczenia dyplomów", tr: "mezuniyet töreni", sv: "examensceremoni",
        uk: "випускна церемонія", ro: "ceremonie de absolvire", cs: "slavnostní promoce", hu: "diplomaosztó ünnepség",
      },
      "accreditation": {
        es: "acreditación", fr: "accréditation", de: "Akkreditierung", it: "accreditamento", pt: "acreditação",
        ru: "аккредитация", zh: "认证", ja: "認定", ko: "인증", ar: "اعتماد", hi: "मान्यता",
        nl: "accreditatie", pl: "akredytacja", tr: "akreditasyon", sv: "ackreditering",
        uk: "акредитація", ro: "acreditare", cs: "akreditace", hu: "akkreditáció",
      },
      "research grant": {
        es: "subvención de investigación", fr: "subvention de recherche", de: "Forschungsstipendium", it: "finanziamento alla ricerca", pt: "bolsa de pesquisa",
        ru: "исследовательский грант", zh: "研究资助", ja: "研究助成金", ko: "연구 보조금", ar: "منحة بحثية", hi: "शोध अनुदान",
        nl: "onderzoeksbeurs", pl: "grant badawczy", tr: "araştırma hibesi", sv: "forskningsbidrag",
        uk: "дослідницький грант", ro: "grant de cercetare", cs: "výzkumný grant", hu: "kutatási ösztöndíj",
      },
      "office hours": {
        es: "horario de atención", fr: "heures de permanence", de: "Sprechstunde", it: "orario di ricevimento", pt: "horário de atendimento",
        ru: "часы приёма", zh: "办公时间", ja: "オフィスアワー", ko: "면담 시간", ar: "ساعات المكتب", hi: "कार्यालय समय",
        nl: "spreekuur", pl: "godziny konsultacyjne", tr: "ofis saatleri", sv: "mottagningstid",
        uk: "години прийому", ro: "ore de consultații", cs: "konzultační hodiny", hu: "fogadóóra",
      },
      "academic journal": {
        es: "revista académica", fr: "revue académique", de: "Fachzeitschrift", it: "rivista accademica", pt: "revista acadêmica",
        ru: "научный журнал", zh: "学术期刊", ja: "学術雑誌", ko: "학술지", ar: "مجلة أكاديمية", hi: "शैक्षणिक पत्रिका",
        nl: "wetenschappelijk tijdschrift", pl: "czasopismo naukowe", tr: "akademik dergi", sv: "vetenskaplig tidskrift",
        uk: "науковий журнал", ro: "revistă academică", cs: "odborný časopis", hu: "tudományos folyóirat",
      },
      "plagiarism": {
        es: "plagio", fr: "plagiat", de: "Plagiat", it: "plagio", pt: "plágio",
        ru: "плагиат", zh: "抄袭", ja: "剽窃", ko: "표절", ar: "سرقة أدبية", hi: "साहित्यिक चोरी",
        nl: "plagiaat", pl: "plagiat", tr: "intihal", sv: "plagiat",
        uk: "плагіат", ro: "plagiat", cs: "plagiátorství", hu: "plágium",
      },
      "midterm exam": {
        es: "examen parcial", fr: "examen de mi-session", de: "Zwischenprüfung", it: "esame parziale", pt: "prova parcial",
        ru: "промежуточный экзамен", zh: "期中考试", ja: "中間試験", ko: "중간고사", ar: "امتحان نصفي", hi: "मध्यावधि परीक्षा",
        nl: "tussentijds examen", pl: "egzamin śródsemestralny", tr: "vize sınavı", sv: "mitterminstentamen",
        uk: "проміжний іспит", ro: "examen parțial", cs: "průběžná zkouška", hu: "félévi vizsga",
      },
      "final exam": {
        es: "examen final", fr: "examen final", de: "Abschlussprüfung", it: "esame finale", pt: "prova final",
        ru: "итоговый экзамен", zh: "期末考试", ja: "期末試験", ko: "기말고사", ar: "امتحان نهائي", hi: "अंतिम परीक्षा",
        nl: "eindexamen", pl: "egzamin końcowy", tr: "final sınavı", sv: "sluttentamen",
        uk: "підсумковий іспит", ro: "examen final", cs: "závěrečná zkouška", hu: "záróvizsga",
      },
      "grading": {
        es: "calificación", fr: "notation", de: "Benotung", it: "valutazione", pt: "avaliação",
        ru: "оценивание", zh: "评分", ja: "成績評価", ko: "채점", ar: "تقييم درجات", hi: "ग्रेडिंग",
        nl: "beoordeling", pl: "ocenianie", tr: "notlandırma", sv: "betygssättning",
        uk: "оцінювання", ro: "notare", cs: "hodnocení", hu: "osztályozás",
      },
    },

    doNotTranslate: [
      "PhD", "MBA", "GPA", "ECTS", "STEM", "SAT", "GRE", "TOEFL", "IELTS",
      "Erasmus", "Bologna", "Fulbright", "cum laude", "magna cum laude", "summa cum laude",
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // COMMUNITIES (Immigrant / Civic)
  // ═══════════════════════════════════════════════════════════════
  communities: {
    name: "Communities",
    description: "Immigrant communities, civic meetings, town halls, cultural centers, social services",
    systemPrompt: `You are interpreting at a community meeting, town hall, or social services event for immigrant and multicultural communities. Key principles:
- Use clear, simple language — avoid bureaucratic jargon when possible
- Legal/civic terms must be precise — mistranslation can have serious consequences
- When a term has no direct equivalent, provide the closest translation and keep the original in parentheses
- Be culturally sensitive — some concepts may not exist in all cultures
- "Residency" refers to legal immigration status, not where someone lives
- "Benefits" means government social benefits/welfare, not advantages
- Maintain a supportive, welcoming tone — this is about inclusion`,

    glossary: {
      "residency": {
        es: "residencia", fr: "titre de séjour", de: "Aufenthaltsgenehmigung", it: "permesso di soggiorno", pt: "residência",
        ru: "вид на жительство", zh: "居留许可", ja: "在留許可", ko: "체류허가", ar: "إقامة", hi: "निवास अनुमति",
        nl: "verblijfsvergunning", pl: "pozwolenie na pobyt", tr: "oturma izni", sv: "uppehållstillstånd",
        uk: "посвідка на проживання", ro: "permis de ședere", cs: "povolení k pobytu", hu: "tartózkodási engedély",
      },
      "naturalization": {
        es: "naturalización", fr: "naturalisation", de: "Einbürgerung", it: "naturalizzazione", pt: "naturalização",
        ru: "натурализация", zh: "归化入籍", ja: "帰化", ko: "귀화", ar: "تجنس", hi: "नागरिकता प्राप्ति",
        nl: "naturalisatie", pl: "naturalizacja", tr: "vatandaşlığa geçiş", sv: "medborgarskap",
        uk: "натуралізація", ro: "naturalizare", cs: "naturalizace", hu: "honosítás",
      },
      "work permit": {
        es: "permiso de trabajo", fr: "permis de travail", de: "Arbeitserlaubnis", it: "permesso di lavoro", pt: "autorização de trabalho",
        ru: "разрешение на работу", zh: "工作许可", ja: "就労許可", ko: "취업허가", ar: "تصريح عمل", hi: "कार्य अनुमति",
        nl: "werkvergunning", pl: "zezwolenie na pracę", tr: "çalışma izni", sv: "arbetstillstånd",
        uk: "дозвіл на роботу", ro: "permis de muncă", cs: "pracovní povolení", hu: "munkavállalási engedély",
      },
      "visa": {
        es: "visa", fr: "visa", de: "Visum", it: "visto", pt: "visto",
        ru: "виза", zh: "签证", ja: "ビザ", ko: "비자", ar: "تأشيرة", hi: "वीज़ा",
        nl: "visum", pl: "wiza", tr: "vize", sv: "visum",
        uk: "віза", ro: "viză", cs: "vízum", hu: "vízum",
      },
      "social services": {
        es: "servicios sociales", fr: "services sociaux", de: "Sozialdienste", it: "servizi sociali", pt: "serviços sociais",
        ru: "социальные службы", zh: "社会服务", ja: "社会福祉サービス", ko: "사회복지서비스", ar: "خدمات اجتماعية", hi: "सामाजिक सेवाएँ",
        nl: "sociale diensten", pl: "usługi socjalne", tr: "sosyal hizmetler", sv: "socialtjänst",
        uk: "соціальні служби", ro: "servicii sociale", cs: "sociální služby", hu: "szociális szolgáltatások",
      },
      "benefit": {
        es: "prestación social", fr: "allocation", de: "Sozialleistung", it: "prestazione sociale", pt: "benefício social",
        ru: "социальное пособие", zh: "社会福利", ja: "社会給付", ko: "사회수당", ar: "إعانة", hi: "सामाजिक लाभ",
        nl: "uitkering", pl: "zasiłek", tr: "sosyal yardım", sv: "bidrag",
        uk: "соціальна допомога", ro: "prestație socială", cs: "sociální dávka", hu: "szociális juttatás",
      },
      "subsidy": {
        es: "subsidio", fr: "subvention", de: "Zuschuss", it: "sussidio", pt: "subsídio",
        ru: "субсидия", zh: "补贴", ja: "補助金", ko: "보조금", ar: "إعانة مالية", hi: "सब्सिडी",
        nl: "subsidie", pl: "dotacja", tr: "sübvansiyon", sv: "subvention",
        uk: "субсидія", ro: "subvenție", cs: "dotace", hu: "támogatás",
      },
      "municipal": {
        es: "municipal", fr: "municipal", de: "kommunal", it: "comunale", pt: "municipal",
        ru: "муниципальный", zh: "市政的", ja: "市の", ko: "시의", ar: "بلدي", hi: "नगरपालिका",
        nl: "gemeentelijk", pl: "gminny", tr: "belediye", sv: "kommunal",
        uk: "муніципальний", ro: "municipal", cs: "obecní", hu: "önkormányzati",
      },
      "notary": {
        es: "notario", fr: "notaire", de: "Notar", it: "notaio", pt: "notário",
        ru: "нотариус", zh: "公证人", ja: "公証人", ko: "공증인", ar: "كاتب عدل", hi: "नोटरी",
        nl: "notaris", pl: "notariusz", tr: "noter", sv: "notarie",
        uk: "нотаріус", ro: "notar", cs: "notář", hu: "közjegyző",
      },
      "town hall": {
        es: "ayuntamiento", fr: "mairie", de: "Rathaus", it: "municipio", pt: "câmara municipal",
        ru: "ратуша", zh: "市政厅", ja: "市庁舎", ko: "시청", ar: "مبنى البلدية", hi: "नगर भवन",
        nl: "stadhuis", pl: "ratusz", tr: "belediye binası", sv: "stadshus",
        uk: "ратуша", ro: "primărie", cs: "radnice", hu: "városháza",
      },
      "civil registry": {
        es: "registro civil", fr: "état civil", de: "Standesamt", it: "anagrafe", pt: "registo civil",
        ru: "ЗАГС", zh: "民事登记处", ja: "戸籍役場", ko: "호적 사무소", ar: "السجل المدني", hi: "नागरिक रजिस्ट्री",
        nl: "burgerlijke stand", pl: "urząd stanu cywilnego", tr: "nüfus müdürlüğü", sv: "folkbokföring",
        uk: "РАЦС", ro: "stare civilă", cs: "matrika", hu: "anyakönyvi hivatal",
      },
      "health insurance": {
        es: "seguro médico", fr: "assurance maladie", de: "Krankenversicherung", it: "assicurazione sanitaria", pt: "seguro de saúde",
        ru: "медицинская страховка", zh: "医疗保险", ja: "健康保険", ko: "건강보험", ar: "تأمين صحي", hi: "स्वास्थ्य बीमा",
        nl: "zorgverzekering", pl: "ubezpieczenie zdrowotne", tr: "sağlık sigortası", sv: "sjukförsäkring",
        uk: "медичне страхування", ro: "asigurare de sănătate", cs: "zdravotní pojištění", hu: "egészségbiztosítás",
      },
      "housing": {
        es: "vivienda", fr: "logement", de: "Wohnung", it: "alloggio", pt: "habitação",
        ru: "жильё", zh: "住房", ja: "住居", ko: "주거", ar: "سكن", hi: "आवास",
        nl: "huisvesting", pl: "mieszkanie", tr: "konut", sv: "bostad",
        uk: "житло", ro: "locuință", cs: "bydlení", hu: "lakhatás",
      },
      "public school": {
        es: "escuela pública", fr: "école publique", de: "öffentliche Schule", it: "scuola pubblica", pt: "escola pública",
        ru: "государственная школа", zh: "公立学校", ja: "公立学校", ko: "공립학교", ar: "مدرسة حكومية", hi: "सरकारी स्कूल",
        nl: "openbare school", pl: "szkoła publiczna", tr: "devlet okulu", sv: "kommunal skola",
        uk: "державна школа", ro: "școală publică", cs: "veřejná škola", hu: "állami iskola",
      },
      "social worker": {
        es: "trabajador social", fr: "travailleur social", de: "Sozialarbeiter", it: "assistente sociale", pt: "assistente social",
        ru: "социальный работник", zh: "社会工作者", ja: "ソーシャルワーカー", ko: "사회복지사", ar: "أخصائي اجتماعي", hi: "सामाजिक कार्यकर्ता",
        nl: "maatschappelijk werker", pl: "pracownik socjalny", tr: "sosyal hizmet uzmanı", sv: "socialarbetare",
        uk: "соціальний працівник", ro: "asistent social", cs: "sociální pracovník", hu: "szociális munkás",
      },
      "interpreter": {
        es: "intérprete", fr: "interprète", de: "Dolmetscher", it: "interprete", pt: "intérprete",
        ru: "переводчик", zh: "口译员", ja: "通訳", ko: "통역사", ar: "مترجم فوري", hi: "दुभाषिया",
        nl: "tolk", pl: "tłumacz ustny", tr: "tercüman", sv: "tolk",
        uk: "перекладач", ro: "interpret", cs: "tlumočník", hu: "tolmács",
      },
      "legal aid": {
        es: "asistencia jurídica", fr: "aide juridique", de: "Rechtshilfe", it: "assistenza legale", pt: "assistência jurídica",
        ru: "юридическая помощь", zh: "法律援助", ja: "法律扶助", ko: "법률 지원", ar: "مساعدة قانونية", hi: "कानूनी सहायता",
        nl: "rechtsbijstand", pl: "pomoc prawna", tr: "hukuki yardım", sv: "rättshjälp",
        uk: "юридична допомога", ro: "asistență juridică", cs: "právní pomoc", hu: "jogi segítség",
      },
      "immigration office": {
        es: "oficina de inmigración", fr: "bureau d'immigration", de: "Ausländerbehörde", it: "ufficio immigrazione", pt: "serviço de imigração",
        ru: "миграционная служба", zh: "移民局", ja: "入国管理局", ko: "출입국관리사무소", ar: "مكتب الهجرة", hi: "आप्रवासन कार्यालय",
        nl: "immigratiedienst", pl: "urząd imigracyjny", tr: "göç idaresi", sv: "migrationsverket",
        uk: "міграційна служба", ro: "oficiul de imigrare", cs: "cizinecká policie", hu: "bevándorlási hivatal",
      },
      "asylum": {
        es: "asilo", fr: "asile", de: "Asyl", it: "asilo", pt: "asilo",
        ru: "убежище", zh: "庇护", ja: "庇護", ko: "망명", ar: "لجوء", hi: "शरण",
        nl: "asiel", pl: "azyl", tr: "sığınma", sv: "asyl",
        uk: "притулок", ro: "azil", cs: "azyl", hu: "menedékjog",
      },
      "citizenship": {
        es: "ciudadanía", fr: "citoyenneté", de: "Staatsbürgerschaft", it: "cittadinanza", pt: "cidadania",
        ru: "гражданство", zh: "公民身份", ja: "市民権", ko: "시민권", ar: "جنسية", hi: "नागरिकता",
        nl: "staatsburgerschap", pl: "obywatelstwo", tr: "vatandaşlık", sv: "medborgarskap",
        uk: "громадянство", ro: "cetățenie", cs: "občanství", hu: "állampolgárság",
      },
      "integration program": {
        es: "programa de integración", fr: "programme d'intégration", de: "Integrationsprogramm", it: "programma di integrazione", pt: "programa de integração",
        ru: "программа интеграции", zh: "融合项目", ja: "統合プログラム", ko: "통합 프로그램", ar: "برنامج اندماج", hi: "एकीकरण कार्यक्रम",
        nl: "integratieprogramma", pl: "program integracyjny", tr: "entegrasyon programı", sv: "integrationsprogram",
        uk: "програма інтеграції", ro: "program de integrare", cs: "integrační program", hu: "integrációs program",
      },
      "language course": {
        es: "curso de idiomas", fr: "cours de langue", de: "Sprachkurs", it: "corso di lingua", pt: "curso de idiomas",
        ru: "языковой курс", zh: "语言课程", ja: "語学コース", ko: "어학 과정", ar: "دورة لغة", hi: "भाषा पाठ्यक्रम",
        nl: "taalcursus", pl: "kurs językowy", tr: "dil kursu", sv: "språkkurs",
        uk: "мовний курс", ro: "curs de limbă", cs: "jazykový kurz", hu: "nyelvtanfolyam",
      },
      "family reunification": {
        es: "reunificación familiar", fr: "regroupement familial", de: "Familienzusammenführung", it: "ricongiungimento familiare", pt: "reagrupamento familiar",
        ru: "воссоединение семьи", zh: "家庭团聚", ja: "家族再統合", ko: "가족 재결합", ar: "لم شمل الأسرة", hi: "परिवार पुनर्मिलन",
        nl: "gezinshereniging", pl: "łączenie rodzin", tr: "aile birleşimi", sv: "familjeåterförening",
        uk: "возз'єднання сім'ї", ro: "reunificarea familiei", cs: "sloučení rodiny", hu: "családegyesítés",
      },
      "birth certificate": {
        es: "certificado de nacimiento", fr: "acte de naissance", de: "Geburtsurkunde", it: "certificato di nascita", pt: "certidão de nascimento",
        ru: "свидетельство о рождении", zh: "出生证明", ja: "出生証明書", ko: "출생증명서", ar: "شهادة ميلاد", hi: "जन्म प्रमाणपत्र",
        nl: "geboorteakte", pl: "akt urodzenia", tr: "doğum belgesi", sv: "födelsebevis",
        uk: "свідоцтво про народження", ro: "certificat de naștere", cs: "rodný list", hu: "születési anyakönyvi kivonat",
      },
      "tax identification number": {
        es: "número de identificación fiscal", fr: "numéro fiscal", de: "Steueridentifikationsnummer", it: "codice fiscale", pt: "número de identificação fiscal",
        ru: "ИНН", zh: "税号", ja: "納税者番号", ko: "납세자 번호", ar: "رقم التعريف الضريبي", hi: "कर पहचान संख्या",
        nl: "belastingnummer", pl: "NIP", tr: "vergi kimlik numarası", sv: "skatteregistreringsnummer",
        uk: "ІПН", ro: "cod fiscal", cs: "daňové identifikační číslo", hu: "adóazonosító jel",
      },
      "unemployment": {
        es: "desempleo", fr: "chômage", de: "Arbeitslosigkeit", it: "disoccupazione", pt: "desemprego",
        ru: "безработица", zh: "失业", ja: "失業", ko: "실업", ar: "بطالة", hi: "बेरोज़गारी",
        nl: "werkloosheid", pl: "bezrobocie", tr: "işsizlik", sv: "arbetslöshet",
        uk: "безробіття", ro: "șomaj", cs: "nezaměstnanost", hu: "munkanélküliség",
      },
      "community center": {
        es: "centro comunitario", fr: "centre communautaire", de: "Gemeindezentrum", it: "centro comunitario", pt: "centro comunitário",
        ru: "общественный центр", zh: "社区中心", ja: "コミュニティセンター", ko: "커뮤니티 센터", ar: "مركز مجتمعي", hi: "सामुदायिक केंद्र",
        nl: "buurthuis", pl: "dom kultury", tr: "toplum merkezi", sv: "medborgarhus",
        uk: "громадський центр", ro: "centru comunitar", cs: "komunitní centrum", hu: "közösségi ház",
      },
      "voter registration": {
        es: "registro electoral", fr: "inscription électorale", de: "Wählerregistrierung", it: "iscrizione elettorale", pt: "registo eleitoral",
        ru: "регистрация избирателей", zh: "选民登记", ja: "有権者登録", ko: "유권자 등록", ar: "تسجيل الناخبين", hi: "मतदाता पंजीकरण",
        nl: "kiezersregistratie", pl: "rejestracja wyborców", tr: "seçmen kaydı", sv: "röstlängd",
        uk: "реєстрація виборців", ro: "înregistrare electorală", cs: "registrace voličů", hu: "választói regisztráció",
      },
      "public transportation": {
        es: "transporte público", fr: "transport en commun", de: "öffentlicher Nahverkehr", it: "trasporto pubblico", pt: "transporte público",
        ru: "общественный транспорт", zh: "公共交通", ja: "公共交通機関", ko: "대중교통", ar: "مواصلات عامة", hi: "सार्वजनिक परिवहन",
        nl: "openbaar vervoer", pl: "transport publiczny", tr: "toplu taşıma", sv: "kollektivtrafik",
        uk: "громадський транспорт", ro: "transport public", cs: "veřejná doprava", hu: "tömegközlekedés",
      },
      "childcare": {
        es: "guardería", fr: "garde d'enfants", de: "Kinderbetreuung", it: "assistenza all'infanzia", pt: "creche",
        ru: "детский сад", zh: "托儿服务", ja: "保育", ko: "보육", ar: "رعاية الأطفال", hi: "बाल देखभाल",
        nl: "kinderopvang", pl: "opieka nad dziećmi", tr: "çocuk bakımı", sv: "barnomsorg",
        uk: "дитячий садок", ro: "îngrijire a copiilor", cs: "péče o děti", hu: "gyermekfelügyelet",
      },
      "domestic violence": {
        es: "violencia doméstica", fr: "violence domestique", de: "häusliche Gewalt", it: "violenza domestica", pt: "violência doméstica",
        ru: "домашнее насилие", zh: "家庭暴力", ja: "家庭内暴力", ko: "가정 폭력", ar: "عنف أسري", hi: "घरेलू हिंसा",
        nl: "huiselijk geweld", pl: "przemoc domowa", tr: "aile içi şiddet", sv: "våld i hemmet",
        uk: "домашнє насильство", ro: "violență domestică", cs: "domácí násilí", hu: "családon belüli erőszak",
      },
    },

    doNotTranslate: [
      "SSN", "USCIS", "ICE", "DHS", "EAD", "TPS", "DACA", "I-94", "I-130", "I-485",
      "Green Card", "Social Security",
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // GENERAL
  // ═══════════════════════════════════════════════════════════════
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

// Build full glossary prompt for a domain+language (session-level, not per-request)
export function buildFullGlossaryPrompt(
  domain: DomainConfig,
  targetLang: string,
): string {
  const entries: string[] = [];
  for (const [term, translations] of Object.entries(domain.glossary)) {
    const translation = translations[targetLang];
    if (translation) {
      entries.push(`Always translate "${term}" as "${translation}"`);
    }
  }

  const dntTerms = domain.doNotTranslate;

  let prompt = "";
  if (entries.length > 0) {
    prompt += `\n\nGlossary — use these exact translations:\n${entries.join("\n")}\n`;
  }
  if (dntTerms.length > 0) {
    prompt += `\nDo NOT translate (keep as-is): ${dntTerms.join(", ")}\n`;
  }
  return prompt;
}

// Pre-filter: scan source text, return only matching glossary terms + DNT (for per-request use)
export function buildGlossaryPrompt(
  domain: DomainConfig,
  targetLang: string,
  sourceText?: string
): string {
  const textLower = sourceText?.toLowerCase() || "";

  const matchedEntries: string[] = [];
  for (const [term, translations] of Object.entries(domain.glossary)) {
    const translation = translations[targetLang];
    if (!translation) continue;
    if (!sourceText || textLower.includes(term.toLowerCase())) {
      matchedEntries.push(`"${term}" → "${translation}"`);
    }
  }

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
