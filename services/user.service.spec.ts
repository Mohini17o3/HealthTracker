import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';




describe('ValueService', () => {
    let service: UserService;
    beforeEach(() => {
        TestBed.configureTestingModule({providers: [UserService]});
    

    service = TestBed.inject(UserService);

      });

  it('should be created', () => {
        expect(service).toBeTruthy();
      });      

it(' #getUsers should get real value from service' , () =>{
    expect(service.getUsers()).toEqual(jasmine.any(Array));
})

it('#updateUsers should update the users', () => {
    const newUsers = [{ id: 1, name: 'New User', workouts: [] }];
    service.updateUsers(newUsers);
    expect(service.getUsers()).toEqual(newUsers);
  });


})