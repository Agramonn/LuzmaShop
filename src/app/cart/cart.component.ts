import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { NavigationService } from '../services/navigation.service';
import { Payment, UserCart } from '../models/models';

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

  ngOnInit(): void{
    //Get Cart
    this.navigationService.getActiveCartOfUser(this.utilityService.getUser().id).subscribe((res:any) => {
      this.usersCart = res;

      // Calculate Payment
      this.utilityService.calculatePayment(
        this.usersCart,
        this.usersPaymentInfo);

    });
    //Get Previous Cart
    this.navigationService.getAllPreviousCarts(this.utilityService.getUser().id).subscribe((res:any) => {
      this.usersPreviousCarts = res;
      console.log(res);
    });
  }
}
