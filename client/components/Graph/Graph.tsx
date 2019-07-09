import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { select, mouse } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { extent, bisector } from 'd3-array';
import { easeLinear } from 'd3-ease';
import moment from 'moment';
import 'd3-transition';
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
  name: string | null;
  data: PortfolioEntry[];
}

interface ParentProps {
  height: number;
  width: number;
}

type GraphProps = StateProps & ParentProps;

const Graph: FunctionComponent<GraphProps> = ({
  name,
  data,
  height,
  width,
}) => {
  const [balance, setBalance] = useState<number>(0);
  const [returns, setReturns] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const [filter, setFilter] = useState<PortfolioFilter>({ time: '180D', data: 'Balance' });
  const timeFilters = ['30D', '90D', '180D', '1Y', '5Y', '10Y', 'YTD', 'All'];
  const dataFilters = ['Balance', 'Returns', 'Transfers'];

  const d3Graph = useRef(null);
  const { current } = d3Graph;

  const updateValues = (filterData: PortfolioEntry[]) => {
    const bal = filterData[filterData.length - 1].balance;
    const ret = filterData[filterData.length - 1].returns;
    const perc = ret / filterData[0].balance * 100;
    setBalance(bal);
    setReturns(ret > 0 ? `+$${ret.toLocaleString()}` : `-$${(-ret).toLocaleString()}`);
    setPercentage(ret > 0 ? `+${perc.toFixed(2)}%` : `-$${(-perc).toFixed(2)}%`);
  };

  const getFilterData = () => {
    const filterDate = moment(data[data.length - 1].date);
    if (filter.time.match(/\d+/)) {
      const count = filter.time.match(/\d+/) as string[];
      const timeframe = filter.time.match(/D$/) ? 'days' : 'years';
      filterDate.subtract(count[0], timeframe);
    } else {
      filterDate.startOf('year');
    }

    let filterData = filter.time !== 'All'
      ? data.filter(d => filterDate.diff(d.date) <= 0)
      : data;

    const cumulative: Cumulative = {
      balance: 0,
      returns: -filterData[0].returns,
      transfers: -filterData[0].transfers,
    };
    filterData = filterData.map((d: PortfolioEntry): PortfolioEntry => {
      cumulative.balance = d.balance;
      cumulative.returns += d.returns;
      cumulative.transfers += d.transfers;
      return {
        ...d,
        cBalance: cumulative.balance,
        cReturns: cumulative.returns,
        cTransfers: cumulative.transfers,
      };
    });
    cumulative.balance -= filterData[0].balance;

    updateValues(filterData);
    return filterData;
  };

  useEffect(() => {
    if (data.length && current) {
      const filterData = getFilterData();

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
          updateValues(filterData);
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
          const ret = dp.cReturns as number;
          const perc = ret / filterData[0].balance * 100;
          setBalance(dp.cBalance as number);
          setReturns(ret >= 0 ? `+$${ret.toLocaleString()}` : `-$${(-ret).toLocaleString()}`);
          setPercentage(ret >= 0 ? `+${perc.toFixed(2)}%` : `-$${(-perc).toFixed(2)}%`);
          setDate(moment(dp.date).format('MMM D, YYYY'));
        });
    }
  }, [data, current, filter.time, filter.data]);

  return (
    <div className={styles.container}>
      {data.length && (
        <>
          <h1 className={styles.name}>{name}</h1>
          <h1 className={styles.balance}>{`$${balance.toLocaleString()}`}</h1>
          <h5 className={
            [
              styles.returns,
              returns[0] === '+' ? styles.returnsPos : undefined,
              returns[0] === '-' ? styles.returnsNeg : undefined,
            ].join(' ')}
          >
            {`${returns} (${percentage})`}
            {date && (
              <span className={styles.date}>
                &nbsp;On&nbsp;
                {date}
              </span>
            )}
          </h5>
        </>
      )}
      <svg
        ref={d3Graph}
        height={height}
        width={width}
      />
      <div className={styles.filter}>
        <nav className={styles.filterTime}>
          <ul>
            {timeFilters.map((tf: string) => (
              <li className={tf === filter.time ? styles.selected : undefined}>
                <button type="button" onClick={() => setFilter({ ...filter, time: tf })}>
                  {tf}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <nav className={styles.filterData}>
          <ul>
            {dataFilters.map((df: string) => (
              <li className={df === filter.data ? styles.selected : undefined}>
                <button type="button" onClick={() => setFilter({ ...filter, data: df })}>
                  {df}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  name: state.portfolio.name,
  data: state.portfolio.data,
});

export default connect(mapStateToProps)(Graph);
