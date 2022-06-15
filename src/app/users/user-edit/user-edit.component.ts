import { Observable } from 'rxjs';
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
  hasError: string = null;
  errorMessage = null;
  isLoading: boolean = false;
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
            new FormControl(link, [Validators.required, SocialLinkValidator])
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

    // const invalid = [];
    // const controls = this.userForm.controls;
    // for (const name in controls) {
    //   if (controls[name].invalid) {
    //     invalid.push(name);
    //   }
    // }
    // console.log(invalid);
  }

  onAddSocialLink() {
    (<FormArray>this.userForm.get('socialLinks')).push(
      new FormControl(null, [Validators.required, SocialLinkValidator])
    );
    console.log(this.userForm.get('socialLinks'));
  }
  getControls(name: string) {
    return (<FormArray>this.userForm.get(name)).controls;
  }
  onSubmit() {
    console.log(this.userForm);
    // let userObs: Observable<User>;
    // this.isLoading = true;
    // if (this.editMode)
    //   userObs = this.usersService.updateUser(this.id, this.userForm.value);
    // else userObs = this.usersService.createUser(this.userForm.value);
    // userObs.subscribe({
    //   next: (resData) => {
    //     console.log('resData', resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/users']);
    //   },
    //   error: (errMess) => {
    //     console.log('errData', errMess);
    //     this.isLoading = false;
    //     this.errorMessage = errMess;
    //     this.hasError = 'Error !!';
    //   },
    // });
  }
  onNavigate() {
    this.router.navigate(['/users'], { relativeTo: this.route });
  }
  onDeletingSocialLink(index: number) {
    (<FormArray>this.userForm.get('socialLinks')).removeAt(index);
  }
}
