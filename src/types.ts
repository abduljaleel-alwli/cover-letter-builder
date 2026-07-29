export interface CoverLetterData {
  language: 'en' | 'ar';
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  date: string;
  companyName: string;
  targetCompanyInBody: string;
  subject: string;
  greeting: string;
  opening: string;
  bodyParagraphs: string[];
  callToAction: string;
  closing: string;
  signatoryName: string;
  signatureType: 'font' | 'drawing' | 'image';
  signatureFont: 'vibes' | 'dancing' | 'sacramento' | 'ruqaa' | 'katibeh' | 'gulzar' | 'reem_ink' | 'lateef' | 'marhey' | 'amiri_italic';
  signatureColor: string;
  signatureDataUrl?: string;
  fontSizePx: number;
}
