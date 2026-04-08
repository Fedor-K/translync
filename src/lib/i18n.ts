export const LOCALES = ["en", "es", "zh", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  zh: "中文",
  ar: "العربية",
};

export const RTL_LOCALES: Locale[] = ["ar"];

interface TranslationSchema {
  nav: {
    howItWorks: string;
    pricing: string;
    faq: string;
    signIn: string;
    startFree: string;
  };
  hero: {
    title: string;
    highlight: string;
    subtitle: string;
    statLanguages: string;
    statLatency: string;
    statPrice: string;
    ctaStart: string;
    ctaHow: string;
  };
  howItWorks: {
    heading: string;
    subheading: string;
    steps: { title: string; description: string }[];
  };
  features: {
    heading: string;
    subheading: string;
    items: { title: string; description: string }[];
  };
  pricing: {
    heading: string;
    subheading: string;
    example: string;
    plans: {
      name: string;
      price: string;
      sub: string;
      features: string[];
      cta: string;
    }[];
  };
  faq: {
    heading: string;
    subheading: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    heading: string;
    subheading: string;
    button: string;
    note: string;
  };
  footer: {
    product: string;
    solutions: string;
    legal: string;
    privacyPolicy: string;
    termsOfService: string;
    contact: string;
    forChurches: string;
    forNGOs: string;
    forUniversities: string;
    forCommunities: string;
    copyright: string;
    blog: string;
  };
  login: {
    title: string;
    subtitle: string;
    sendMagicLink: string;
    sending: string;
    checkEmail: string;
    checkEmailDesc: string;
    linkExpires: string;
    differentEmail: string;
    noPassword: string;
    backToHome: string;
  };
  privacy: string;
  terms: string;
  blog: {
    title: string;
    subtitle: string;
    noPostsTitle: string;
    noPostsSubtitle: string;
    minRead: string;
  };
  breadcrumbs: {
    home: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    newStream: string;
    yourStreams: string;
    sessionsTotal: string;
    noStreamsTitle: string;
    noStreamsSubtitle: string;
    createFirstStream: string;
    createNewStream: string;
    usageThisMonth: string;
    minutes: string;
    sessions: string;
    freeTier: string;
    languagesThisMonth: string;
    noLanguagesYet: string;
    howItWorksTitle: string;
    howItWorksSteps: string[];
    learnMore: string;
    signOut: string;
    // Create session modal
    newTranslationStream: string;
    sessionName: string;
    sessionNamePlaceholder: string;
    sessionNameHint: string;
    domain: string;
    speakerLanguage: string;
    translateTo: string;
    estimatedCost: string;
    perHour: string;
    language: string;
    languages: string;
    startTranslationSession: string;
    freeMinutesNote: string;
    selectAtLeastOne: string;
    // Session row
    live: string;
    ended: string;
    expired: string;
    open: string;
    copyLink: string;
    copied: string;
    qr: string;
    remove: string;
    shareSession: string;
    downloadQR: string;
  };
  session: {
    readyToStart: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    startTranslation: string;
    micPermission: string;
    connecting: string;
    hearingYou: string;
    speakIntoMic: string;
    stopSession: string;
    sessionEnded: string;
    totalSegments: string;
    shareWithAudience: string;
    shareSubtitle: string;
    preview: string;
    liveTranscript: string;
    micBlocked: string;
    tryAgain: string;
    // OBS section
    streamViaOBS: string;
    obsAlternative: string;
    obsDescription: string;
    obsRtmpUrl: string;
    obsStreamKey: string;
    obsCopy: string;
    obsSetupTitle: string;
    obsSteps: string[];
    obsTip: string;
  };
  listen: {
    selectLanguage: string;
    listening: string;
    waiting: string;
    sessionEndedTitle: string;
    sessionEndedSubtitle: string;
    mute: string;
    unmute: string;
  };
}

export const TRANSLATIONS: Record<"es" | "zh" | "ar", TranslationSchema> = {
  // ---------------------------------------------------------------------------
  // SPANISH — Latin American neutral
  // ---------------------------------------------------------------------------
  es: {
    nav: {
      howItWorks: "Cómo funciona",
      pricing: "Precios",
      faq: "Preguntas frecuentes",
      signIn: "Iniciar sesión",
      startFree: "Comienza gratis",
    },
    hero: {
      title: "Traducción con IA en tiempo real",
      highlight: "para cualquier evento",
      subtitle:
        "Elimina las barreras del idioma en conferencias, servicios religiosos, aulas y reuniones comunitarias. Sin apps, sin hardware — solo traducción instantánea impulsada por IA.",
      statLanguages: "Idiomas",
      statLatency: "Latencia",
      statPrice: "Por hr / idioma",
      ctaStart: "Comienza gratis",
      ctaHow: "Descubre cómo funciona",
    },
    howItWorks: {
      heading: "Listo en 10 segundos",
      subheading:
        "No necesitas instalar nada ni configurar equipos. En tres pasos simples tu audiencia escucha en su propio idioma.",
      steps: [
        {
          title: "Crea una transmisión",
          description:
            "Inicia sesión, elige los idiomas que necesitas y crea tu canal de traducción en segundos.",
        },
        {
          title: "Comparte el código QR",
          description:
            "Los asistentes escanean el código con su teléfono — sin descargas, sin registros, sin complicaciones.",
        },
        {
          title: "Habla con naturalidad",
          description:
            "Nuestra IA traduce tu voz en tiempo real. Los asistentes leen los subtítulos en el idioma que elijan.",
        },
      ],
    },
    features: {
      heading: "Todo lo que necesitas. Nada que te sobre.",
      subheading:
        "Herramientas potentes diseñadas para que la traducción en vivo sea sencilla, precisa y accesible.",
      items: [
        {
          title: "Más de 70 idiomas",
          description:
            "Desde español y mandarín hasta lenguas menos comunes — cubrimos prácticamente cualquier audiencia global.",
        },
        {
          title: "Identificación de hablantes",
          description:
            "Distingue automáticamente quién está hablando para que las traducciones reflejen cada voz con claridad.",
        },
        {
          title: "Glosarios especializados",
          description:
            "Añade terminología propia de tu sector — médica, legal, religiosa o técnica — para traducciones más precisas.",
        },
        {
          title: "Audio en tiempo real",
          description:
            "Captura el audio directamente desde el micrófono del orador con latencia ultra baja.",
        },
        {
          title: "Compartir por código QR",
          description:
            "Un solo escaneo conecta a los asistentes al canal de traducción. Sin apps, sin contraseñas.",
        },
        {
          title: "Traducción contextual",
          description:
            "La IA entiende el contexto completo de la conversación para ofrecer traducciones naturales, no literales.",
        },
      ],
    },
    pricing: {
      heading: "Precios simples y transparentes",
      subheading:
        "Paga solo por lo que usas. Sin contratos, sin sorpresas, sin letras pequeñas.",
      example: "Evento de 1 hora en 3 idiomas = $9 en total",
      plans: [
        {
          name: "Gratis",
          price: "$0",
          sub: "30 minutos incluidos",
          features: [
            "Hasta 2 idiomas",
            "Subtítulos en tiempo real",
            "Compartir por código QR",
            "Sin tarjeta de crédito",
          ],
          cta: "Comenzar gratis",
        },
        {
          name: "Pago por uso",
          price: "$3",
          sub: "por hora / idioma",
          features: [
            "Más de 70 idiomas",
            "Identificación de hablantes",
            "Glosarios especializados",
            "Historial de transcripciones",
            "Soporte prioritario",
          ],
          cta: "Comenzar ahora",
        },
        {
          name: "Empresarial",
          price: "Personalizado",
          sub: "para organizaciones",
          features: [
            "Volumen ilimitado",
            "Facturación centralizada",
            "Gestor de cuenta dedicado",
            "Acuerdo de nivel de servicio (SLA)",
            "Integraciones a medida",
            "Incorporación asistida",
          ],
          cta: "Contactar ventas",
        },
      ],
    },
    faq: {
      heading: "Preguntas frecuentes",
      subheading:
        "Todo lo que necesitas saber sobre Translync y la traducción en vivo con IA.",
      items: [
        {
          question: "¿Cómo funciona Translync?",
          answer:
            "Translync captura el audio del orador en tiempo real, lo transcribe y lo traduce a los idiomas seleccionados mediante inteligencia artificial. Los asistentes escanean un código QR y leen los subtítulos en su propio idioma desde su teléfono.",
        },
        {
          question: "¿Cuántos idiomas están disponibles?",
          answer:
            "Actualmente ofrecemos más de 70 idiomas, incluyendo español, chino, árabe, francés, portugués, hindi y muchos más. Agregamos nuevos idiomas de forma continua.",
        },
        {
          question: "¿Los asistentes necesitan instalar alguna aplicación?",
          answer:
            "No. Los asistentes solo necesitan escanear el código QR con la cámara de su teléfono. La traducción se abre directamente en el navegador — sin descargas, sin registros.",
        },
        {
          question: "¿Qué tan precisa es la traducción?",
          answer:
            "Nuestra IA utiliza modelos de lenguaje de última generación con comprensión contextual. La precisión es comparable a la de un intérprete profesional en la mayoría de los casos, y mejora aún más con glosarios personalizados.",
        },
        {
          question: "¿Qué calidad de audio necesito?",
          answer:
            "Un micrófono estándar es suficiente. Para mejores resultados recomendamos un micrófono de solapa o de mesa en ambientes con ruido. Translync también incluye filtros de ruido integrados.",
        },
        {
          question: "¿Hay una prueba gratuita?",
          answer:
            "Sí. Cada cuenta nueva incluye 30 minutos gratuitos de traducción en hasta 2 idiomas. No se requiere tarjeta de crédito. Es ideal para probar el servicio antes de tu próximo evento.",
        },
      ],
    },
    cta: {
      heading: "Rompe todas las barreras del idioma",
      subheading:
        "Únete a miles de organizadores que ya usan Translync para conectar con audiencias multilingües en todo el mundo.",
      button: "Comienza gratis",
      note: "30 minutos gratis incluidos",
    },
    footer: {
      product: "Producto",
      solutions: "Soluciones",
      legal: "Legal",
      privacyPolicy: "Política de privacidad",
      termsOfService: "Términos de servicio",
      contact: "Contacto",
      forChurches: "Para iglesias",
      forNGOs: "Para ONGs",
      forUniversities: "Para universidades",
      forCommunities: "Para comunidades",
      copyright: "Todos los derechos reservados.",
      blog: "Blog",
    },
    login: {
      title: "Inicia sesión en Translync",
      subtitle:
        "Ingresa tu correo electrónico para iniciar sesión o crear una cuenta.",
      sendMagicLink: "Enviar enlace de acceso",
      sending: "Enviando…",
      checkEmail: "Revisa tu correo",
      checkEmailDesc:
        "Te enviamos un enlace de acceso. Haz clic en el enlace del correo para continuar.",
      linkExpires: "El enlace expira en 15 minutos.",
      differentEmail: "Usar otro correo",
      noPassword: "Sin contraseñas — simple y seguro.",
      backToHome: "Volver al inicio",
    },
    privacy:
      "Translync se compromete a proteger tu privacidad. Recopilamos únicamente los datos necesarios para ofrecer el servicio de traducción. El audio se procesa en tiempo real y no se almacena de forma permanente salvo que lo solicites. No vendemos ni compartimos tu información personal con terceros. Consulta nuestra política completa para más detalles.",
    terms:
      "Al utilizar Translync aceptas estos términos de servicio. El servicio se ofrece «tal cual» y nos reservamos el derecho de modificar o suspender funcionalidades con previo aviso. Eres responsable del contenido que traduzcas a través de la plataforma. Para consultas legales, contáctanos directamente.",
    blog: {
      title: "Blog de Translync",
      subtitle:
        "Novedades, consejos y casos de uso sobre traducción con IA en tiempo real.",
      noPostsTitle: "Aún no hay publicaciones",
      noPostsSubtitle:
        "Estamos preparando contenido nuevo. Vuelve pronto para leer nuestros primeros artículos.",
      minRead: "min de lectura",
    },
    breadcrumbs: {
      home: "Inicio",
    },
    dashboard: {
      title: "Panel de control",
      subtitle: "Gestiona tus transmisiones de traducción en vivo.",
      newStream: "Nueva transmisión",
      yourStreams: "Tus transmisiones",
      sessionsTotal: "sesiones en total",
      noStreamsTitle: "Aún no tienes transmisiones",
      noStreamsSubtitle: "Crea tu primera transmisión para comenzar a traducir en vivo.",
      createFirstStream: "Crear mi primera transmisión",
      createNewStream: "Crear nueva transmisión",
      usageThisMonth: "Uso este mes",
      minutes: "minutos",
      sessions: "sesiones",
      freeTier: "Plan gratuito",
      languagesThisMonth: "Idiomas este mes",
      noLanguagesYet: "Aún no hay idiomas",
      howItWorksTitle: "¿Cómo funciona?",
      howItWorksSteps: [
        "Crea una transmisión y elige los idiomas.",
        "Comparte el código QR con tu audiencia.",
        "Habla con naturalidad — la IA traduce en tiempo real.",
        "Los asistentes leen los subtítulos en su idioma.",
      ],
      learnMore: "Más información",
      signOut: "Cerrar sesión",
      newTranslationStream: "Nueva transmisión de traducción",
      sessionName: "Nombre de la sesión",
      sessionNamePlaceholder: "Ej: Conferencia de primavera",
      sessionNameHint: "Un nombre descriptivo para identificar tu sesión.",
      domain: "Dominio",
      speakerLanguage: "Idioma del orador",
      translateTo: "Traducir a",
      estimatedCost: "Costo estimado",
      perHour: "por hora",
      language: "idioma",
      languages: "idiomas",
      startTranslationSession: "Iniciar sesión de traducción",
      freeMinutesNote: "Los primeros 30 minutos son gratis.",
      selectAtLeastOne: "Selecciona al menos un idioma",
      live: "En vivo",
      ended: "Finalizada",
      expired: "Expirada",
      open: "Abrir",
      copyLink: "Copiar enlace",
      copied: "¡Copiado!",
      qr: "QR",
      remove: "Eliminar",
      shareSession: "Compartir sesión",
      downloadQR: "Descargar QR",
    },
    session: {
      readyToStart: "Listo para comenzar",
      step1: "Permite el acceso al micrófono.",
      step2: "Haz clic en «Iniciar traducción» para comenzar.",
      step3: "Habla con claridad cerca del micrófono.",
      step4: "Comparte el código QR con tu audiencia.",
      startTranslation: "Iniciar traducción",
      micPermission: "Permiso de micrófono",
      connecting: "Conectando…",
      hearingYou: "Te estamos escuchando",
      speakIntoMic: "Habla cerca del micrófono",
      stopSession: "Detener sesión",
      sessionEnded: "Sesión finalizada",
      totalSegments: "Segmentos totales",
      shareWithAudience: "Compartir con la audiencia",
      shareSubtitle: "Los asistentes escanean el código QR para leer los subtítulos en su idioma.",
      preview: "Vista previa",
      liveTranscript: "Transcripción en vivo",
      micBlocked: "Micrófono bloqueado",
      tryAgain: "Intentar de nuevo",
      streamViaOBS: "Transmitir vía OBS",
      obsAlternative: "Alternativa: usar OBS Studio",
      obsDescription: "Transmite el audio de tu evento a través de OBS Studio en lugar del micrófono del navegador.",
      obsRtmpUrl: "URL RTMP",
      obsStreamKey: "Clave de transmisión",
      obsCopy: "Copiar",
      obsSetupTitle: "Configuración de OBS",
      obsSteps: [
        "Abre OBS Studio y ve a Ajustes → Transmisión.",
        "Selecciona «Personalizado» como servicio.",
        "Pega la URL RTMP y la clave de transmisión.",
        "Haz clic en «Iniciar transmisión» en OBS.",
      ],
      obsTip: "Consejo: usa una fuente de audio dedicada para obtener la mejor calidad de traducción.",
    },
    listen: {
      selectLanguage: "Selecciona tu idioma",
      listening: "Escuchando…",
      waiting: "Esperando al orador…",
      sessionEndedTitle: "La sesión ha finalizado",
      sessionEndedSubtitle: "El orador ha terminado la transmisión. Gracias por participar.",
      mute: "Silenciar",
      unmute: "Activar sonido",
    },
  },

  // ---------------------------------------------------------------------------
  // CHINESE SIMPLIFIED
  // ---------------------------------------------------------------------------
  zh: {
    nav: {
      howItWorks: "工作原理",
      pricing: "价格",
      faq: "常见问题",
      signIn: "登录",
      startFree: "免费开始",
    },
    hero: {
      title: "AI 实时翻译",
      highlight: "适用于各类活动",
      subtitle:
        "在会议、宗教活动、课堂和社区聚会中消除语言障碍。无需安装应用，无需额外硬件——AI 驱动的即时翻译，开箱即用。",
      statLanguages: "支持语言",
      statLatency: "延迟",
      statPrice: "每小时/语言",
      ctaStart: "免费开始",
      ctaHow: "了解工作原理",
    },
    howItWorks: {
      heading: "10 秒即可开始",
      subheading:
        "无需安装任何软件，无需配置设备。只需三步，您的听众就能用自己的语言实时理解发言内容。",
      steps: [
        {
          title: "创建翻译频道",
          description:
            "登录后选择所需语言，几秒钟内即可创建您的实时翻译频道。",
        },
        {
          title: "分享二维码",
          description:
            "参与者用手机扫描二维码即可接入——无需下载应用，无需注册账号。",
        },
        {
          title: "自然地开口说话",
          description:
            "我们的 AI 会实时翻译您的语音，参与者可以在手机上阅读所选语言的字幕。",
        },
      ],
    },
    features: {
      heading: "你需要的一切，没有多余的东西。",
      subheading: "专为实时翻译打造的强大工具——简单、精准、人人可用。",
      items: [
        {
          title: "70+ 种语言",
          description:
            "涵盖中文、西班牙语、阿拉伯语等主流语言以及众多小语种，满足全球化受众的需求。",
        },
        {
          title: "发言人识别",
          description:
            "自动区分不同发言者，让翻译内容清晰对应每位讲者。",
        },
        {
          title: "专业术语表",
          description:
            "添加行业专属术语——医学、法律、宗教或技术领域——显著提升翻译准确度。",
        },
        {
          title: "实时音频",
          description:
            "直接从演讲者的麦克风采集音频，延迟极低，体验流畅。",
        },
        {
          title: "二维码分享",
          description:
            "一次扫码即可连接翻译频道，无需安装应用，无需输入密码。",
        },
        {
          title: "上下文感知翻译",
          description:
            "AI 理解完整的对话语境，提供自然流畅的翻译，而非逐词直译。",
        },
      ],
    },
    pricing: {
      heading: "简单透明的定价",
      subheading: "按使用量付费，没有合同，没有隐藏费用。",
      example: "1 小时活动 × 3 种语言 = 总计 $9",
      plans: [
        {
          name: "免费版",
          price: "$0",
          sub: "含 30 分钟体验时长",
          features: [
            "最多 2 种语言",
            "实时字幕",
            "二维码分享",
            "无需信用卡",
          ],
          cta: "免费开始",
        },
        {
          name: "按量付费",
          price: "$3",
          sub: "每小时 / 每语言",
          features: [
            "70+ 种语言",
            "发言人识别",
            "专业术语表",
            "转录历史记录",
            "优先客服支持",
          ],
          cta: "立即开始",
        },
        {
          name: "企业版",
          price: "定制价格",
          sub: "适用于团队与组织",
          features: [
            "不限使用量",
            "统一账单管理",
            "专属客户经理",
            "服务等级协议 (SLA)",
            "定制集成方案",
            "专人协助上线",
          ],
          cta: "联系销售团队",
        },
      ],
    },
    faq: {
      heading: "常见问题",
      subheading: "关于 Translync 和 AI 实时翻译，你想了解的都在这里。",
      items: [
        {
          question: "Translync 是如何工作的？",
          answer:
            "Translync 实时捕获演讲者的音频，通过人工智能进行转录和翻译。参与者扫描二维码后，即可在手机浏览器中阅读所选语言的字幕，无需安装任何应用。",
        },
        {
          question: "支持多少种语言？",
          answer:
            "目前支持超过 70 种语言，包括中文、英语、西班牙语、阿拉伯语、法语、葡萄牙语、印地语等，并且持续增加新语种。",
        },
        {
          question: "参与者需要安装应用吗？",
          answer:
            "不需要。参与者只需用手机摄像头扫描二维码，翻译会直接在浏览器中打开——无需下载，无需注册。",
        },
        {
          question: "翻译准确度如何？",
          answer:
            "我们采用具备上下文理解能力的先进语言模型，翻译质量在多数场景下可媲美专业口译员。使用自定义术语表后，准确度会进一步提升。",
        },
        {
          question: "对音频质量有什么要求？",
          answer:
            "普通麦克风即可使用。如果环境噪音较大，建议使用领夹式或桌面麦克风以获得最佳效果。Translync 内置了降噪功能。",
        },
        {
          question: "有免费试用吗？",
          answer:
            "有的。每个新账户都包含 30 分钟免费翻译时长，支持最多 2 种语言，且无需绑定信用卡。非常适合在下次活动前体验效果。",
        },
      ],
    },
    cta: {
      heading: "打破一切语言壁垒",
      subheading:
        "加入全球数以千计的活动组织者，使用 Translync 与多语言受众建立连接。",
      button: "免费开始",
      note: "含 30 分钟免费体验",
    },
    footer: {
      product: "产品",
      solutions: "解决方案",
      legal: "法律信息",
      privacyPolicy: "隐私政策",
      termsOfService: "服务条款",
      contact: "联系我们",
      forChurches: "教会与宗教场所",
      forNGOs: "非政府组织",
      forUniversities: "高等院校",
      forCommunities: "社区组织",
      copyright: "保留所有权利。",
      blog: "博客",
    },
    login: {
      title: "登录 Translync",
      subtitle: "输入您的邮箱地址以登录或创建账户。",
      sendMagicLink: "发送登录链接",
      sending: "发送中…",
      checkEmail: "请查收邮件",
      checkEmailDesc:
        "我们已向您发送了一封包含登录链接的邮件，请点击邮件中的链接继续操作。",
      linkExpires: "链接将在 15 分钟后失效。",
      differentEmail: "使用其他邮箱",
      noPassword: "无需密码——简单又安全。",
      backToHome: "返回首页",
    },
    privacy:
      "Translync 致力于保护您的隐私。我们仅收集提供翻译服务所必需的数据。音频内容进行实时处理，除非您主动要求，否则不会被永久存储。我们不会将您的个人信息出售或分享给第三方。详情请参阅完整的隐私政策。",
    terms:
      "使用 Translync 即表示您同意本服务条款。本服务按「现状」提供，我们保留在提前通知的情况下修改或暂停功能的权利。您须对通过平台翻译的内容负责。如有法律疑问，请直接与我们联系。",
    blog: {
      title: "Translync 博客",
      subtitle: "AI 实时翻译的最新动态、使用技巧和应用案例。",
      noPostsTitle: "暂无文章",
      noPostsSubtitle: "我们正在精心准备内容，请稍后回来查看。",
      minRead: "分钟阅读",
    },
    breadcrumbs: {
      home: "首页",
    },
    dashboard: {
      title: "控制台",
      subtitle: "管理你的实时翻译频道。",
      newStream: "新建频道",
      yourStreams: "你的频道",
      sessionsTotal: "场会话",
      noStreamsTitle: "暂无翻译频道",
      noStreamsSubtitle: "创建你的第一个频道，开始实时翻译。",
      createFirstStream: "创建第一个频道",
      createNewStream: "新建频道",
      usageThisMonth: "本月用量",
      minutes: "分钟",
      sessions: "场会话",
      freeTier: "免费版",
      languagesThisMonth: "本月使用语言",
      noLanguagesYet: "暂无语言记录",
      howItWorksTitle: "如何使用？",
      howItWorksSteps: [
        "创建频道并选择目标语言。",
        "将二维码分享给你的听众。",
        "自然地说话——AI 会实时翻译。",
        "听众在手机上阅读所选语言的字幕。",
      ],
      learnMore: "了解更多",
      signOut: "退出登录",
      newTranslationStream: "新建翻译频道",
      sessionName: "会话名称",
      sessionNamePlaceholder: "例如：春季研讨会",
      sessionNameHint: "为会话起一个便于识别的名称。",
      domain: "领域",
      speakerLanguage: "发言语言",
      translateTo: "翻译为",
      estimatedCost: "预估费用",
      perHour: "每小时",
      language: "种语言",
      languages: "种语言",
      startTranslationSession: "开始翻译会话",
      freeMinutesNote: "前 30 分钟免费使用。",
      selectAtLeastOne: "请至少选择一种语言",
      live: "直播中",
      ended: "已结束",
      expired: "已过期",
      open: "打开",
      copyLink: "复制链接",
      copied: "已复制！",
      qr: "二维码",
      remove: "删除",
      shareSession: "分享会话",
      downloadQR: "下载二维码",
    },
    session: {
      readyToStart: "准备就绪",
      step1: "允许访问麦克风。",
      step2: "点击「开始翻译」按钮。",
      step3: "靠近麦克风清晰地说话。",
      step4: "将二维码分享给你的听众。",
      startTranslation: "开始翻译",
      micPermission: "麦克风权限",
      connecting: "连接中…",
      hearingYou: "正在收听你的声音",
      speakIntoMic: "请对着麦克风说话",
      stopSession: "停止会话",
      sessionEnded: "会话已结束",
      totalSegments: "总片段数",
      shareWithAudience: "分享给听众",
      shareSubtitle: "听众扫描二维码即可阅读所选语言的字幕。",
      preview: "预览",
      liveTranscript: "实时转录",
      micBlocked: "麦克风被阻止",
      tryAgain: "重试",
      streamViaOBS: "通过 OBS 推流",
      obsAlternative: "备选方案：使用 OBS Studio",
      obsDescription: "通过 OBS Studio 推送活动音频，替代浏览器麦克风。",
      obsRtmpUrl: "RTMP 地址",
      obsStreamKey: "推流密钥",
      obsCopy: "复制",
      obsSetupTitle: "OBS 配置步骤",
      obsSteps: [
        "打开 OBS Studio，进入 设置 → 推流。",
        "服务选择「自定义」。",
        "粘贴 RTMP 地址和推流密钥。",
        "在 OBS 中点击「开始推流」。",
      ],
      obsTip: "提示：使用专用音频源可获得最佳翻译质量。",
    },
    listen: {
      selectLanguage: "选择你的语言",
      listening: "收听中…",
      waiting: "等待发言者…",
      sessionEndedTitle: "会话已结束",
      sessionEndedSubtitle: "发言者已结束直播，感谢你的参与。",
      mute: "静音",
      unmute: "取消静音",
    },
  },

  // ---------------------------------------------------------------------------
  // ARABIC
  // ---------------------------------------------------------------------------
  ar: {
    nav: {
      howItWorks: "آلية العمل",
      pricing: "الأسعار",
      faq: "الأسئلة الشائعة",
      signIn: "تسجيل الدخول",
      startFree: "ابدأ مجانًا",
    },
    hero: {
      title: "ترجمة فورية بالذكاء الاصطناعي",
      highlight: "لكل فعالية",
      subtitle:
        "أزل حواجز اللغة في المؤتمرات والخدمات الدينية والفصول الدراسية والتجمعات المجتمعية. بدون تطبيقات، بدون أجهزة إضافية — ترجمة لحظية مدعومة بالذكاء الاصطناعي.",
      statLanguages: "لغة",
      statLatency: "زمن الاستجابة",
      statPrice: "للساعة / اللغة",
      ctaStart: "ابدأ مجانًا",
      ctaHow: "شاهد آلية العمل",
    },
    howItWorks: {
      heading: "جاهز للعمل خلال 10 ثوانٍ",
      subheading:
        "لا حاجة لتثبيت أي برنامج أو إعداد أي معدات. في ثلاث خطوات بسيطة يستمع جمهورك بلغته الأم.",
      steps: [
        {
          title: "أنشئ بثًّا مباشرًا",
          description:
            "سجّل الدخول، اختر اللغات المطلوبة، وأنشئ قناة الترجمة الخاصة بك في ثوانٍ معدودة.",
        },
        {
          title: "شارك رمز QR",
          description:
            "يمسح الحضور الرمز بهواتفهم — بدون تحميل تطبيقات، بدون تسجيل حسابات، بدون أي تعقيد.",
        },
        {
          title: "تحدّث بطبيعية",
          description:
            "يترجم الذكاء الاصطناعي صوتك فوريًا، ويقرأ الحضور الترجمة على شاشات هواتفهم باللغة التي يختارونها.",
        },
      ],
    },
    features: {
      heading: "كل ما تحتاجه. لا شيء زائد.",
      subheading:
        "أدوات قوية صُمّمت لتجعل الترجمة الفورية سهلة ودقيقة ومتاحة للجميع.",
      items: [
        {
          title: "أكثر من 70 لغة",
          description:
            "من العربية والصينية إلى اللغات الأقل انتشارًا — نغطي تقريبًا أي جمهور حول العالم.",
        },
        {
          title: "تمييز المتحدثين",
          description:
            "يتعرّف النظام تلقائيًا على كل متحدث ليعكس كل صوت بوضوح في الترجمة.",
        },
        {
          title: "مسارد المصطلحات",
          description:
            "أضف مصطلحات خاصة بمجالك — طبي، قانوني، ديني أو تقني — للحصول على ترجمة أكثر دقة.",
        },
        {
          title: "صوت فوري",
          description:
            "يلتقط الصوت مباشرة من ميكروفون المتحدث بزمن استجابة شبه معدوم.",
        },
        {
          title: "مشاركة عبر رمز QR",
          description:
            "مسح واحد يربط الحضور بقناة الترجمة. بدون تطبيقات، بدون كلمات مرور.",
        },
        {
          title: "ترجمة واعية بالسياق",
          description:
            "يفهم الذكاء الاصطناعي السياق الكامل للحديث ليقدّم ترجمة طبيعية وليست حرفية.",
        },
      ],
    },
    pricing: {
      heading: "أسعار بسيطة وشفافة",
      subheading: "ادفع فقط مقابل ما تستخدمه. بدون عقود، بدون رسوم خفية.",
      example: "فعالية ساعة واحدة بـ 3 لغات = 9$ إجمالًا",
      plans: [
        {
          name: "مجاني",
          price: "$0",
          sub: "30 دقيقة مجانية",
          features: [
            "حتى لغتين",
            "ترجمة نصية فورية",
            "مشاركة عبر رمز QR",
            "بدون بطاقة ائتمان",
          ],
          cta: "ابدأ مجانًا",
        },
        {
          name: "الدفع حسب الاستخدام",
          price: "$3",
          sub: "للساعة / اللغة",
          features: [
            "أكثر من 70 لغة",
            "تمييز المتحدثين",
            "مسارد المصطلحات",
            "سجل النصوص المُترجمة",
            "دعم فني ذو أولوية",
          ],
          cta: "ابدأ الآن",
        },
        {
          name: "المؤسسات",
          price: "سعر مخصص",
          sub: "للمنظمات والمؤسسات",
          features: [
            "استخدام غير محدود",
            "فوترة مركزية",
            "مدير حساب مخصص",
            "اتفاقية مستوى الخدمة (SLA)",
            "تكامل حسب الطلب",
            "مساعدة في الإعداد والتشغيل",
          ],
          cta: "تواصل مع فريق المبيعات",
        },
      ],
    },
    faq: {
      heading: "الأسئلة الشائعة",
      subheading:
        "كل ما تريد معرفته عن Translync والترجمة الفورية بالذكاء الاصطناعي.",
      items: [
        {
          question: "كيف يعمل Translync؟",
          answer:
            "يلتقط Translync صوت المتحدث فوريًا، ثم يحوّله إلى نص ويترجمه إلى اللغات المحددة باستخدام الذكاء الاصطناعي. يمسح الحضور رمز QR ويقرؤون الترجمة على هواتفهم مباشرة من المتصفح.",
        },
        {
          question: "كم عدد اللغات المتاحة؟",
          answer:
            "نوفر حاليًا أكثر من 70 لغة تشمل العربية والإنجليزية والصينية والفرنسية والإسبانية والبرتغالية والهندية وغيرها الكثير، ونضيف لغات جديدة باستمرار.",
        },
        {
          question: "هل يحتاج الحضور إلى تثبيت تطبيق؟",
          answer:
            "لا. يكفي أن يمسح الحضور رمز QR بكاميرا هواتفهم لتفتح الترجمة مباشرة في المتصفح — بدون تحميل وبدون إنشاء حساب.",
        },
        {
          question: "ما مدى دقة الترجمة؟",
          answer:
            "نستخدم نماذج لغوية متقدمة تفهم السياق الكامل. دقة الترجمة تضاهي المترجم المحترف في معظم الحالات، وتتحسّن أكثر عند استخدام مسارد المصطلحات المخصصة.",
        },
        {
          question: "ما جودة الصوت المطلوبة؟",
          answer:
            "ميكروفون عادي يفي بالغرض. للحصول على أفضل النتائج في البيئات الصاخبة، ننصح بميكروفون لاسلكي أو ميكروفون طاولة. يتضمّن Translync أيضًا مرشحات مدمجة لتقليل الضوضاء.",
        },
        {
          question: "هل هناك تجربة مجانية؟",
          answer:
            "نعم. يحصل كل حساب جديد على 30 دقيقة ترجمة مجانية بلغتين كحد أقصى، دون الحاجة إلى بطاقة ائتمان. فرصة مثالية لتجربة الخدمة قبل فعاليتك القادمة.",
        },
      ],
    },
    cta: {
      heading: "حطّم كل حواجز اللغة",
      subheading:
        "انضم إلى آلاف المنظّمين الذين يستخدمون Translync للتواصل مع جماهير متعددة اللغات حول العالم.",
      button: "ابدأ مجانًا",
      note: "تشمل 30 دقيقة مجانية",
    },
    footer: {
      product: "المنتج",
      solutions: "الحلول",
      legal: "القانونية",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة",
      contact: "تواصل معنا",
      forChurches: "للكنائس ودور العبادة",
      forNGOs: "للمنظمات غير الحكومية",
      forUniversities: "للجامعات",
      forCommunities: "للمجتمعات المحلية",
      copyright: "جميع الحقوق محفوظة.",
      blog: "المدوّنة",
    },
    login: {
      title: "تسجيل الدخول إلى Translync",
      subtitle:
        "أدخل بريدك الإلكتروني لتسجيل الدخول أو إنشاء حساب جديد.",
      sendMagicLink: "إرسال رابط الدخول",
      sending: "جارٍ الإرسال…",
      checkEmail: "تحقّق من بريدك الإلكتروني",
      checkEmailDesc:
        "أرسلنا إليك رابط دخول. انقر على الرابط في البريد الإلكتروني للمتابعة.",
      linkExpires: "ينتهي صلاحية الرابط خلال 15 دقيقة.",
      differentEmail: "استخدام بريد إلكتروني آخر",
      noPassword: "بدون كلمة مرور — بسيط وآمن.",
      backToHome: "العودة إلى الصفحة الرئيسية",
    },
    privacy:
      "تلتزم Translync بحماية خصوصيتك. نجمع فقط البيانات الضرورية لتقديم خدمة الترجمة. تتم معالجة الصوت في الوقت الفعلي ولا يُخزّن بشكل دائم إلا بطلب منك. لا نبيع معلوماتك الشخصية ولا نشاركها مع أطراف ثالثة. يُرجى الاطلاع على السياسة الكاملة لمزيد من التفاصيل.",
    terms:
      "باستخدامك Translync فإنك توافق على شروط الخدمة هذه. تُقدَّم الخدمة «كما هي» ونحتفظ بالحق في تعديل أو تعليق الميزات مع إشعار مسبق. أنت مسؤول عن المحتوى الذي تترجمه عبر المنصة. للاستفسارات القانونية، تواصل معنا مباشرة.",
    blog: {
      title: "مدوّنة Translync",
      subtitle:
        "آخر الأخبار والنصائح وحالات الاستخدام حول الترجمة الفورية بالذكاء الاصطناعي.",
      noPostsTitle: "لا توجد مقالات بعد",
      noPostsSubtitle:
        "نعمل على إعداد محتوى جديد. عُد قريبًا لقراءة أولى مقالاتنا.",
      minRead: "دقائق للقراءة",
    },
    breadcrumbs: {
      home: "الرئيسية",
    },
    dashboard: {
      title: "لوحة التحكم",
      subtitle: "أدِر قنوات الترجمة الفورية الخاصة بك.",
      newStream: "بث جديد",
      yourStreams: "قنواتك",
      sessionsTotal: "جلسات إجمالًا",
      noStreamsTitle: "لا توجد قنوات بعد",
      noStreamsSubtitle: "أنشئ قناتك الأولى لبدء الترجمة الفورية.",
      createFirstStream: "أنشئ قناتك الأولى",
      createNewStream: "إنشاء قناة جديدة",
      usageThisMonth: "الاستخدام هذا الشهر",
      minutes: "دقائق",
      sessions: "جلسات",
      freeTier: "الباقة المجانية",
      languagesThisMonth: "اللغات هذا الشهر",
      noLanguagesYet: "لا توجد لغات بعد",
      howItWorksTitle: "كيف يعمل؟",
      howItWorksSteps: [
        "أنشئ قناة واختر اللغات المطلوبة.",
        "شارك رمز QR مع جمهورك.",
        "تحدّث بشكل طبيعي — الذكاء الاصطناعي يترجم فوريًا.",
        "يقرأ الحضور الترجمة على هواتفهم بلغتهم المفضلة.",
      ],
      learnMore: "اعرف المزيد",
      signOut: "تسجيل الخروج",
      newTranslationStream: "قناة ترجمة جديدة",
      sessionName: "اسم الجلسة",
      sessionNamePlaceholder: "مثال: مؤتمر الربيع",
      sessionNameHint: "اسم وصفي يساعدك على تمييز الجلسة.",
      domain: "المجال",
      speakerLanguage: "لغة المتحدث",
      translateTo: "ترجمة إلى",
      estimatedCost: "التكلفة التقديرية",
      perHour: "في الساعة",
      language: "لغة",
      languages: "لغات",
      startTranslationSession: "بدء جلسة الترجمة",
      freeMinutesNote: "أول 30 دقيقة مجانية.",
      selectAtLeastOne: "اختر لغة واحدة على الأقل",
      live: "مباشر",
      ended: "انتهت",
      expired: "منتهية الصلاحية",
      open: "فتح",
      copyLink: "نسخ الرابط",
      copied: "تم النسخ!",
      qr: "رمز QR",
      remove: "حذف",
      shareSession: "مشاركة الجلسة",
      downloadQR: "تحميل رمز QR",
    },
    session: {
      readyToStart: "جاهز للبدء",
      step1: "اسمح بالوصول إلى الميكروفون.",
      step2: "انقر على «بدء الترجمة» للانطلاق.",
      step3: "تحدّث بوضوح بالقرب من الميكروفون.",
      step4: "شارك رمز QR مع جمهورك.",
      startTranslation: "بدء الترجمة",
      micPermission: "إذن الميكروفون",
      connecting: "جارٍ الاتصال…",
      hearingYou: "نسمعك الآن",
      speakIntoMic: "تحدّث في الميكروفون",
      stopSession: "إيقاف الجلسة",
      sessionEnded: "انتهت الجلسة",
      totalSegments: "إجمالي المقاطع",
      shareWithAudience: "مشاركة مع الجمهور",
      shareSubtitle: "يمسح الحضور رمز QR لقراءة الترجمة بلغتهم المفضلة.",
      preview: "معاينة",
      liveTranscript: "النص المباشر",
      micBlocked: "الميكروفون محظور",
      tryAgain: "حاول مجددًا",
      streamViaOBS: "البث عبر OBS",
      obsAlternative: "بديل: استخدام OBS Studio",
      obsDescription: "أرسل صوت الفعالية عبر OBS Studio بدلًا من ميكروفون المتصفح.",
      obsRtmpUrl: "عنوان RTMP",
      obsStreamKey: "مفتاح البث",
      obsCopy: "نسخ",
      obsSetupTitle: "إعداد OBS",
      obsSteps: [
        "افتح OBS Studio وانتقل إلى الإعدادات ← البث.",
        "اختر «مخصص» كنوع الخدمة.",
        "الصق عنوان RTMP ومفتاح البث.",
        "انقر على «بدء البث» في OBS.",
      ],
      obsTip: "نصيحة: استخدم مصدر صوت مخصصًا للحصول على أفضل جودة ترجمة.",
    },
    listen: {
      selectLanguage: "اختر لغتك",
      listening: "جارٍ الاستماع…",
      waiting: "بانتظار المتحدث…",
      sessionEndedTitle: "انتهت الجلسة",
      sessionEndedSubtitle: "أنهى المتحدث البث. شكرًا لمشاركتك.",
      mute: "كتم الصوت",
      unmute: "إلغاء كتم الصوت",
    },
  },
};
