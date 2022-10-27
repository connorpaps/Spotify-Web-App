import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  searchQuery: any;
  results: any;
  searchParamsSub;

  constructor(private routeService: ActivatedRoute, private musicService: MusicDataService) { }

  ngOnInit(): void {
    this.searchParamsSub = this.routeService.queryParams.subscribe((paramsData) => {
      // obtain "q" query parameter
      this.searchQuery = paramsData["q"];
      // use searchArtists from music data service with the query parameter to find artist data
      this.musicService.searchArtists(this.searchQuery).subscribe(searchData => 
        // filter out empty artists (no image or information provided) before assigning data
        this.results = searchData.artists.items.filter(searchItem => searchItem.images.length > 0));
    });
  } 

  ngOnDestroy(): void {
    this.searchParamsSub.unsubscribe();
  }

}