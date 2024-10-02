import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/Spotify/spotify.service';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-ListArtist',
  templateUrl: './ListArtist.component.html',
  styleUrls: ['./ListArtist.component.css']
})
export class ListArtistComponent implements OnInit {

  artistName : string =""
  artist ?: Artist;
  jsonData : string | null= null;

  constructor(public spotify : SpotifyService) {

   }

  ngOnInit():void {
    this.jsonData = localStorage.getItem("artiste");
    if(this.jsonData != null){
      this.artist = JSON.parse(this.jsonData);
    }
    
  }
  async getArtist() : Promise<void>{
    this.artist = await this.spotify.searchArtist(this.artistName)
  }

}
