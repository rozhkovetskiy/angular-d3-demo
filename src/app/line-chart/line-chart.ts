import * as d3 from 'd3';
import { ChartConfig } from '../../shared/models/chart-cofig.model';

export class LineChart {
  private _xScale: any;
  private _yScale: any;
  private _svg: any;

  constructor(private _content: any) { }

  render(dataset: any, config: ChartConfig) {
    const margin = {top: 50, right: 50, bottom: 50, left: 50};

    const dateParser = d3.timeParse('%Y%m%d');
    const colorScale = d3.scaleOrdinal(d3['schemeCategory10']);

    dataset.forEach((item) => {
      item.date = dateParser(item.date);
    });

    this._xScale = d3.scaleTime()
      .range([0, config.width])
      .domain(d3.extent(dataset, (d: any) => new Date(d.date)));

    this._yScale = d3.scaleLinear()
      .domain([
        d3.min(dataset, (d) => Math.min(d['New York'], d['San Francisco'], d['Austin'])),
        d3.max(dataset, (d) => Math.max(d['New York'], d['San Francisco'], d['Austin']))
      ])
      .range([config.height, 0]);

    this._svg = d3.select(this._content)
      .append('svg')
        .attr('width', config.width + margin.left + margin.right)
        .attr('height', config.height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.top}, ${margin.left})`);

    this._svg.append('g')
      .attr('transform', `translate(0, ${config.height})`)
      .call(d3.axisBottom(this._xScale));

    this._svg.append('g')
      .call(d3.axisLeft(this._yScale));

    const datasetConfig = Object.keys(dataset[0]).splice(1).map((item) => {
      return {id: item.replace(' ', ''), name: item};
    });

    datasetConfig.forEach((item, index) => {
      this.addLine(dataset, item.id, item.name, colorScale(index));
    });
  }

  rerender() { }
  resize() { }

  destroy() {
    d3.select('svg').remove();
  }

  public toggleLine(id: string, state: boolean) {
    const line = d3.select(`path#${id}`);
    if (state) {
      line.attr('visibility', 'visible');
    } else {
      line.attr('visibility', 'hidden');
    }
  }

  private addLine(dataset: any, id: string, name: string, color: string) {
    const line = d3.line()
    .x((d) => this._xScale(d['date']))
    .y((d) => this._yScale(d[name]))
    .curve(d3.curveMonotoneX);

    this._svg.append('path')
      .datum(dataset)
      .attr('id', id)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', '2')
      .attr('d', line);
  }
}
