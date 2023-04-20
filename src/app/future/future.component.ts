import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { pluck } from 'rxjs/operators';


@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.css']
})
export class FutureComponent implements OnInit {

  weatherData: any = [];
  cityName: string = 'new york';

  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    // this.forecastService.getWeatherForecast().pipe(
    //   pluck('list')
    // )
    // .subscribe(data =>{
    //   //console.log("FUTURE DATA", data);
    //   this.futureForecast(data);
      
    // });

    //get forecast by city data from input form
    this.getForecastByCityData(this.cityName);
    this.cityName = '';
  

  }

  onSubmit() {
    this.getForecastByCityData(this.cityName);
    this.cityName = '';
  }

  private getForecastByCityData(cityName: string){
    this.forecastService.getForecastByCity(cityName).pipe(
      pluck('list')
     )
     .subscribe({
        next: (data) => {    
          this.futureForecast(data);
          //console.log("FORECAST BY CITY DATA", data);
        },
        error: (error) =>console.log(error.message),
  
        complete: () => console.info('API call completed')
        
     });
  }

  getWeatherData(cityName: string) {

    this.forecastService.getWeatherForecast().pipe(
      pluck('list')
    )
    .subscribe(data =>{
      //console.log("FUTURE DATA", data);
      this.futureForecast(data);
      
    });
  }

  futureForecast(data: any) {
    for(let i=0; i < data.length; i = i + 8) {
      this.weatherData.push(data[i]);
    }
    console.log("NEW YORK PUSHED WEATHER DATA", this.weatherData);
  }

}
