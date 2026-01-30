import {AfterViewInit, Component, Input} from '@angular/core';
import {AmChart, AmChartsModule, AmChartsService} from '@amcharts/amcharts3-angular';
import {ThemeService} from '../../../styles/theme';


@Component({
  selector: 'ui-area',
  templateUrl: './area-chart.html',
  styleUrls: ['./area-chart.scss'],
})
export class UiAreaChart implements AfterViewInit {

  @Input() id: string;

  public chartConfig = {
    type: 'serial',
    categoryField: 'date',
    angle: 36,
    depth3D: 31,
    hideCredits: true,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    plotAreaBorderColor: '#FFFFFF',
    startDuration: 1,
    autoDisplay: true,
    borderColor: '#FFFFFF',
    tapToActivate: false,
    theme: 'light',
    categoryAxis: {
      minPeriod: 'mm',
      parseDates: true,
      axisAlpha: 0,
      axisColor: '#FFFFFF',
      fontSize: 0,
      gridAlpha: 0,
      gridColor: '#FFFFFF',
      gridThickness: 0,
      labelFrequency: 0,
      labelsEnabled: false,
      minorGridAlpha: 0,
      showFirstLabel: false,
      showLastLabel: false,
      tickLength: 0,
      titleColor: '#FF8000',
      titleFontSize: 19
    },
    chartCursor: {
      enabled: true,
      categoryBalloonDateFormat: 'JJ:NN',
      tabIndex: -3
    },
    trendLines: [],
    graphs: [
      {
        balloonText: '[[title]] of [[category]]:[[value]]',
        fillAlphas: 0.88,
        id: 'AmGraph-1',
        lineAlpha: 0,
        labelText: '[[value]]',
        lineThickness: 4,
        title: 'graph 1',
        valueField: 'column1'
      },
      {
        balloonText: '[[title]] of [[category]]:[[value]]',
        fillAlphas: 0.5,
        id: 'AmGraph-2',
        lineAlpha: 0,
        labelText: '[[value]]',
        lineThickness: 4,
        title: 'graph 2',
        valueField: 'column2'
      }
    ],
    guides: [],
    valueAxes: [
      {
        id: 'ValueAxis-1',
        axisColor: '#FFFFFF',
        axisThickness: 0,
        axisFrequency: 0,
        autoGridCount: false,
        color: '#ffffff',
        fontSize: 0,
        gridAlpha: 0,
        gridColor: '#FFFFFF',
        gridCount: 0,
        gridThickness: 0,
        minorGridAlpha: 0,
        showFirstLabel: false,
        showLastLabel: false,
        tickLength: 0,
        title: 'Axis title',
        titleColor: '#ff8000',
        titleFontSize: 0
      }
    ],
    allLabels: [],
    balloon: {},
    legend: {
      enabled: true,
      useGraphSettings: true,
      borderColor: '#ffffff'
    },
    titles: [
      {
        id: 'Title-1',
        size: 15,
        text: 'Chart Title'
      }
    ],
    dataProvider: []
  };

  public data = [
    {
      date: '2014-03-01 07:57',
      column1: 8,
      column2: 5
    },
    {
      date: '2014-03-01 07:58',
      column1: 6,
      column2: 7
    },
    {
      date: '2014-03-01 07:59',
      column1: 2,
      column2: 3
    },
    {
      date: '2014-03-01 08:00',
      column1: 1,
      column2: 3
    },
    {
      date: '2014-03-01 08:01',
      column1: 2,
      column2: 1
    },
    {
      date: '2014-03-01 08:02',
      column1: 3,
      column2: 2
    },
    {
      date: '2014-03-01 08:03',
      column1: 6,
      column2: 8
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
