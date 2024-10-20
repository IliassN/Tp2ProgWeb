import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TpSpotification';

  language: string = "fr";
  constructor(public translate: TranslateService) {
    translate.setDefaultLang(this.language);
  }

  ngOnInit() { }

  changeLanguage(event: any) {
    const selectedLanguage = event.target.value;
    this.translate.use(selectedLanguage);
  }
}
