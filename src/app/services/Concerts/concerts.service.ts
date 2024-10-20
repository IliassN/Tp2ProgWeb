import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConcertsService {

  private apiKey: string = '2b32475766802ac01eefda45e9e42ea0';

  constructor(private http: HttpClient) { }

  async getConcerts(artistName: string): Promise<any[]> {
    let response = await lastValueFrom(this.http.get<any>("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=" + this.apiKey));
    console.log(response)
    return response;
  }
}
