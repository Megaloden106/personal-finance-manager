import { connect } from 'react-redux';
import Graph from './Graph';

interface StateProps {
  data: PortfolioData[];
  name: string | null;
}

const mapStateToProps = (state: AppState): StateProps => ({
  data: state.portfolio.data,
  name: state.portfolio.name,
});

export default connect(mapStateToProps)(Graph);
