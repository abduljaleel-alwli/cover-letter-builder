import React from 'react';
import { CoverLetterData } from '../types';

interface Props {
  data: CoverLetterData;
  scale?: number;
}

export const CoverLetterPreview: React.FC<Props> = ({ data, scale = 1 }) => {
  const isArabic = data.language === 'ar';

  const getSignatureFontClass = (font: CoverLetterData['signatureFont']) => {
    switch (font) {
      case 'vibes':
        return 'font-signature-vibes';
      case 'dancing':
        return 'font-signature-dancing';
      case 'sacramento':
        return 'font-signature-sacramento';
      case 'ruqaa':
        return 'font-signature-ruqaa';
      case 'katibeh':
        return 'font-signature-katibeh';
      case 'gulzar':
        return 'font-signature-gulzar';
      case 'reem_ink':
        return 'font-signature-reem-ink';
      case 'lateef':
        return 'font-signature-lateef';
      case 'marhey':
        return 'font-signature-marhey';
      case 'amiri_italic':
        return 'font-signature-amiri-italic';
      default:
        return isArabic ? 'font-signature-katibeh' : 'font-signature-vibes';
    }
  };

  const fontFamily = isArabic
    ? "'Tajawal', 'Cairo', 'Inter', system-ui, sans-serif"
    : "'Inter', system-ui, -apple-system, sans-serif";

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="print-page bg-white text-gray-900 shadow-xl border border-gray-200 mx-auto transition-transform origin-top duration-200 box-border"
      style={{
        width: '210mm',
        height: '297mm',
        maxHeight: '297mm',
        padding: isArabic ? '14mm 16mm' : '15mm 16mm',
        fontSize: `${data.fontSizePx}px`,
        lineHeight: isArabic ? 1.5 : 1.4,
        fontFamily,
        boxSizing: 'border-box',
        overflow: 'hidden',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
      id="cover-letter-document"
    >
      {/* Header section */}
      <div className="mb-3 cover-letter-header">
        {/* Top border line */}
        <div className="w-full border-t border-gray-300 mb-2" />

        {/* Candidate Name */}
        <div className="text-center tracking-wide text-2xl my-1 text-gray-950 font-normal">
          <span className="uppercase tracking-widest font-normal">{data.firstName}</span>{' '}
          <span className="uppercase tracking-wider font-extrabold">{data.lastName}</span>
        </div>

        {/* Bottom border line */}
        <div className="w-full border-b border-gray-300 mt-2 mb-1.5" />

        {/* Contact info row */}
        <div className="text-center text-[12px] text-gray-700 tracking-tight font-medium dir-ltr" style={{ direction: 'ltr' }}>
          {[
            data.city && data.state ? `${data.city}, ${data.state}` : data.city || data.state,
            data.phone,
            data.email
          ].filter(Boolean).join(' | ')}
        </div>
      </div>

      {/* Date */}
      <div className={`mb-2.5 text-gray-900 ${isArabic ? 'text-right' : 'text-left'}`}>
        {data.date}
      </div>

      {/* Recipient / Company */}
      {data.companyName && (
        <div className={`mb-2.5 text-gray-900 font-normal ${isArabic ? 'text-right' : 'text-left'}`}>
          {data.companyName}
        </div>
      )}

      {/* Subject Line */}
      {data.subject && (
        <div className={`mb-2.5 font-semibold text-gray-900 ${isArabic ? 'text-right' : 'text-left'}`}>
          {data.subject}
        </div>
      )}

      {/* Greeting */}
      <div className={`mb-2.5 text-gray-900 font-normal ${isArabic ? 'text-right font-medium' : 'text-left'}`}>
        {data.greeting}
      </div>

      {/* Letter Body Content */}
      <div className="space-y-2.5 text-gray-900 text-justify font-normal leading-relaxed">
        {/* Opening */}
        {data.opening && (
          <p className="whitespace-pre-wrap">{data.opening}</p>
        )}

        {/* Body Paragraphs */}
        {data.bodyParagraphs.map((para, index) => (
          para.trim() && (
            <p key={index} className="whitespace-pre-wrap">{para}</p>
          )
        ))}

        {/* Call to Action */}
        {data.callToAction && (
          <p className="whitespace-pre-wrap">{data.callToAction}</p>
        )}
      </div>

      {/* Sign-off & Signature */}
      <div className={`mt-4 space-y-1 ${isArabic ? 'text-right' : 'text-left'}`}>
        <p className="text-gray-900">{data.closing}</p>
        <p className="font-bold text-gray-950 pt-0.5">{data.signatoryName}</p>

        {/* Signature graphic / font render */}
        <div className={`pt-1 min-h-[44px] flex items-center ${isArabic ? 'justify-start' : 'justify-start'}`}>
          {data.signatureType === 'font' && (
            <span
              className={`${getSignatureFontClass(data.signatureFont)} text-3xl sm:text-4xl inline-block select-none`}
              style={{ color: data.signatureColor || '#2b4291', lineHeight: 1.1 }}
            >
              {data.signatoryName || (isArabic ? 'عبدالمجيد الولي' : 'Abdulmajeed Alwli')}
            </span>
          )}

          {data.signatureType === 'image' && data.signatureDataUrl && (
            <img
              src={data.signatureDataUrl}
              alt="Signature"
              className="max-h-12 object-contain"
            />
          )}

          {data.signatureType === 'drawing' && data.signatureDataUrl && (
            <img
              src={data.signatureDataUrl}
              alt="Handdrawn Signature"
              className="max-h-12 object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};
