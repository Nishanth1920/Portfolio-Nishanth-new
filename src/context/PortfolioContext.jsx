import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import {
  personalInfo as staticPersonalInfo,
  skills as staticSkills,
  experiences as staticExperiences,
  projects as staticProjects,
} from '../data/portfolioData';

const defaultColors = {
  dark_accent_primary: '#6366f1',
  dark_accent_secondary: '#06b6d4',
  dark_accent_tertiary: '#8b5cf6',
  light_accent_primary: '#4f46e5',
  light_accent_secondary: '#0891b2',
  light_accent_tertiary: '#7c3aed',
};

const defaultTexts = {
  'navbar.links': [{"label":"Home","href":"#hero"},{"label":"About","href":"#about"},{"label":"Skills","href":"#skills"},{"label":"Work","href":"#experience"},{"label":"Projects","href":"#projects"},{"label":"Contact","href":"#contact"}],
  'hero.marquee_items': ["API Integration","System Design","Product Building","Workflow Automation","Scalable Architecture","Payment Integrations","Database Optimization","SaaS Development","Performance Engineering"],
  'hero.stats': [{"label":"Yrs Exp","value":"4+"},{"label":"Projects","value":"15+"},{"label":"Clients","value":"20+"}],
  'hero.view_work_btn': 'View My Work',
  'hero.get_in_touch_btn': 'Get in Touch',
  'about.label': 'About Me',
  'about.title': 'Turning complex problems into elegant scalable solutions',
  'about.highlights': [{"title":"Clean Architecture","desc":"Writing maintainable, scalable code that stands up to production demands."},{"title":"Performance First","desc":"Optimized for speed with sub-100ms response times and best-in-class Lighthouse scores."},{"title":"End to End Delivery","desc":"From concept to deployment — owning the full lifecycle of every project."}],
  'about.resume_btn': 'Download Resume',
  'about.linkedin_btn': 'LinkedIn',
  'about.side_text': 'Transforming ideas into scalable software solutions.',
  'skills.label': 'Expertise',
  'skills.title': 'Technical proficiency',
  'experience.label': 'Experience',
  'experience.title': "Where I've worked",
  'experience.subtitle': 'A track record of delivering impact across diverse teams and technologies.',
  'projects.label': 'Projects',
  'projects.title': 'Featured work',
  'projects.subtitle': 'Real-world projects showcasing architecture, performance, and user experience.',
  'contact.label': 'Contact',
  'contact.title': "Let's work together",
  'contact.subtitle': "Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you promptly.",
  'contact.info_heading': 'Contact Information',
  'footer.copyright': '© All rights reserved.',
};

const PortfolioContext = createContext(null);

function parseTexts(rows) {
  const map = {};
  for (const row of rows) {
    const key = `${row.section}.${row.key}`;
    map[key] = row.type === 'list' ? (() => { try { return JSON.parse(row.value); } catch { return row.value; } })() : row.value;
  }
  return map;
}

const savedColors = (() => {
  try { return JSON.parse(localStorage.getItem('portfolio-colors')); } catch { return null; }
})();

export function PortfolioProvider({ children }) {
  const [data, setData] = useState({
    personalInfo: staticPersonalInfo,
    skills: staticSkills,
    experiences: staticExperiences,
    projects: staticProjects,
    siteTexts: defaultTexts,
    colors: savedColors || defaultColors,
    personalInfoId: null,
    loading: false,
  });

  const load = useCallback(async () => {
    if (!import.meta.env.VITE_SUPABASE_URL) return;
    setData((prev) => ({ ...prev, loading: true }));

    try {
      const [infoRes, skillsRes, expRes, projRes, textsRes] = await Promise.all([
        supabase.from('personal_info').select('*').limit(1).maybeSingle(),
        supabase.from('skills').select('*').order('order'),
        supabase.from('experiences').select('*').order('order'),
        supabase.from('projects').select('*').order('order'),
        supabase.from('site_texts').select('*'),
      ]);

      if (infoRes.data) {
        const pi = infoRes.data;
        const mergedColors = textsRes.data ? { ...defaultColors, ...Object.fromEntries(Object.entries(parseTexts(textsRes.data)).filter(([k]) => k.startsWith('colors.')).map(([k, v]) => [k.replace('colors.', ''), v])) } : defaultColors;
        localStorage.setItem('portfolio-colors', JSON.stringify(mergedColors));
        setData({
          personalInfo: {
            name: pi.name,
            title: pi.title,
            avatarUrl: pi.avatar_url,
            tagline: pi.tagline,
            bio: pi.bio || [],
            location: pi.location,
            email: pi.email,
            resumeUrl: pi.resume_url,
            social: {
              github: pi.github || '',
              linkedin: pi.linkedin || '',
              twitter: pi.twitter || '',
            },
          },
          personalInfoId: pi.id,
          skills: skillsRes.data?.length ? skillsRes.data : staticSkills,
          experiences: expRes.data?.length ? expRes.data : staticExperiences,
          projects: projRes.data?.length ? projRes.data : staticProjects,
          siteTexts: textsRes.data ? { ...defaultTexts, ...parseTexts(textsRes.data) } : defaultTexts,
          colors: mergedColors,
          loading: false,
        });
      }
    } catch {
      setData((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const t = useCallback((section, key) => {
    const val = data.siteTexts[`${section}.${key}`];
    return val !== undefined ? val : '';
  }, [data.siteTexts]);

  return <PortfolioContext.Provider value={{ ...data, refresh: load, t }}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
