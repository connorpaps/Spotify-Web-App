/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Connor Papas Student ID: 160517199 Date: August 13, 2021
*
* Online Link to Music App: https://web422-a6-connorp-musicapp.vercel.app/login
*
* Online Link to User Api: https://immense-peak-65103.herokuapp.com/api/user
*
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  token: User;
  title = 'web422-a6';
  searchString: string;

  constructor(private routerService: Router, private authService: AuthService) { }

  handleSearch(): void {
    this.routerService.navigate(['/search'], 
    {
      queryParams: {q: this.searchString}
    });
    this.searchString = "";
  }

  ngOnInit(): void {
    this.routerService.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.authService.readToken();
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.routerService.navigate(['login']);
  }

}