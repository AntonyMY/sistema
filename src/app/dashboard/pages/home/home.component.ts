import { Renderer2, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IMenu } from '../../interfaces/menu.interface';
import { MenusService } from '../../service/menus.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {
  public menuActiveMobile: boolean = false;
  public menuInactiveDesktop: boolean = false;
  public overlayMenuActive: boolean = false;
  public topMenuActive: boolean = false;
  public staticMenuInactive: boolean = false;
  public topMenuLeaving: boolean = false;

  display: boolean = false
  items: MenuItem[] = [];

  menuMode = 'static'

  menuClick: boolean = false;
  topMenuButtonClick: boolean = false;
  configActive: boolean = false;
  configClick: boolean = false;

  documentClickListener!: () => void;

  constructor( private menusService:MenusService, public renderer: Renderer2) { }

  ngOnDestroy(): void {
    if (this.documentClickListener) 
      this.documentClickListener();  
  }//fin-ngOnDestroy

  procesaMenus(menus:IMenu[]){        
    const padres = menus.filter(menu => menu.parent)
    
    menus.forEach((menu, i) => {     
      const item: {[k: string]: any} = {
        label: menu.nom_men,
        icon : `pi pi-pw pi-${menu.icon}`        
      }

      if (menu.parent){
        item['items'] = []        
      }
    });    
  }

  ngOnInit() {
    this.menusService.listaMenus()
      .subscribe({next:menus => {
        this.items = menus
      },
      error:err=>{
        this.items = []
      }
    })

    /* this.items = [
      {
        label: 'Archivo',
        icon: 'pi pi-pw pi-file',
        expanded: true,
        items: [{
          label: 'Lineas',
          icon: 'pi pi-fw pi-plus',
        },
        { label: 'Proveedores', icon: 'pi pi-fw pi-external-link' },
        { separator: true },
        { label: 'Articulos', icon: 'pi pi-fw pi-times' },
        { label: 'Clientes', icon: 'pi pi-fw pi-user' },
        { label: 'Vendedores', icon: 'pi pi-fw pi-times' },
        { label: 'Bancos', icon: 'pi pi-fw pi-times' },
        { label: 'Cuentas', icon: 'pi pi-fw pi-times' },
        { label: 'Grupos de Conceptos', icon: 'pi pi-fw pi-times' },
        { label: 'Almacenes', icon: 'pi pi-fw pi-times' },
        { label: 'Tipo de Persona', icon: 'pi pi-fw pi-times' },
        ]
      },
      {
        label: 'Transacciones',
        icon: 'pi pi-fw pi-pencil',
        expanded: true,
        items: [
          {
            label: 'Articulos',
            icon: 'pi pi-fw pi-trash',
            items: [
              {
                label: 'Compras o Ingresos',
                icon: 'pi pi-fw pi-trash',
              },
              {
                label: 'Salidas o Ventas',
                icon: 'pi pi-fw pi-trash',
              },
              {
                label: 'Proformas',
                icon: 'pi pi-fw pi-trash',
              }
            ]
          },
          { label: 'Clientes', icon: 'pi pi-fw pi-refresh' },
          { label: 'Proveedores', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Help',
        icon: 'pi pi-fw pi-question',
        expanded: true,
        items: [
          {
            label: 'Contents',
            icon: 'pi pi-pi pi-bars'
          },
          {
            label: 'Search',
            icon: 'pi pi-pi pi-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'User',
                icon: 'pi pi-fw pi-file',
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        expanded: true,
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              { label: 'Save', icon: 'pi pi-fw pi-save' },
              { label: 'Update', icon: 'pi pi-fw pi-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-tags',
            items: [
              { label: 'Delete', icon: 'pi pi-fw pi-minus' }
            ]
          }
        ]
      }
    ]; */
  }

  ngAfterViewInit() {
    // hides the overlay menu and top menu if outside is clicked
    this.documentClickListener = this.renderer.listen('body', 'click', (event) => {            
      if (!this.isDesktop()) {
        console.log('isDesktop')
        
        if (!this.menuClick) {
          this.menuActiveMobile = false;
        }

        if (!this.topMenuButtonClick) {
          this.hideTopMenu();
        }
      }
      else {
        if (!this.menuClick && this.isOverlay()) {
          this.menuInactiveDesktop = true;
        }
        if (!this.menuClick) {
          this.overlayMenuActive = false;
        }
      }

      if (this.configActive && !this.configClick) {
        this.configActive = false;
      }

      this.configClick = false;
      this.menuClick = false;
      this.topMenuButtonClick = false;
    });
  }

  hideTopMenu() {
    this.topMenuLeaving = true;
    setTimeout(() => {
        this.topMenuActive = false;
        this.topMenuLeaving = false;
    }, 1);
}

  toggleMenu(event: Event) {
    console.log('toggle');
    
    this.menuClick = true;

    if (this.isDesktop()) {
      if (this.menuMode === 'overlay') {
        if (this.menuActiveMobile === true) {
          this.overlayMenuActive = true;
        }

        this.overlayMenuActive = !this.overlayMenuActive;
        this.menuActiveMobile = false;
      }
      else if (this.menuMode === 'static') {
        this.staticMenuInactive = !this.staticMenuInactive;
      }
    }
    else {
      this.menuActiveMobile = !this.menuActiveMobile;
      this.topMenuActive = false;
    }

    event.preventDefault();
  }

  isOverlay() {
    return this.menuMode === 'overlay';
  }

  isDesktop() {
    return window.innerWidth > 992;
  }

  isStatic() {
    return this.menuMode === 'static';
  }
}
