import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  closeMenu() {
    if (screen.width < 576 || window.innerWidth < 576) {
      document.getElementById("navbar-toggler")?.click()
      return
    }
    return
  }

}
