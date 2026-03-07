import { SlideData, ThemeConfig } from './types';

export const INITIAL_SLIDES: SlideData[] = [
  {
    id: '1',
    number: '01',
    question: 'ما هي الركائز الاستراتيجية للتحول الرقمي؟',
    answer: 'تتمحور الركائز حول تحسين تجربة العميل، تمكين الموظفين بالبيانات، وابتكار نماذج أعمال رقمية جديدة تعتمد على الذكاء الاصطناعي.',
    isOpen: true,
  },
  {
    id: '2',
    number: '02',
    question: 'كيف يؤثر تحليل البيانات على النمو الاقتصادي؟',
    answer: 'يساعد تحليل البيانات في الكشف عن الفرص الاستثمارية المخفية، تقليل المخاطر التشغيلية، وزيادة كفاءة اتخاذ القرار بنسبة تصل إلى 40%.',
    isOpen: false,
  },
  {
    id: '3',
    number: '03',
    question: 'ما هي أهمية الاستثمار في الشركات الناشئة؟',
    answer: 'الشركات الناشئة هي محرك الابتكار. الاستثمار المبكر يتيح عوائد مضاعفة ويساهم في خلق وظائف جديدة ودعم الاقتصاد المحلي.',
    isOpen: false,
  },
];

export const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#10b981', // Emerald 500
  backgroundColor: '#0f172a', // Slate 900
  textColor: '#ffffff',
  accentColor: '#34d399', // Emerald 400
  logoUrl: null,
  backgroundImageUrl: null,
  showLogo: true,
  showFooter: true,
  footerText: 'رادار المستثمر © 2025',
};

export const DEFAULT_CSS = `/* يمكنك كتابة CSS مخصص هنا */
.card-container {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
`;
