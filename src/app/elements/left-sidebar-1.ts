import { Component } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'left-sidebar-1',
  templateUrl: '../elements/left-sidebar-1.html',
  providers: [NavigationService]
})

export class LeftSidebar1Component {

  navigation: Array<Object>;

  constructor(private navigationService: NavigationService) {
    this.navigation = navigationService.getNavigation();
    console.log(this.navigation);
  }

}
