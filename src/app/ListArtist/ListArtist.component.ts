import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/Spotify/spotify.service';
import { Artist } from '../../models/artist';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ListArtist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ListArtist.component.html',
  styleUrls: ['./ListArtist.component.css']
})
export class ListArtistComponent implements OnInit {

  artistName: string = ""
  artist?: Artist;
  jsonData: string | null = null;

  constructor(public spotify: SpotifyService, private router: Router) {

  }

  ngOnInit(): void {
    this.spotify.connect()
    this.jsonData = localStorage.getItem("artiste");
    if (this.jsonData != null) {
      this.artist = JSON.parse(this.jsonData);
    }
  }

  async getArtist(): Promise<void> {
    this.artist = await this.spotify.searchArtist(this.artistName)
  }

  async goToAlbums(): Promise<void> {
    if (this.artist?.id) { // Vérifie que l'artiste et son ID existent
      await this.router.navigate(['/albums', this.artist.id]); // Utilise this.artist.id pour l'ID
    }
  }

}
