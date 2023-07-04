import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { db } from "./db";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private watcherId?: number;
  private locationSubject: Subject<GeolocationPosition> = new Subject<GeolocationPosition>();
  public location: Observable<GeolocationPosition> = this.locationSubject.asObservable();

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
      this.locationSubject.next(p);
      db.locations.add({
        coords: {
          accuracy: p.coords.accuracy,
          altitude: p.coords.altitude,
          altitudeAccuracy: p.coords.altitudeAccuracy,
          heading: p.coords.heading,
          speed: p.coords.speed,
          latitude: p.coords.latitude,
          longitude: p.coords.longitude
        }, timestamp: p.timestamp
      });
    }, console.error)
  }

  async getPermissionStatus() {
    const status = await navigator.permissions.query({ name: 'geolocation' });
    return status.state === 'granted'
  }
}
