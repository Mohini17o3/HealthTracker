import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userData } from '../src/app/models/grid';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject(userData);
  
  users$ = this.usersSubject.asObservable();

  updateUsers(users: any[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): any[] {
    return this.usersSubject.getValue();
  }
}
