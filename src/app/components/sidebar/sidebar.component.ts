import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../../Service/public.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  logout() {
    this.service.logout();
    this.router.navigate(['/']);
  }
  constructor(private router: Router, public service: PublicService) {}
}
