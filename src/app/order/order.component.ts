import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Order, Payment, PaymentMethod, UserCart } from '../models/models';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  selectedPaymentMethodName='';
  selectedPaymentMethod= new FormControl('0');

  address= '';
  mobileNumber= '';

  displaySpinner = false;
  message = '';
  className= '';

  paymentMethods: PaymentMethod[] = [];

  usersCart: UserCart = {
    id:0,
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

  constructor(
    private navigationService: NavigationService,
    public utilityService: UtilityService,
    private router: Router
  ){}
 
  ngOnInit(): void { 
    //Get payment methods
    this.navigationService.getPaymentMethods().subscribe((res:any) => {
      this.paymentMethods = res;
    });

    this.selectedPaymentMethod.valueChanges
    .subscribe((res: any)=> {
      if(res=='0') this.selectedPaymentMethodName = '';
      else this.selectedPaymentMethodName= res.toString();
    });

    //Get Cart
    this.navigationService.getActiveCartOfUser(this.utilityService.getUser().id).subscribe((res:any) => {
      this.usersCart = res;
      this.utilityService.calculatePayment(res, this.usersPaymentInfo)
    });

    //Set address and phone number
    this.address = this.utilityService.getUser().address;
    this.mobileNumber = this.utilityService.getUser().mobile;
    
   }

   getPaymentMethod(id: string){
    let x =this.paymentMethods.find((v) => v.id == parseInt(id));
    return x?.type + ' - ' + x?.provider;
   }

   placeOrder(){
      this.displaySpinner = true;
      let isPaymentSuccessfull = this.payMoney();

      if(!isPaymentSuccessfull){
        this.displaySpinner= false;
        this.className="text-danger"
        this.message = 'Something went wrong! Payment did not happend!';
        return;
      }

      let step = 0;
      let count = timer(0, 3000).subscribe((res) => {
        ++step;
        if(step == 1){
          this.className="text-success";
          this.message = 'Processing Payment';
        }
        if(step == 2){
          this.message = "Payment Successfull, order being placed.";
          this.storeOrder();
        }
        if(step == 3){
          this.message = "Your Order has been placed";
          this.displaySpinner = false;
        }
        if(step == 4){
          this.router.navigateByUrl('/home');
          count.unsubscribe;
        }
      });
   }

   payMoney(){
      return true;
   }

   storeOrder(){
    let payment: Payment;
    let pmid = 0;
    if(this.selectedPaymentMethod.value != null){
      pmid= parseInt(this.selectedPaymentMethod.value);
    }

    payment = {
      id:0,
      paymentMethod: {
        id: pmid,
        type: '',
        provider: '',
        available: false,
        reason: '',
      },
      user: this.utilityService.getUser(),
      totalAmount: this.usersPaymentInfo.totalAmount,
      shipingCharges: this.usersPaymentInfo.shipingCharges,
      amountReduced: this.usersPaymentInfo.amountReduced,
      amountPaid: this.usersPaymentInfo.amountPaid,
      createdAt: '',
    };
    this.navigationService.insertPayment(payment).subscribe((res:any) => {
      payment.id = res;
      let userOrder = this.utilityService.getUser();
      let order: Order = {
        id:0,
        user: userOrder,
        userCart: this.usersCart,
        payment: payment,
        createdAt: '',
      }
      
      this.navigationService.insertOrder(order).subscribe((res) => {
        this.utilityService.changeCart.next(0);
        
      },
      error => {console.log(error)}
      );
    }
    ,error => {console.log(error)}
    );

   }

}
