import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListArtistComponent } from './ListArtist/ListArtist.component';
import { ListAlbumsComponent } from './ListAlbums/ListAlbums.component';
import { ListShowComponent } from './ListShow/ListShow.component';
import { ListSongsComponent } from './ListSongs/ListSongs.component';

export const routes: Routes = [
    { path: "", redirectTo: "artist", pathMatch: "full" },
    { path: "artiste", component: ListArtistComponent },
    { path: "album", component: ListAlbumsComponent },
    { path: "show", component: ListShowComponent },
    { path: "song", component: ListSongsComponent }
];
