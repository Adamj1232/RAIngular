import { Component, Input } from '@angular/core';

@Component({
    selector: 'seven-hour-weather',
    templateUrl: './seven-hour-weather.component.html',
    styleUrls: ['./app.component.css']
})

export class SevenHourWeatherComponent {
    @Input() hourlyForecast: object;

}
