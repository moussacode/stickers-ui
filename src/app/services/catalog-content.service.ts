import { Injectable } from '@angular/core';
import { NavItem } from '../interfaces/nav-item.interface';
import { TrustSignal } from '../interfaces/trust-signal.interface';
import { FooterLinkGroup, SocialLink } from '../interfaces/footer-link-group.interface';
import { RotateCcw, Code2,
  Gamepad2,
  Sparkles,
  Smartphone,
  Sticker,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Pin,
  Shirt, } from 'lucide-angular';
import { CATEGORY_NAV } from '../mocks/catalog.mock';


@Injectable({ providedIn: 'root' })
export class CatalogContentService {

  
  getCategoryNav(): NavItem[] {
    return CATEGORY_NAV;
  }
  getCategoryHighlights() {
  return [
    {
      label: 'Dev & Code',
      imageUrl: 'images/categories/dev-code.png'
    },
    {
      label: 'Gaming',
      imageUrl: 'images/categories/gaming.png'
    },
    {
      label: 'Anime',
      imageUrl: 'images/categories/anime.png'
    },
    {
      label: 'Motivation',
      imageUrl: 'images/categories/motivation.png'
    },
    {
      label: 'Animaux mignons',
      imageUrl: 'images/categories/animaux.png'
    },
    {
      label: 'Humour',
      imageUrl: 'images/categories/humour.png'
    },
  ];
}

  getRelatedTopics(): string[] {
    return [
      'reactjs',
      'nodejs',
      'node',
      'react js',
      'vue',
      'redux',
      'angularjs',
      'react native',
      'node js',
    ];
  }

  getKeywordPills(): string[] {
    return [
      'Javascript',
      'Programming',
      'Developer',
      'Js',
      'Reactjs',
      'Html',
      'Css',
      'Coding',
      'Funny',
      'Code',
      'Coder',
      'React Js',
    ];
  }

  getPromoBannerLines(): string[] {
    return ['Buy any 4 and get 25% off.', 'Buy any 10 and get 40% off.'];
  }

  getTrustSignals(): TrustSignal[] {
    return [
      {
        id: 'shipping',
         icon: RotateCcw,
        title: 'Worldwide Shipping',
        description: ['Available as standard or express', 'delivery'],
        linkLabel: 'Learn more',
      },
      {
        id: 'payments',
         icon: RotateCcw,
        title: 'Secure Payments',
        description: ['100% Secure Payment with 256-bit', 'SSL encryption'],
        linkLabel: 'Learn more',
      },
      {
        id: 'returns',
        icon: RotateCcw,
        title: 'Free Return',
        description: ['Exchange or money back guarantee', 'for all orders'],
        linkLabel: 'Learn more',
      },
      {
        id: 'support',
         icon: RotateCcw,
        title: 'Local Support',
        description: ['24/7 Dedicated support'],
        linkLabel: 'Learn more',
      },
    ];
  }

  getFooterLinkGroups(): FooterLinkGroup[] {
    return [
      {
        heading: 'Shop',
        links: [
          { label: 'Gift Guides' },
          { label: 'Fan Art' },
          { label: 'New Works' },
          
          { label: 'Bulk orders' },
        ],
      },
      {
        heading: 'About',
        links: [
          { label: 'About Us' },
          { label: 'Investor Center' },
          { label: 'Partner Program' },
         
        ],
      },
      {
        heading: 'Help',
        links: [
          { label: 'Delivery' },
          
          { label: 'Copyright' },
          { label: 'Contact Us' },
        ],
      },
    ];
  }

  getSocialLinks(): SocialLink[] {
    return [
      { label: 'Instagram', icon: Instagram },
      { label: 'Facebook', icon: Facebook },
      { label: 'Twitter', icon: Twitter },
      { label: 'Telegram', icon: Send },      // Tumblr n'existe pas dans Lucide
      { label: 'Pinterest', icon: Pin }, 
    ];
  }
}
