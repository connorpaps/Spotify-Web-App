import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchResultComponent } from './search-result/search-result.component';
// a6 components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GuardAuthService } from './guard-auth.service';

/*
Path: "newReleases" - Shows the NewReleasesComponent
• Path: "artist" - Shows the ArtistDiscographyComponent
• Path: "album" - Shows the AlbumComponent
• Path: "about" – Shows the AboutComponent
• Path: "search" – Shows the SearchResultComponent
• Path: "favourites" – Shows the FavouritesComponent
• Path: "" - Redirects to the "/newReleases" Route
* Path: "login" - Shows the login screen
* Path: "register" - Shows the register user screen
• No Route Found - Shows the NotFoundComponent
*/

const routes: Routes = [
  {
    path: 'newReleases', component: NewReleasesComponent, canActivate: [GuardAuthService]
  },
  {
    path: 'artist/:id', component: ArtistDiscographyComponent, canActivate: [GuardAuthService]
  },
  {
    path: 'album/:id', component: AlbumComponent, canActivate: [GuardAuthService]
  },
  {
    path: 'about', component: AboutComponent, canActivate: [GuardAuthService]
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'search', component: SearchResultComponent, canActivate: [GuardAuthService]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'favourites', component: FavouritesComponent, canActivate: [GuardAuthService]
  },
  {
    path: '', redirectTo: 'newReleases', pathMatch: 'full'
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }