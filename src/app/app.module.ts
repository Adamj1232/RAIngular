import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { CurrentWeatherComponent } from './current-weather.component'
import { SevenHourWeatherComponent } from './seven-hour-weather.component'
import { WeatherService } from './weather.service'


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    SevenHourWeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
