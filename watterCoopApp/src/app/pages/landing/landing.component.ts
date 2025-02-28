import { Component } from '@angular/core';
import { HeroSectionComponent } from "./components/pages/landing/components/hero-section/hero-section.component";
import { AboutSectionComponent } from "./components/pages/landing/components/about-section/about-section.component";
import { ServicesSectionComponent } from "./components/pages/landing/components/services-section/services-section.component";
import { NewsSectionComponent } from "./components/pages/landing/components/news-section/news-section.component";
import { FaqSectionComponent } from "./components/pages/landing/components/faq-section/faq-section.component";
import { ContactSectionComponent } from "./components/pages/landing/components/contact-section/contact-section.component";

@Component({
  selector: 'app-landing',
  imports: [HeroSectionComponent, AboutSectionComponent, ServicesSectionComponent, NewsSectionComponent, FaqSectionComponent, ContactSectionComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
