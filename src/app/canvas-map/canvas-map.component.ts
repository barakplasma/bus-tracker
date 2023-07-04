import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from "../location.service";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-canvas-map',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './canvas-map.component.html',
  styleUrls: ['./canvas-map.component.css']
})
export class CanvasMapComponent implements AfterViewInit {
  @ViewChild('map', {static: false}) private mapElementRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  private ctx!: CanvasRenderingContext2D;
  private centerX: number = 180;
  private centerY: number = 90;

  firstLocation?: GeolocationPosition;
  lastLocations: GeolocationPosition[] = [];

  constructor(private locationService: LocationService) {
    this.locationService = locationService;
  }

  ngAfterViewInit(): void {
    let mapContext = this.mapElementRef.nativeElement.getContext('2d');
    if (!(mapContext instanceof CanvasRenderingContext2D)) {
      console.error('failed to start canvas context')
    } else {
      this.ctx = mapContext;
      this.centerX = mapContext.canvas.width / 2;
      this.centerY = mapContext.canvas.height / 2;
    }
    this.drawStartPoint()
    this.locationService.location.subscribe(next => {
      if (next) {
        if (!this.firstLocation) {
          this.firstLocation = next;
        }
        this.lastLocations.push(next);
        this.drawNewLocation(next)
      }
    })
  }

  drawStartPoint() {
    const {ctx} = this;
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(this.centerX, this.centerY, 5, 0 * Math.PI, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }

  geolocationToCanvas(gl: GeolocationPosition) {
    if (!this.firstLocation) {
      throw new Error('cant draw new location')
    }
    const {latitude, longitude} = gl.coords;
    const scale = 100000;
    const x = Math.round(this.centerX + (latitude - this.firstLocation.coords.latitude)*scale);
    const y = Math.round(this.centerY + (longitude - this.firstLocation.coords.longitude)*scale);
    return {x, y}
  }

  drawNewLocation(gl: GeolocationPosition) {
    let last = this.lastLocations.at(-2);
    if (!last || !this.firstLocation) {
      return;
    }
    const {ctx} = this;
    ctx.beginPath();
    ctx.fillStyle = 'black';
    const start = this.geolocationToCanvas(last);
    const next = this.geolocationToCanvas(gl);
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
  }
}
