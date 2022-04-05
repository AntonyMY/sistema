import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { CalendarModule, Calendar } from 'primeng/calendar'
import { TableModule } from 'primeng/table'
import { DropdownModule } from 'primeng/dropdown'
import { ToolbarModule } from 'primeng/toolbar'
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { SpeedDialModule } from 'primeng/speeddial';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { KeyFilterModule } from 'primeng/keyfilter'
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [],  
  exports:[
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CalendarModule,
    TableModule,
    DropdownModule,
    ToolbarModule,
    SidebarModule,
    PanelMenuModule,
    PanelModule,
    SpeedDialModule,
    TooltipModule,
    DialogModule,
    KeyFilterModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ConfirmDialogModule,
    
  ],
  providers:[
    ConfirmationService
  ]
})
export class PrimeNGModule { 
  constructor(){
    Calendar.prototype.getDateFormat = () => 'dd/mm/yy';    
  }

}
