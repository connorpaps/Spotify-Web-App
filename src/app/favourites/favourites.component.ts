import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Array<any>;

  constructor(private musicService: MusicDataService) { }

  ngOnInit(): void {
    this.musicService.getFavourites().subscribe(favData => this.favourites = favData.tracks);
  }

  removeFromFavourites(id): void {
    this.musicService.removeFromFavourites(id).subscribe(favData => this.favourites = favData.tracks);
  }

}