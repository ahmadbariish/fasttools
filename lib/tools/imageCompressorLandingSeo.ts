type Locale = 'en' | 'ar'

type LandingBlock = {
  seoTitle: string
  seoDescription: string
  h1: string
  intro: string
  faq: { q: string; a: string }[]
}

type ImageCompressorLandingSlug =
  | 'compress-image-online'
  | 'reduce-image-size'
  | 'jpg-to-webp'
  | 'png-to-jpg'

/** SEO landing copy only; default slug `image-compressor` uses i18n in the page. */
export const IMAGE_COMPRESSOR_LANDING_COPY: Record<
  ImageCompressorLandingSlug,
  Record<Locale, LandingBlock>
> = {
  'compress-image-online': {
    en: {
      seoTitle: 'Compress Image Online Free — JPG, PNG & WebP',
      seoDescription:
        'Compress images online in your browser. Lower file size with a quality slider, convert formats, and download instantly. Private: no server upload.',
      h1: 'Compress image online',
      intro:
        'Shrink photos and graphics without installing software. Upload a file, tune quality, pick JPG, PNG, or WebP, and download the result — all processed locally in your browser.',
      faq: [
        {
          q: 'Is this really an online image compressor?',
          a: 'Yes. You use it in the browser like other online tools, but files are processed on your device only — nothing is sent to our servers.',
        },
        {
          q: 'Which formats can I compress?',
          a: 'You can work with common image types and export as JPG, PNG, or WebP to match your website or social needs.',
        },
        {
          q: 'Will compressing reduce quality?',
          a: 'Lower quality settings produce smaller files. Use the slider to balance visual quality versus file size before you download.',
        },
      ],
    },
    ar: {
      seoTitle: 'ضغط الصور أونلاين مجاناً — JPG وPNG وWebP',
      seoDescription:
        'اضغط الصور أونلاين داخل المتصفح. قلل الحجم مع شريط الجودة، وحوّل الصيغ، وحمّل فوراً. خصوصية: لا يتم رفع الملفات للسيرفر.',
      h1: 'ضغط الصور أونلاين',
      intro:
        'قلّص حجم الصور دون تثبيت برامج. ارفع الملف، اضبط الجودة، واختر JPG أو PNG أو WebP، وحمّل النتيجة — كل المعالجة محلياً في متصفحك.',
      faq: [
        {
          q: 'هل هذا ضاغط صور أونلاين حقيقي؟',
          a: 'نعم، تستخدمه من المتصفح مثل أدوات الويب، لكن الملفات تُعالج على جهازك فقط ولا تُرفع إلى خوادمنا.',
        },
        {
          q: 'ما الصيغ التي يمكن ضغطها؟',
          a: 'يمكنك العمل مع أنواع الصور الشائعة والتصدير بصيغة JPG أو PNG أو WebP حسب موقعك أو منصات التواصل.',
        },
        {
          q: 'هل الضغط يقلل الجودة؟',
          a: 'إعدادات جودة أقل تعطي ملفات أصغر. استخدم الشريط لموازنة الوضوح وحجم الملف قبل التحميل.',
        },
      ],
    },
  },
  'reduce-image-size': {
    en: {
      seoTitle: 'Reduce Image File Size — Smaller JPG, PNG & WebP',
      seoDescription:
        'Reduce image size for faster pages, email, and social posts. Adjust compression and format in the browser; files stay on your device.',
      h1: 'Reduce image size',
      intro:
        'Make images lighter before you publish or share. Choose output format and quality to cut kilobytes while keeping detail where it matters.',
      faq: [
        {
          q: 'How much can I reduce image size?',
          a: 'It depends on the original file and settings. Photos often shrink a lot at moderate quality; PNG with transparency may benefit from WebP.',
        },
        {
          q: 'Does reducing size affect SEO?',
          a: 'Smaller, well-compressed images can improve page speed, which supports a better user experience and Core Web Vitals.',
        },
        {
          q: 'Are my images uploaded?',
          a: 'No. Resize and compression run in your browser memory; we do not store your uploads.',
        },
      ],
    },
    ar: {
      seoTitle: 'تقليل حجم الصورة — JPG وPNG وWebP أصغر',
      seoDescription:
        'قلل حجم الصور لصفحات أسرع وبريد ومنشورات أوضح. اضبط الضغط والصيغة في المتصفح؛ الملفات تبقى على جهازك.',
      h1: 'تقليل حجم الصورة',
      intro:
        'اجعل الصور أخف قبل النشر أو المشاركة. اختر صيغة الإخراج والجودة لتوفير المساحة مع الحفاظ على التفاصيل المهمة.',
      faq: [
        {
          q: 'كم يمكن تقليل حجم الصورة؟',
          a: 'يعتمد على الملف الأصلي والإعدادات. الصور غالباً تتقلص كثيراً بجودة متوسطة؛ PNG مع شفافية قد يستفيد من WebP.',
        },
        {
          q: 'هل تقليل الحجم يؤثر على SEO؟',
          a: 'الصور الأصغر والمضغوطة جيداً تساعد سرعة الصفحة، ما يدعم تجربة المستخدم ومؤشرات الأداء.',
        },
        {
          q: 'هل تُرفع صوري؟',
          a: 'لا. الضغط يعمل في ذاكرة المتصفح ولا نخزن ملفاتك.',
        },
      ],
    },
  },
  'jpg-to-webp': {
    en: {
      seoTitle: 'JPG to WebP — Convert & Compress Images in Browser',
      seoDescription:
        'Turn JPG into WebP and tune quality for smaller files. Free browser-based converter and compressor; your image never leaves your device.',
      h1: 'JPG to WebP',
      intro:
        'Modern sites use WebP for better compression. Upload a JPEG, set WebP as the output format, adjust quality, and download a lighter file.',
      faq: [
        {
          q: 'Why convert JPG to WebP?',
          a: 'WebP often produces smaller files than JPEG at similar visual quality, which helps load times.',
        },
        {
          q: 'Can I still compress after converting?',
          a: 'Yes. The quality slider applies when encoding to WebP so you control size versus sharpness.',
        },
        {
          q: 'Will every browser show WebP?',
          a: 'All current major browsers support WebP. For legacy needs, keep a JPEG fallback on your site.',
        },
      ],
    },
    ar: {
      seoTitle: 'من JPG إلى WebP — تحويل وضغط في المتصفح',
      seoDescription:
        'حوّل JPG إلى WebP واضبط الجودة لملفات أصغر. محوّل وضاغط مجاني في المتصفح؛ صورتك لا تغادر جهازك.',
      h1: 'تحويل JPG إلى WebP',
      intro:
        'المواقع الحديثة تستخدم WebP لضغط أفضل. ارفع JPEG، اختر WebP كصيغة إخراج، اضبط الجودة، وحمّل ملفاً أخف.',
      faq: [
        {
          q: 'لماذا أحوّل JPG إلى WebP؟',
          a: 'WebP غالباً يعطي ملفات أصغر من JPEG بنفس الجودة المرئية تقريباً، ما يحسّن زمن التحميل.',
        },
        {
          q: 'هل يمكن الضغط بعد التحويل؟',
          a: 'نعم. شريط الجودة يُطبَّق عند الترميز إلى WebP للتحكم في الحجم والوضوح.',
        },
        {
          q: 'هل كل المتصفحات تعرض WebP؟',
          a: 'المتصفحات الرئيسية الحالية تدعم WebP. للأنظمة القديمة جداً احتفظ بنسخة JPEG احتياطية على موقعك.',
        },
      ],
    },
  },
  'png-to-jpg': {
    en: {
      seoTitle: 'PNG to JPG — Convert & Compress for Smaller Files',
      seoDescription:
        'Convert PNG to JPG and reduce file size with quality control. Runs locally in your browser; ideal when you do not need transparency.',
      h1: 'PNG to JPG',
      intro:
        'PNG files can be large. Switch to JPEG output when transparency is not required, then lower quality to get a smaller image for web or chat.',
      faq: [
        {
          q: 'Will I lose transparency?',
          a: 'JPEG does not support transparency. Transparent areas may become a solid background when you export as JPG.',
        },
        {
          q: 'When is PNG to JPG useful?',
          a: 'For screenshots or graphics without transparency, JPG often yields much smaller files than PNG.',
        },
        {
          q: 'Is conversion private?',
          a: 'Yes. Conversion and compression happen entirely on your device.',
        },
      ],
    },
    ar: {
      seoTitle: 'من PNG إلى JPG — تحويل وضغط لملفات أصغر',
      seoDescription:
        'حوّل PNG إلى JPG وقلل الحجم مع التحكم بالجودة. يعمل محلياً في المتصفح؛ مناسب عندما لا تحتاج الشفافية.',
      h1: 'تحويل PNG إلى JPG',
      intro:
        'ملفات PNG قد تكون كبيرة. انتقل إلى JPEG عندما لا تحتاج الشفافية، ثم خفّض الجودة للحصول على صورة أصغر للويب أو الدردشة.',
      faq: [
        {
          q: 'هل أفقد الشفافية؟',
          a: 'JPEG لا يدعم الشفافية. المناطق الشفافة قد تصبح خلفية صلبة عند التصدير كـ JPG.',
        },
        {
          q: 'متى يفيد PNG إلى JPG؟',
          a: 'للقطات أو الرسوم بدون شفافية، JPG غالباً يعطي ملفات أصغر بكثير من PNG.',
        },
        {
          q: 'هل التحويل خاص؟',
          a: 'نعم. التحويل والضغط يتمان بالكامل على جهازك.',
        },
      ],
    },
  },
}
