import { Component, OnInit } from '@angular/core';

interface MenuItem {
  texto: string;
  path: string
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  templateMenu: MenuItem[] = [
    { texto: 'Basicos', path: '/template/basicos' },
    { texto: 'Dinámicos', path: '/template/diamicos' },
    { texto: 'Switches', path: '/template/switches' }
  ]

  reactiveMenu: MenuItem[] = [
    { texto: 'Basicos', path: '/reactive/basicos' },
    { texto: 'Dinámicos', path: '/reactive/dinamicos' },
    { texto: 'Switches', path: '/reactive/switches' }
  ]

  authMenu: MenuItem[] = [
    { texto: 'Registro', path: '/auth/registro' },
    { texto: 'Login', path: '/auth/login' },
  ]


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
