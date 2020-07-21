import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  // bar chart
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  }
  public barChartLabels = ['2007', '2008', '2009','2010', '2011','2012']
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData=[
    {data:[65, 59, 80, 81, 56, 55, 40], label: 'Series A'  },
    {data:[28, 55, 19, 30, 60, 27, 90], label: 'Series B'  }
  ]

  //#region  pie chart
 // Pie
 public pieChartLabels:string[] = ['Chrome', 'Safari', 'Firefox','Internet Explorer','Other'];
 public pieChartData:number[] = [40, 20, 20 , 10,10];
 public pieChartType:string = 'pie';

 // events
 public chartClicked(e:any):void {
   console.log(e);
 }

 public chartHovered(e:any):void {
   console.log(e);
 }
  //#endregion

  constructor(private breakpointObserver: BreakpointObserver) {}

}
