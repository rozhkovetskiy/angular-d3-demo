import * as d3 from 'd3';
import { ChartConfig } from '../../shared/models/chart-cofig.model';

export class LineChart {
  constructor(private _content: any) { }
  render(dataset, config: ChartConfig) {
    const margin = {top: 50, right: 50, bottom: 50, left: 50};

    const xScale = d3.scaleLinear()
      .domain([0, dataset.length])
      .range([0, config.width]);

    const yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([config.height, 0]);

    const svg = d3.select(this._content)
    .append('svg')
      .attr('width', config.width + margin.left + margin.right)
      .attr('height', config.height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.top}, ${margin.left})`);

    svg.append('g')
      .attr('transform', `translate(0, ${config.height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .call(d3.axisLeft(yScale));

    const line = d3.line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(dataset)
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .attr('stroke-width', '3')
      .attr('d', line);
  }

  rerender() { }
  resize() { }
  destroy() { }
}
