import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public registerUser: RegisterUser = {
    userName: "",
    password: "",
    password2: ""
  }

  public warning: string;
  public loading: boolean = false;
  public success: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // if a username has been given and the passwords match
    if (this.registerUser.userName !== "") {
      if (this.registerUser.password === this.registerUser.password2) {
        this.loading = true;
        // register the user using the auth service
        this.authService.register(this.registerUser).subscribe(() => {
          this.success = true;
          this.warning = null;
          this.loading = false;
        }, (error) => {
          this.success = false;
          this.warning = error.error.message;
          this.loading = false;
        }
        );
      }
    }
    // check if passwords do not match, if so set error to warning var
    if (this.registerUser.password !== this.registerUser.password2) {
      this.warning = "Error: Passwords are not matching";
    }
  }

}