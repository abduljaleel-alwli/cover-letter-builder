import { CoverLetterData } from '../types';

export const defaultCoverLetterEN: CoverLetterData = {
  language: 'en',
  firstName: "Abdulmajeed",
  lastName: "Alwli",
  city: "Sanaa",
  state: "YE",
  phone: "+967739553846",
  email: "abdealmajid.47@gmail.com",
  date: "July 28, 2026",
  companyName: "CompanyName",
  targetCompanyInBody: "SACompany",
  subject: "RE: Medical Equipment Technician",
  greeting: "Dear Hiring Manager,",
  opening: "I am writing to express my interest in the Medical Equipment Technician position at SACompany, as advertised. With a Bachelor of Science degree in Biomedical Engineering and hands-on experience as a Biomedical Engineering Intern, I am well-prepared to contribute effectively to your team.",
  bodyParagraphs: [
    "During my internship, I developed strong skills in detecting equipment malfunctions and inspecting mechanical devices. My practical experience has equipped me with the ability to perform preventive maintenance while adhering strictly to safety and quality standards within healthcare environments. My background allows me to bridge theoretical knowledge with real-world applications, ensuring that medical devices are maintained at optimal performance levels.",
    "I possess robust problem-solving abilities and critical thinking skills that enable me to troubleshoot issues efficiently. Additionally, my time-management capabilities ensure that I can balance multiple tasks while maintaining attention to detail—an essential aspect of working in fast-paced healthcare settings.",
    "As an analyzer by nature, I approach challenges methodically and strive for precision in every task I undertake. This analytical mindset aligns well with the responsibilities outlined for the Medical Equipment Technician role at SACompany."
  ],
  callToAction: "I am eager for the opportunity to further discuss how my education and experiences align with your needs. Thank you for considering my application; I look forward to the possibility of contributing positively to your esteemed organization.",
  closing: "Sincerely,",
  signatoryName: "Abdulmajeed Alwli",
  signatureType: "font",
  signatureFont: "vibes",
  signatureColor: "#2b4291",
  fontSizePx: 14.5
};

export const defaultCoverLetterAR: CoverLetterData = {
  language: 'ar',
  firstName: "عبدالمجيد",
  lastName: "الولي",
  city: "صنعاء",
  state: "اليمن",
  phone: "+967739553846",
  email: "abdealmajid.47@gmail.com",
  date: "٢٨ يوليو ٢٠٢٦",
  companyName: "اسم الشركة الموقرة",
  targetCompanyInBody: "مؤسستكم الموقرة",
  subject: "الموضوع: التقدم لوظيفة فني / مهندس معدات طبية",
  greeting: "السادة / إدارة التوظيف والموارد البشرية المحترمين،",
  opening: "يسرني التقدّم بطلبي هذا للانضمام إلى فريق عملكم المتميز في وظيفة (فني أجهزة طبية). بصفتي حاصلًا على بكالوريوس الهندسة الطبية الحيوية مع خلفية تدريبية ميدانية متخصصة، يسعدني أن أضع خبراتي وشغفي التقني في خدمة تطلعات مؤسستكم.",
  bodyParagraphs: [
    "خوضي تجربة التدريب الميداني أتاح لي التعامل المباشر مع تشخيص وإصلاح الأعطال في الأجهزة الطبية والمعدات الميكانيكية الدقيقة، إلى جانب تطبيق برامج الصيانة الوقائية وفق أعلى معايير السلامة والجودة المعتمدة في المنشآت الصحية. يُتيح لي هذا المزيج بين التأهيل الأكاديمي والمهارات الميدانية ضمان كفاءة تشغيل الأجهزة واستمراريتها بأعلى أداء.",
    "كما أتمتع بحسّ تحليلي عالٍ وقدرة على تشخيص الأعطال المعقدة ومعالجتها بالسرعة والدقة المطلوبة، مع الالتزام التام بإدارة الوقت والتعامل المتقن مع المهمات المتعددة في بيئات العمل الصحية ذات الرتم السريع.",
    "أعتمد دائماً على المنهجية المنظمة والتركيز العالي عند التعامل مع التحديات التقنية، حيث يُعد الاهتمام بالتفاصيل حجر الزاوية في أسلوب عملي لضمان سلامة الأجهزة وخدمة الكادر الطبي بكفاءة. وتتوافق هذه المنهجية تماماً مع متطلبات الوظيفة وأهداف فريق الصيانة لديكم."
  ],
  callToAction: "أتطلع بشغف لإتاحة الفرصة لمقابلة شخصية لمناقشة مؤهلاتي وكيف يمكن لخبراتي أن تشكّل إضافة قيمة لفريقكم. شاكراً لكم حسن وقتكم واهتمامكم بمراجعة طلبي.",
  closing: "وتفضلوا بقبول خالص الشكر والتقدير،",
  signatoryName: "عبدالمجيد الولي",
  signatureType: "font",
  signatureFont: "katibeh",
  signatureColor: "#2b4291",
  fontSizePx: 14.5
};

export const defaultCoverLetter = defaultCoverLetterEN;
