import React, { useState } from 'react';
import { CoverLetterData } from '../types';
import { defaultCoverLetterEN, defaultCoverLetterAR } from '../data/defaultCoverLetter';
import {
  Printer,
  Copy,
  RotateCcw,
  User,
  Building,
  FileText,
  PenTool,
  Sliders,
  Check,
  Maximize2,
  Edit3,
  Download,
  Loader2,
  Languages
} from 'lucide-react';
import { SignaturePad } from './SignaturePad';

interface Props {
  data: CoverLetterData;
  onChange: (newData: CoverLetterData) => void;
  onReset: () => void;
  activeTab: 'preview' | 'edit';
  setActiveTab: (tab: 'preview' | 'edit') => void;
  isExporting?: boolean;
  onExportPdf?: () => void;
}

export const EditorToolbar: React.FC<Props> = ({
  data,
  onChange,
  onReset,
  activeTab,
  setActiveTab,
  isExporting = false,
  onExportPdf,
}) => {
  const [copied, setCopied] = useState(false);
  const [editSection, setEditSection] = useState<'contact' | 'recipient' | 'content' | 'signature' | 'settings'>('contact');

  const isArabic = data.language === 'ar';

  const handleLanguageSwitch = (lang: 'en' | 'ar') => {
    if (data.language === lang) return;
    if (lang === 'ar') {
      onChange({ ...defaultCoverLetterAR });
    } else {
      onChange({ ...defaultCoverLetterEN });
    }
  };

  const updateField = (field: keyof CoverLetterData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const updateBodyParagraph = (index: number, text: string) => {
    const updated = [...data.bodyParagraphs];
    updated[index] = text;
    onChange({
      ...data,
      bodyParagraphs: updated,
    });
  };

  const addBodyParagraph = () => {
    onChange({
      ...data,
      bodyParagraphs: [...data.bodyParagraphs, ''],
    });
  };

  const removeBodyParagraph = (index: number) => {
    const updated = data.bodyParagraphs.filter((_, i) => i !== index);
    onChange({
      ...data,
      bodyParagraphs: updated,
    });
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
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden no-print">
      {/* Top Action Bar */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/80 flex flex-wrap items-center justify-between gap-3">
        {/* Language Selector */}
        <div className="inline-flex items-center gap-1 p-1 bg-gray-200/70 rounded-xl">
          <Languages className="w-4 h-4 ml-1 text-gray-500" />
          <button
            type="button"
            onClick={() => handleLanguageSwitch('en')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              !isArabic ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => handleLanguageSwitch('ar')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              isArabic ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            العربية
          </button>
        </div>

        {/* Toggle Mode */}
        <div className="inline-flex p-1 bg-gray-200/70 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'preview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" /> {isArabic ? 'معاينة المستند' : 'Preview Document'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'edit'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" /> {isArabic ? 'تعديل البيانات' : 'Edit Fields'}
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2">
          {onExportPdf && (
            <button
              type="button"
              onClick={onExportPdf}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> {isArabic ? 'تصدير PDF...' : 'PDF...'}
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" /> {isArabic ? 'تنزيل PDF' : 'Download PDF'}
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handlePrint}
            title={isArabic ? 'طباعة المستند' : 'Print document'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium rounded-xl transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> {isArabic ? 'طباعة' : 'Print'}
          </button>

          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium rounded-xl transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (isArabic ? 'تم النسخ!' : 'Copied!') : (isArabic ? 'نسخ النص' : 'Copy Text')}
          </button>

          <button
            type="button"
            onClick={onReset}
            title={isArabic ? 'إعادة ضبط البيانات الأصلية' : 'Reset to original template data'}
            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Tab Navigation */}
      {activeTab === 'edit' && (
        <div className={`border-b border-gray-100 px-4 pt-2 bg-white flex overflow-x-auto gap-2 scrollbar-none ${isArabic ? 'flex-row-reverse' : ''}`}>
          <button
            type="button"
            onClick={() => setEditSection('contact')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              editSection === 'contact'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <User className="w-3.5 h-3.5" /> {isArabic ? 'البيانات الشخصية' : 'Personal Contact'}
          </button>

          <button
            type="button"
            onClick={() => setEditSection('recipient')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              editSection === 'recipient'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Building className="w-3.5 h-3.5" /> {isArabic ? 'بيانات الجهة والموضوع' : 'Recipient & Subject'}
          </button>

          <button
            type="button"
            onClick={() => setEditSection('content')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              editSection === 'content'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> {isArabic ? 'محتوى الخطاب' : 'Letter Body'}
          </button>

          <button
            type="button"
            onClick={() => setEditSection('signature')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              editSection === 'signature'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" /> {isArabic ? 'التوقيع الرقمي' : 'Signature'}
          </button>

          <button
            type="button"
            onClick={() => setEditSection('settings')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              editSection === 'settings'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> {isArabic ? 'تنسيق الخط والمستند' : 'Formatting'}
          </button>
        </div>
      )}

      {/* Editor Section Content */}
      {activeTab === 'edit' && (
        <div className={`p-4 bg-gray-50/50 max-h-[500px] overflow-y-auto space-y-4 ${isArabic ? 'text-right' : 'text-left'}`}>
          {/* Contact Section */}
          {editSection === 'contact' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'الاسم الأول' : 'First Name'}</label>
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'اسم العائلة' : 'Last Name'}</label>
                <input
                  type="text"
                  value={data.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'المدينة' : 'City'}</label>
                <input
                  type="text"
                  value={data.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'الدولة / المنطقة' : 'State / Country Code'}</label>
                <input
                  type="text"
                  value={data.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'رقم الهاتف' : 'Phone Number'}</label>
                <input
                  type="text"
                  value={data.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'البريد الإلكتروني' : 'Email Address'}</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  dir="ltr"
                />
              </div>
            </div>
          )}

          {/* Recipient Section */}
          {editSection === 'recipient' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'تاريخ التقديم' : 'Date'}</label>
                  <input
                    type="text"
                    value={data.date}
                    onChange={(e) => updateField('date', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'اسم الشركة أو الجهة' : 'Recipient / Company Name'}</label>
                  <input
                    type="text"
                    value={data.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'موضوع الخطاب' : 'Subject Line'}</label>
                <input
                  type="text"
                  value={data.subject}
                  onChange={(e) => updateField('subject', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'صيغة التحية والافتتاح' : 'Greeting'}</label>
                <input
                  type="text"
                  value={data.greeting}
                  onChange={(e) => updateField('greeting', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Content Section */}
          {editSection === 'content' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'الفقرة الافتتاحية (المقدمة)' : 'Opening Paragraph'}</label>
                <textarea
                  rows={3}
                  value={data.opening}
                  onChange={(e) => updateField('opening', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">{isArabic ? 'فقرات العرض والخبرات' : 'Body Paragraphs'}</label>
                  <button
                    type="button"
                    onClick={addBodyParagraph}
                    className="text-xs text-blue-600 font-semibold hover:underline"
                  >
                    {isArabic ? '+ إضافة فقرة جديدة' : '+ Add Paragraph'}
                  </button>
                </div>

                {data.bodyParagraphs.map((para, index) => (
                  <div key={index} className="relative">
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => updateBodyParagraph(index, e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
                    />
                    {data.bodyParagraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBodyParagraph(index)}
                        className={`absolute top-2 text-gray-400 hover:text-red-500 text-xs font-bold ${isArabic ? 'left-2' : 'right-2'}`}
                        title={isArabic ? 'حذف الفقرة' : 'Remove paragraph'}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'الفقرة الختامية والدعوة للمقابلة' : 'Call to Action (Closing Paragraph)'}</label>
                <textarea
                  rows={2}
                  value={data.callToAction}
                  onChange={(e) => updateField('callToAction', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'عبارة التحية الختامية' : 'Sign-off / Closing'}</label>
                  <input
                    type="text"
                    value={data.closing}
                    onChange={(e) => updateField('closing', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{isArabic ? 'اسم الموقّع' : 'Signatory Name'}</label>
                  <input
                    type="text"
                    value={data.signatoryName}
                    onChange={(e) => updateField('signatoryName', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Signature Section */}
          {editSection === 'signature' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  {isArabic ? 'نوع التوقيع' : 'Signature Mode'}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateField('signatureType', 'font')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                      data.signatureType === 'font'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {isArabic ? 'خط توقيع جاهز' : 'Script Font'}
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('signatureType', 'drawing')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                      data.signatureType === 'drawing'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {isArabic ? 'رسم التوقيع بيديك' : 'Draw Signature'}
                  </button>
                </div>
              </div>

              {data.signatureType === 'font' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {isArabic ? 'اختر نمط خط التوقيع العربي' : 'Select Script Style'}
                    </label>

                    {isArabic ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => updateField('signatureFont', 'katibeh')}
                          className={`p-2 border rounded-lg text-center transition-all ${
                            data.signatureFont === 'katibeh'
                              ? 'border-blue-600 bg-blue-50 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <span className="font-signature-katibeh text-xl block text-gray-900 leading-tight my-1">
                            {data.signatoryName || 'عبدالمجيد الولي'}
                          </span>
                          <span className="text-[10px] text-gray-600 font-medium block">خط الكاتب اليدوي</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => updateField('signatureFont', 'reem_ink')}
                          className={`p-2 border rounded-lg text-center transition-all ${
                            data.signatureFont === 'reem_ink'
                              ? 'border-blue-600 bg-blue-50 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <span className="font-signature-reem-ink text-lg block text-gray-900 leading-tight my-1">
                            {data.signatoryName || 'عبدالمجيد الولي'}
                          </span>
                          <span className="text-[10px] text-gray-600 font-medium block">قلم حبر جاف</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => updateField('signatureFont', 'ruqaa')}
                          className={`p-2 border rounded-lg text-center transition-all ${
                            data.signatureFont === 'ruqaa'
                              ? 'border-blue-600 bg-blue-50 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <span className="font-signature-ruqaa text-lg block text-gray-900 leading-tight my-1">
                            {data.signatoryName || 'عبدالمجيد الولي'}
                          </span>
                          <span className="text-[10px] text-gray-600 font-medium block">خط الرقعة السريع</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => updateField('signatureFont', 'gulzar')}
                          className={`p-2 border rounded-lg text-center transition-all ${
                            data.signatureFont === 'gulzar'
                              ? 'border-blue-600 bg-blue-50 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <span className="font-signature-gulzar text-base block text-gray-900 leading-tight my-1">
                            {data.signatoryName || 'عبدالمجيد الولي'}
                          </span>
                          <span className="text-[10px] text-gray-600 font-medium block">خط النستعليق الفني</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => updateField('signatureFont', 'lateef')}
                          className={`p-2 border rounded-lg text-center transition-all ${
                            data.signatureFont === 'lateef'
                              ? 'border-blue-600 bg-blue-50 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <span className="font-signature-lateef text-xl block text-gray-900 leading-tight my-1">
                            {data.signatoryName || 'عبدالمجيد الولي'}
                          </span>
                          <span className="text-[10px] text-gray-600 font-medium block">خط يدوي انسيابي</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => updateField('signatureFont', 'marhey')}
                          className={`p-2 border rounded-lg text-center transition-all ${
                            data.signatureFont === 'marhey'
                              ? 'border-blue-600 bg-blue-50 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <span className="font-signature-marhey text-base block text-gray-900 leading-tight my-1">
                            {data.signatoryName || 'عبدالمجيد الولي'}
                          </span>
                          <span className="text-[10px] text-gray-600 font-medium block">خط قلم عريض</span>
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => updateField('signatureFont', 'vibes')}
                          className={`p-2 border rounded-lg text-center transition-all ${
                            data.signatureFont === 'vibes'
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <span className="font-signature-vibes text-lg block text-gray-900">
                            {data.signatoryName || 'Signature'}
                          </span>
                          <span className="text-[10px] text-gray-500">Great Vibes</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => updateField('signatureFont', 'dancing')}
                          className={`p-2 border rounded-lg text-center transition-all ${
                            data.signatureFont === 'dancing'
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <span className="font-signature-dancing text-base block text-gray-900">
                            {data.signatoryName || 'Signature'}
                          </span>
                          <span className="text-[10px] text-gray-500">Dancing Script</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => updateField('signatureFont', 'sacramento')}
                          className={`p-2 border rounded-lg text-center transition-all ${
                            data.signatureFont === 'sacramento'
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <span className="font-signature-sacramento text-lg block text-gray-900">
                            {data.signatoryName || 'Signature'}
                          </span>
                          <span className="text-[10px] text-gray-500">Sacramento</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {isArabic ? 'لون التوقيع' : 'Signature Color'}
                    </label>
                    <div className="flex items-center gap-2">
                      {['#2b4291', '#1e293b', '#000000', '#1e40af', '#7c2d12'].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => updateField('signatureColor', color)}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${
                            data.signatureColor === color ? 'scale-110 border-blue-600 ring-2 ring-blue-300' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {data.signatureType === 'drawing' && (
                <SignaturePad
                  color={data.signatureColor}
                  onSave={(url) => updateField('signatureDataUrl', url)}
                />
              )}
            </div>
          )}

          {/* Formatting Settings */}
          {editSection === 'settings' && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                  <span>{isArabic ? 'حجم خط المستند' : 'Document Font Size'}</span>
                  <span>{data.fontSizePx}px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="17"
                  step="0.5"
                  value={data.fontSizePx}
                  onChange={(e) => updateField('fontSizePx', parseFloat(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>{isArabic ? 'مُدمج (12px)' : 'Compact (12px)'}</span>
                  <span>{isArabic ? 'افتراضي (14.5px)' : 'Default (14.5px)'}</span>
                  <span>{isArabic ? 'كبير (17px)' : 'Large (17px)'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
