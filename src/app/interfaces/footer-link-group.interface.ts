import { LucideIconData } from "lucide-angular";

export interface FooterLink {
  label: string;
}

export interface FooterLinkGroup {
  heading: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  icon: LucideIconData;
}
