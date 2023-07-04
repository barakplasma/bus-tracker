import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-location-permission',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './location-permission.component.html',
  styleUrls: ['./location-permission.component.css']
})
export class LocationPermissionComponent {
  hasLocation: boolean = false;

  constructor() {
    navigator.permissions.query({name:'geolocation'}).then(
      status => this.hasLocation = status.state === 'granted'
    )
  }

  requestLocationPermission() {
    navigator.geolocation.watchPosition(console.debug, console.error)
  }
}
