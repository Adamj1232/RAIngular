import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeatherService {
    constructor(private http: HttpClient){
    };

    getWeather(zip: string) {
      return this.http.get('https://api.wunderground.com/api/bf0b8a6ac19ed8ff/forecast/hourly/forecast10day/conditions/q/' + zip + '.json')
    //   .map(res => res.json())
    };
}
