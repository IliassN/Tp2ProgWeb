import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/Spotify/spotify.service';
import { Artist } from '../../models/artist';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
=======
>>>>>>> 416cddb5144123b9f59052c207126f38e769a81d

@Component({
  selector: 'app-ListArtist',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
<<<<<<< HEAD
    this.spotify.connect()
=======
>>>>>>> 416cddb5144123b9f59052c207126f38e769a81d
    this.jsonData = localStorage.getItem("artiste");
    if(this.jsonData != null){
      this.artist = JSON.parse(this.jsonData);
    }
    
  }
  async getArtist() : Promise<void>{
    this.artist = await this.spotify.searchArtist(this.artistName)
<<<<<<< HEAD
    
=======
>>>>>>> 416cddb5144123b9f59052c207126f38e769a81d
  }

}
