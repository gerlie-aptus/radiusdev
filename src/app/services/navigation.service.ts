import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

  navigation: Array<Object> = [
    {
      "title": "Menu",
      "items": [
        {
          "url": "/accounts/list",
          "icon": "sli-chart",
          "title": "List Accounts",
          "items": [],
          "id": "list-accounts"
        },
        {
          "url": "/service/management",
          "icon": "sli-chart",
          "title": "Service Management",
          "items": [],
          "id": "service-management"
        }/*,
        {
          "url": "#",
          "icon": "sli-info",
          "title": "Reports",
          "items": [
            {
              "url": "reports/usage",
              "icon": "",
              "title": "Usage Report",
              "items": [],
              "id": "usage-report"
            }
          ],
          "id": "reports"
        },
        {
          "url": "#",
          "icon": "sli-info",
          "title": "Logs",
          "items": [
            {
              "url": "logs/auth",
              "icon": "",
              "title": "Auth Logs",
              "items": [],
              "id": "auth-logs"
            },
            {
              "url": "logs/service-history",
              "icon": "",
              "title": "Service History",
              "items": [],
              "id": "service-history"
            }
          ],
          "id": "logs"
        }*/
      ],
      "id": "menu"
    }
  ];

  getNavigation(): Array<Object> {
    return this.navigation;
  }

}
