import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private jwt: JwtHelperService) { }

  applyDiscount(price: number, discount:number): number {
    let finalPrice: number = price-price*(discount/100);
    return finalPrice;
  }

  //JWT Helper Service.

  getUser(): User {
    let token = this.jwt.decodeToken();
    let user = {
      id: token.id,
      firstName: token.firstName,   
      lastName: token.lastName,
      email: token.email,
      password: token.password,
      address: token.address,
      mobile: token.mobile,
      createdAt: token.createdAt,
      updatedAt: token.updatedAt
    };
    return user;
  }

  setUser(token: string){
    localStorage.setItem('user', token);
  }

  isLoggedIn(){
    return localStorage.getItem('user') ? true : false;
  }

  logoutUser(){
    localStorage.removeItem('user');
  }
}
