import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PublicService } from './Service/public.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'belita';
  currentLanguage: any;

  supportedLanguages = [
    { code: 'en', name: 'English' },
    { code: 'ku', name: 'کوردی' },
    { code: 'ar', name: 'العربیة' },
  ];

  public isEnglish = false;
  // public showSidebar = false;
  public showPackage = false;
  public showLogin = true;

  constructor(
    private translate: TranslateService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    public service: PublicService
  ) {
    const languageCodes = this.supportedLanguages.map((lang) => lang.code);
    translate.addLangs(languageCodes);
    this.currentLanguage =
      localStorage.getItem('selectedLanguage') ||
      translate.getBrowserLang() ||
      'en';
    // Ensure that the detected browser language is one of the supported languages
    if (!languageCodes.includes(this.currentLanguage)) {
      this.currentLanguage = 'en';
    }
    // this.router.events
    //   .pipe(
    //     filter(
    //       (event): event is NavigationEnd => event instanceof NavigationEnd
    //     )
    //   )
    //   .subscribe((event: NavigationEnd) => {
    //     this.updateNavVisibility(event.url);
    //   });

    translate.use(this.currentLanguage);
    this.setPageDirection();
  }

  ngOnInit(): void {
   
  }
  selectLanguage(langCode: string) {
    this.currentLanguage = langCode;
    this.translate.use(langCode);
    localStorage.setItem('selectedLanguage', langCode); // save selected language to local storage

    this.setPageDirection();
  }

  setPageDirection() {
    if (this.currentLanguage === 'en') {
      this.renderer.setAttribute(this.document.body, 'dir', 'ltr');
    } else {
      this.renderer.setAttribute(this.document.body, 'dir', 'rtl');
    }
  }
}
