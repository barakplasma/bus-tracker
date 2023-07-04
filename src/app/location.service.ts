import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private watcherId?: number;
  private location?: GeolocationPosition;

  constructor() {
    this.getPermissionStatus().then(s => {
      if (s) {
        this.requestLocationPermission()
      }
    })
  }

  requestLocationPermission() {
    this.watcherId = navigator.geolocation.watchPosition((p) => {
      console.debug(p);
      this.location = p;
    }, console.error)
  }

  getLocation() {
    return of(this.location);
  }

  async getPermissionStatus() {
    const status = await navigator.permissions.query({name:'geolocation'});
    return status.state === 'granted'
  }
}
