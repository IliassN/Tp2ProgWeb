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

  artists: Artist[] = [];
  jsonData: string | null = null;

  constructor(public spotify: SpotifyService, private router: Router) {

  }

  ngOnInit(): void {
    this.spotify.connect()
    this.jsonData = localStorage.getItem("artistes");
    if (this.jsonData != null) {
      this.artists = JSON.parse(this.jsonData);
    }
  }

  async getArtist(): Promise<void> {
    const artist = await this.spotify.searchArtist(this.artistName);
    this.artists.push(artist); // Ajouter le nouvel artiste à la liste
    // Sauvegarder la liste mise à jour dans le localStorage
    localStorage.setItem("artistes", JSON.stringify(this.artists));
  }

  async goToAlbums(artistId: string): Promise<void> {
    await this.router.navigate(['/albums', artistId]);
  }

}
