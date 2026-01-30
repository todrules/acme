import {AfterViewInit, Component, Input} from '@angular/core';
import {AmChart, AmChartsService} from '@amcharts/amcharts3-angular';
import {ThemeService} from '../../../styles/theme';


@Component({
  selector: 'ui-bar',
  templateUrl: './bar-chart.html',
  styleUrls: ['./bar-chart.scss']
})
export class UiBarChart implements AfterViewInit {

  @Input() id: string;

  public chartConfig = {
    type: 'serial',
    categoryField: 'category',
    angle: 32,
    depth3D: 17,
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
      gridPosition: 'start',
      autoGridCount: false,
      axisAlpha: 0,
      axisColor: '#FFFFFF',
      axisThickness: 0,
      fontSize: 0,
      gridAlpha: 0,
      gridColor: '#FFFFFF',
      gridCount: 0,
      gridThickness: 0,
      labelsEnabled: false,
      showFirstLabel: false,
      showLastLabel: false,
      tickLength: 0,
      titleFontSize: 0
    },
    trendLines: [],
    graphs: [
      {
        balloonText: '[[title]] of [[category]]:[[value]]',
        fillAlphas: 0.88,
        id: 'AmGraph-1',
        labelText: '[[value]]',
        title: 'graph 1',
        type: 'column',
        valueField: 'column1'
      },
      {
        balloonText: '[[title]] of [[category]]:[[value]]',
        bullet: 'round',
        id: 'AmGraph-2',
        labelText: '[[value]]',
        lineThickness: 4,
        title: 'graph 2',
        type: 'smoothedLine',
        valueField: 'column2'
      }
    ],
    guides: [],
    valueAxes: [
      {
        id: 'ValueAxis-1',
        axisColor: '#FFFFFF',
        axisThickness: 0,
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
        titleFontSize: 0
      }
    ],
    allLabels: [],
    balloon: {},
    legend: {
      enabled: true,
      useGraphSettings: true
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
      category: 'category 1',
      column1: 8,
      column2: 5
    },
    {
      category: 'category 2',
      column1: 6,
      column2: 8
    },
    {
      category: 'category 3',
      column1: 2,
      column2: 5
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
