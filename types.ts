export interface SlideData {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean; // Visual state for the export
  number: string;
}

export interface ThemeConfig {
  primaryColor: string; // The specific green
  backgroundColor: string; // Card background
  textColor: string;
  accentColor: string;
  logoUrl: string | null;
  backgroundImageUrl: string | null;
  showLogo: boolean;
  showFooter: boolean;
  footerText: string;
}

export type TabView = 'content' | 'design' | 'css';
