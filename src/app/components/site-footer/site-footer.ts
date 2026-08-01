import { Component, input } from '@angular/core';
import { FooterLinkGroup, SocialLink } from '../../interfaces/footer-link-group.interface';
import { SITE_NAME } from '../../config/site-config';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-site-footer',
  imports:[LucideAngularModule],
  template: `
    <footer class="border-t border-border-hairline bg-white px-10 py-10">
      <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
        @for (group of linkGroups(); track group.heading) {
          <div>
            <p class="mb-3 text-sm font-semibold text-ink">{{ group.heading }}</p>
            <ul class="space-y-2">
              @for (link of group.links; track link.label) {
                <li><a [href]="link.href" class="text-sm text-ink-soft hover:text-ink">{{ link.label }}</a></li>
              }
            </ul>
          </div>
        }

        <div>
          <p class="mb-3 text-sm font-semibold text-ink">Suivez-nous</p>
          <div class="flex gap-3">
            @for (social of socialLinks(); track social.label) {
              <a
                href="#"
                [attr.aria-label]="social.label"
                class="flex size-9 items-center justify-center rounded-full border border-border-muted text-ink-soft hover:text-brand"
              >
                <lucide-icon
  [img]="social.icon"
  class="size-4">
</lucide-icon>
              </a>
            }
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border-hairline pt-6 sm:flex-row">
        <p class="text-sm text-ink-faint">© {{ year }} {{ siteName }}. Tous droits réservés.</p>
      </div>
    </footer>
  `,
})
export class SiteFooter {
  linkGroups = input.required<FooterLinkGroup[]>();
  socialLinks = input.required<SocialLink[]>();
  protected readonly siteName = SITE_NAME;
  protected readonly year = new Date().getFullYear();
}
