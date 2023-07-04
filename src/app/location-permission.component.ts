import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import { LocationService } from "./location.service";

@Component({
  selector: 'app-location-permission',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './location-permission.component.html',
  styleUrls: ['./location-permission.component.css']
})
export class LocationPermissionComponent {
  hasLocationPermission: boolean = false;

  constructor(private locationService: LocationService) {
    this.locationService = locationService
    locationService.getPermissionStatus()
      .then(ps => this.hasLocationPermission = ps)
  }

  requestLocationPermission() {
    this.locationService.requestLocationPermission()
  }
}
