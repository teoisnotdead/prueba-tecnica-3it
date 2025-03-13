import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmfChileService } from '../../services/cmf-chile.service';
import { getLast12Months, getPastDate } from '../../utils/date.util';
import { extractIndicatorValues } from '../../utils/toMatchValue';
import { IndicatorValue } from '../../interfaces/indicator.interface';
import { IndicatorChartComponent } from '../../components/indicator-chart/indicator-chart.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-details',
  imports: [IndicatorChartComponent, MatIcon],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  indicatorValues: IndicatorValue[] = [];
  indicatorName: string = '';
  indicatorValue: string = '0';
  indicatorLastDate: string = '';
  indicatorKey: string = '';
  unit: string = 'Pesos';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cmfChileService: CmfChileService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.getValueId();
  }

  getValueId = () => {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.indicatorKey = id ?? '';

      if (id) {
        this.getDetailByIndicator(id);
      } else {
        console.log('No se encontró el id');
      }
    });
  };

  private setIndicatorMetadata(data: Record<string, any>) {
    const key = Object.keys(data)[0] ?? '';

    this.indicatorName = key;
    const valuesArray = data[key] ?? [];

    this.indicatorValue = valuesArray.at(-1)?.Valor ?? '0';
    this.indicatorLastDate = valuesArray.at(-1)?.Fecha ?? '';
  }

  getDetailByIndicator(indicator: string): void {
    if (['dolar', 'euro', 'uf'].includes(indicator)) {
      this.fetchLastNDaysValues(indicator);
    } else if (['ipc', 'utm'].includes(indicator)) {
      this.fetchLast12MonthsValues(indicator);
    } else {
      console.warn(`Indicador no reconocido: ${indicator}`);
    }
  }

  fetchLastNDaysValues(indicator: string): void {
    const pastDate = getPastDate(10);

    this.cmfChileService
      .getLastNDaysValues({ indicator, ...pastDate })
      .subscribe((data) => {
        this.setIndicatorMetadata(data);
        this.indicatorValues = extractIndicatorValues(data, indicator);
      });
  }

  fetchLast12MonthsValues(indicator: string): void {
    const period = getLast12Months();

    this.cmfChileService
      .getLast12MonthsValues({ indicator, ...period })
      .subscribe((data) => {
        this.setIndicatorMetadata(data);
        this.indicatorValues = extractIndicatorValues(data, indicator);
      });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
