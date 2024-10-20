import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConcertsService } from '../services/Concerts/concerts.service';
import { CommonModule } from '@angular/common';
import { SpecialPipe } from '../pipes/special.pipe';
import { GoogleMapsModule } from '@angular/google-maps';

declare var google: any;


@Component({
  selector: 'app-ListShow',
  standalone: true,
  templateUrl: './ListShow.component.html',
  styleUrls: ['./ListShow.component.css'],
  imports: [CommonModule, SpecialPipe, GoogleMapsModule]


})
export class ListShowComponent implements OnInit {
  artistName: string = '';
  concerts: any[] = [];
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    private route: ActivatedRoute,
    private bandsInTownService: ConcertsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.artistName = params.get('artistName')!;
      this.recupConcerts();
    });
  }

  async recupConcerts() {
    this.concerts = await this.bandsInTownService.getConcerts(this.artistName);
    console.log(this.concerts);
    this.loadMap();
  }

  loadMap() {
    setTimeout(() => {
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 0, lng: 0 },
        zoom: 2
      });

      this.concerts.forEach(concert => {
        const location = {
          lat: concert.venue.latitude,
          lng: concert.venue.longitude
        };

        this.markerPositions.push(location);

        new google.maps.Marker({
          position: location,
          map: map,
          title: concert.lineup.join(', ')
        });

        if (concert === this.concerts[0]) {
          map.setCenter(location);
        }
      });
    });
  }

}
