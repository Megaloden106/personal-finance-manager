import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { take } from 'rxjs/operators';
import { select, mouse } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { extent, bisector } from 'd3-array';
import { easeLinear } from 'd3-ease';
import { interpolateNumber } from 'd3-interpolate';
import 'd3-transition';
import moment from 'moment';
import { Subscription, interval } from 'rxjs';
import GraphStats from './GraphStats/GraphStats';
import GraphFilters from './GraphFilters/GraphFilters';
import styles from './Graph.scss';

const d3 = {
  select,
  scaleLinear,
  scaleTime,
  line,
  extent,
  easeLinear,
  mouse,
  bisector,
  interpolateNumber,
};

interface StateProps {
  data: PortfolioEntry[];
}

interface ParentProps {
  height: number;
  width: number;
}

type GraphProps = StateProps & ParentProps;

const Graph: FunctionComponent<GraphProps> = ({
  data,
  height,
  width,
}) => {
  const [next, setNext] = useState<PortfolioEntry | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [returns, setReturns] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [date, setDate] = useState<string>('');

  const [filter, setFilter] = useState<PortfolioFilter>({ time: '180D', data: 'Balance' });
  const [filterData, setFilterData] = useState<PortfolioEntry[]>([]);

  const d3Graph = useRef(null);
  const { current } = d3Graph;

  // update filtered data based on data and filters
  useEffect(() => {
    if (data.length && current) {
      const filterDate = moment(data[data.length - 1].date);
      if (filter.time.match(/\d+/)) {
        const count = filter.time.match(/\d+/) as string[];
        const timeframe = filter.time.match(/D$/) ? 'days' : 'years';
        filterDate.subtract(count[0], timeframe);
      } else {
        filterDate.startOf('year');
      }

      // filter data based on filter time
      const modifiedData = filter.time !== 'All'
        ? data.filter(d => filterDate.diff(d.date) <= 0)
        : data;

      // get cumulative values for filtered data
      const cumulative: Cumulative = {
        balance: 0,
        returns: -modifiedData[0].returns,
        transfers: -modifiedData[0].transfers,
      };

      // update filter data state
      setFilterData(modifiedData.map((d: PortfolioEntry): PortfolioEntry => {
        cumulative.balance = d.balance;
        cumulative.returns += d.returns;
        cumulative.transfers += d.transfers;
        return {
          ...d,
          cBalance: cumulative.balance,
          cReturns: cumulative.returns,
          cTransfers: cumulative.transfers,
        };
      }));
    }
  }, [data, filter.time, filter.data]);

  // update svg based on the filtered data
  useEffect(() => {
    if (filterData.length) {
      setNext(filterData[filterData.length - 1]);

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
      const valueLine = d3.line<PortfolioEntry>()
        .x(d => x(d.date))
        .y(d => y(d[`c${filter.data}`]));

      x.domain(d3.extent(filterData, d => d.date) as Date[]);
      y.domain(d3.extent(filterData, d => d[`c${filter.data}`]) as number[]);

      // set data to appended path
      const drawLine = svg.selectAll('.path')
        .data([filterData]);

      // set color for line
      const first = filterData[0][`c${filter.data}`];
      const last = filterData[filterData.length - 1][`c${filter.data}`];
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

      // helper func to determine dot snapping
      const { left } = d3.bisector((d: PortfolioEntry) => d.date);
      const bisect = (mx: number) => {
        const dx = d3.scaleTime()
          .domain(d3.extent(filterData, (d: PortfolioEntry) => d.date) as Date[])
          .range([0, width]);
        const hoverDate = dx.invert(mx);
        const index = left(filterData, hoverDate, 1);
        const a: PortfolioEntry = filterData[index - 1];
        const b: PortfolioEntry = filterData[index];
        return moment(hoverDate).diff(a.date) > moment(b.date).diff(hoverDate) ? b : a;
      };

      const focus = svg.selectAll('.focus')
        .data([filterData]);

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
          setNext(filterData[filterData.length - 1]);
          setDate('');
        })
        .on('mousemove', function mousemove() {
          // get datapoint
          const dp = bisect(d3.mouse(this)[0]);
          const dy = dp[`c${filter.data}`];

          // move focus to snapping location
          focusEnter.attr('transform', `translate(${x(dp.date)}, 0)`);
          focusEnter.select('circle')
            .attr('transform', `translate(0, ${y(dy)})`);

          // recalc balance
          setNext(dp);
          setDate(moment(dp.date).format('MMM D, YYYY'));
        });
    }
  }, [filterData, current]);

  // use subscription to update values in transition/animation
  let subscription: Subscription;
  useEffect(() => {
    if (next) {
      if (subscription) subscription.unsubscribe();
      const nextPercent = next.cReturns as number / filterData[0].balance * 100;

      // get interpolated values
      const interBalance = d3.interpolateNumber(balance, next.cBalance);
      const interReturns = d3.interpolateNumber(returns, next.cReturns);
      const interPercentage = d3.interpolateNumber(percentage, nextPercent);

      // set an interval of 100ms to transition from perv to next
      subscription = interval(1).pipe(
        take(50),
      ).subscribe((i: number) => {
        setBalance(interBalance((i + 1) * 5 / 250));
        setReturns(interReturns((i + 1) * 5 / 250));
        setPercentage(interPercentage((i + 1) * 5 / 250));
      });

      return () => subscription.unsubscribe();
    }

    return undefined;
  }, [next]);

  return (
    <div className={styles.container}>
      {data.length && (
        <GraphStats
          balance={balance}
          returns={returns}
          percentage={percentage}
          date={date}
        />
      )}
      <svg
        ref={d3Graph}
        height={height}
        width={width}
      />
      <GraphFilters
        filter={filter}
        setFilter={(pf: PortfolioFilter) => setFilter(pf)}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  data: state.portfolio.data,
});

export default connect(mapStateToProps)(Graph);
