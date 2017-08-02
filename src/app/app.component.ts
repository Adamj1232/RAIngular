import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

// import { Weather } from './weather'
// import CurrentWeatherCleaner from '../assets/helper'
import { WeatherService } from './weather.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'RAIngULAR - Weather Forcast';
  rForm: FormGroup;
  post: any;
  private zip: string = '';
  zipAlert: string = '5 Digit Zip code required';
  locationAlert: string = ''
  locationWeather: object = {};
  searchedLocation: string = '';
  currentCondition: object = {};
  currentDate: string = '';
  currentWeatherImgUrl: string = '';
  currentTemp: string = '';
  expectedHigh: string = '';
  expectedLow: string = '';
  summary: string = '';
  hourlyForecast: any[] = [];


  constructor(private http: HttpClient, fb: FormBuilder, public weatherServ: WeatherService){
    this.rForm = fb.group({
      'zip':[
            null,
            Validators.compose([
              Validators.required, Validators.minLength(5), Validators.maxLength(5)
            ])
      ]
    });

  };

  ngOnInit() {
    let storedLocationKey = localStorage.getItem('storedLocation');

    if( storedLocationKey ){
      this.searchZip({'zip': storedLocationKey})
    }
  }

  searchZip(searched){
    this.locationAlert = ''
    this.zip = searched.zip
    // this.http.get('https://api.wunderground.com/api/bf0b8a6ac19ed8ff/forecast/hourly/forecast10day/conditions/q/' + this.zip + '.json')
    this.weatherServ
    .getWeather(searched.zip)
    .subscribe(
      resp => {
        if(!resp['response'].error){
          this.locationWeather = resp
          this.hourlyForecast = resp['hourly_forecast']
          this.searchedLocation = resp['current_observation'].display_location.full
          this.currentWeatherCleaner(resp)
          this.rForm.reset()
          localStorage.setItem('storedLocation', this.zip);
          console.log(this.locationWeather)
        } else {
          this.locationAlert = resp['response'].error.description
          console.log(resp['response'].error.description)
        }
      },
    );
  }

  currentWeatherCleaner(weatherObj){

    this.locationWeather = weatherObj

    this.searchedLocation = weatherObj['current_observation'].display_location.full

    this.currentCondition = weatherObj['current_observation'].weather

    let currentDateReturned = weatherObj['current_observation'].local_time_rfc822

    this.currentDate = currentDateReturned.split(/[12][0-9]{3}/)

    this.currentTemp = weatherObj['current_observation'].tempurature_string

    this.currentWeatherImgUrl = weatherObj['current_observation'].icon_url

    this.expectedHigh = weatherObj['forecast'].simpleforecast.forecastday[0].high.fahrenheit

    this.expectedLow = weatherObj['forecast'].simpleforecast.forecastday[0].low.fahrenheit

    this.summary = weatherObj['forecast'].txt_forecast.forecastday[0].fcttext

    this.hourlyForecast = weatherObj['hourly_forecast']

  }


}
