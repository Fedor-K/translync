export interface ZoomPageContent {
  badge: string;
  h1Line1: string;
  h1Line2: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  problemHeading: string;
  solutionHeading: string;
  comparisonHeading: string;
  useCasesHeading: string;
  faqHeading: string;
  ctaBottomHeading: string;
  ctaBottomSubtitle: string;
  ctaBottomButton: string;
  metaTitle: string;
  metaDescription: string;
  problems: { problem: string; detail: string }[];
  solutions: { solution: string; detail: string }[];
  faq: { q: string; a: string }[];
  useCases: { title: string; desc: string }[];
  comparisonHeaders: [string, string, string];
  comparisonRows: [string, string, string][];
}

export const ZOOM_TRANSLATIONS: Record<string, ZoomPageContent> = {
  es: {
    badge: "Alternativa a Zoom",
    h1Line1: "Interpretación Simultánea en Zoom",
    h1Line2: "Sin Intérpretes",
    subtitle: "La función de interpretación de Zoom requiere intérpretes humanos, cuesta $200-500+ por sesión y solo funciona dentro de Zoom. Translync te da traducción con IA en 70+ idiomas por $3/hora — con cualquier plataforma.",
    ctaPrimary: "Prueba Gratis — 30 Minutos",
    ctaSecondary: "Cómo Funciona",
    problemHeading: "El problema con la interpretación de Zoom",
    solutionHeading: "Cómo Translync lo resuelve",
    comparisonHeading: "Zoom vs Translync — de un vistazo",
    useCasesHeading: "Funciona para todo tipo de evento",
    faqHeading: "Preguntas frecuentes",
    ctaBottomHeading: "Deja de pagar intérpretes",
    ctaBottomSubtitle: "30 minutos gratis. Funciona con Zoom, Meet, Teams o presencial. Sin tarjeta de crédito.",
    ctaBottomButton: "Comienza Gratis",
    metaTitle: "Alternativa a Interpretación de Zoom — Translync vs Zoom",
    metaDescription: "¿Frustrado con la interpretación de Zoom? Translync ofrece traducción IA en 70+ idiomas, sin intérpretes. Funciona con cualquier plataforma. Desde $3/hora.",
    problems: [
      { problem: "Requiere intérpretes humanos", detail: "Necesitas encontrar, contratar y programar intérpretes para cada reunión. Cuesta $200-500+ por sesión." },
      { problem: "Solo funciona en Zoom", detail: "Si usas Teams, Meet o eventos presenciales — no hay solución." },
      { problem: "Máximo 25 idiomas", detail: "Zoom soporta hasta 25 canales de idioma. Translync soporta 70+." },
      { problem: "Configuración compleja", detail: "El anfitrión debe habilitar interpretación, asignar intérpretes a canales, gestionar audio." },
    ],
    solutions: [
      { solution: "IA — sin intérpretes", detail: "Translync usa IA para transcribir, traducir y entregar audio automáticamente." },
      { solution: "Funciona en todas partes", detail: "Zoom, Teams, Meet, eventos presenciales — independiente de plataforma." },
      { solution: "70+ idiomas, siempre disponibles", detail: "Sin buscar intérpretes para idiomas raros. IA soporta 70+ idiomas al instante." },
      { solution: "$3/hora por idioma", detail: "Una reunión de 1 hora en 5 idiomas cuesta $15. Compara con $500+ por 5 intérpretes." },
    ],
    faq: [
      { q: "¿Puedo usar Translync durante una llamada de Zoom?", a: "Sí. Abre Translync en el navegador, comparte el audio. Los asistentes escanean el código QR y escuchan la traducción en su teléfono." },
      { q: "¿Cómo se compara con la interpretación integrada de Zoom?", a: "Zoom requiere intérpretes humanos ($200-500+), soporta 25 idiomas y solo funciona en Zoom. Translync usa IA ($3/hr), soporta 70+ idiomas y funciona con cualquier plataforma." },
      { q: "¿Es suficientemente precisa la traducción IA?", a: "Para reuniones de negocios, servicios religiosos y conferencias, Translync alcanza 90-95% de precisión. Los glosarios especializados aseguran términos clave correctos." },
      { q: "¿Los asistentes necesitan descargar algo?", a: "No. Escanean un código QR con su teléfono. La traducción se abre instantáneamente en el navegador." },
    ],
    useCases: [
      { title: "Servicios religiosos", desc: "Sermones semanales con traducción IA en 3+ idiomas" },
      { title: "Reuniones corporativas", desc: "Llamadas internacionales con traducción en tiempo real" },
      { title: "Conferencias", desc: "Eventos donde asistentes eligen su idioma vía QR" },
      { title: "Webinars", desc: "Webinars en vivo en cualquier plataforma" },
      { title: "Asambleas comunitarias", desc: "Reuniones municipales accesibles en 70+ idiomas" },
      { title: "Clases universitarias", desc: "Estudiantes internacionales siguen en su idioma" },
    ],
    comparisonHeaders: ["Característica", "Zoom Interpretación", "Translync"],
    comparisonRows: [
      ["Método", "Solo intérpretes humanos", "IA (automático)"],
      ["Costo por sesión", "$200–500+ (intérpretes)", "$3/hr por idioma"],
      ["Idiomas", "Hasta 25", "70+"],
      ["Fuera de Zoom", "No", "Sí — cualquier plataforma"],
      ["Acceso asistentes", "Cambiar canal en Zoom", "Escanear QR en teléfono"],
      ["Tiempo de setup", "30+ minutos", "10 segundos"],
      ["Prueba gratis", "No", "30 minutos gratis"],
    ],
  },

  zh: {
    badge: "Zoom 替代方案",
    h1Line1: "Zoom 同声传译",
    h1Line2: "无需翻译员",
    subtitle: "Zoom 的口译功能需要人工翻译员，每场费用 200-500 美元以上，且仅限 Zoom 内使用。Translync 提供 70+ 语言的 AI 翻译，每小时仅需 3 美元，适用于任何平台。",
    ctaPrimary: "免费试用 — 30 分钟",
    ctaSecondary: "了解工作原理",
    problemHeading: "Zoom 口译的问题",
    solutionHeading: "Translync 如何解决",
    comparisonHeading: "Zoom vs Translync — 一览对比",
    useCasesHeading: "适用于各类活动",
    faqHeading: "常见问题",
    ctaBottomHeading: "停止支付翻译员费用",
    ctaBottomSubtitle: "30 分钟免费。支持 Zoom、Meet、Teams 或线下活动。无需信用卡。",
    ctaBottomButton: "免费开始",
    metaTitle: "Zoom 口译替代方案 — Translync vs Zoom 翻译",
    metaDescription: "对 Zoom 同声传译感到困扰？Translync 提供 70+ 语言的 AI 翻译，无需翻译员。适用于任何平台。每小时 3 美元起。",
    problems: [
      { problem: "需要人工翻译员", detail: "每次会议都需要寻找、雇佣和安排翻译员，每场费用 200-500 美元以上。" },
      { problem: "仅限 Zoom 内使用", detail: "如果使用 Teams、Meet 或线下活动，则无法使用。" },
      { problem: "最多 25 种语言", detail: "Zoom 最多支持 25 个语言频道。Translync 支持 70+。" },
      { problem: "设置复杂", detail: "主持人需要启用口译、分配翻译员到频道、管理音频路由。" },
    ],
    solutions: [
      { solution: "AI 驱动 — 无需翻译员", detail: "Translync 使用 AI 自动转录、翻译和传递音频。" },
      { solution: "随处可用", detail: "Zoom、Teams、Meet、线下活动 — 不依赖平台。" },
      { solution: "70+ 语言随时可用", detail: "无需为稀有语言寻找翻译员。AI 即时支持 70+ 语言。" },
      { solution: "每小时每语言 3 美元", detail: "1 小时 5 种语言的会议仅需 15 美元。对比 5 位翻译员的 500 美元以上。" },
    ],
    faq: [
      { q: "可以在 Zoom 通话中使用 Translync 吗？", a: "可以。在浏览器中打开 Translync，分享音频。参会者扫描二维码即可在手机上听到翻译。" },
      { q: "与 Zoom 内置口译相比如何？", a: "Zoom 需要人工翻译员（200-500 美元以上），支持 25 种语言。Translync 使用 AI（3 美元/小时），支持 70+ 语言，适用于任何平台。" },
      { q: "AI 翻译足够准确吗？", a: "对于商务会议、教会礼拜和会议，Translync 达到 90-95% 的准确率。专业词汇表确保关键术语正确翻译。" },
      { q: "参会者需要下载什么吗？", a: "不需要。用手机扫描二维码，翻译立即在浏览器中打开。" },
    ],
    useCases: [
      { title: "教会礼拜", desc: "每周布道，3+ 种语言 AI 翻译" },
      { title: "企业会议", desc: "国际团队通话，实时翻译" },
      { title: "会议", desc: "参会者通过二维码选择语言" },
      { title: "网络研讨会", desc: "任何平台上的直播网络研讨会" },
      { title: "市政会议", desc: "为移民社区提供 70+ 语言服务" },
      { title: "大学讲座", desc: "国际学生用母语跟听" },
    ],
    comparisonHeaders: ["功能", "Zoom 口译", "Translync"],
    comparisonRows: [
      ["翻译方式", "仅人工翻译", "AI（自动）"],
      ["每场费用", "200-500 美元+（翻译费）", "3 美元/小时/语言"],
      ["语言数量", "最多 25", "70+"],
      ["Zoom 之外", "不支持", "支持 — 任何平台"],
      ["参会者加入", "在 Zoom 中切换频道", "扫描二维码"],
      ["设置时间", "30+ 分钟", "10 秒"],
      ["免费试用", "无", "30 分钟免费"],
    ],
  },

  ar: {
    badge: "بديل Zoom",
    h1Line1: "الترجمة الفورية في Zoom",
    h1Line2: "بدون مترجمين",
    subtitle: "ميزة الترجمة في Zoom تتطلب مترجمين بشريين، وتكلّف 200-500 دولار+ لكل جلسة، وتعمل فقط داخل Zoom. يوفر Translync ترجمة بالذكاء الاصطناعي بأكثر من 70 لغة مقابل 3 دولارات/ساعة — مع أي منصة.",
    ctaPrimary: "جرّب مجانًا — 30 دقيقة",
    ctaSecondary: "كيف يعمل",
    problemHeading: "مشكلة الترجمة الفورية في Zoom",
    solutionHeading: "كيف يحلّ Translync هذه المشكلة",
    comparisonHeading: "Zoom مقابل Translync — نظرة سريعة",
    useCasesHeading: "يعمل مع جميع أنواع الفعاليات",
    faqHeading: "الأسئلة الشائعة",
    ctaBottomHeading: "توقّف عن الدفع للمترجمين",
    ctaBottomSubtitle: "30 دقيقة مجانية. يعمل مع Zoom وMeet وTeams أو الفعاليات الحضورية.",
    ctaBottomButton: "ابدأ مجانًا",
    metaTitle: "بديل ترجمة Zoom — Translync مقابل ترجمة Zoom",
    metaDescription: "محبط من الترجمة الفورية في Zoom؟ يوفر Translync ترجمة بالذكاء الاصطناعي بأكثر من 70 لغة بدون مترجمين. يعمل مع أي منصة. من 3 دولارات/ساعة.",
    problems: [
      { problem: "يتطلب مترجمين بشريين", detail: "تحتاج للبحث عن مترجمين وتوظيفهم وجدولتهم لكل اجتماع. التكلفة 200-500 دولار+ لكل جلسة." },
      { problem: "يعمل فقط داخل Zoom", detail: "إذا كنت تستخدم Teams أو Meet أو فعاليات حضورية — لا يوجد حل." },
      { problem: "25 لغة كحد أقصى", detail: "يدعم Zoom حتى 25 قناة لغوية. Translync يدعم أكثر من 70." },
      { problem: "إعداد معقّد", detail: "يجب على المضيف تفعيل الترجمة وتعيين المترجمين للقنوات وإدارة توجيه الصوت." },
    ],
    solutions: [
      { solution: "ذكاء اصطناعي — بدون مترجمين", detail: "يستخدم Translync الذكاء الاصطناعي للنسخ والترجمة وتوصيل الصوت تلقائيًا." },
      { solution: "يعمل في كل مكان", detail: "Zoom وTeams وMeet والفعاليات الحضورية — مستقل عن المنصة." },
      { solution: "أكثر من 70 لغة متاحة دائمًا", detail: "لا حاجة للبحث عن مترجمين للغات نادرة. الذكاء الاصطناعي يدعم 70+ لغة فورًا." },
      { solution: "3 دولارات/ساعة لكل لغة", detail: "اجتماع مدته ساعة بـ 5 لغات يكلف 15 دولارًا فقط." },
    ],
    faq: [
      { q: "هل يمكنني استخدام Translync أثناء مكالمة Zoom؟", a: "نعم. افتح Translync في المتصفح وشارك الصوت. يمسح الحاضرون رمز QR ويسمعون الترجمة على هواتفهم." },
      { q: "كيف يقارن بترجمة Zoom المدمجة؟", a: "Zoom يتطلب مترجمين بشريين (200-500 دولار+) ويدعم 25 لغة. Translync يستخدم AI (3 دولارات/ساعة) ويدعم 70+ لغة ويعمل مع أي منصة." },
      { q: "هل ترجمة AI دقيقة بما فيه الكفاية؟", a: "للاجتماعات التجارية والخدمات الدينية والمؤتمرات، يحقق Translync دقة 90-95%. المسارد المتخصصة تضمن ترجمة المصطلحات الرئيسية بشكل صحيح." },
      { q: "هل يحتاج الحاضرون لتنزيل شيء؟", a: "لا. يمسحون رمز QR بهاتفهم والترجمة تفتح فورًا في المتصفح." },
    ],
    useCases: [
      { title: "الخدمات الدينية", desc: "خطب أسبوعية بترجمة AI بأكثر من 3 لغات" },
      { title: "اجتماعات الشركات", desc: "مكالمات فرق دولية بترجمة فورية" },
      { title: "المؤتمرات", desc: "الحاضرون يختارون لغتهم عبر QR" },
      { title: "الندوات عبر الإنترنت", desc: "ندوات مباشرة على أي منصة" },
      { title: "اجتماعات البلدية", desc: "اجتماعات متاحة لمجتمعات المهاجرين بأكثر من 70 لغة" },
      { title: "محاضرات جامعية", desc: "الطلاب الدوليون يتابعون بلغتهم الأم" },
    ],
    comparisonHeaders: ["الميزة", "ترجمة Zoom", "Translync"],
    comparisonRows: [
      ["طريقة الترجمة", "مترجمون بشريون فقط", "AI (تلقائي)"],
      ["التكلفة لكل جلسة", "200-500 دولار+", "3 دولارات/ساعة/لغة"],
      ["اللغات", "حتى 25", "70+"],
      ["خارج Zoom", "لا", "نعم — أي منصة"],
      ["وصول الحاضرين", "تبديل القناة في Zoom", "مسح QR بالهاتف"],
      ["وقت الإعداد", "30+ دقيقة", "10 ثوانٍ"],
      ["تجربة مجانية", "لا", "30 دقيقة مجانية"],
    ],
  },

  pt: {
    badge: "Alternativa ao Zoom",
    h1Line1: "Interpretação Simultânea no Zoom",
    h1Line2: "Sem Intérpretes",
    subtitle: "A interpretação do Zoom exige intérpretes humanos, custa US$ 200-500+ por sessão e só funciona dentro do Zoom. O Translync oferece tradução com IA em 70+ idiomas por US$ 3/hora — com qualquer plataforma.",
    ctaPrimary: "Teste Grátis — 30 Minutos",
    ctaSecondary: "Como Funciona",
    problemHeading: "O problema com a interpretação do Zoom",
    solutionHeading: "Como o Translync resolve isso",
    comparisonHeading: "Zoom vs Translync — visão geral",
    useCasesHeading: "Funciona para qualquer tipo de evento",
    faqHeading: "Perguntas frequentes",
    ctaBottomHeading: "Pare de pagar intérpretes",
    ctaBottomSubtitle: "30 minutos grátis. Funciona com Zoom, Meet, Teams ou presencial. Sem cartão de crédito.",
    ctaBottomButton: "Comece Grátis",
    metaTitle: "Alternativa à Interpretação do Zoom — Translync vs Zoom",
    metaDescription: "Frustrado com a interpretação do Zoom? O Translync oferece tradução IA em 70+ idiomas, sem intérpretes. Funciona com qualquer plataforma. A partir de US$ 3/hora.",
    problems: [
      { problem: "Requer intérpretes humanos", detail: "Você precisa encontrar, contratar e agendar intérpretes para cada reunião. Custa US$ 200-500+ por sessão." },
      { problem: "Só funciona no Zoom", detail: "Se você usa Teams, Meet ou eventos presenciais — não tem solução." },
      { problem: "Máximo 25 idiomas", detail: "O Zoom suporta até 25 canais de idioma. O Translync suporta 70+." },
      { problem: "Configuração complexa", detail: "O anfitrião precisa ativar interpretação, designar intérpretes para canais e gerenciar o áudio." },
    ],
    solutions: [
      { solution: "IA — sem intérpretes", detail: "O Translync usa IA para transcrever, traduzir e entregar áudio automaticamente." },
      { solution: "Funciona em qualquer lugar", detail: "Zoom, Teams, Meet, eventos presenciais — independente de plataforma." },
      { solution: "70+ idiomas sempre disponíveis", detail: "Sem precisar buscar intérpretes para idiomas raros. IA suporta 70+ idiomas instantaneamente." },
      { solution: "US$ 3/hora por idioma", detail: "Uma reunião de 1 hora em 5 idiomas custa US$ 15. Compare com US$ 500+ por 5 intérpretes." },
    ],
    faq: [
      { q: "Posso usar o Translync durante uma chamada do Zoom?", a: "Sim. Abra o Translync no navegador e compartilhe o áudio. Os participantes escaneiam o QR code e ouvem a tradução no celular." },
      { q: "Como se compara com a interpretação nativa do Zoom?", a: "O Zoom requer intérpretes humanos (US$ 200-500+), suporta 25 idiomas e só funciona no Zoom. O Translync usa IA (US$ 3/hr), suporta 70+ idiomas e funciona com qualquer plataforma." },
      { q: "A tradução por IA é precisa o suficiente?", a: "Para reuniões de negócios, cultos e conferências, o Translync alcança 90-95% de precisão. Glossários especializados garantem a tradução correta de termos-chave." },
      { q: "Os participantes precisam baixar algo?", a: "Não. Escaneiam um QR code com o celular e a tradução abre instantaneamente no navegador." },
    ],
    useCases: [
      { title: "Cultos", desc: "Pregações semanais com tradução IA em 3+ idiomas" },
      { title: "Reuniões corporativas", desc: "Chamadas internacionais com tradução em tempo real" },
      { title: "Conferências", desc: "Participantes escolhem seu idioma via QR code" },
      { title: "Webinars", desc: "Webinars ao vivo em qualquer plataforma" },
      { title: "Assembleias comunitárias", desc: "Reuniões municipais acessíveis em 70+ idiomas" },
      { title: "Aulas universitárias", desc: "Estudantes internacionais acompanham em seu idioma" },
    ],
    comparisonHeaders: ["Recurso", "Interpretação Zoom", "Translync"],
    comparisonRows: [
      ["Método", "Apenas intérpretes humanos", "IA (automático)"],
      ["Custo por sessão", "US$ 200-500+ (intérpretes)", "US$ 3/hr por idioma"],
      ["Idiomas", "Até 25", "70+"],
      ["Fora do Zoom", "Não", "Sim — qualquer plataforma"],
      ["Acesso participantes", "Mudar canal no Zoom", "Escanear QR no celular"],
      ["Tempo de setup", "30+ minutos", "10 segundos"],
      ["Teste grátis", "Não", "30 minutos grátis"],
    ],
  },
};
