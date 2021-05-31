import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isOpenedMobileMenu = false;
  isMobile = false;

  constructor() { }

  ngOnInit(): void {
    this.updateMobileStatus();
  }

  updateMobileStatus(): void {
    this.isMobile = window.outerWidth < 992;
  }

  toggleMobileMenu(): void {
    this.isOpenedMobileMenu = !this.isOpenedMobileMenu;
  }

  @HostListener('window:resize') windowResize(): void {
    this.updateMobileStatus();
  }
}
