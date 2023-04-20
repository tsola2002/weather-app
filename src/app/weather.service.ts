import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  //apiKey = '14fe280929b43808d00f4037173197b4';

  constructor(private http:HttpClient) { }

  getWeather(): Observable<any>{
    // get information from weather API
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=lagos&appid=14fe280929b43808d00f4037173197b4&units=imperial');
    //return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}');
  }
}
