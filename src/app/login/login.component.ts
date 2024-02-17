import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { User } from '../models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message = '';
  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private utilityService: UtilityService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  login(){
    let user: User = {
      id: 0,
      firstName: '',
      lastName: '',
      email: this.Email.value,
      password: this.PWD.value,
      address: '',
      mobile: '123',
      createdAt: '',
      updatedAt: '',
    }
    this.navigationService.loginUser(user).subscribe((res: any) => {
      this.message = "Logged In Successfully!";
      this.utilityService.setUser(res.toString());
      console.log(this.utilityService.getUser());
    },
    err =>{
    //error response
    this.message = "Invalid Credentials";
    console.log(err);
    });
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}
