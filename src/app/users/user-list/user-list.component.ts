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
  usersResponse: User[];
  userSub: Subscription;
  searchInput;
  key: string;
  isRevert: boolean = false;
  paginateChoices = [5, 10, 15, 20];
  recordsPerPage = this.paginateChoices[1];
  pageNumber = 1;
  initialLoad = true;
  filter = 'all';
  totalUserAfterPipe = 0;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersResponse = this.usersService.getUsers();
    this.users = this.usersResponse.slice();
    this.userSub = this.usersService.usersChanged.subscribe((users) => {
      this.users = users;
      this.users = this.usersResponse.slice();
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
    this.usersService.fetchUsers().subscribe();
  }
  onSort(key: string) {
    this.key = key;
    this.isRevert = !this.isRevert;
    this.initialLoad = false;
  }
  onFilter() {
    console.log(this.filter);
  }
}
