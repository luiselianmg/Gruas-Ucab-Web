import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { navItems } from './sidebar/sidebar-data';
import { NavService } from '../../services/nav.service';
import { AppNavItemComponent } from './sidebar/nav-item/nav-item.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { HeaderComponent } from './header/header.component';
import { AuthService } from 'src/app/services/auth.service';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';


@Component({
  selector: 'app-full',
  standalone: true,
  imports: [
    RouterModule,
    AppNavItemComponent,
    MaterialModule,
    CommonModule,
    SidebarComponent,
    NgScrollbarModule,
    TablerIconsModule,
    HeaderComponent,
  ],
  templateUrl: './full.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})

export class FullComponent implements OnInit {

  navItems = navItems;
  filteredNavItems: any[] = [];

  @ViewChild('leftsidenav')
  public sidenav: MatSidenav | any;

  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  private htmlElement!: HTMLHtmlElement;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private navService: NavService,
    private authService: AuthService
  ) {
    
    this.htmlElement = document.querySelector('html')!;
    this.htmlElement.classList.add('light-theme');
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW])
      .subscribe((state) => {

        this.isMobileScreen = state.breakpoints[MOBILE_VIEW];

        this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
      });
  }

  ngOnInit(): void {
    const userRole = this.authService.getRole();
    if (userRole) {
      this.filteredNavItems = this.navItems.filter((item) =>
        item.roles?.includes(userRole)
      );
    } else {
      this.filteredNavItems = [];
    }
  }
  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
  }
}
