import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Category, NavigationItem } from '../models/models';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(public navigationService : NavigationService, public utilityService: UtilityService){ }
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', {read: ViewContainerRef, static: true})
  container!: ViewContainerRef;

  ngOnInit(): void {
    this.navigationService.getCategoryList();
  }

  openModal(name: string){
    this.container.clear();

    let componentType!: Type<any>;
    if(name == 'login'){
      componentType = LoginComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Login Information';
    } 
    if(name == 'register') {
      componentType = RegisterComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Register Information';
    }
    this.container.createComponent(componentType);
  }

}
