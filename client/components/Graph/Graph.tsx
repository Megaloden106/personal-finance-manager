import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { select, mouse } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { extent, bisector } from 'd3-array';
import { easeLinear } from 'd3-ease';
import 'd3-transition';
import moment from 'moment';
import { convertToCamelCase } from '@/shared/util';
import { fetchPortfolioData } from '@/reducers/portfolio';
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
};

interface StateProps {
  data: PortfolioData[];
  id: string | number | null;
}

interface DispatchProps {
  getPortfolioData(
    id: string | number,
    params: PortfolioParam,
  ): void;
}

interface ParentProps {
  height: number;
  width: number;
}

type GraphProps = StateProps & DispatchProps & ParentProps;

const Graph: FunctionComponent<GraphProps> = ({
  id,
  data,
  getPortfolioData,
  height,
  width,
}) => {
  const [next, setNext] = useState<PortfolioData | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [returns, setReturns] = useState<number>(0);
  const [date, setDate] = useState<string>('');

  const [filter, setFilter] = useState<PortfolioFilter>({ time: '180D', data: 'Cumulative Returns' });
  const [filterData, setFilterData] = useState<PortfolioData[]>([]);

  const d3Graph = useRef(null);
  const { current } = d3Graph;

  useEffect(() => {
    if (id) {
      const params = { range: filter.time };

      getPortfolioData(id, params);
    }
  }, [id, filter.time]);

  useEffect(() => {
    if (next) {
      setBalance(next.balance);
      setReturns(next.cumulativeReturns);
    }
  }, [next]);

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
      const cumulative = { returns: -modifiedData[0].returns };

      // update filter data state
      setFilterData(modifiedData.map((d: PortfolioData): PortfolioData => {
        cumulative.returns += d.returns;
        return {
          ...d,
          cumulativeReturns: cumulative.returns,
        };
      }));
    }
  }, [data, filter.time, filter.data]);

  // update svg based on the filtered data
  useEffect(() => {
    if (filterData.length) {
      setNext(filterData[filterData.length - 1]);
      const selector = filter.data === 'Balance' ? filter.data.toLowerCase() : convertToCamelCase(filter.data);

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

      x.domain(d3.extent(filterData, d => d.date) as Date[]);
      y.domain(d3.extent(filterData, d => d[selector]) as number[]);

      // set data to appended path
      const drawLine = svg.selectAll('.path')
        .data([filterData]);

      // set color for line
      const first = filterData[0][selector];
      const last = filterData[filterData.length - 1][selector];
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
        .data([filterData]);

      const zeroLineEnter = zeroLine.enter()
        .append('g');

      const startValue = filterData[0][selector];

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
          .domain(d3.extent(filterData, (d: PortfolioData) => d.date) as Date[])
          .range([0, width]);
        const hoverDate = dx.invert(mx);
        const index = left(filterData, hoverDate, 1);
        const a: PortfolioData = filterData[index - 1];
        const b: PortfolioData = filterData[index];
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
          const dy = dp[selector];

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

  return (
    <div className={styles.container}>
      {filterData.length && next && (
        <GraphStats
          filter={filter}
          start={filterData[0].balance}
          balance={balance}
          returns={returns}
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
  id: state.portfolio.id,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getPortfolioData: (id, params) => dispatch(fetchPortfolioData(id, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
