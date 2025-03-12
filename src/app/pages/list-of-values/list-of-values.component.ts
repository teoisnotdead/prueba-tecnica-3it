import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmfChileService } from '../../services/cmf-chile.service';
import { getPastDate } from '../../utils/date.util';

@Component({
  selector: 'app-list-of-values',
  imports: [],
  templateUrl: './list-of-values.component.html',
  styleUrl: './list-of-values.component.css',
})
export class ListOfValuesComponent implements OnInit {
  
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
      .getLast30DaysValues(indicator, year, month, day)
      .subscribe((data) => {
        console.log(`Valores de ${indicator} en los últimos 30 días:`, data);
      });
  }

  fetchCurrentYearValues(indicator: string, currentYear: number) {
    this.cmfChileService
      .getCurrentYearValues(indicator, currentYear)
      .subscribe((data) => {
        console.log(`Valores de ${indicator} en el año ${currentYear}:`, data);
      });
  }
}
