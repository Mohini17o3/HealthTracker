import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule , MatPaginatorModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class TableComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }
}