import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { select } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { extent } from 'd3-array';
import { easeLinear } from 'd3-ease';
import 'd3-transition';
import styles from './Graph.scss';

const d3 = {
  select,
  scaleLinear,
  scaleTime,
  line,
  extent,
  easeLinear,
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

  const [filter, setFilter] = useState<PortfolioFilter>({ time: '180D', data: 'Balance' });
  const timeFilters = ['30D', '90D', '180D', '1Y', '5Y', '10Y', 'YTD', 'All'];
  const dataFilters = ['Balance', 'Returns', 'Transfers'];

  const d3Graph = useRef(null);
  const { current } = d3Graph;

  useEffect(() => {
    if (data.length) {
      const bal = data[data.length - 1].balance;
      const ret = bal - data[0].balance;
      const perc = ret / data[0].balance * 100;
      setBalance(bal);
      setReturns(ret > 0 ? `+$${ret.toLocaleString()}` : `-$${(-ret).toLocaleString()}`);
      setPercentage(ret > 0 ? `+${perc.toFixed(2)}%` : `-$${(-perc).toFixed(2)}%`);
    }
  }, [data]);

  useEffect(() => {
    if (data.length && current) {
      const svg = d3.select(current)
        .attr('width', width)
        .attr('height', height)
        .append('g');

      // set ranges
      const x = d3.scaleTime()
        .domain([data[0].date, data[data.length - 1].date])
        .range([0, width]);
      const y = d3.scaleLinear()
        .range([height, 0]);

      // define line
      const valueLine = d3.line<PortfolioEntry>()
        .x(d => x(d.date))
        .y(d => y(d.balance));

      x.domain(d3.extent(data, d => d.date) as Date[]);
      y.domain(d3.extent(data, d => d.balance) as number[]);

      // set data to appended path
      const drawLine = svg.selectAll('.path')
        .data([data]);

      const color = data[0].balance > data[data.length - 1].balance
        ? '#f45431' : data[0].balance < data[data.length - 1].balance
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
        .duration(1000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);

      lineEnter.exit()
        .remove();
    }
  }, [data, current]);

  // TODO: change data filters to radio
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
          </h5>
        </>
      )}
      <svg ref={d3Graph} />
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
