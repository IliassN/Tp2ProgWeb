import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Artist } from '../../../models/artist';
import { Album } from '../../../models/album';

const CLIENT_ID : string ="710f50140d7347859bd7408e074f963d";
const CLIENT_SECRET: string = "599f77936e1a456b9b6b2cddd0960eee";
@Injectable({
  providedIn: 'root'
})


export class SpotifyService {

  spotifyToken : string | null = null;

constructor(public http: HttpClient) { }
async connect(): Promise<void> {
  let body = new HttpParams().set('grant_type', 'client_credentials');
  let httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    })
  };
  let x = await lastValueFrom(this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), httpOptions));
  console.log(x);
  this.spotifyToken = x.access_token;
}

async searchArtist(artist : string): Promise<Artist> {
  const httpOptions = { headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer ' + this.spotifyToken
  })};
  
  let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artist, httpOptions));
  console.log(x);
  return new Artist(x.artists.items[0].id, x.artists.items[0].name, x.artists.items[0].images[0].url);
}

async getArtistAlbums(artistId: string): Promise<any[]> {
  const httpOptions = { 
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.spotifyToken
    })
  };

  let response = await lastValueFrom(this.http.get<any>(`https://api.spotify.com/v1/artists/${artistId}/albums`, httpOptions));
  return response.items.map((album: any) => ({
    id: album.id,
    name: album.name,
    imageUrl: album.images[0]?.url
  }));
}

}
