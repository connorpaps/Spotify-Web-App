import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  artist: any;
  albums: Array<any> = [];
  tempAlbums: Array<any> = [];
  artistParamsSub;

  constructor(private routeService: ActivatedRoute, private musicService: MusicDataService) { }

  ngOnInit(): void {
    // subscribe to params from ActivatedRoute service to get id value
    this.artistParamsSub = this.routeService.params.subscribe((paramsData: Params) => {
      // invoke getArtistById(id) method and subscribe, then set data to artist property
      this.musicService.getArtistById(paramsData.id).subscribe((artistData) => { this.artist = artistData});
      // invoke getAlbumsByArtistId using the id passed and filter the data based on unique album names
      this.musicService.getAlbumsByArtistId(paramsData.id).subscribe((albumData) => {
        this.tempAlbums = albumData.items;
        let albumNames: string[] = [];
        // add album to the final this.albums array 
        // if the name of the album is not already in albumNames array
        this.tempAlbums.forEach((album) => {
          if (!albumNames.includes(album.name)) {
            this.albums.push(album);
            albumNames.push(album.name);
          }
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.artistParamsSub.unsubscribe();
  }
}