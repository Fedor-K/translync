import type { SegmentContent } from "./segments";

export const SEGMENT_TRANSLATIONS: Record<string, Record<string, SegmentContent>> = {
  es: {
    churches: {
      slug: "churches",
      label: "Iglesias",
      hero: {
        title: "Elimina las Barreras del Idioma",
        highlight: "en Tu Iglesia",
        subtitle:
          "Tu congregación habla muchos idiomas. Ahora cada miembro puede escuchar el sermón en su propio idioma — al instante, en su celular. Sin intérpretes, sin equipos adicionales.",
      },
      socialProof: [
        "Iglesia Gracia Viva",
        "Comunidad de Fe Internacional",
        "Iglesia Nuevo Amanecer",
        "Capilla Esperanza Global",
        "Iglesia Puente de Luz",
        "Ministerio Palabra Viva",
      ],
      testimonial: {
        quote:
          "Tenemos miembros de 14 países. Antes de Translync, la mitad de la congregación no podía seguir el sermón. Ahora todos participan plenamente y nos ahorramos miles en intérpretes.",
        author: "Pastor Carlos Herrera",
        role: "Iglesia Gracia Viva, Ciudad de México",
      },
      faq: [
        {
          q: "¿Cómo se unen los miembros a la traducción?",
          a: "Proyecte el código QR en la pantalla durante el servicio. Los miembros lo escanean con su celular y eligen su idioma. No necesitan descargar ninguna app ni crear una cuenta — funciona al instante en el navegador.",
        },
        {
          q: "¿Funciona con la música de alabanza y el canto?",
          a: "Translync funciona mejor con contenido hablado — sermones, oraciones, anuncios. Para los cantos, recomendamos proyectar las letras en pantalla por separado. La IA está optimizada para voz natural.",
        },
        {
          q: "¿Puede usar la terminología religiosa correctamente?",
          a: "Sí. Seleccione el glosario de dominio al crear una sesión. También puede subir glosarios personalizados con términos específicos de su denominación o tradición.",
        },
        {
          q: "¿Qué pasa si nuestra conexión a internet es lenta?",
          a: "Translync usa muy poco ancho de banda — similar a una llamada de voz. El WiFi estándar de una iglesia es más que suficiente. Cada oyente usa sus propios datos móviles, así que la red de la iglesia no se sobrecarga.",
        },
        {
          q: "¿Cuánto cuesta para un servicio semanal?",
          a: "A $3/hora por idioma, un servicio de 1 hora en 3 idiomas cuesta $9. Obtiene 30 minutos gratis al mes para probarlo — sin tarjeta de crédito.",
        },
      ],
      cta: {
        heading: "Cada Miembro Merece Entender",
        subheading:
          "Comience a traducir sus servicios hoy. 30 minutos gratis, sin tarjeta de crédito.",
        button: "Empiece Gratis para Su Iglesia",
      },
      glossaryFeature: {
        headline: "IA Optimizada para Iglesias",
        description:
          "Entrenada con terminología bíblica y litúrgica en 19 idiomas. Sermón, comunión, bautismo, gracia — cada término traducido con precisión teológica, no con resultados genéricos de diccionario.",
        terms: ["Sermón", "Comunión", "Bautismo", "Gracia", "Salvación", "Congregación", "Espíritu Santo", "Evangelio", "Adoración", "Bendición"],
      },
      meta: {
        title: "Translync para Iglesias — Traducción de Sermones en Tiempo Real con IA",
        description:
          "Que cada miembro escuche el sermón en su idioma. Traducción con IA en tiempo real para congregaciones multilingües. Más de 70 idiomas, sin app, desde $3/hora.",
      },
    },

    ngos: {
      slug: "ngos",
      label: "ONGs",
      hero: {
        title: "Haga Cada Evento Accesible",
        highlight: "en Cualquier Idioma",
        subtitle:
          "Sus equipos en campo trabajan en diferentes países e idiomas. Translync ofrece traducción en tiempo real en conferencias, capacitaciones y reuniones comunitarias — sin necesidad de intérpretes.",
      },
      socialProof: [
        "Fundación Solidaridad Global",
        "Red de Ayuda Humanitaria",
        "Alianza por la Educación",
        "Puente Humanitario",
        "Acción Comunitaria Internacional",
        "Fundación Refugio Seguro",
      ],
      testimonial: {
        quote:
          "Durante nuestra capacitación regional con participantes de 9 países, Translync reemplazó a 4 intérpretes simultáneos. El ahorro fue considerable y las traducciones fueron inmediatas.",
        author: "Alejandra Morales",
        role: "Directora de Programas, Fundación Solidaridad Global",
      },
      faq: [
        {
          q: "¿Maneja la terminología humanitaria?",
          a: "Sí. Translync incluye un glosario humanitario integrado con más de 200 términos de ACNUR, IASC y Estándares Esfera. Siglas como VBG, WASH y PDI se manejan correcta y consistentemente.",
        },
        {
          q: "¿Funciona en entornos de campo con baja conectividad?",
          a: "Translync requiere conexión a internet, pero usa un ancho de banda mínimo — comparable a una llamada de voz. Funciona bien en redes 3G/4G. Cada participante usa su propio dispositivo y conexión de datos.",
        },
        {
          q: "¿Cómo manejamos reuniones con más de 10 idiomas?",
          a: "Cree una sesión y seleccione todos los idiomas objetivo. Translync traduce simultáneamente a todos. Cada participante elige su idioma en su celular. No hay límite de oyentes.",
        },
        {
          q: "¿Los datos están seguros?",
          a: "Todo el audio y las traducciones se procesan en tiempo real y no se almacenan permanentemente. Los datos de sesión expiran después de 24 horas. No se guardan grabaciones a menos que elija guardarlas explícitamente.",
        },
        {
          q: "¿Cuáles son los precios para organizaciones?",
          a: "$3/hora por idioma, pague solo lo que use. Para despliegues a gran escala o eventos recurrentes, contáctenos para precios empresariales con descuentos por volumen y soporte dedicado.",
        },
      ],
      cta: {
        heading: "La Traducción No Debería Ser una Barrera para el Impacto",
        subheading:
          "Comience a traducir sus eventos hoy. 30 minutos gratis, sin configuración.",
        button: "Empiece Gratis para Su Organización",
      },
      glossaryFeature: {
        headline: "IA para el Sector Humanitario",
        description:
          "Glosario integrado con más de 200 términos de IASC, ACNUR y Estándares Esfera en 19 idiomas. Refugiado, PDI, violencia basada en género, seguridad alimentaria — traducidos con precisión sectorial.",
        terms: ["Refugiado", "Solicitante de Asilo", "PDI", "Protección", "Rendición de Cuentas", "Resiliencia", "Medios de Vida", "Transferencia Monetaria", "VBG", "WASH"],
      },
      meta: {
        title: "Translync para ONGs — Traducción con IA para Eventos Humanitarios",
        description:
          "Traducción en tiempo real con IA para conferencias de ONGs, capacitaciones en campo y reuniones comunitarias. Glosario humanitario integrado, más de 70 idiomas, desde $3/hora.",
      },
    },

    universities: {
      slug: "universities",
      label: "Universidades",
      hero: {
        title: "Haga las Clases Accesibles",
        highlight: "para Cada Estudiante",
        subtitle:
          "Los estudiantes internacionales no deberían luchar con el idioma. Translync traduce clases, seminarios y eventos del campus en tiempo real — directamente en su celular.",
      },
      socialProof: [
        "Universidad Iberoamericana Unida",
        "Red Académica del Sur",
        "Instituto de Estudios Globales",
        "Fundación Campus Abierto",
        "Alianza Universitaria Latina",
        "ConectaUniversidad",
      ],
      testimonial: {
        quote:
          "Probamos Translync durante nuestra semana de bienvenida internacional con estudiantes de 25 países. La respuesta fue increíble — los estudiantes dijeron que fue la primera vez que entendieron todo.",
        author: "Dra. Lucía Fernández",
        role: "Directora de Programas Internacionales, Universidad Iberoamericana Unida",
      },
      faq: [
        {
          q: "¿Pueden usarlo los estudiantes durante clases regulares?",
          a: "Sí. El profesor crea una sesión y comparte el código QR al inicio de la clase. Los estudiantes lo escanean y siguen la traducción en tiempo real en su celular — como texto o audio.",
        },
        {
          q: "¿Maneja vocabulario académico y técnico?",
          a: "Translync incluye glosarios de dominio para áreas académicas comunes. Los profesores también pueden subir glosarios personalizados con terminología específica de su curso para mejorar la precisión.",
        },
        {
          q: "¿Cuántos estudiantes pueden conectarse simultáneamente?",
          a: "No hay límite de oyentes. Cada estudiante se conecta desde su propio celular. El sistema escala automáticamente — ya sean 10 estudiantes o 500.",
        },
        {
          q: "¿Funciona en auditorios grandes?",
          a: "Sí. El ponente usa una laptop o celular con micrófono. Para auditorios grandes, recomendamos usar el sistema de audio del salón o un micrófono de solapa para mejores resultados. Los estudiantes usan sus propios celulares y audífonos.",
        },
        {
          q: "¿Cuánto cuesta para una universidad?",
          a: "$3/hora por idioma. Una clase de 2 horas traducida a 3 idiomas cuesta $18. Para implementaciones a nivel de departamento o campus, contáctenos para precios empresariales.",
        },
      ],
      cta: {
        heading: "Educación Sin Barreras de Idioma",
        subheading:
          "Comience a traducir clases y eventos. 30 minutos gratis, sin configuración técnica.",
        button: "Empiece Gratis para Su Universidad",
      },
      glossaryFeature: {
        headline: "IA de Nivel Académico",
        description:
          "Glosario académico integrado con terminología precisa para clases, investigación y vida universitaria en 19 idiomas. Tesis, programa de estudios, titularidad — traducidos como los académicos esperan.",
        terms: ["Cátedra", "Seminario", "Disertación", "Tesis", "Plan de Estudios", "Facultad", "Beca", "Revisión por Pares", "Acreditación", "Titularidad"],
      },
      meta: {
        title: "Translync para Universidades — Traducción de Clases con IA",
        description:
          "Traducción en tiempo real con IA para clases, seminarios y eventos universitarios. Ayude a los estudiantes internacionales a seguir las clases en su idioma. Más de 70 idiomas, desde $3/hora.",
      },
    },

    communities: {
      slug: "communities",
      label: "Comunidades",
      hero: {
        title: "Conecta a Tu Comunidad",
        highlight: "en Todos los Idiomas",
        subtitle:
          "Comunidades de inmigrantes, centros culturales y organizaciones vecinales — dale voz a todos. Traducción en tiempo real para asambleas, reuniones y eventos comunitarios.",
      },
      socialProof: [
        "Alianza de Nuevos Vecinos",
        "Centro Puente Cultural",
        "Programa de Integración Municipal",
        "Red de Apoyo al Migrante",
        "Iniciativa Voces Unidas",
        "Comunidad sin Fronteras",
      ],
      testimonial: {
        quote:
          "Nuestras asambleas vecinales excluían a la mitad de la comunidad por el idioma. Ahora todos participan — en quechua, portugués, haitiano y mandarín — todo al mismo tiempo.",
        author: "Rosa Gutiérrez",
        role: "Organizadora Comunitaria, Alianza de Nuevos Vecinos",
      },
      faq: [
        {
          q: "¿Cómo se unen los miembros de la comunidad?",
          a: "Muestre el código QR en una pantalla o imprímalo en volantes. Los asistentes lo escanean con la cámara de su celular — no necesitan descargar ninguna app. Eligen su idioma y comienzan a escuchar inmediatamente.",
        },
        {
          q: "¿Funciona para idiomas como quechua, guaraní o criollo haitiano?",
          a: "Sí. Translync soporta más de 70 idiomas, incluyendo los menos comunes. Si su idioma no aparece, contáctenos — estamos ampliando la cobertura constantemente.",
        },
        {
          q: "¿Puede manejar temas emocionales o sensibles?",
          a: "Translync traduce fielmente y con neutralidad. No edita ni suaviza el contenido. En discusiones comunitarias sobre temas sensibles, la traducción preserva la intención y el tono del hablante.",
        },
        {
          q: "¿Es accesible para organizaciones comunitarias pequeñas?",
          a: "A $3/hora por idioma, una reunión de 2 horas en 4 idiomas cuesta $24. Obtiene 30 minutos gratis para probarlo. Para organizaciones sin fines de lucro, contáctenos por tarifas con descuento.",
        },
        {
          q: "¿Se necesita un teléfono inteligente?",
          a: "Sí, cada oyente necesita un smartphone con navegador. Para asistentes sin teléfono, puede poner una tableta o laptop compartida en su mesa con la traducción en curso.",
        },
      ],
      cta: {
        heading: "Cada Voz Importa. Cada Idioma Cuenta.",
        subheading:
          "Comience a traducir sus eventos comunitarios. 30 minutos gratis, sin barreras.",
        button: "Empiece Gratis para Su Comunidad",
      },
      glossaryFeature: {
        headline: "IA Enfocada en la Comunidad",
        description:
          "Glosario integrado con términos cívicos, legales y de servicios sociales en 19 idiomas. Residencia, naturalización, seguro médico, asistencia legal — traducidos con precisión para que nada se pierda.",
        terms: ["Residencia", "Naturalización", "Permiso de Trabajo", "Servicios Sociales", "Seguro Médico", "Asistencia Legal", "Ciudadanía", "Reunificación Familiar", "Vivienda", "Cuidado Infantil"],
      },
      meta: {
        title: "Translync para Comunidades — Traducción con IA para Eventos Locales",
        description:
          "Traducción en tiempo real con IA para asambleas vecinales, reuniones comunitarias y eventos culturales. Ayude a las comunidades de inmigrantes a participar plenamente. Más de 70 idiomas, desde $3/hora.",
      },
    },
  },

  zh: {
    churches: {
      slug: "churches",
      label: "教会",
      hero: {
        title: "打破语言障碍",
        highlight: "让教会更团结",
        subtitle:
          "您的会众使用多种语言。现在每位成员都能用自己的语言即时收听讲道——就在手机上。无需翻译人员，无需额外设备。",
      },
      socialProof: [
        "恩典国际教会",
        "磐石团契教会",
        "新生命福音堂",
        "信望爱国际教会",
        "活水多语教会",
        "喜乐桥教会",
      ],
      testimonial: {
        quote:
          "我们教会有来自15个国家的成员。使用Translync之前，一半会众听不懂讲道。现在人人都能完全参与，而且我们节省了大量的翻译费用。",
        author: "王建明牧师",
        role: "恩典国际教会，上海",
      },
      faq: [
        {
          q: "教会成员如何参与翻译？",
          a: "在礼拜期间将二维码投影到屏幕上。成员用手机扫码，选择自己的语言。无需下载应用，无需注册账号——在浏览器中即时使用。",
        },
        {
          q: "敬拜音乐和诗歌可以翻译吗？",
          a: "Translync最适合口语内容——讲道、祷告、通知。对于诗歌，建议单独在屏幕上显示歌词。AI针对自然语音进行了优化。",
        },
        {
          q: "能正确使用宗教术语吗？",
          a: "可以。创建会话时选择领域词汇表。您还可以上传自定义词汇表，包含您的宗派或传统的特定术语。",
        },
        {
          q: "网络连接慢怎么办？",
          a: "Translync使用的带宽非常少——与语音通话差不多。教会的标准WiFi完全够用。每位听众使用自己的移动数据，不会给教会网络造成负担。",
        },
        {
          q: "每周礼拜的费用是多少？",
          a: "每种语言每小时3美元，1小时礼拜翻译3种语言只需9美元。每月有30分钟免费试用——无需信用卡。",
        },
      ],
      cta: {
        heading: "每位成员都值得听懂讲道",
        subheading:
          "立即开始翻译您的礼拜。30分钟免费，无需信用卡。",
        button: "为您的教会免费开始",
      },
      glossaryFeature: {
        headline: "教会专属AI",
        description:
          "基于19种语言的圣经和礼拜术语训练。讲道、圣餐、洗礼、恩典——每个术语都以神学精度翻译，而非通用词典结果。",
        terms: ["讲道", "圣餐", "洗礼", "恩典", "救赎", "会众", "圣灵", "福音", "敬拜", "祝福"],
      },
      meta: {
        title: "Translync教会版——AI实时讲道翻译",
        description:
          "让每位教会成员用自己的语言听讲道。为多语种会众提供AI实时翻译。支持70多种语言，无需下载应用，每小时仅需3美元。",
      },
    },

    ngos: {
      slug: "ngos",
      label: "非政府组织",
      hero: {
        title: "让每场活动无障碍",
        highlight: "跨越语言界限",
        subtitle:
          "您的前线团队跨越国界和语言工作。Translync为会议、培训和社区活动中的每位参与者提供实时翻译——无需翻译人员。",
      },
      socialProof: [
        "全球援助基金会",
        "国际人道救援网络",
        "世界教育联盟",
        "亚太发展协会",
        "人道主义响应中心",
        "难民希望之桥",
      ],
      testimonial: {
        quote:
          "在我们的区域培训中，来自10个国家的参与者同时参加。Translync取代了5名同声传译，大幅降低了成本，翻译还是即时的。",
        author: "陈晓婷",
        role: "项目总监，全球援助基金会",
      },
      faq: [
        {
          q: "能处理人道主义术语吗？",
          a: "可以。Translync内置NGO/人道主义词汇表，包含200多个来自UNHCR、IASC和环球标准的术语。GBV、WASH、IDP等缩写都能正确一致地处理。",
        },
        {
          q: "在低网络覆盖的现场环境中能用吗？",
          a: "Translync需要互联网连接，但带宽需求极低——与语音通话相当。在3G/4G移动网络上运行良好。每位参与者使用自己的设备和数据连接。",
        },
        {
          q: "如何处理10种以上语言的多语种会议？",
          a: "创建会话并选择所有目标语言。Translync同时翻译为所有语言。每位参与者在手机上选择自己的语言。听众人数没有限制。",
        },
        {
          q: "数据安全吗？",
          a: "所有音频和翻译都是实时处理的，不会永久存储。会话数据在24小时后过期。除非您明确选择保存，否则不会保留任何录音。",
        },
        {
          q: "组织的定价是怎样的？",
          a: "每种语言每小时3美元，按需付费。对于大规模部署或定期活动，请联系我们获取企业定价，享受批量折扣和专属支持。",
        },
      ],
      cta: {
        heading: "翻译不应成为产生影响的障碍",
        subheading:
          "立即开始翻译您的活动。30分钟免费，无需设置。",
        button: "为您的组织免费开始",
      },
      glossaryFeature: {
        headline: "人道主义领域AI",
        description:
          "内置词汇表包含200多个IASC、UNHCR和环球标准术语，覆盖19种语言。难民、境内流离失所者、基于性别的暴力、粮食安全——以行业精度翻译。",
        terms: ["难民", "寻求庇护者", "境内流离失所者", "保护", "问责", "韧性", "生计", "现金援助", "性别暴力", "水卫项目"],
      },
      meta: {
        title: "Translync非政府组织版——人道主义活动AI翻译",
        description:
          "为NGO会议、现场培训和社区活动提供AI实时翻译。内置人道主义词汇表，支持70多种语言，每小时仅需3美元。",
      },
    },

    universities: {
      slug: "universities",
      label: "高校",
      hero: {
        title: "让课堂无障碍",
        highlight: "服务每一位学生",
        subtitle:
          "国际学生不应被语言困扰。Translync实时翻译讲座、研讨会和校园活动——直接在手机上收听。",
      },
      socialProof: [
        "亚太高校联盟",
        "全球学术交流网络",
        "国际教育桥梁学院",
        "多语教学促进中心",
        "跨文化学术基金会",
        "智慧校园互联",
      ],
      testimonial: {
        quote:
          "我们在国际迎新周试用了Translync，学生来自28个国家。反馈非常热烈——学生们说这是他们第一次完全听懂每一句话。",
        author: "张慧敏教授",
        role: "国际项目主任，亚太高校联盟",
      },
      faq: [
        {
          q: "学生能在日常课堂中使用吗？",
          a: "可以。教授创建会话并在课堂开始时分享二维码。学生扫码后即可在手机上跟随实时翻译——文字或语音均可。",
        },
        {
          q: "能处理学术和专业词汇吗？",
          a: "Translync包含常见学术领域的领域词汇表。教授还可以上传自定义词汇表，添加课程特定术语以提高翻译精度。",
        },
        {
          q: "有多少学生可以同时连接？",
          a: "听众人数没有限制。每位学生通过自己的手机连接。系统自动扩展——无论是10名学生还是500名。",
        },
        {
          q: "在大教室能用吗？",
          a: "可以。讲者使用带麦克风的笔记本电脑或手机。在大教室中，建议使用教室的音响系统或领夹麦以获得最佳效果。学生使用自己的手机和耳机。",
        },
        {
          q: "大学使用的费用是多少？",
          a: "每种语言每小时3美元。一堂2小时的课翻译成3种语言需18美元。对于院系或全校部署，请联系我们获取企业定价。",
        },
      ],
      cta: {
        heading: "教育不应有语言障碍",
        subheading:
          "开始翻译讲座和活动。30分钟免费，无需IT配置。",
        button: "为您的高校免费开始",
      },
      glossaryFeature: {
        headline: "学术级AI",
        description:
          "内置学术词汇表，覆盖19种语言的讲座、科研和校园生活精准术语。论文、教学大纲、终身教职——以学术界期望的方式翻译。",
        terms: ["讲座", "研讨会", "学位论文", "硕士论文", "教学大纲", "教职人员", "奖学金", "同行评审", "学术认证", "终身教职"],
      },
      meta: {
        title: "Translync高校版——AI课堂翻译",
        description:
          "为讲座、研讨会和校园活动提供AI实时翻译。帮助国际学生用自己的语言跟上课堂。支持70多种语言，每小时仅需3美元。",
      },
    },

    communities: {
      slug: "communities",
      label: "社区",
      hero: {
        title: "连接您的社区",
        highlight: "跨越每一种语言",
        subtitle:
          "移民社区、文化中心、社区组织——让每个人都有发言权。为社区大会、会议和活动提供实时翻译。",
      },
      socialProof: [
        "新居民融合联盟",
        "文化桥梁中心",
        "城市融入计划",
        "移民互助网络",
        "社区之声行动",
        "和谐邻里协会",
      ],
      testimonial: {
        quote:
          "我们的社区大会以前因为语言问题排斥了一半的居民。现在所有人都能参与——越南语、阿拉伯语、缅甸语、英语——同时进行。",
        author: "李美珍",
        role: "社区组织者，新居民融合联盟",
      },
      faq: [
        {
          q: "社区成员如何加入？",
          a: "将二维码显示在屏幕上或印在传单上。参会者用手机摄像头扫码——无需下载应用。选择语言即可立即开始收听。",
        },
        {
          q: "支持缅甸语、越南语、藏语等语言吗？",
          a: "支持。Translync支持70多种语言，包括较少见的语种。如果您需要的语言未列出，请联系我们——我们在不断扩展覆盖范围。",
        },
        {
          q: "能处理情感性或敏感话题吗？",
          a: "Translync忠实且中立地翻译，不会编辑或弱化内容。在社区讨论敏感话题时，翻译保留说话者的意图和语气。",
        },
        {
          q: "小型社区组织负担得起吗？",
          a: "每种语言每小时3美元，2小时会议翻译4种语言只需24美元。有30分钟免费试用。非营利组织请联系我们了解优惠价格。",
        },
        {
          q: "需要智能手机吗？",
          a: "是的，每位听众需要一部带浏览器的智能手机。对于没有手机的参会者，可以在他们的桌子上放一台共享的平板或笔记本电脑播放翻译。",
        },
      ],
      cta: {
        heading: "每一个声音都重要，每一种语言都有价值",
        subheading:
          "开始翻译您的社区活动。30分钟免费，零门槛。",
        button: "为您的社区免费开始",
      },
      glossaryFeature: {
        headline: "社区专属AI",
        description:
          "内置公民、法律和社会服务术语词汇表，覆盖19种语言。居留权、入籍、医疗保险、法律援助——精准翻译，确保信息不遗漏。",
        terms: ["居留权", "入籍", "工作许可", "社会服务", "医疗保险", "法律援助", "公民身份", "家庭团聚", "住房", "托儿服务"],
      },
      meta: {
        title: "Translync社区版——本地活动AI翻译",
        description:
          "为社区大会、居民会议和文化活动提供AI实时翻译。帮助移民社区充分参与。支持70多种语言，每小时仅需3美元。",
      },
    },
  },

  ar: {
    churches: {
      slug: "churches",
      label: "الكنائس",
      hero: {
        title: "أزِل حواجز اللغة",
        highlight: "في كنيستك",
        subtitle:
          "أعضاء كنيستك يتحدثون لغات عديدة. الآن يمكن لكل عضو سماع العظة بلغته الخاصة — فوراً، على هاتفه. بدون مترجمين، بدون معدات إضافية.",
      },
      socialProof: [
        "كنيسة النعمة الدولية",
        "كنيسة الرجاء الحي",
        "رعية النور والسلام",
        "كنيسة الإيمان المتحدة",
        "كنيسة جسر المحبة",
        "كنيسة البشارة العالمية",
      ],
      testimonial: {
        quote:
          "لدينا أعضاء من 13 بلداً. قبل Translync، نصف الرعية لم يكن يفهم العظة. الآن الجميع يشارك بالكامل — ووفّرنا آلاف الدولارات من رسوم المترجمين.",
        author: "القس يوسف حنا",
        role: "كنيسة النعمة الدولية، عمّان",
      },
      faq: [
        {
          q: "كيف ينضم أعضاء الكنيسة إلى الترجمة؟",
          a: "اعرض رمز QR على الشاشة أثناء القداس. يمسح الأعضاء الرمز بهواتفهم ويختارون لغتهم. لا حاجة لتحميل تطبيق أو إنشاء حساب — يعمل فوراً في المتصفح.",
        },
        {
          q: "هل يعمل مع التراتيل والترانيم؟",
          a: "يعمل Translync بشكل أفضل مع المحتوى المنطوق — العظات والصلوات والإعلانات. للترانيم، ننصح بعرض كلمات الأغاني على الشاشة بشكل منفصل. الذكاء الاصطناعي مُحسّن للكلام الطبيعي.",
        },
        {
          q: "هل يمكنه استخدام المصطلحات الدينية بشكل صحيح؟",
          a: "نعم. اختر قاموس المصطلحات المتخصص عند إنشاء الجلسة. يمكنك أيضاً رفع قواميس مخصصة بمصطلحات خاصة بطائفتك أو تقليدك.",
        },
        {
          q: "ماذا لو كان اتصال الإنترنت ضعيفاً؟",
          a: "يستخدم Translync حداً أدنى من عرض النطاق — بقدر مكالمة صوتية تقريباً. شبكة الواي فاي العادية في الكنيسة أكثر من كافية. كل مستمع يستخدم بيانات هاتفه الخاصة.",
        },
        {
          q: "كم تكلفة القداس الأسبوعي؟",
          a: "بسعر 3 دولارات/ساعة لكل لغة، قداس مدته ساعة بـ3 لغات يكلف 9 دولارات. تحصل على 30 دقيقة مجانية شهرياً للتجربة — بدون بطاقة ائتمان.",
        },
      ],
      cta: {
        heading: "كل عضو يستحق أن يفهم",
        subheading:
          "ابدأ بترجمة قداساتك اليوم. 30 دقيقة مجاناً، بدون بطاقة ائتمان.",
        button: "ابدأ مجاناً لكنيستك",
      },
      glossaryFeature: {
        headline: "ذكاء اصطناعي مُحسّن للكنائس",
        description:
          "مُدرَّب على المصطلحات الكتابية والليتورجية في 19 لغة. العظة، التناول، المعمودية، النعمة — كل مصطلح يُترجم بدقة لاهوتية، وليس بنتائج قاموس عامة.",
        terms: ["العظة", "التناول", "المعمودية", "النعمة", "الخلاص", "الرعية", "الروح القدس", "الإنجيل", "العبادة", "البركة"],
      },
      meta: {
        title: "Translync للكنائس — ترجمة العظات بالذكاء الاصطناعي في الوقت الفعلي",
        description:
          "دع كل عضو في الكنيسة يسمع العظة بلغته. ترجمة فورية بالذكاء الاصطناعي للرعايا متعددة اللغات. أكثر من 70 لغة، بدون تطبيق، من 3 دولارات/ساعة.",
      },
    },

    ngos: {
      slug: "ngos",
      label: "المنظمات غير الحكومية",
      hero: {
        title: "اجعل كل فعالية متاحة",
        highlight: "بأي لغة",
        subtitle:
          "فرقك الميدانية تعمل عبر الحدود واللغات. Translync يوفر لكل مشارك ترجمة فورية في المؤتمرات والتدريبات والاجتماعات المجتمعية — بدون مترجمين.",
      },
      socialProof: [
        "مؤسسة التضامن الدولية",
        "شبكة الإغاثة العربية",
        "تحالف التعليم العالمي",
        "جمعية الاستجابة الإنسانية",
        "مؤسسة جسر اللاجئين",
        "منظمة أمل للتنمية",
      ],
      testimonial: {
        quote:
          "خلال تدريبنا الإقليمي مع مشاركين من 11 دولة، استبدل Translync أربعة مترجمين فوريين. التوفير في التكاليف كان كبيراً والترجمات كانت فورية.",
        author: "د. نادية الحسن",
        role: "مديرة البرامج، مؤسسة التضامن الدولية",
      },
      faq: [
        {
          q: "هل يتعامل مع المصطلحات الإنسانية؟",
          a: "نعم. يتضمن Translync قاموس مصطلحات إنسانية مدمجاً يحتوي على أكثر من 200 مصطلح من المفوضية السامية للاجئين ولجنة IASC ومعايير سفير. الاختصارات مثل العنف القائم على النوع والمياه والصرف الصحي يتم التعامل معها بدقة واتساق.",
        },
        {
          q: "هل يعمل في بيئات ميدانية ذات اتصال ضعيف؟",
          a: "يحتاج Translync إلى اتصال بالإنترنت، لكنه يستخدم حداً أدنى من عرض النطاق — مشابه لمكالمة صوتية. يعمل جيداً على شبكات 3G/4G. كل مشارك يستخدم جهازه واتصاله الخاص.",
        },
        {
          q: "كيف ندير اجتماعات بأكثر من 10 لغات؟",
          a: "أنشئ جلسة واختر جميع اللغات المستهدفة. يترجم Translync إلى جميعها في آن واحد. كل مشارك يختار لغته على هاتفه. لا يوجد حد لعدد المستمعين.",
        },
        {
          q: "هل البيانات آمنة؟",
          a: "يتم معالجة جميع الصوتيات والترجمات في الوقت الفعلي ولا يتم تخزينها بشكل دائم. تنتهي صلاحية بيانات الجلسة بعد 24 ساعة. لا يتم الاحتفاظ بأي تسجيلات ما لم تختر حفظها صراحةً.",
        },
        {
          q: "ما هي أسعار المنظمات؟",
          a: "3 دولارات/ساعة لكل لغة، ادفع حسب الاستخدام. لعمليات النشر الكبيرة أو الفعاليات المتكررة، تواصل معنا للحصول على أسعار المؤسسات مع خصومات الحجم ودعم مخصص.",
        },
      ],
      cta: {
        heading: "الترجمة لا ينبغي أن تكون عائقاً أمام التأثير",
        subheading:
          "ابدأ بترجمة فعالياتك اليوم. 30 دقيقة مجاناً، بدون إعداد.",
        button: "ابدأ مجاناً لمنظمتك",
      },
      glossaryFeature: {
        headline: "ذكاء اصطناعي للقطاع الإنساني",
        description:
          "قاموس مصطلحات مدمج يحتوي على أكثر من 200 مصطلح من IASC والمفوضية السامية ومعايير سفير في 19 لغة. لاجئ، نازح داخلي، عنف قائم على النوع، أمن غذائي — مترجمة بدقة قطاعية.",
        terms: ["لاجئ", "طالب لجوء", "نازح داخلي", "حماية", "مساءلة", "صمود", "سبل العيش", "تحويلات نقدية", "العنف القائم على النوع", "المياه والصرف الصحي"],
      },
      meta: {
        title: "Translync للمنظمات غير الحكومية — ترجمة الفعاليات الإنسانية بالذكاء الاصطناعي",
        description:
          "ترجمة فورية بالذكاء الاصطناعي لمؤتمرات المنظمات غير الحكومية والتدريبات الميدانية والاجتماعات المجتمعية. قاموس إنساني مدمج، أكثر من 70 لغة، من 3 دولارات/ساعة.",
      },
    },

    universities: {
      slug: "universities",
      label: "الجامعات",
      hero: {
        title: "اجعل المحاضرات متاحة",
        highlight: "لكل طالب",
        subtitle:
          "لا ينبغي للطلاب الدوليين أن يعانوا مع اللغة. Translync يترجم المحاضرات والندوات وفعاليات الحرم الجامعي في الوقت الفعلي — مباشرة على هواتفهم.",
      },
      socialProof: [
        "تحالف الجامعات العربية",
        "شبكة الأكاديميين الدولية",
        "معهد الدراسات العابرة للثقافات",
        "مؤسسة الحرم المفتوح",
        "مركز التعليم متعدد اللغات",
        "رابطة الجامعات المتصلة",
      ],
      testimonial: {
        quote:
          "جربنا Translync خلال أسبوع التوجيه الدولي مع طلاب من 32 دولة. كانت ردود الفعل مذهلة — قال الطلاب إنها المرة الأولى التي فهموا فيها كل شيء حقاً.",
        author: "د. ليلى الشمري",
        role: "مديرة البرامج الدولية، تحالف الجامعات العربية",
      },
      faq: [
        {
          q: "هل يمكن للطلاب استخدامه أثناء المحاضرات العادية؟",
          a: "نعم. ينشئ الأستاذ جلسة ويشارك رمز QR في بداية المحاضرة. يمسح الطلاب الرمز ويتابعون الترجمة الفورية على هواتفهم — نصاً أو صوتاً.",
        },
        {
          q: "هل يتعامل مع المفردات الأكاديمية والتقنية؟",
          a: "يتضمن Translync قواميس مصطلحات لمجالات أكاديمية شائعة. يمكن للأساتذة أيضاً رفع قواميس مخصصة بمصطلحات خاصة بالمقرر لتحسين دقة الترجمة.",
        },
        {
          q: "كم عدد الطلاب الذين يمكنهم الانضمام في آن واحد؟",
          a: "لا يوجد حد لعدد المستمعين. كل طالب يتصل عبر هاتفه الخاص. النظام يتوسع تلقائياً — سواء كان 10 طلاب أو 500.",
        },
        {
          q: "هل يعمل في القاعات الكبيرة؟",
          a: "نعم. يستخدم المتحدث حاسوباً محمولاً أو هاتفاً مع ميكروفون. للقاعات الكبيرة، ننصح باستخدام نظام الصوت في القاعة أو ميكروفون طية الصدر للحصول على أفضل النتائج. الطلاب يستخدمون هواتفهم وسماعاتهم.",
        },
        {
          q: "كم تكلف للجامعة؟",
          a: "3 دولارات/ساعة لكل لغة. محاضرة مدتها ساعتان مترجمة إلى 3 لغات تكلف 18 دولاراً. للنشر على مستوى القسم أو الحرم الجامعي، تواصل معنا للحصول على أسعار المؤسسات.",
        },
      ],
      cta: {
        heading: "التعليم بلا حواجز لغوية",
        subheading:
          "ابدأ بترجمة المحاضرات والفعاليات. 30 دقيقة مجاناً، بدون إعداد تقني.",
        button: "ابدأ مجاناً لجامعتك",
      },
      glossaryFeature: {
        headline: "ذكاء اصطناعي بمستوى أكاديمي",
        description:
          "قاموس أكاديمي مدمج بمصطلحات دقيقة للمحاضرات والبحث والحياة الجامعية في 19 لغة. أطروحة، منهج دراسي، تثبيت أكاديمي — مترجمة كما يتوقع الأكاديميون.",
        terms: ["محاضرة", "ندوة", "أطروحة دكتوراه", "رسالة ماجستير", "منهج دراسي", "هيئة تدريس", "منحة دراسية", "مراجعة الأقران", "اعتماد أكاديمي", "تثبيت أكاديمي"],
      },
      meta: {
        title: "Translync للجامعات — ترجمة المحاضرات بالذكاء الاصطناعي",
        description:
          "ترجمة فورية بالذكاء الاصطناعي للمحاضرات والندوات وفعاليات الحرم الجامعي. ساعد الطلاب الدوليين على المتابعة بلغتهم. أكثر من 70 لغة، من 3 دولارات/ساعة.",
      },
    },

    communities: {
      slug: "communities",
      label: "المجتمعات المحلية",
      hero: {
        title: "اربط مجتمعك",
        highlight: "عبر كل اللغات",
        subtitle:
          "مجتمعات المهاجرين والمراكز الثقافية والمنظمات المحلية — أعطِ الجميع صوتاً. ترجمة فورية للاجتماعات البلدية والجلسات والفعاليات المجتمعية.",
      },
      socialProof: [
        "تحالف الوافدين الجدد",
        "مركز الجسر الثقافي",
        "برنامج الاندماج البلدي",
        "شبكة دعم المهاجرين",
        "مبادرة صوت المجتمع",
        "جمعية الأحياء المتحدة",
      ],
      testimonial: {
        quote:
          "اجتماعاتنا البلدية كانت تستبعد نصف المجتمع بسبب اللغة. الآن الجميع يشارك — بالأردية والصومالية والفرنسية والبنغالية — كلها في آن واحد.",
        author: "فاطمة العلي",
        role: "منظمة مجتمعية، تحالف الوافدين الجدد",
      },
      faq: [
        {
          q: "كيف ينضم أفراد المجتمع؟",
          a: "اعرض رمز QR على شاشة أو اطبعه على منشورات. يمسح الحاضرون الرمز بكاميرا هواتفهم — بدون تحميل تطبيق. يختارون لغتهم ويبدأون الاستماع فوراً.",
        },
        {
          q: "هل يعمل مع لغات مثل الصومالية والدارية والتاغالوغ؟",
          a: "نعم. يدعم Translync أكثر من 70 لغة بما في ذلك اللغات الأقل شيوعاً. إذا لم تكن لغتك مدرجة، تواصل معنا — نحن نوسع التغطية باستمرار.",
        },
        {
          q: "هل يمكنه التعامل مع مواضيع عاطفية أو حساسة؟",
          a: "يترجم Translync بأمانة وحيادية. لا يحرر المحتوى أو يخففه. في النقاشات المجتمعية حول مواضيع حساسة، تحافظ الترجمة على نية المتحدث ونبرته.",
        },
        {
          q: "هل هو في متناول المنظمات المجتمعية الصغيرة؟",
          a: "بسعر 3 دولارات/ساعة لكل لغة، اجتماع مدته ساعتان بـ4 لغات يكلف 24 دولاراً. تحصل على 30 دقيقة مجانية للتجربة. للمنظمات غير الربحية، تواصل معنا بشأن الأسعار المخفضة.",
        },
        {
          q: "هل يحتاج الأشخاص إلى هواتف ذكية؟",
          a: "نعم، كل مستمع يحتاج إلى هاتف ذكي مع متصفح. للحاضرين بدون هواتف، يمكنك وضع جهاز لوحي أو حاسوب محمول مشترك على طاولتهم لتشغيل الترجمة.",
        },
      ],
      cta: {
        heading: "كل صوت مهم. كل لغة تُحتسب.",
        subheading:
          "ابدأ بترجمة فعالياتك المجتمعية. 30 دقيقة مجاناً، بلا عوائق.",
        button: "ابدأ مجاناً لمجتمعك",
      },
      glossaryFeature: {
        headline: "ذكاء اصطناعي موجه للمجتمع",
        description:
          "قاموس مدمج للمصطلحات المدنية والقانونية والخدمات الاجتماعية في 19 لغة. الإقامة، التجنس، التأمين الصحي، المساعدة القانونية — مترجمة بدقة حتى لا يضيع شيء.",
        terms: ["الإقامة", "التجنس", "تصريح العمل", "الخدمات الاجتماعية", "التأمين الصحي", "المساعدة القانونية", "الجنسية", "لمّ شمل الأسرة", "الإسكان", "رعاية الأطفال"],
      },
      meta: {
        title: "Translync للمجتمعات — ترجمة الفعاليات المحلية بالذكاء الاصطناعي",
        description:
          "ترجمة فورية بالذكاء الاصطناعي للاجتماعات البلدية والجلسات المجتمعية والفعاليات الثقافية. ساعد مجتمعات المهاجرين على المشاركة الكاملة. أكثر من 70 لغة، من 3 دولارات/ساعة.",
      },
    },
  },

  pt: {
    churches: {
      slug: "churches",
      label: "Igrejas",
      hero: {
        title: "Quebre as Barreiras do Idioma",
        highlight: "na Sua Igreja",
        subtitle:
          "Sua congregação fala muitos idiomas. Agora cada membro pode ouvir o sermão na própria língua — instantaneamente, no celular. Sem intérpretes, sem equipamentos extras.",
      },
      socialProof: [
        "Igreja Graça e Vida",
        "Comunidade Evangélica Internacional",
        "Igreja Nova Aliança",
        "Capela Esperança Viva",
        "Igreja Ponte da Fé",
        "Ministério Palavra e Louvor",
      ],
      testimonial: {
        quote:
          "Temos membros de 12 países. Antes do Translync, metade da congregação não conseguia acompanhar o sermão. Agora todos participam plenamente — e economizamos milhares em tradutores.",
        author: "Pastor Marcos Oliveira",
        role: "Igreja Graça e Vida, São Paulo",
      },
      faq: [
        {
          q: "Como os membros da igreja participam da tradução?",
          a: "Projete o QR code na tela durante o culto. Os membros escaneiam com o celular e escolhem seu idioma. Sem precisar baixar app nem criar conta — funciona na hora pelo navegador.",
        },
        {
          q: "Funciona com louvor e música?",
          a: "O Translync funciona melhor com conteúdo falado — sermões, orações, avisos. Para músicas, recomendamos exibir as letras na tela separadamente. A IA é otimizada para fala natural.",
        },
        {
          q: "Consegue usar a terminologia religiosa corretamente?",
          a: "Sim. Selecione o glossário de domínio ao criar uma sessão. Você também pode enviar glossários personalizados com termos específicos da sua denominação ou tradição.",
        },
        {
          q: "E se a internet da igreja for lenta?",
          a: "O Translync usa pouquíssima banda — mais ou menos como uma ligação de voz. O WiFi padrão de uma igreja é mais que suficiente. Cada ouvinte usa seus próprios dados móveis, então a rede da igreja não fica sobrecarregada.",
        },
        {
          q: "Quanto custa para um culto semanal?",
          a: "A US$ 3/hora por idioma, um culto de 1 hora em 3 idiomas custa US$ 9. Você ganha 30 minutos grátis por mês para experimentar — sem cartão de crédito.",
        },
      ],
      cta: {
        heading: "Todo Membro Merece Entender",
        subheading:
          "Comece a traduzir seus cultos hoje. 30 minutos grátis, sem cartão de crédito.",
        button: "Comece Grátis para Sua Igreja",
      },
      glossaryFeature: {
        headline: "IA Otimizada para Igrejas",
        description:
          "Treinada com terminologia bíblica e litúrgica em 19 idiomas. Sermão, comunhão, batismo, graça — cada termo traduzido com precisão teológica, não resultados genéricos de dicionário.",
        terms: ["Sermão", "Comunhão", "Batismo", "Graça", "Salvação", "Congregação", "Espírito Santo", "Evangelho", "Louvor", "Bênção"],
      },
      meta: {
        title: "Translync para Igrejas — Tradução de Sermões em Tempo Real com IA",
        description:
          "Deixe cada membro ouvir o sermão no seu idioma. Tradução em tempo real com IA para congregações multilíngues. Mais de 70 idiomas, sem app, a partir de US$ 3/hora.",
      },
    },

    ngos: {
      slug: "ngos",
      label: "ONGs",
      hero: {
        title: "Torne Cada Evento Acessível",
        highlight: "em Qualquer Idioma",
        subtitle:
          "Suas equipes de campo trabalham além de fronteiras e idiomas. O Translync oferece tradução em tempo real em conferências, treinamentos e reuniões comunitárias — sem intérpretes.",
      },
      socialProof: [
        "Fundação Alcance Global",
        "Rede de Ajuda Humanitária Brasil",
        "Instituto Ponte Solidária",
        "Aliança pela Educação Mundial",
        "Grupo de Resposta Humanitária",
        "Refúgio e Esperança",
      ],
      testimonial: {
        quote:
          "Durante nosso treinamento regional com participantes de 8 países, o Translync substituiu 4 intérpretes simultâneos. A economia foi significativa e as traduções foram instantâneas.",
        author: "Fernanda Costa",
        role: "Diretora de Programas, Fundação Alcance Global",
      },
      faq: [
        {
          q: "Ele lida com terminologia humanitária?",
          a: "Sim. O Translync inclui um glossário humanitário integrado com mais de 200 termos do ACNUR, IASC e Padrões Esfera. Siglas como VBG, WASH e PDI são tratadas de forma correta e consistente.",
        },
        {
          q: "Funciona em ambientes de campo com baixa conectividade?",
          a: "O Translync precisa de conexão à internet, mas usa banda mínima — comparável a uma chamada de voz. Funciona bem em redes 3G/4G. Cada participante usa seu próprio dispositivo e conexão de dados.",
        },
        {
          q: "Como lidamos com reuniões multilíngues com mais de 10 idiomas?",
          a: "Crie uma sessão e selecione todos os idiomas de destino. O Translync traduz simultaneamente para todos. Cada participante escolhe seu idioma no celular. Não há limite de ouvintes.",
        },
        {
          q: "Os dados são seguros?",
          a: "Todo o áudio e as traduções são processados em tempo real e não ficam armazenados permanentemente. Os dados da sessão expiram após 24 horas. Nenhuma gravação é mantida, a menos que você opte explicitamente por salvá-la.",
        },
        {
          q: "Qual é o preço para organizações?",
          a: "US$ 3/hora por idioma, pague conforme o uso. Para implantações em larga escala ou eventos recorrentes, entre em contato para preços corporativos com descontos por volume e suporte dedicado.",
        },
      ],
      cta: {
        heading: "A Tradução Não Deveria Ser Barreira para o Impacto",
        subheading:
          "Comece a traduzir seus eventos hoje. 30 minutos grátis, sem configuração.",
        button: "Comece Grátis para Sua Organização",
      },
      glossaryFeature: {
        headline: "IA para o Setor Humanitário",
        description:
          "Glossário integrado com mais de 200 termos do IASC, ACNUR e Padrões Esfera em 19 idiomas. Refugiado, PDI, violência baseada em gênero, segurança alimentar — traduzidos com precisão setorial.",
        terms: ["Refugiado", "Solicitante de Refúgio", "PDI", "Proteção", "Prestação de Contas", "Resiliência", "Meios de Subsistência", "Transferência Monetária", "VBG", "WASH"],
      },
      meta: {
        title: "Translync para ONGs — Tradução com IA para Eventos Humanitários",
        description:
          "Tradução em tempo real com IA para conferências de ONGs, treinamentos de campo e reuniões comunitárias. Glossário humanitário integrado, mais de 70 idiomas, a partir de US$ 3/hora.",
      },
    },

    universities: {
      slug: "universities",
      label: "Universidades",
      hero: {
        title: "Torne as Aulas Acessíveis",
        highlight: "para Cada Estudante",
        subtitle:
          "Estudantes internacionais não deveriam sofrer com o idioma. O Translync traduz aulas, seminários e eventos do campus em tempo real — direto no celular.",
      },
      socialProof: [
        "Aliança Universitária do Mercosul",
        "Rede Acadêmica Internacional",
        "Instituto Campus Global",
        "Fundação Educação sem Fronteiras",
        "Hub de Ensino Multilíngue",
        "ConectaUniversidade",
      ],
      testimonial: {
        quote:
          "Testamos o Translync durante nossa semana de integração internacional com estudantes de 26 países. O retorno foi incrível — os estudantes disseram que foi a primeira vez que entenderam tudo de verdade.",
        author: "Profa. Dra. Ana Beatriz Mendes",
        role: "Diretora de Programas Internacionais, Aliança Universitária do Mercosul",
      },
      faq: [
        {
          q: "Os estudantes podem usar durante aulas normais?",
          a: "Sim. O professor cria uma sessão e compartilha o QR code no início da aula. Os estudantes escaneiam e acompanham a tradução em tempo real no celular — como texto ou áudio.",
        },
        {
          q: "Ele lida com vocabulário acadêmico e técnico?",
          a: "O Translync inclui glossários de domínio para áreas acadêmicas comuns. Os professores também podem enviar glossários personalizados com terminologia específica da disciplina para melhorar a precisão.",
        },
        {
          q: "Quantos estudantes podem se conectar ao mesmo tempo?",
          a: "Não há limite de ouvintes. Cada estudante se conecta pelo próprio celular. O sistema escala automaticamente — seja com 10 ou 500 estudantes.",
        },
        {
          q: "Funciona em auditórios grandes?",
          a: "Sim. O palestrante usa um notebook ou celular com microfone. Para auditórios grandes, recomendamos usar o sistema de som da sala ou um microfone de lapela para melhores resultados. Os estudantes usam seus próprios celulares e fones.",
        },
        {
          q: "Quanto custa para uma universidade?",
          a: "US$ 3/hora por idioma. Uma aula de 2 horas traduzida para 3 idiomas custa US$ 18. Para implantação em nível de departamento ou campus, entre em contato para preços corporativos.",
        },
      ],
      cta: {
        heading: "Educação Sem Barreiras de Idioma",
        subheading:
          "Comece a traduzir aulas e eventos. 30 minutos grátis, sem configuração de TI.",
        button: "Comece Grátis para Sua Universidade",
      },
      glossaryFeature: {
        headline: "IA de Nível Acadêmico",
        description:
          "Glossário acadêmico integrado com terminologia precisa para aulas, pesquisa e vida universitária em 19 idiomas. Dissertação, ementa, titularidade — traduzidos como os acadêmicos esperam.",
        terms: ["Aula Magna", "Seminário", "Dissertação", "Tese", "Ementa", "Corpo Docente", "Bolsa de Estudos", "Revisão por Pares", "Credenciamento", "Titularidade"],
      },
      meta: {
        title: "Translync para Universidades — Tradução de Aulas com IA",
        description:
          "Tradução em tempo real com IA para aulas, seminários e eventos universitários. Ajude estudantes internacionais a acompanhar no seu idioma. Mais de 70 idiomas, a partir de US$ 3/hora.",
      },
    },

    communities: {
      slug: "communities",
      label: "Comunidades",
      hero: {
        title: "Conecte Sua Comunidade",
        highlight: "em Todos os Idiomas",
        subtitle:
          "Comunidades de imigrantes, centros culturais e organizações de bairro — dê voz a todos. Tradução em tempo real para assembleias, reuniões e eventos comunitários.",
      },
      socialProof: [
        "Aliança dos Novos Moradores",
        "Centro Ponte Cultural",
        "Programa de Integração Municipal",
        "Rede de Apoio ao Imigrante",
        "Iniciativa Vozes da Comunidade",
        "Bairros Unidos",
      ],
      testimonial: {
        quote:
          "Nossas assembleias de bairro excluíam metade da comunidade por causa do idioma. Agora todos participam — em crioulo haitiano, espanhol, árabe e mandarim — tudo ao mesmo tempo.",
        author: "Cláudia Ferreira",
        role: "Organizadora Comunitária, Aliança dos Novos Moradores",
      },
      faq: [
        {
          q: "Como os moradores participam?",
          a: "Exiba o QR code numa tela ou imprima em panfletos. Os participantes escaneiam com a câmera do celular — sem precisar baixar app. Escolhem o idioma e começam a ouvir na hora.",
        },
        {
          q: "Funciona para idiomas como crioulo haitiano, guarani ou iorubá?",
          a: "Sim. O Translync suporta mais de 70 idiomas, incluindo os menos comuns. Se o seu idioma não estiver listado, entre em contato — estamos expandindo a cobertura constantemente.",
        },
        {
          q: "Consegue lidar com temas emocionais ou sensíveis?",
          a: "O Translync traduz fielmente e com neutralidade. Não edita nem ameniza o conteúdo. Em discussões comunitárias sobre temas sensíveis, a tradução preserva a intenção e o tom do falante.",
        },
        {
          q: "É acessível para organizações comunitárias pequenas?",
          a: "A US$ 3/hora por idioma, uma reunião de 2 horas em 4 idiomas custa US$ 24. Você ganha 30 minutos grátis para experimentar. Para organizações sem fins lucrativos, entre em contato sobre tarifas com desconto.",
        },
        {
          q: "As pessoas precisam de smartphone?",
          a: "Sim, cada ouvinte precisa de um smartphone com navegador. Para participantes sem celular, você pode colocar um tablet ou notebook compartilhado na mesa deles com a tradução tocando.",
        },
      ],
      cta: {
        heading: "Toda Voz Importa. Todo Idioma Conta.",
        subheading:
          "Comece a traduzir seus eventos comunitários. 30 minutos grátis, sem barreiras.",
        button: "Comece Grátis para Sua Comunidade",
      },
      glossaryFeature: {
        headline: "IA Focada na Comunidade",
        description:
          "Glossário integrado com termos cívicos, jurídicos e de serviços sociais em 19 idiomas. Residência, naturalização, plano de saúde, assistência jurídica — traduzidos com precisão para que nada se perca.",
        terms: ["Residência", "Naturalização", "Permissão de Trabalho", "Serviços Sociais", "Plano de Saúde", "Assistência Jurídica", "Cidadania", "Reunificação Familiar", "Moradia", "Creche"],
      },
      meta: {
        title: "Translync para Comunidades — Tradução com IA para Eventos Locais",
        description:
          "Tradução em tempo real com IA para assembleias de bairro, reuniões comunitárias e eventos culturais. Ajude comunidades de imigrantes a participar plenamente. Mais de 70 idiomas, a partir de US$ 3/hora.",
      },
    },
  },
};
