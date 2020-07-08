import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navigationpage',
  templateUrl: './navigationpage.component.html',
  styleUrls: ['./navigationpage.component.css']
})
export class NavigationpageComponent implements OnInit {
  panelOpenState = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  user: any;
  @Input() isShowing: boolean=true;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUserDetail();
    // Subscribe to listen changes of login status
    this.authService.loginStatus.subscribe(
      status => {
        if (status)
          this.user = this.authService.getUserDetail();
        else
          this.user = null;
      }
    );
  }
  
  logout() {
    this.authService.logout();
    this.isShowing=false;
  }
  login(){
    debugger;
    this.isShowing=true;
  }

}




