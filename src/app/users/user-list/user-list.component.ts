import { Subscription } from 'rxjs';
import { UsersService } from './../users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
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
  initialLoad = true;
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

  onReload() {
    // console.log('reaload');
    this.isLoading = true;
    this.usersService.fetchUsers().subscribe(() => {
      this.isLoading = false;
    });
  }
  onSort(key: string) {
    this.key = key;
    this.isRevert = !this.isRevert;
    this.initialLoad = false;
  }
  onFilter() {
    console.log(this.filter);
  }
  onDelete(id: number) {
    this.isLoading = true;
    this.usersService.deleteUser(id).subscribe({
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
