import * as d3 from 'd3';
import { ChartConfig } from '../../shared/models/chart-cofig.model';

interface IChartData {
  date: number;
  value: number;
}
export class LineChart {

  private xScale: any;
  private yScale: any;
  private line: any;
  private svg: any;
  private dateParser: any;

  constructor(private _content: any) { }

  render(dataset: IChartData[], config: ChartConfig) {
    const margin = {top: 50, right: 50, bottom: 50, left: 50};

    this.dateParser = d3.timeParse('%Y%m%d');

    dataset.forEach((item) => item.date = this.dateParser(item.date));
    this.xScale = d3.scaleTime()
      .range([0, config.width])
      .domain(d3.extent(dataset, (d) => d.date));

    this.yScale = d3.scaleLinear()
      .domain([
        d3.min(dataset, (d) => d.value),
        d3.max(dataset, (d) => d.value)
      ])
      .range([config.height, 0]);

    this.line = d3.line()
      .x((d) => this.xScale(d.date))
      .y((d) => this.yScale(d.value))
      .curve(d3.curveMonotoneX);

    this.svg = d3.select(this._content)
      .append('svg')
        .attr('width', config.width + margin.left + margin.right)
        .attr('height', config.height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.top}, ${margin.left})`);

    this.svg.append('g')
      .attr('transform', `translate(0, ${config.height})`)
      .call(d3.axisBottom(this.xScale));

    this.svg.append('g')
      .call(d3.axisLeft(this.yScale));

    this.svg.append('path')
      .datum(dataset)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', '2')
      .attr('d', this.line);
  }

  rerender() { }
  resize() { }
  destroy() { }

  public addLine(dataset: IChartData[], color: string) {
    const convertedDataset = this.convertDataset(dataset);

    this.svg.append('path')
      .datum(convertedDataset)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', '2')
      .attr('d', this.line);
  }

  private convertDataset(dataset: IChartData[]): Object {
    dataset.forEach((item) => {
      item.date = this.dateParser(item.date);
    });

    return dataset;
  }

}
