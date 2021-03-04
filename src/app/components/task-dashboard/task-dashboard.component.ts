import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { DashboardDetails } from "../../models/task-dashboard.model";

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  isUpdateMode: boolean;
  updateForm: FormGroup;
  userDetails: DashboardDetails;
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.isUpdateMode = false;
    this.taskService.userDetailsObserver.subscribe((userDetails: DashboardDetails) => {
      this.userDetails = new DashboardDetails(userDetails);
    });
    this.taskService.getUser().subscribe((userDetails) => {
      this.taskService.onUserDetails(userDetails.data);
    });
  }

  onUpdateToggle() {
    this.updateForm = this.formBuilder.group({
      firstname: new FormControl(this.userDetails.firstname),
      lastname: new FormControl(this.userDetails.lastname),
      username: new FormControl(this.userDetails.username),
      email: new FormControl(this.userDetails.email),
      country: new FormControl(this.userDetails.country),
      bio: new FormControl(this.userDetails.bio)
    });
    this.isUpdateMode = true;
  }

  onSubmit() {
    this.taskService.putUser(this.updateForm.value).subscribe((resp) => {
      this.taskService.onUserDetails(resp.data);
      this.isUpdateMode = false;
    });
  }
}
