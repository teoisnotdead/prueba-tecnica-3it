import { Component, Input, OnChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IndicatorValue } from '../../interfaces/indicator.interface';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'indicator-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './indicator-chart.component.html',
  styleUrls: ['./indicator-chart.component.css'],
})
export class IndicatorChartComponent implements OnChanges {
  @Input() indicatorData!: IndicatorValue[];

  constructor() {
    Chart.register(...registerables);
  }

  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{ data: [], label: 'Valor del Indicador' }],
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  ngOnChanges() {
    if (!this.indicatorData || this.indicatorData.length === 0) return;

    const values = this.indicatorData;

    this.lineChartData = {
      labels: values.map((val) => val.Fecha ?? ''),
      datasets: [
        {
          data: values.map((val) => parseFloat(val.Valor ?? '0')),
          label: 'Indicador',
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          pointRadius: 5,
          pointBackgroundColor: 'red',
        },
      ],
    };
  }
}
