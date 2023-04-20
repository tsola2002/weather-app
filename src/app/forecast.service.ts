import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  apiKey = '14fe280929b43808d00f4037173197b4';
  apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http:HttpClient) { }

  getWeatherForecast(){
    return new Observable((observer) =>{
      navigator.geolocation.getCurrentPosition(
        (position) =>{
          observer.next(position)
        },
        (error)=>{
          observer.next(error)
        }
      )
    }).pipe(
      map((value:any) =>{
        return new HttpParams()
          .set('lon', value.coords.longitude)
          .set('lat', value.coords.latitude)
          .set('units', 'imperial')
          .set('appid', '14fe280929b43808d00f4037173197b4')          
      }),
      switchMap((values)=>{
        return this.http.get('https://api.openweathermap.org/data/2.5/forecast', { params: values });
      })
    )
  }

  getForecastByCity(cityName: string): Observable<any> {
    const url = `${this.apiUrl}/forecast?q=${cityName}&appid=${this.apiKey}&units=imperial`;
    return this.http.get(url);
  }
}
