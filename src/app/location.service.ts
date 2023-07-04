import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

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
    }, console.error)
  }

  async getPermissionStatus() {
    const status = await navigator.permissions.query({name:'geolocation'});
    return status.state === 'granted'
  }
}
