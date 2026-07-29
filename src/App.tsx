import React, { useState } from 'react';
import { defaultCoverLetterEN, defaultCoverLetterAR } from './data/defaultCoverLetter';
import { CoverLetterData } from './types';
import { CoverLetterPreview } from './components/CoverLetterPreview';
import { EditorToolbar } from './components/EditorToolbar';
import { exportToPdf } from './utils/exportPdf';
import { FileText, Download, Copy, Printer, ZoomIn, ZoomOut, Check, Eye, Edit3, Loader2, Languages } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<CoverLetterData>(defaultCoverLetterEN);
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');
  const [zoom, setZoom] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const isArabic = data.language === 'ar';

  const handleLanguageToggle = (lang: 'en' | 'ar') => {
    if (data.language === lang) return;
    if (lang === 'ar') {
      setData({ ...defaultCoverLetterAR });
    } else {
      setData({ ...defaultCoverLetterEN });
    }
  };

  const handleReset = () => {
    const confirmMsg = isArabic
      ? 'هل ترغب في استعادة البيانات الافتراضية للخطاب؟'
      : 'Reset cover letter data back to original default?';
    if (window.confirm(confirmMsg)) {
      setData(isArabic ? defaultCoverLetterAR : defaultCoverLetterEN);
    }
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      const fileName = `${data.firstName}_${data.lastName}_Cover_Letter.pdf`.replace(/\s+/g, '_');
      await exportToPdf('cover-letter-document', fileName);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const fullText = [
      `${data.firstName} ${data.lastName}`,
      `${data.city}, ${data.state} | ${data.phone} | ${data.email}`,
      '',
      data.date,
      '',
      data.companyName,
      '',
      data.subject,
      '',
      data.greeting,
      '',
      data.opening,
      '',
      ...data.bodyParagraphs,
      '',
      data.callToAction,
      '',
      data.closing,
      data.signatoryName,
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen bg-gray-100/90 text-gray-900 font-sans selection:bg-blue-100 flex flex-col ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Navigation Header (Hidden when printing) */}
      <header className="bg-gray-900 text-white border-b border-gray-800 sticky top-0 z-40 no-print shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Title & Badge */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                {isArabic ? 'عبدالمجيد الولي' : 'Abdulmajeed Alwli'}{' '}
                <span className="text-gray-400 font-normal text-xs">| {isArabic ? 'خطاب التغطية (Cover Letter)' : 'Cover Letter'}</span>
              </h1>
              <p className="text-[11px] text-gray-400">
                {isArabic
                  ? 'مهندس أجهزة طبية حيوية وفني صيانة المعدات الطبية'
                  : 'Biomedical Engineer & Medical Equipment Technician Application'}
              </p>
            </div>
          </div>

          {/* Language Switcher & Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Language Selector Header */}
            <div className="inline-flex items-center gap-1 p-1 bg-gray-800 rounded-lg border border-gray-700">
              <Languages className="w-3.5 h-3.5 text-gray-400 mx-1" />
              <button
                type="button"
                onClick={() => handleLanguageToggle('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  !isArabic ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => handleLanguageToggle('ar')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  isArabic ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                العربية
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="inline-flex p-1 bg-gray-800 rounded-lg border border-gray-700">
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'preview' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> {isArabic ? 'المعاينة' : 'Preview'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'edit' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" /> {isArabic ? 'تعديل' : 'Edit Data'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleExportPdf}
              disabled={isExporting}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> {isArabic ? 'تصدير PDF...' : 'Generating PDF...'}
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" /> {isArabic ? 'تنزيل PDF' : 'Download PDF'}
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              title={isArabic ? 'طباعة المستند' : 'Print document'}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> {isArabic ? 'طباعة' : 'Print'}
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (isArabic ? 'تم النسخ' : 'Copied') : (isArabic ? 'نسخ' : 'Copy')}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Controls & Editor */}
        <div className={`lg:col-span-5 space-y-4 no-print ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <EditorToolbar
            data={data}
            onChange={setData}
            onReset={handleReset}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isExporting={isExporting}
            onExportPdf={handleExportPdf}
          />

          {/* Quick Info Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 text-xs text-gray-600 shadow-sm space-y-2">
            <h3 className="font-semibold text-gray-900 flex items-center gap-1.5">
              💡 {isArabic ? 'خيارات التصدير والطباعة' : 'Exporting Options'}
            </h3>
            <p className="leading-relaxed text-gray-600">
              {isArabic ? (
                <>
                  اضغط على زر <strong>تنزيل PDF</strong> لتصدير المستند بصفحة واحدة A4 بدقة عالية. يمكنك أيضاً اختيار <strong>طباعة</strong> للطباعة المباشرة من المتصفح.
                </>
              ) : (
                <>
                  Click <strong>Download PDF</strong> to generate and download the PDF document directly to your device. You can also click <strong>Print</strong> for native browser printing.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right Side: Document Preview Canvas */}
        <div className={`lg:col-span-7 flex flex-col items-center w-full ${activeTab === 'edit' ? 'hidden lg:flex' : 'flex'}`}>
          {/* Canvas Toolbar (Zoom controls) */}
          <div className="w-full max-w-[210mm] flex items-center justify-between mb-3 px-2 no-print">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {isArabic ? 'معاينة المستند (قياس A4)' : 'Document Preview (A4 Format)'}
            </span>

            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-sm">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                title={isArabic ? 'تصغير' : 'Zoom Out'}
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-semibold text-gray-700 w-10 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.3, z + 0.1))}
                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                title={isArabic ? 'تكبير' : 'Zoom In'}
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(1)}
                className="text-[10px] text-blue-600 hover:underline ml-1 font-medium"
              >
                {isArabic ? 'إعادة' : 'Reset'}
              </button>
            </div>
          </div>

          {/* Printable Page Wrapper */}
          <div className="w-full flex justify-center overflow-x-auto pb-12">
            <CoverLetterPreview data={data} scale={zoom} />
          </div>
        </div>
      </main>
    </div>
  );
}

