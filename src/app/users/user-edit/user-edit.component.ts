import { UsersService } from './../users.service';

import { User } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SocialLinkValidator } from './socialLinkValidator';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  id: number;
  user: User;
  editMode: boolean = false;
  userForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.user = this.usersService.getUser(this.id);
      this.initForm();
      console.log('user: ', this.user);
    });
  }

  initForm() {
    let userFirstName = '';
    let userLastName = '';
    let userEmail = '';
    let userPhone = '';
    let userDOB: Date;
    let userStatus: boolean = true;
    let userSocialLinks = new FormArray([]);

    console.log('edit mode: ', this.editMode, this.id);

    if (this.editMode) {
      userFirstName = this.user.firstName;
      userLastName = this.user.lastName;
      userEmail = this.user.email;
      userPhone = this.user.phone;
      userDOB = new Date(this.user.DOB);
      userStatus = this.user.status;
      if (this.user.socialLinks) {
        for (let link of this.user.socialLinks) {
          userSocialLinks.push(
            new FormGroup({
              address: new FormControl(link.address),
            })
          );
        }
      }
    }

    this.userForm = new FormGroup(
      {
        firstName: new FormControl(userFirstName, Validators.required),
        lastName: new FormControl(userLastName, Validators.required),
        email: new FormControl(userEmail, [
          Validators.required,
          Validators.email,
        ]),
        phone: new FormControl(userPhone, Validators.required),
        DOB: new FormControl(userDOB),
        status: new FormControl(userStatus, Validators.required),
        socialLinks: userSocialLinks,
      },
      { validators: SocialLinkValidator }
    );
  }

  onAddSocialLink() {
    (<FormArray>this.userForm.get('socialLinks')).push(
      new FormGroup({
        address: new FormControl(null),
      })
    );
  }
  getControls(name: string) {
    return (<FormArray>this.userForm.get(name)).controls;
  }
  onSubmit() {
    console.log(this.userForm);
  }
  onNavigate() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeletingSocialLink(index: number) {
    (<FormArray>this.userForm.get('socialLinks')).removeAt(index);
  }
}
