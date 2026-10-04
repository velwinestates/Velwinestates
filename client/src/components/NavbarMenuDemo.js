import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuHeader } from './DropdownMenu';
import { Banknote, Building2, ChevronDown, Globe, Hammer, Home, Images, Info, Map, Menu, ShoppingCart, Tractor, Users, Wrench } from 'lucide-react';

export const languages = [
  ['en', 'English'], ['af', 'Afrikaans'], ['sq', 'Albanian'], ['am', 'Amharic'], ['ar', 'Arabic'],
  ['hy', 'Armenian'], ['az', 'Azerbaijani'], ['eu', 'Basque'], ['be', 'Belarusian'], ['bn', 'Bengali'],
  ['bs', 'Bosnian'], ['bg', 'Bulgarian'], ['ca', 'Catalan'], ['ceb', 'Cebuano'], ['zh-CN', 'Chinese (Simplified)'],
  ['zh-TW', 'Chinese (Traditional)'], ['co', 'Corsican'], ['hr', 'Croatian'], ['cs', 'Czech'], ['da', 'Danish'],
  ['nl', 'Dutch'], ['eo', 'Esperanto'], ['et', 'Estonian'], ['fi', 'Finnish'], ['fr', 'French'], ['fy', 'Frisian'],
  ['gl', 'Galician'], ['ka', 'Georgian'], ['de', 'German'], ['el', 'Greek'], ['gu', 'Gujarati'], ['ht', 'Haitian Creole'],
  ['ha', 'Hausa'], ['haw', 'Hawaiian'], ['he', 'Hebrew'], ['hi', 'Hindi'], ['hmn', 'Hmong'], ['hu', 'Hungarian'],
  ['is', 'Icelandic'], ['ig', 'Igbo'], ['id', 'Indonesian'], ['ga', 'Irish'], ['it', 'Italian'], ['ja', 'Japanese'],
  ['jv', 'Javanese'], ['kn', 'Kannada'], ['kk', 'Kazakh'], ['km', 'Khmer'], ['rw', 'Kinyarwanda'], ['ko', 'Korean'],
  ['ku', 'Kurdish'], ['ky', 'Kyrgyz'], ['lo', 'Lao'], ['la', 'Latin'], ['lv', 'Latvian'], ['lt', 'Lithuanian'],
  ['lb', 'Luxembourgish'], ['mk', 'Macedonian'], ['mg', 'Malagasy'], ['ms', 'Malay'], ['ml', 'Malayalam'], ['mt', 'Maltese'],
  ['mi', 'Maori'], ['mr', 'Marathi'], ['mn', 'Mongolian'], ['my', 'Myanmar'], ['ne', 'Nepali'], ['no', 'Norwegian'],
  ['ny', 'Nyanja'], ['or', 'Odia'], ['ps', 'Pashto'], ['fa', 'Persian'], ['pl', 'Polish'], ['pt', 'Portuguese'],
  ['pa', 'Punjabi'], ['ro', 'Romanian'], ['ru', 'Russian'], ['sm', 'Samoan'], ['gd', 'Scots Gaelic'], ['sr', 'Serbian'],
  ['st', 'Sesotho'], ['sn', 'Shona'], ['sd', 'Sindhi'], ['si', 'Sinhala'], ['sk', 'Slovak'], ['sl', 'Slovenian'],
  ['so', 'Somali'], ['es', 'Spanish'], ['su', 'Sundanese'], ['sw', 'Swahili'], ['sv', 'Swedish'], ['tl', 'Tagalog'],
  ['tg', 'Tajik'], ['ta', 'Tamil'], ['tt', 'Tatar'], ['te', 'Telugu'], ['th', 'Thai'], ['tr', 'Turkish'],
  ['tk', 'Turkmen'], ['uk', 'Ukrainian'], ['ur', 'Urdu'], ['ug', 'Uyghur'], ['uz', 'Uzbek'], ['vi', 'Vietnamese'],
  ['cy', 'Welsh'], ['xh', 'Xhosa'], ['yi', 'Yiddish'], ['yo', 'Yoruba'], ['zu', 'Zulu']
];

export function getNativeLanguageName(code, fallback) {
  try {
    return new Intl.DisplayNames([code], { type: 'language' }).of(code) || fallback;
  } catch {
    return fallback;
  }
}

function getSelectedLanguage() {
  const match = document.cookie.match(/(?:^|; )googtrans=\/en\/([^;]+)/);
  return match ? decodeURIComponent(match[1]) : 'en';
}

function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(getSelectedLanguage);

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    document.cookie = `googtrans=/en/${language}; path=/`;
    setSelectedLanguage(language);
    window.location.reload();
  };

  return (
    <select
      id="google_translate_language"
      className="language-select"
      value={selectedLanguage}
      onChange={handleLanguageChange}
      aria-label="Select website language"
    >
      {languages.map(([code, name]) => (
        <option key={code} value={code}>
          {getNativeLanguageName(code, name)}
        </option>
      ))}
    </select>
  );
}

const NavbarMenuDemo = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu
      trigger={
        <span className="navbar-menu-trigger-content">
          <Menu size={17} aria-hidden="true" />
          <span>Explore</span>
          <ChevronDown size={15} aria-hidden="true" />
        </span>
      }
      align="right"
    >
      <div className="dropdown-translation">
        <label className="dropdown-translation-label" htmlFor="google_translate_language">
          <Globe size={16} /> Translate website
        </label>
        <LanguageSelector />
      </div>

      <DropdownMenuSeparator />

      <DropdownMenuHeader>Company</DropdownMenuHeader>

      <DropdownMenuItem onClick={() => navigate('/')}>
        <><Home size={16} /> Home</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/about')}>
        <><Info size={16} /> About</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/companies')}>
        <><Building2 size={16} /> Our Companies</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/our-services')}>
        <><Wrench size={16} /> Our Services</>
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      <DropdownMenuHeader>Farm Services</DropdownMenuHeader>
      
      <DropdownMenuItem onClick={() => navigate('/manage-farm')}>
        <><Tractor size={16} /> Manage Farm</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/buy-inputs')}>
        <><ShoppingCart size={16} /> Buy Inputs</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/sell-produce')}>
        <><Banknote size={16} /> Sell Produce</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/land')}>
        <><Map size={16} /> Land</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/construction')}>
        <><Hammer size={16} /> Construction</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/projects')}>
        <><Images size={16} /> Past Work</>
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      <DropdownMenuHeader>More</DropdownMenuHeader>

      <DropdownMenuItem onClick={() => navigate('/join')}>
        <><Users size={16} /> Join Us</>
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => navigate('/developer-info')}>
        <><Info size={16} /> Developer Information</>
      </DropdownMenuItem>

    </DropdownMenu>
  );
};

export default NavbarMenuDemo;
