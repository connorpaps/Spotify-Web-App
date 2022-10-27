import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {

  releases: Array<any> = [];
  newReleasesSub;

  constructor(private musicService: MusicDataService) {
   }

  ngOnInit(): void {
    this.newReleasesSub = this.musicService.getNewReleases().subscribe(musicData => 
      this.releases = musicData.albums.items);
  }

  ngOnDestroy(): void {
    this.newReleasesSub.unsubscribe();
  }
}