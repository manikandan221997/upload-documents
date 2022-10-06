import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeTo(type: any) {
    if (type == 'listView') {
      this.router.navigate(['/listView']);
    } else if (type == 'deciderView') {
      this.router.navigate(['/deciderView']);
    }

  }

}
