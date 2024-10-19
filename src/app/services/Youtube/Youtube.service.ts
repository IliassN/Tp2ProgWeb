import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {
  private apiKey: string = "AIzaSyBW6OFd9DupyI0aWQcn4n2LeYsKArYTCiU"; // Remplacez par votre clé d'API

  constructor(private http: HttpClient) { }

  async searchSong(songName: string, artistName: string): Promise<string | null> {
    const query = `${songName} ${artistName}`;
    const url = `https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&key=${this.apiKey}&q=${encodeURIComponent(query)}`;

    try {
      const response = await lastValueFrom(this.http.get<any>(url));
      if (response.items.length > 0) {
        return response.items[0].id.videoId; // Retourne l'ID de la vidéo
      }
      return null; // Aucune vidéo trouvée
    } catch (error) {
      console.error('Error fetching data from YouTube:', error);
      return null;
    }
  }
}
