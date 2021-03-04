import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-signup',
  templateUrl: './task-signup.component.html',
  styleUrls: ['../task-login/task-login.component.scss']
})
export class TaskSignupComponent implements OnInit {
  signupForm: FormGroup;
  verifyForm: FormGroup;
  isSignUp: boolean;
  message: string;
  hashToken: string;

  constructor(    
    public router: Router,
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.isSignUp = true;
    this.signupForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    });
  }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      const email = this.signupForm.get('email').value;
      const password = this.signupForm.get('password').value;
      this.taskService.postRegister(email, password).subscribe((resp) => {
        this.message = resp.message;
        this.hashToken = resp.hashToken;
        this.initiateVerifyForm();
      });
    }
  }

  initiateVerifyForm(){
    this.verifyForm = this.formBuilder.group({
      otp: new FormControl('', Validators.required)
    });
    this.isSignUp = false;
  }

  onVerifySubmit(){
    if (this.verifyForm.valid) {
      const otp = this.verifyForm.get('otp').value;
      this.taskService.postVerification(otp, this.hashToken).subscribe((resp) => {
        if(resp.ok){
          this.router.navigateByUrl('/login');
        }
      });
    }
  }
}
