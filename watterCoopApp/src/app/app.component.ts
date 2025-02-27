import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from './shared/footer/footer.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
  providers: [MessageService]
})
export class AppComponent {
  title = 'watterCoopApp';

  constructor(private messageService: MessageService) {}

  show() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
  }
}
