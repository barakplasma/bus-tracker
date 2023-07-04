import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from "../location.service";

@Component({
  selector: 'app-canvas-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas-map.component.html',
  styleUrls: ['./canvas-map.component.css']
})
export class CanvasMapComponent implements AfterViewInit {
  @ViewChild('map', {static: false}) private mapElementRef: ElementRef<HTMLCanvasElement> = {} as ElementRef;

  private ctx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;

  constructor(private locationService: LocationService) {
    this.locationService = locationService;
  }

  ngAfterViewInit(): void {
    let mapContext = this.mapElementRef.nativeElement.getContext('2d');
    if (!(mapContext instanceof CanvasRenderingContext2D)) {
      console.error('failed to start canvas context')
    } else {
      this.ctx = mapContext;
      this.height = mapContext.canvas.height;
      this.width = mapContext.canvas.width;
    }
    this.drawStartPoint()
    this.locationService.getLocation().subscribe(next => {
      if (next) {
        this.drawNewLocation(next)
      }
    })
  }

  drawStartPoint() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';
    this.ctx.arc(this.width / 2, this.height / 2, 5, 0 * Math.PI, 2 * Math.PI)
    this.ctx.fill()
    // this.ctx.closePath()
  }

  drawNewLocation(gl: GeolocationPosition) {
    const {latitude, longitude} = gl.coords;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black';
    this.ctx.lineTo(latitude, longitude);
  }
}
