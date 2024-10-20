import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../services/Spotify/spotify.service';
import { Album } from '../../models/album';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ListAlbums',
  standalone: true,
  templateUrl: './ListAlbums.component.html',
  imports: [FormsModule, CommonModule, TranslateModule],
  styleUrls: ['./ListAlbums.component.css']
})
export class ListAlbumsComponent implements OnInit {

  albums: any[] = [];
  artistId: string = '';
  artistName: string = '';
  language: string = 'fr'
  constructor(public spotify: SpotifyService, private route: ActivatedRoute, private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang(this.language)
  }

  changeLanguage(event: any) {
    this.translate.use(event.target.value); // Changer la langue
  }

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
  goToSongs(albumId: string) {
    // Navigue vers la page des chansons de l'album sélectionné
    this.router.navigate(['/songs', albumId]);
  }

}
