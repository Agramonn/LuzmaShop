import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { NavigationService } from '../services/navigation.service';
import { Payment, UserCart } from '../models/models';
import { empty } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  usersCart: UserCart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: '',
  };

  usersPaymentInfo: Payment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: '',
    },
    totalAmount: 0,
    shipingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };

  usersPreviousCarts: UserCart[] = [];
  constructor(
    public utilityService: UtilityService,
    private navigationService: NavigationService
  ){}

  ngOnInit(): void {
    // Get Active Cart
    this.navigationService.getActiveCartOfUser(this.utilityService.getUser().id).subscribe(
      (activeCartResponse: any) => {
        this.usersCart = activeCartResponse;
  
        // Calculate Payment
        this.utilityService.calculatePayment(this.usersCart, this.usersPaymentInfo);
  
        // Once the active cart is fetched, get the previous carts
        this.getPreviousCarts();
      },
      (activeCartError) => {
        console.error('Error fetching active cart:', activeCartError);
        // Handle the error as needed, e.g., display an error message to the user
      }
    );
  }
  
  getPreviousCarts(): void {
    // Get Previous Carts
    this.navigationService.getAllPreviousCarts(this.utilityService.getUser().id).subscribe(
      (previousCartsResponse: any) => {
        if (previousCartsResponse.cartItem == null) {
          // If cartItem is null or undefined, initialize usersPreviousCarts as an empty array
          this.usersPreviousCarts = [];
        } else if (Array.isArray(previousCartsResponse.cartItem)) {
          // If cartItem is an array, assign it directly
          this.usersPreviousCarts = previousCartsResponse.cartItem;
        } else {
          // If cartItem is not an array, create an array with a single item
          this.usersPreviousCarts = [previousCartsResponse.cartItem];
        }
      },
      (previousCartsError) => {
        console.error('Error fetching previous carts:', previousCartsError);
        // Handle the error as needed, e.g., display an error message to the user
      }
    );
}
  
  
}
