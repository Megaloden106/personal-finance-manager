import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { select, mouse } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { extent, bisector } from 'd3-array';
import { easeLinear } from 'd3-ease';
import 'd3-transition';
import moment from 'moment';
import { convertToCamelCase, convertToMoney, convertToPercent } from '@/shared/util';
import RollingNumber from '../RollingNumber/RollingNumber';
import styles from './Graph.scss';

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

interface GraphProps {
  data: PortfolioData[];
  filter: PortfolioFilter;
  height: number;
  name: string | null;
  width: number;
  filterClick(filter: PortfolioFilter): void;
}

const Graph: FunctionComponent<GraphProps> = ({
  data,
  filter,
  height,
  name,
  width,
  filterClick,
}) => {
  const [balance, setBalance] = useState<number>(0);
  const [returns, setReturns] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [date, setDate] = useState<string>('');

  const d3Graph = useRef(null);
  const { current } = d3Graph;

  const timeFilters = ['30D', '90D', '180D', '1Y', '5Y', '10Y', 'YTD', 'All'];
  const dataFilters = ['Cumulative Returns'];

  const setNext = (next: PortfolioData, newDate: string = '') => {
    const start = data[0];
    const nextReturns = next.cumulativeReturns - start.cumulativeReturns;
    setBalance(next.balance);
    setReturns(nextReturns);
    setPercentage(nextReturns / start.balance * 100);
    setDate(newDate);
  };

  // update svg based on the filtered data
  useEffect(() => {
    if (data.length) {
      const end: PortfolioData = data[data.length - 1];
      const selector = convertToCamelCase(filter.data);
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

      x.domain(d3.extent(data, d => d.date) as Date[]);
      y.domain(d3.extent(data, d => d[selector]) as number[]);

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

      const length = (lineEnter.node() as SVGPathElement)
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
          .domain(d3.extent(data, (d: PortfolioData) => d.date) as Date[])
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
    <div className={styles.container}>
      <h1 className={styles.name}>{name}</h1>
      <h1 className={styles.balance}>
        <RollingNumber nextValue={balance} formatter={convertToMoney} />
      </h1>
      <h5 className={
        [
          styles.returns,
          returns > 0 ? styles.returnsPos : undefined,
          returns < 0 ? styles.returnsNeg : undefined,
        ].join(' ')}
      >
        <RollingNumber nextValue={returns} formatter={convertToMoney} />
        <span>&nbsp;(</span>
        <RollingNumber nextValue={percentage} formatter={convertToPercent} />
        <span>)</span>
        {date && (
          <span className={styles.date}>
            &nbsp;On&nbsp;
            {date}
          </span>
        )}
      </h5>
      <svg
        ref={d3Graph}
        height={height}
        width={width}
      />
      <div className={styles.filter}>
        <div className={styles.filterTime}>
          {timeFilters.map((tf: string) => (
            <button
              type="button"
              key={tf}
              className={tf === filter.time ? styles.selected : undefined}
              onClick={() => filterClick({ ...filter, time: tf })}
            >
              {tf}
            </button>
          ))}
        </div>
        <div className={styles.filterData}>
          {dataFilters.map((df: string) => (
            <button
              type="button"
              key={df}
              className={df === filter.data ? styles.selected : undefined}
              onClick={() => filterClick({ ...filter, data: df })}
            >
              {df}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Graph;
