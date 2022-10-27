import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album: any;
  albumParamsSub;

  constructor(private snackBarService: MatSnackBar, private routeService: ActivatedRoute, 
    private musicService: MusicDataService) { }

  addToFavourites(trackID): void {
    // updated subscribe service
    this.musicService.addToFavourites(trackID).subscribe((albumData) => {
      this.snackBarService.open("Adding to Favourites...", "Done", {duration: 1500});
    },
    (error) => { this.snackBarService.open("Error adding to favourites...", "Done", {duration: 1500});
    })
  }

  ngOnInit(): void {
    this.albumParamsSub = this.routeService.params.subscribe((paramsData: Params) => {
      this.musicService.getAlbumById(paramsData.id).subscribe((albumData) => this.album = albumData);
    });
  }

  ngOnDestroy(): void {
    this.albumParamsSub.unsubscribe();
  }
  
}