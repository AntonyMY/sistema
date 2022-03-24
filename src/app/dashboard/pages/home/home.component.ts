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

  setItem(menu:IMenu):any{
    const item: {[k: string]: any} = {
      parent: menu.parent,
      cod_men: menu.cod_men,
      label: menu.nom_men,
      icon : menu.icon ? `pi pi-pw pi-${menu.icon}`: '',
      expanded:['02','02-001','02-002'].includes(menu.cod_men) ? true:false,
      visible: menu.estado==='0'?true:false,
      title:menu.title,
    }
    if (menu.hasOwnProperty('items')) item['items'] = menu.items
    return item
  }//fin-setItem()

   /**
   * Devuelve los menus en Jerarquia
   * @param {*} data
   */
   getTreeMenus(data:IMenu[]) {
    let colmenus = []
    let item_padre:IMenu|undefined = undefined

    for (let i = 0; i < data.length; i++) { //Para cada item            
      const item = this.setItem(data[i])
      const codpadre = item.parent
      //item['model'] = false
      if (!codpadre) { //mnu raiz agregar al array
        colmenus.push(item)
        continue;
      }

      //buscamos padre
      if (!(item_padre && item_padre.cod_men === codpadre)) {
        item_padre = this.buscaById(colmenus, codpadre)
      }

      if (!item_padre) {
        //console.log('*****************************Sin padre: ', item, '|' + codpadre);
        continue
      }

      if (!(item_padre.hasOwnProperty('items'))) item_padre.items = []      
      item_padre.items.push(item)      
    }//fin for elementos menu
    return colmenus
  }//fin-getTreeMenus()

  buscaById(matriz:IMenu[], id:string):any {    
    for (let i = 0; i < matriz.length; i++) {
      let ele = matriz[i]      
      if (ele.cod_men === id) {
        //console.log(true)
        return ele
      } else if (ele.hasOwnProperty('items') && ele.items.length > 0) {
        let ret = this.buscaById(ele.items, id)
        if (ret) return ret
      }
    }
  }//fin-buscaById()  

  ngOnInit() {
    this.menusService.listaMenus()
      .subscribe({next:menus => {
        const mis_menus = this.getTreeMenus(menus)
        console.log(mis_menus);
        this.items = mis_menus
      },
      error:err=>{
        this.items = []
      }
    })  
  }//fin-ngOnInit()

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
