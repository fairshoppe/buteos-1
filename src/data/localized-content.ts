import { LocationType } from '@/utils/location';

export interface LocalizedContent {
  location: string;
  locationAdjective: string;
  businessFocus: string;
  marketDescription: string;
  ctaText: string;
  seoKeywords: string[];
}

export const localizedContent: Record<LocationType, LocalizedContent> = {
  houston: {
    location: 'Houston',
    locationAdjective: 'Houston-based',
    businessFocus: 'Houston hospitality and retail businesses',
    marketDescription: 'Houston market',
    ctaText: 'Get Your Free Houston Digital Marketing Consultation',
    seoKeywords: ['Houston digital marketing', 'Houston SEO', 'Houston social media', 'Houston AI solutions']
  },
  texas: {
    location: 'Texas',
    locationAdjective: 'Texas-based',
    businessFocus: 'Texas hospitality and retail businesses',
    marketDescription: 'Texas market',
    ctaText: 'Get Your Free Texas Digital Marketing Consultation',
    seoKeywords: ['Texas digital marketing', 'Texas SEO', 'Texas social media', 'Texas AI solutions']
  },
  general: {
    location: '',
    locationAdjective: '',
    businessFocus: 'hospitality and retail businesses',
    marketDescription: 'local market',
    ctaText: 'Get Your Free Digital Marketing Consultation',
    seoKeywords: ['digital marketing', 'SEO services', 'social media management', 'AI solutions']
  }
};