import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from "../../services/task.service";

@Component({
  selector: 'app-task-login',
  templateUrl: './task-login.component.html',
  styleUrls: ['./task-login.component.scss']
})
export class TaskLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      this.taskService.postlogin(email, password).subscribe((loginResp) => {
        if(loginResp){
          localStorage.setItem('token', loginResp['token']);
          localStorage.setItem('refreshToken', loginResp['refreshToken']);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}
