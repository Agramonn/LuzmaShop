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
      banerimage: 'baner/banner_skincare.webp',
      category: {
        id:1,
        category: 'beauty',
        subCategory: 'skincare',}
    },
    { 
      banerimage: 'baner/banner_makeup.webp',
      category: {
        id:2,
        category: 'beauty',
        subCategory: 'makeup',}
    },
    { 
      banerimage: 'baner/banner_perfum.webp',
      category: {
        id:3,
        category: 'beauty',
        subCategory: 'perfume',}
    },
    { 
      banerimage: 'baner/banner_bag.webp',
      category: {
        id:4,
        category: 'clothes',
        subCategory: 'bags',}
    },
  ];

  constructor() {}
  ngOnInit(): void {
    function random() {
      return Math.random() - 0.5;
    }
    this.suggestedProducts.sort(() => random());
  }

}
