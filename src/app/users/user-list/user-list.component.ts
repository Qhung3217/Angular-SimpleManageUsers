import { Subscription, Observable } from 'rxjs';
import { UsersService } from './../users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./scss/user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  userSub: Subscription;
  searchInput;
  key: string;
  isRevert: boolean = false;
  paginateChoices = [5, 10, 15, 20];
  recordsPerPage = this.paginateChoices[1];
  pageNumber = 1;
  initialSort: number = 0;
  filter = 'all';
  filterMetadata = {
    count: 0,
  };
  hasError = null;
  errorMessage = null;
  isLoading = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
    this.userSub = this.usersService.usersChanged.subscribe((users) => {
      console.log('change');
      this.users = users;
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onChangeRecordsPerPage() {
    this.pageNumber = 1;
  }
  onChangeStatus(user: User) {
    console.log(user);
    this.handleAction('changeStatus', user);
  }

  onReload() {
    // console.log('reaload');
    this.isLoading = true;
    this.usersService.fetchUsers().subscribe(() => {
      this.isLoading = false;
    });
    this.key = null;
  }
  onSort(key: string) {
    this.key = key;
    this.isRevert = !this.isRevert;
    this.initialSort++;
    if (this.initialSort === 3) {
      this.key = null;
      this.isRevert = false;
      this.initialSort = 0;
    }
  }
  onClickSelect(event) {
    console.log(event);
    if (event.button !== -1) event.stopPropagation();
  }
  onFilter() {
    console.log(this.filter);
  }
  onDelete(id: number) {
    this.handleAction('delete', id);
  }
  private handleAction(type: string, payload: any) {
    this.isLoading = true;
    let obs: Observable<User>;

    if (type === 'delete') {
      obs = this.usersService.deleteUser(payload);
    } else {
      obs = this.usersService.changeUserStatus(payload);
    }

    obs.subscribe({
      next: (resData) => {
        this.isLoading = false;
      },
      error: (errMess) => {
        this.isLoading = false;
        this.hasError = 'Error !!';
        this.errorMessage = errMess;
      },
    });
  }
}
