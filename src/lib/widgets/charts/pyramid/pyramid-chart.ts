import {AfterViewInit, Component, Input} from '@angular/core';
import {AmChart, AmChartsService} from '@amcharts/amcharts3-angular';
import {ThemeService} from '../../../styles/theme';


@Component({
  selector: 'ui-pyramid',
  templateUrl: './pyramid-chart.html',
  styleUrls: ['./pyramid-chart.scss']
})
export class UiPyramidChart implements AfterViewInit {

  @Input() id: string;

  public chartConfig = {
    type: 'funnel',
    angle: 0,
    balloonText: '[[title]]:<b>[[value]]</b>',
    depth3D: 30,
    hideCredits: true,
    labelPosition: 'right',
    pullDistance: 45,
    rotate: true,
    labelsEnabled: false,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
    marginBottom: 40,
    pullOutDuration: 3,
    titleField: 'title',
    valueField: 'value',
    autoDisplay: true,
    tapToActivate: false,
    theme: 'light',
    allLabels: [],
    balloon: {},
    titles: [],
    dataProvider: []
  };

  public data = [
    {
      title: 'Website visits',
      value: 145
    },
    {
      title: 'Downloads',
      value: 123
    },
    {
      title: 'Requested prices',
      value: 98
    },
    {
      title: 'Contacted',
      value: 72
    },
    {
      title: 'Purchased',
      value: 35
    },
    {
      title: 'Asked for support',
      value: 25
    },
    {
      title: 'Purchased more',
      value: 18
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
