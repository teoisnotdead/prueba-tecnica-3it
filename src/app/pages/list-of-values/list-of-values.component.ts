import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmfChileService } from '../../services/cmf-chile.service';

@Component({
  selector: 'app-list-of-values',
  imports: [],
  templateUrl: './list-of-values.component.html',
  styleUrl: './list-of-values.component.css',
})
export class ListOfValuesComponent implements OnInit {
  indicatorId: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cmfChileService: CmfChileService
  ) {}

  ngOnInit() {
    this.getValueId();
  }

  getValueId = () => {
    this.route.paramMap.subscribe((params) => {
      this.indicatorId = params.get('id');
    });

    if (this.indicatorId) {
      this.getIndicatorValues(this.indicatorId);
    } else {
      console.log('No se encontró el id');
    }
  };

  getIndicatorValues = (indicator: string) => {
    this.cmfChileService.getCurrentValue(indicator).subscribe((res) => {
      console.log(res);
    });
  };
}
