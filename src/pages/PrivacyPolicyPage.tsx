import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { SEO } from '../shared/components/SEO'
import { siteUrl } from '../shared/constants/site'

function PrivacyPolicyPage() {
  const { t } = useTranslation()
  const { lang = 'en' } = useParams()
  const isAr = lang === 'ar'

  return (
    <>
      <SEO
        title={`${t('pages.privacyTitle')} | ${t('siteName')}`}
        description={
          isAr
            ? 'تعرف على كيفية حماية خصوصيتك عند استخدام أدواتنا المجانية داخل المتصفح.'
            : 'Learn how we protect your privacy when using our free browser-based tools.'
        }
        canonical={siteUrl(`/${lang}/privacy-policy`)}
        lang={isAr ? 'ar' : 'en'}
      />

      <header className="mb-6">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {t('pages.privacyTitle')}
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {isAr
            ? 'نحن نحترم خصوصيتك. معظم عمليات الأدوات تتم محلياً داخل متصفحك بدون رفع ملفاتك أو نصوصك إلى خوادمنا.'
            : 'We respect your privacy. Most tool operations run locally in your browser without uploading your files or text to our servers.'}
        </p>
      </header>

      <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm sm:p-6 sm:text-base">
        <div>
          <h2 className="mb-2 text-lg font-bold text-slate-950">
            {isAr ? 'معالجة البيانات محلياً' : 'Local Processing'}
          </h2>
          <p>
            {isAr
              ? 'أدوات مثل ضغط الصور، إنشاء QR، وتحسين النصوص التجريبي تعمل داخل المتصفح. لا نقوم برفع الصور أو النصوص إلى أي سيرفر.'
              : 'Tools such as image compression, QR generation, and demo text tools run inside your browser. We do not upload your images or text to any server.'}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-slate-950">
            {isAr ? 'التخزين المحلي' : 'Local Storage'}
          </h2>
          <p>
            {isAr
              ? 'قد نستخدم localStorage لحفظ اللغة المفضلة وبعض إعدادات الأدوات مثل جودة ضغط الصورة أو ألوان QR. لا نحفظ الملفات أو النصوص الحساسة.'
              : 'We may use localStorage to save your language preference and basic tool settings, such as image quality or QR colors. We do not store uploaded files or sensitive text.'}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-slate-950">
            {isAr ? 'الإعلانات وملفات تعريف الارتباط' : 'Ads and Cookies'}
          </h2>
          <p>
            {isAr
              ? 'قد نستخدم Google AdSense مستقبلاً لعرض الإعلانات. يمكن أن تستخدم Google ملفات تعريف الارتباط لعرض إعلانات مخصصة أو قياس الأداء حسب إعدادات المستخدم.'
              : 'We may use Google AdSense in the future to display ads. Google may use cookies to show personalized ads or measure performance based on user settings.'}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-slate-950">
            {isAr ? 'معلومات التواصل' : 'Contact Information'}
          </h2>
          <p>
            {isAr
              ? 'عند التواصل معنا عبر البريد أو واتساب، قد نستلم المعلومات التي ترسلها لنا فقط لغرض الرد على استفسارك.'
              : 'When you contact us by email or WhatsApp, we may receive the information you send only for the purpose of replying to your inquiry.'}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-bold text-slate-950">
            {isAr ? 'تحديثات السياسة' : 'Policy Updates'}
          </h2>
          <p>
            {isAr
              ? 'قد نقوم بتحديث سياسة الخصوصية من وقت لآخر لتحسين الشفافية أو الالتزام بمتطلبات الخدمات الإعلانية.'
              : 'We may update this privacy policy from time to time to improve transparency or comply with advertising service requirements.'}
          </p>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicyPage