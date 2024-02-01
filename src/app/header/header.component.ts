import { Component, OnInit } from '@angular/core';
import { NavigationItem } from '../models/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  navigationList: NavigationItem[] = [
    {
      category: "clothes",
      subcategories: ["bags","boots"]
    },
    {
      category: "beauty",
      subcategories: ["makeup","skincare"]
    }
  ];

  constructor(){ }
  ngOnInit(): void {
  }

}
