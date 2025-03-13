import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmfChileService } from '../../services/cmf-chile.service';
import { getPastDate } from '../../utils/date.util';
import { IndicatorValue } from '../../interfaces/indicator.interface';
import { extractIndicatorValues } from '../../utils/toMatchValue';

@Component({
  selector: 'app-list-of-values',
  imports: [],
  templateUrl: './list-of-values.component.html',
  styleUrl: './list-of-values.component.css',
})
export class ListOfValuesComponent implements OnInit {
  indicatorValues: IndicatorValue[] = [];

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
        this.getIndicatorValues(id);
      } else {
        console.log('No se encontró el id');
      }
    });
  };

  getIndicatorValues(indicator: string) {
    const currentYear = new Date().getFullYear();

    if (['dolar', 'euro', 'uf'].includes(indicator)) {
      this.fetchLast30DaysValues(indicator);
    } else if (['ipc', 'utm'].includes(indicator)) {
      this.fetchCurrentYearValues(indicator, currentYear);
    } else {
      console.log('Indicador no válido');
    }
  }

  fetchLast30DaysValues(indicator: string) {
    const { year, month, day } = getPastDate(30);

    this.cmfChileService
      .getLastNDaysValues({ indicator, year, month, day })
      .subscribe((data) => {
        this.indicatorValues = extractIndicatorValues(data, indicator);
      });
  }

  fetchCurrentYearValues(indicator: string, currentYear: number) {
    this.cmfChileService
      .getCurrentYearValues({ indicator, year: currentYear })
      .subscribe((data) => {
        this.indicatorValues = extractIndicatorValues(data, indicator);
      });
  }
}
