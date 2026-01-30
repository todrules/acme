import {AfterViewInit, Component, Input} from '@angular/core';
import {AmChart, AmChartsService} from '@amcharts/amcharts3-angular';
import {ThemeService} from '../../../styles/theme';


@Component({
  selector: 'ui-pie',
  templateUrl: './pie-chart.html',
  styleUrls: ['./pie-chart.scss']
})
export class UiPieChart implements AfterViewInit {

  @Input() id: string;

  public chartConfig = {
    type: 'pie',
    angle: 10.8,
    depth3D: 20,
    hideCredits: true,
    innerRadius: '42%',
    outlineAlpha: 0,
    titleField: 'category',
    valueField: 'columnNum',
    autoDisplay: true,
    tapToActivate: false,
    theme: 'light',
    allLabels: [],
    balloon: {},
    legend: {
      enabled: true,
      align: 'center',
      marginLeft: 0,
      marginRight: 0,
      markerType: 'circle'
    },
    titles: [],
    dataProvider: []
  };

  public data = [
    {
      category: 'category 1',
      columnNum: 8
    },
    {
      category: 'category 2',
      columnNum: 6
    },
    {
      category: 'category 3',
      columnNum: 2
    }
  ];

  private chart: AmChart;

  constructor(private amCharts: AmChartsService, private themeService: ThemeService) {

    this.chartConfig.dataProvider = this.data;
    amCharts.theme = themeService.getChartTheme();
  }

  ngAfterViewInit() {
    this.viewInit();
  }

  private viewInit = () => {
    this.chart = this.amCharts.makeChart(this.id, this.chartConfig);
  }
}
