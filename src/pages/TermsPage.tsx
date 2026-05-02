import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { SEO } from '../shared/components/SEO'

function TermsPage() {
  const { t } = useTranslation()
  const { lang = 'en' } = useParams()
  const isAr = lang === 'ar'

  return (
    <>
      <SEO
        title={`${t('pages.termsTitle')} | ${t('siteName')}`}
        description={
          isAr
            ? 'شروط استخدام منصة الأدوات المجانية وكيفية استخدام الخدمات بشكل قانوني.'
            : 'Terms of service for using our free online tools and platform.'
        }
        canonical={`https://example.com/${lang}/terms`}
        lang={isAr ? 'ar' : 'en'}
      />

      <header className="mb-6">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {t('pages.termsTitle')}
        </h1>

        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {isAr
            ? 'باستخدامك لهذه المنصة، فإنك توافق على الالتزام بهذه الشروط.'
            : 'By using this platform, you agree to comply with these terms.'}
        </p>
      </header>

      <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm sm:p-6 sm:text-base">
        <div>
          <h2 className="mb-2 text-lg font-bold text-slate-950">
            {isAr ? 'الاستخدام المسموح' : 'Acceptable Use'}
          </h2>
          <p>
            {isAr
              ? 'يجب استخدام الأدوات لأغراض قانونية فقط. يُمنع استخدام المنصة لأي نشاط غير قانوني أو ضار.'
              : 'You must use the tools for lawful purposes only. Any illegal or harmful use is strictly prohibited.'}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-slate-950">
            {isAr ? 'طبيعة الخدمة' : 'Service Nature'}
          </h2>
          <p>
            {isAr
              ? 'الأدوات المقدمة مجانية وتعمل داخل المتصفح. قد يتم تعديل أو إيقاف أي خدمة في أي وقت دون إشعار.'
              : 'All tools are provided free of charge and run in the browser. We may modify or discontinue any service at any time without notice.'}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-slate-950">
            {isAr ? 'إخلاء المسؤولية' : 'Disclaimer'}
          </h2>
          <p>
            {isAr
              ? 'يتم تقديم الأدوات "كما هي" دون أي ضمانات. لا نتحمل مسؤولية أي نتائج ناتجة عن استخدام الأدوات.'
              : 'The tools are provided "as-is" without warranties. We are not responsible for any results or outcomes from using the tools.'}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-slate-950">
            {isAr ? 'المحتوى والبيانات' : 'Content and Data'}
          </h2>
          <p>
            {isAr
              ? 'أنت مسؤول عن أي محتوى تقوم بإدخاله في الأدوات. نحن لا نقوم بتخزين أو مراجعة البيانات المدخلة.'
              : 'You are responsible for any content you input into the tools. We do not store or review your data.'}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-slate-950">
            {isAr ? 'الإعلانات' : 'Advertising'}
          </h2>
          <p>
            {isAr
              ? 'قد تعرض المنصة إعلانات من جهات خارجية مثل Google AdSense. لسنا مسؤولين عن محتوى هذه الإعلانات.'
              : 'The platform may display third-party ads such as Google AdSense. We are not responsible for the content of these ads.'}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-slate-950">
            {isAr ? 'التعديلات على الشروط' : 'Changes to Terms'}
          </h2>
          <p>
            {isAr
              ? 'قد نقوم بتحديث هذه الشروط في أي وقت. استمرارك باستخدام الموقع يعني موافقتك على التعديلات.'
              : 'We may update these terms at any time. Continued use of the platform means you accept the changes.'}
          </p>
        </div>
      </section>
    </>
  )
}

export default TermsPage