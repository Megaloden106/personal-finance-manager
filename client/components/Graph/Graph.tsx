import React, { FC, useEffect, useRef } from 'react';
import { select, mouse } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { extent, bisector } from 'd3-array';
import { easeLinear } from 'd3-ease';
import 'd3-transition';
import moment from 'moment';
import { convertToCamelCase } from '@/utils/util';
import { PortfolioData } from '@/store/models/portfolio';
import { GraphProps } from './models/Graph';

const d3 = {
  bisector,
  easeLinear,
  extent,
  line,
  mouse,
  select,
  scaleLinear,
  scaleTime,
};

const Graph: FC<GraphProps> = ({
  data,
  filter,
  height,
  width,
  setNext,
}) => {
  const d3Graph = useRef(null);
  const { current } = d3Graph;

  // update svg based on the filtered data
  useEffect(() => {
    if (data.length) {
      const end: PortfolioData = data[data.length - 1];
      const selector = convertToCamelCase(filter.data || '');
      setNext(end);

      d3.select(current)
        .selectAll('g')
        .remove();

      const svg = d3.select(current)
        .append('g');

      // set ranges
      const x = d3.scaleTime()
        .domain([data[0].date, data[data.length - 1].date])
        .range([4, width - 4]);
      const y = d3.scaleLinear()
        .range([height - 4, 4]);

      // define line
      const valueLine = d3.line<PortfolioData>()
        .x(d => x(d.date))
        .y(d => y(d[selector]));

      x.domain(d3.extent(data, d => d.date));
      y.domain(d3.extent(data, d => d[selector]));

      // set data to appended path
      const drawLine = svg.selectAll('.path')
        .data([data]);

      // set color for line
      const first = data[0][selector];
      const last = data[data.length - 1][selector];
      const color = first > last
        ? '#f45431' : last > first
          ? '#21ce99' : '#888';

      const lineEnter = drawLine.enter()
        .append('path')
        .attr('d', valueLine)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', '1px');

      const length = lineEnter.node()
        .getTotalLength();

      // stroke transition
      lineEnter.attr('stroke-dasharray', `${length} ${length}`)
        .attr('stroke-dashoffset', length)
        .raise()
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);

      lineEnter.exit()
        .remove();

      // append dotted zero line
      const zeroLine = svg.selectAll('.zero-line')
        .data([data]);

      const zeroLineEnter = zeroLine.enter()
        .append('g');

      const startValue = data[0][selector];

      zeroLineEnter.append('line')
        .attr('stroke', '#888')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '1, 5')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('transform', `translate(0, ${y(startValue)})`);

      // helper func to determine dot snapping
      const { left } = d3.bisector((d: PortfolioData) => d.date);
      const bisect = (mx: number) => {
        const dx = d3.scaleTime()
          .domain(d3.extent(data, (d: PortfolioData) => d.date))
          .range([0, width]);
        const hoverDate = dx.invert(mx);
        const index = left(data, hoverDate, 1);
        const a: PortfolioData = data[index - 1];
        const b: PortfolioData = data[index];
        return moment(hoverDate).diff(a.date) > moment(b.date).diff(hoverDate) ? b : a;
      };

      const focus = svg.selectAll('.focus')
        .data([data]);

      const focusEnter = focus.enter()
        .append('g')
        .style('display', 'none');

      // append dotted line
      focusEnter.append('line')
        .attr('stroke', color)
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3, 3')
        .attr('y1', 0)
        .attr('y2', height);

      // append dot
      focusEnter.append('circle')
        .attr('fill', color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('r', 5);

      // append hover layer
      svg.append('rect')
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', () => focusEnter.style('display', null))
        .on('mouseout', () => {
          focusEnter.style('display', 'none');
          setNext(end);
        })
        .on('mousemove', function mousemove() {
          // get datapoint
          const dp = bisect(d3.mouse(this)[0]);
          const dy = dp[selector];

          // move focus to snapping location
          focusEnter.attr('transform', `translate(${x(dp.date)}, 0)`);
          focusEnter.select('circle')
            .attr('transform', `translate(0, ${y(dy)})`);

          // recalc balance
          setNext(dp, moment(dp.date).format('MMM D, YYYY'));
        });
    }
  }, [data, current]);

  return (
    <svg
      ref={d3Graph}
      height={height}
      width={width}
    />
  );
};

export default Graph;
