import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

import { WeatherService } from './weather.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private title = 'RAIngULAR - Weather Forcast';
  rForm: FormGroup;
  private zip: string = '';
  private zipAlert: string = '5 Digit Zip code required';
  private locationAlert: string = ''


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

        if( storedLocationKey ) {
          this.searchZip({'zip': storedLocationKey})
        };
    };

  searchZip(searched){
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
}
