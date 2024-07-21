import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { TableComponent } from './user-table.component';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['users$']);

    userServiceSpy.users$ = of([]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatPaginatorModule, ReactiveFormsModule , TableComponent , NoopAnimationsModule],
      providers: [{ provide: UserService, useValue: userServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.users).toEqual([]);
    expect(component.filteredUsers).toEqual([]);
    expect(component.paginatedRow).toEqual([]);
    expect(component.length).toBe(0);
    expect(component.pageSize).toBe(5);
    expect(component.pageSizeOptions).toEqual([5, 10, 15, 20, 40, 100]);
  });
});
