import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';


@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  timeline = [];
  weatherNow: any;
  currentTime = new Date();
  location: any;

  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    this.forecastService.getWeatherForecast().subscribe(data => {
      this.getTodayForecast(data);
    //  console.log("FORECAST SERVICE DATA", data);
    });

  }

  getTodayForecast(today:any) {
    console.log("TODAY", today);
    this.location = today.city;
    for (const forecast of today.list.slice(0, 8)) {
      //console.log("FORECAST DATA", forecast);
      // this.timeline.push({
      //   time: forecast.dt_txt,
      //   temp: forecast.main.temp  
      // });


      const apiDate = new Date(forecast.dt_txt).getTime();

      if(this.dateRange().start.getTime() <= apiDate && this.dateRange().to.getTime() >= apiDate) {
        this.weatherNow = forecast;
        console.log("WEATHER NOW",this.weatherNow);
      }

    }
  }

  dateRange(){
    const start = new Date();
    start.setHours(start.getHours() + (start.getTimezoneOffset() / 60));
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);

    return { start, to };
  }



}
