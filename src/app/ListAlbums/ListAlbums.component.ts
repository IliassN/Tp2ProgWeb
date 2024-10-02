import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../services/Spotify/spotify.service';
import { Album } from '../../models/album';

@Component({
  selector: 'app-ListAlbums',
  standalone:true,
  templateUrl: './ListAlbums.component.html',
  imports :[FormsModule, CommonModule],
  styleUrls: ['./ListAlbums.component.css']
})
export class ListAlbumsComponent implements OnInit {

  albums: any[] = [];
  artistId: string = '';

  constructor(public spotify : SpotifyService) { }

  ngOnInit(): void {
    this.spotify.connect()
    ;

  }

  async getAlbums(): Promise<void> {
    this.albums = await this.spotify.getArtistAlbums(this.artistId);
  }

}
