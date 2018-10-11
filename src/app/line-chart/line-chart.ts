import * as d3 from 'd3';
import { ChartConfig } from '../../shared/models/chart-cofig.model';


export class LineChart {

  constructor(private _content: any) { }

  render(dataset: any, config: ChartConfig) {
    const margin = {top: 50, right: 50, bottom: 50, left: 50};

    const dateParser = d3.timeParse('%Y%m%d');
    dataset.forEach((item) => item.date = dateParser(item.date));

    const xScale = d3.scaleTime()
      .range([0, config.width])
      .domain(d3.extent(dataset, (d) => d.date));

    const yScale = d3.scaleLinear()
      .domain([
        d3.min(dataset, (d) => Math.min(d['New York'], d['San Francisco'], d['Austin'])),
        d3.max(dataset, (d) => Math.max(d['New York'], d['San Francisco'], d['Austin']))
      ])
      .range([config.height, 0]);

    const line1 = d3.line()
      .x((d) => xScale(d['date']))
      .y((d) => yScale(d['New York']))
      .curve(d3.curveMonotoneX);

    const line2 = d3.line()
      .x((d) => xScale(d['date']))
      .y((d) => yScale(d['San Francisco']))
      .curve(d3.curveMonotoneX);


    const line3 = d3.line()
      .x((d) => xScale(d['date']))
      .y((d) => yScale(d['Austin']))
      .curve(d3.curveMonotoneX);

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

    svg.append('path')
      .datum(dataset)
      .attr('id', 'ny')
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', '2')
      .attr('d', line1);

    svg.append('path')
      .datum(dataset)
      .attr('id', 'sf')
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', '2')
      .attr('d', line2);

    svg.append('path')
      .datum(dataset)
      .attr('id', 'au')
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', '2')
      .attr('d', line3);
  }

  rerender() { }
  resize() { }
  destroy() {
    d3.select('svg').remove();
  }

  public showLine(id: string): void {
    d3.select(`path#${id}`)
      .attr('visibility', 'visible');
  }

  public hideLine(id: string): void {
    d3.select(`path#${id}`)
      .attr('visibility', 'hidden');
  }
}
