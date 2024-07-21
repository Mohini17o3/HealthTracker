import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { UserService } from '../../../../services/user.service';
import { of } from 'rxjs';

class MockUserService {
  users$ = of([]);
  getUsers() {
    return [];
  }
  updateUsers(users: any[]) {}
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let userService: MockUserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule , FormComponent],
      providers: [{ provide: UserService, useClass: MockUserService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as unknown as MockUserService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise form', () => {
    expect(component.FormComponent).toBeDefined();
    expect(component.FormComponent.controls['name']).toBeDefined();
    expect(component.FormComponent.controls['minutes']).toBeDefined();
    expect(component.FormComponent.controls['type']).toBeDefined();
  });

  it('should check validity of form before submit', () => {
    spyOn(userService, 'updateUsers').and.callThrough();

    component.FormComponent.controls['name'].setValue('Test User');
    component.FormComponent.controls['type'].setValue('Yoga');
    component.FormComponent.controls['minutes'].setValue(20);

    component.onSubmit();
    expect(userService.updateUsers).toHaveBeenCalled();
  });
});
