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

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  }
  public barChartLabels = ['2007', '2008', '2009','2010', '2011','2012']
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData=[
    {data:[65, 59, 80, 81, 56, 55, 40], label: 'Series A'  },
    {data:[28, 55, 19, 10, 60, 27, 90], label: 'Series B'  }
  ]

  constructor(private breakpointObserver: BreakpointObserver) {}

}
