import { Component, Input } from '@angular/core';
// import { AppComponent } from './app.component'

@Component({
  selector: 'current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./app.component.css']
})

export class CurrentWeatherComponent {
  @Input() weather: object;


  searchedLocation: string = '';
  currentCondition: object = {};
  currentDate: string = '';
  currentWeatherImgUrl: string = '';
  currentTemp: string = '';
  expectedHigh: string = '';
  expectedLow: string = '';
  summary: string = '';
  hourlyForecast: any[] = [];

  currentWeatherCleaner(weather){

    this.searchedLocation = weather['current_observation'].display_location.full

    this.currentCondition = weather['current_observation'].weather

    let currentDateReturned = weather['current_observation'].local_time_rfc822

    this.currentDate = currentDateReturned.split(/[12][0-9]{3}/)

    this.currentTemp = weather['current_observation'].tempurature_string

    this.currentWeatherImgUrl = weather['current_observation'].icon_url

    this.expectedHigh = weather['forecast'].simpleforecast.forecastday[0].high.fahrenheit

    this.expectedLow = weather['forecast'].simpleforecast.forecastday[0].low.fahrenheit

    this.summary = weather['forecast'].txt_forecast.forecastday[0].fcttext

    this.hourlyForecast = weather['hourly_forecast']

  }
}
