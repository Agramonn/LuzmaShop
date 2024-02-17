import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  invaildRPWD: boolean = false;
  message= '';
  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName:[
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      lastName:[
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      email:[
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      pwd:[
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      rpwd:[''],
      address: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required]
    });
  }

  register(){
    let user: User = {
      id: 0,
      firstName: this.FirstName.value,
      lastName: this.LastName.value,
      email: this.Email.value,
      password: this.PWD.value,
      address: this.Address.value,
      mobile: this.Mobile.value,
      createdAt: '',
      updatedAt: '',
    }
    this.navigationService.registerUser(user).subscribe((res: any) =>{
      this.message = res.toString();
    },
    err =>{
    //error response
    this.message = err.error;
    }
    );
  }
  
  //#region Getters
  get FirstName(): FormControl{
    return this.registerForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl{
    return this.registerForm.get('lastName') as FormControl;
  }
  get Email(): FormControl{
    return this.registerForm.get('email') as FormControl;
  }
  get PWD(): FormControl{
    return this.registerForm.get('pwd') as FormControl;
  }
  get RPWD(): FormControl{
    return this.registerForm.get('rpwd') as FormControl;
  }
  get Address(): FormControl{
    return this.registerForm.get('address') as FormControl;
  }
  get Mobile(): FormControl{
    return this.registerForm.get('mobile') as FormControl;
  }
}
