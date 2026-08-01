import { LucideIconData } from "lucide-angular";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  heading: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  icon: LucideIconData;
}
