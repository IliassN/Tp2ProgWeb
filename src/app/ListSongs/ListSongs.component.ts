import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../services/Spotify/spotify.service';
import { YouTubeService } from '../services/Youtube/Youtube.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-ListSongs',
  standalone: true,
  templateUrl: './ListSongs.component.html',
  styleUrls: ['./ListSongs.component.css'],
  imports: [FormsModule, RouterModule, CommonModule, TranslateModule]
})
export class ListSongsComponent implements OnInit {
  albumId: string | null = null;
  albumName: string | null = null;
  songs: Song[] = [];
  videoId: SafeResourceUrl | null = null;
  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, private youtubeService: YouTubeService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('albumId');
    if (this.albumId) {
      this.loadSongs(this.albumId)
      this.loadAlbumName(this.albumId);

    }
  }
  async loadAlbumName(albumId: string) {
    const album = await this.spotifyService.getAlbumDetails(albumId);
    this.albumName = album.name;
  }

  async loadSongs(albumId: string) {
    this.songs = await this.spotifyService.getAlbumTracks(albumId);
  }

  playSong(song: Song): void {
    const searchText = song.name + '' + song.artist;
    this.youtubeService.searchVideoId(searchText).then(videoId => {
      this.videoId = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId);
    });
  }
}
