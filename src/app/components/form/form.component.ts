import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../../../../services/user.service';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  FormComponent!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.FormComponent = this.fb.group({
      name: ["", Validators.required],
      type: ["", Validators.required],
      minutes: [0, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.FormComponent.valid) {
      const formValues = this.FormComponent.value;
      const users = this.userService.getUsers();
      const existingUser = users.find(user => user.name === formValues.name);

      if (existingUser) {
        existingUser.workouts.push({ type: formValues.type, minutes: formValues.minutes });
      } else {
        users.push({
          id: users.length + 1,
          name: formValues.name,
          workouts: [{ type: formValues.type, minutes: formValues.minutes }],
        });
      }

      this.userService.updateUsers(users);
      this.FormComponent.reset();
    }
  }
}
