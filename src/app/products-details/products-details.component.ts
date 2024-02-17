import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Product, Review } from '../models/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit{
  imageIndex:number = 1;
  product!: Product;
  reviewControl = new FormControl('');
  showError = false;
  reviewSaved = false;
  otherReviews: Review[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ){}

  ngOnInit(): void { 
    this.activatedRoute.queryParams.subscribe((params : any) => {
      let id = params.id;
      this.navigationService.getProduct(id).subscribe((res:any) => {
        this.product = res;
        this.fetchAllReviews();
      });
    });
  }

  submitReview(){
    let review = this.reviewControl.value;

    if(review == '' || review == null){
      this.showError = true;
      return;
    }

    let userId = this.utilityService.getUser().id;
    let productId = this.product.id;

    this.navigationService.submitReview(userId, productId, review)
    .subscribe((res: any) => {
      this.reviewSaved = true;
      this.fetchAllReviews();
      this.reviewControl.setValue("");
    });
  }

  fetchAllReviews(){
    this.otherReviews = [];
    this.navigationService.getAllReviewsOfProducts(this.product.id).subscribe((res:any) => {
      for(let review of res){
        this.otherReviews.push(review);
      }
    });
  }
}
