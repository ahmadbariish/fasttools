import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { MainLayout } from '../../shared/components/layout/MainLayout'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../../shared/constants/languages'

const HomePage = lazy(() => import('../../pages/HomePage'))
const ToolsPage = lazy(() => import('../../pages/ToolsPage'))
const PrivacyPolicyPage = lazy(() => import('../../pages/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('../../pages/TermsPage'))
const ContactPage = lazy(() => import('../../pages/ContactPage'))
const ImageCompressorPage = lazy(
  () => import('../../features/image-compressor/ImageCompressorPage'),
)
const QRCodeGeneratorPage = lazy(
  () => import('../../features/qr-code-generator/QRCodeGeneratorPage'),
)
const AITextToolsPage = lazy(() => import('../../features/ai-text-tools/AITextToolsPage'))

function LangGuard() {
  const { lang } = useParams()
  if (!lang || !SUPPORTED_LANGUAGES.includes(lang as 'en' | 'ar')) {
    return <Navigate to={`/${DEFAULT_LANGUAGE}`} replace />
  }
  return <MainLayout />
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />} />
          <Route path="/:lang" element={<LangGuard />}>
            <Route index element={<HomePage />} />
            <Route path="tools" element={<ToolsPage />} />
            <Route path="tools/image-compressor" element={<ImageCompressorPage />} />
            <Route path="tools/compress-image-online" element={<ImageCompressorPage />} />
            <Route path="tools/reduce-image-size" element={<ImageCompressorPage />} />
            <Route path="tools/jpg-to-webp" element={<ImageCompressorPage />} />
            <Route path="tools/png-to-jpg" element={<ImageCompressorPage />} />
            <Route path="tools/qr-code-generator" element={<QRCodeGeneratorPage />} />
            <Route path="tools/ai-text-tools" element={<AITextToolsPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
          <Route path="*" element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
