import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {ReactiveFormsModule , FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, ReactiveFormsModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  paginatedRow: any[] = [];
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15, 20, 40, 100];
  filterControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$.subscribe(users => {
      this.users = users;
      this.filteredUsers = users; 
      this.length = users.length;
      this.paginatedRowFunction({ pageIndex: 0, pageSize: this.pageSize } as PageEvent);
    });

    this.filterControl.valueChanges.subscribe(value => {
      this.filterRowFunction(value || '');
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((pageEvent: PageEvent) => this.paginatedRowFunction(pageEvent));
  }

  paginatedRowFunction(pageEvent: PageEvent): void {
    const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    const endIndex = startIndex + pageEvent.pageSize;
    this.paginatedRow = this.filteredUsers.slice(startIndex, endIndex);
  }

  filterRowFunction(filterValue: string): void {
    const trimmed = filterValue.trim().toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(trimmed)
    );

    this.length = this.filteredUsers.length;

    if (this.paginator) {
      this.paginator.pageIndex = 0; 
      this.paginatedRowFunction({ pageIndex: 0,  pageSize: this.paginator.pageSize} as PageEvent); 
    }
  }
}
