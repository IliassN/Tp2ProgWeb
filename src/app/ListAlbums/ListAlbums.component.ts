import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../services/Spotify/spotify.service';
import { Album } from '../../models/album';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ListAlbums',
  standalone: true,
  templateUrl: './ListAlbums.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./ListAlbums.component.css']
})
export class ListAlbumsComponent implements OnInit {

  albums: any[] = [];
  artistId: string = '';
  artistName: string = '';

  constructor(public spotify: SpotifyService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.spotify.connect();
    this.route.paramMap.subscribe(async params => {
      this.artistId = params.get('id') || '';
      this.artistName = params.get('name') || '';


      if (this.artistId) {
        await this.getAlbums();
      }
    });

  }

  async getAlbums(): Promise<void> {
    this.albums = await this.spotify.getArtistAlbums(this.artistId);
  }

}
