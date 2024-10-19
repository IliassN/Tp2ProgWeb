import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {
  private apiKey: string = "AIzaSyBW6OFd9DupyI0aWQcn4n2LeYsKArYTCiU";

  constructor(private http: HttpClient) { }

  async searchVideoId(searchText: string): Promise<string> {
    let x = await lastValueFrom(this.http.get<any>("https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key=" + this.apiKey + "&q=" + searchText));
    console.log(x);
    return x.items[0].id.videoId;
  }
}
