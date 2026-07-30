import { NavItem } from '../interfaces/nav-item.interface';
import { Instagram, Facebook, Twitter, Send, Pin } from 'lucide-angular';


export const CATEGORY_NAV: NavItem[] = [
  { label: 'Explore', href: '#' },
      { label: 'Clothing', href: '#' },
      { label: 'Stickers', href: '#' },
      { label: 'Phone Cases', href: '#' },
      { label: 'Wall Art', href: '#' },
      { label: 'Home & Living', href: '#' },
      { label: 'Kids & Babies', href: '#' },
      { label: 'Accessories', href: '#' },
      { label: 'Stationery & Office', href: '#' },
      { label: 'Gifts', href: '#' }
];


export const CATEGORY_HIGHLIGHTS = [
  {
    label: 'Dev & Code',
    imageUrl:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4'
  },
  {
    label: 'Gaming',
    imageUrl:
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575'
  },
  {
    label: 'Anime',
    imageUrl:
      'https://images.unsplash.com/photo-1578632767115-351597cf2477'
  },
];


export const PRODUCTS = [
  {
    id: 1,
    name: 'React Developer Sticker',
    price: 5,
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766',
    category: 'Developer'
  },
  {
    id: 2,
    name: 'Gaming Sticker Pack',
    price: 8,
    image:
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead',
    category: 'Gaming'
  },
  {
    id: 3,
    name: 'Cute Cat Sticker',
    price: 4,
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
    category: 'Animals'
  }
];


export const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    icon: Instagram
  },
  {
    label: 'Facebook',
    icon: Facebook
  },
  {
    label: 'Twitter',
    icon: Twitter
  },
  {
    label: 'Telegram',
    icon: Send
  },
  {
    label: 'Pinterest',
    icon: Pin
  }
];