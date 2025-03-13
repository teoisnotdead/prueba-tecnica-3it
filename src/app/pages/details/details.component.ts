import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmfChileService } from '../../services/cmf-chile.service';
import { getLast12Months, getPastDate } from '../../utils/date.util';
import { extractIndicatorValues } from '../../utils/toMatchValue';
import { IndicatorValue } from '../../interfaces/indicator.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  indicatorValues: IndicatorValue[] = [];
  indicatorName: string = '';
  unit: string = 'Pesos';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cmfChileService: CmfChileService
  ) {}

  ngOnInit() {
    this.getValueId();
  }

  getValueId = () => {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.getDetailByIndicator(id);
      } else {
        console.log('No se encontró el id');
      }
    });
  };

  getDetailByIndicator(indicator: string): void {
    if (['dolar', 'euro', 'uf'].includes(indicator)) {
      this.fetchLastNDaysValues(indicator);
    } else if (['ipc', 'utm'].includes(indicator)) {
      this.fetchLast12MonthsValues(indicator);
    } else {
      console.warn(`❌ Indicador no reconocido: ${indicator}`);
    }
  }

  fetchLastNDaysValues(indicator: string): void {
    const pastDate = getPastDate(10);

    this.cmfChileService
      .getLastNDaysValues({ indicator, ...pastDate })
      .subscribe((data) => {
        const key = Object.keys(data)[0];
        this.indicatorName = key;
        console.log(`📊 Valores de ${indicator} en los últimos 10 días:`, data);
        this.indicatorValues = extractIndicatorValues(data, indicator);
      });
  }

  fetchLast12MonthsValues(indicator: string): void {
    const period = getLast12Months();

    this.cmfChileService
      .getLast12MonthsValues({ indicator, ...period })
      .subscribe((data) => {
        const key = Object.keys(data)[0];
        this.indicatorName = key;
        console.log(
          `📊 Valores de ${indicator} en los últimos 12 meses:`,
          data
        );
        this.indicatorValues = extractIndicatorValues(data, indicator);
      });
  }
}
