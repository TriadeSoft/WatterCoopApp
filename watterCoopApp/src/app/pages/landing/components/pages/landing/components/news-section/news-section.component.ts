import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Carousel } from 'primeng/carousel';
import { WaterTip } from '../../../../../../../core/models/product.model';
import { TipsService } from '../../../../../../../core/services/tips.service';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-news-section',
  imports: [Carousel, ButtonModule, CardModule,Tag],
  templateUrl: './news-section.component.html',
  styleUrl: './news-section.component.scss'
})
export class NewsSectionComponent implements OnInit {
  tips: WaterTip[] = [];
  responsiveOptions: any[] = [];

  constructor(private tipsService: TipsService) {}

  ngOnInit() {
    this.tipsService.getTips().then((tips) => {
      this.tips = tips;
    });

    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '1199px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  }

}

