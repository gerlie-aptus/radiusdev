import {Component, OnInit} from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import {ActivatedRoute, Router, NavigationStart} from "@angular/router";

@Component({
  selector: 'left-sidebar-1',
  templateUrl: '../elements/left-sidebar-1.html',
  providers: []
})

export class LeftSidebar1Component implements OnInit{
  navigation: Array<Object>;
  service_id: string;

  constructor(private navigationService: NavigationService, private route: ActivatedRoute, private router: Router) {
      router.events.subscribe((val) => {
          if (val instanceof NavigationStart) {
              const copy = Object.assign({}, val);
              const data = copy.url
                  .split('/')
                  .filter(url => url.length > 0);
              if (data.length == 3) {
                  this.service_id = data[2];
                  this.navigation = navigationService.getNavigation();
              }
          }
      });
  }

  ngOnInit(){
  }
}
