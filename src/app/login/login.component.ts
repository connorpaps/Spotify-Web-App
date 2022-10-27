import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   public user: User = {
    userName: "",
    password: "",
    _id: null
  }

  public warning: string;
  
  public loading: boolean = false

  constructor(private authService: AuthService, private routing: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.user.password !== "" && this.user.userName !== "") {
      // set loading to true
      this.loading = true;
      // invoke login method
      this.authService.login(this.user).subscribe((userData) => {
        this.loading = false;
        localStorage.setItem("access_token", userData.token)
        // navigate to new releases since login worked
        this.routing.navigate(["/newReleases"]);
      }, (error) => {
        this.loading = false;
        this.warning = error.error.message;
      }
      )
    }
  }

}