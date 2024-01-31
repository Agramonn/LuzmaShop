import { Component, OnInit } from '@angular/core';
import { SuggestedProduct } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  suggestedProducts: SuggestedProduct[] = [
   { 
      banerimage: 'baner/banner_skincare.png',
      category: {
        id:1,
        category: 'Beauty',
        subcategory: 'skincare',}
    },
    { 
      banerimage: 'baner/banner_makeup.png',
      category: {
        id:2,
        category: 'beauty',
        subcategory: 'makeup',}
    },
    { 
      banerimage: 'baner/banner_perfum.png',
      category: {
        id:3,
        category: 'Beauty',
        subcategory: 'perfume',}
    },
    { 
      banerimage: 'baner/banner_bag.png',
      category: {
        id:4,
        category: 'clothes',
        subcategory: 'bag',}
    },
  ];
  constructor() {}
  ngOnInit(): void {}

}
