import { connect } from 'react-redux';
import Graph from './Graph';
import { AppState } from '@/store/models/store';
import { StateProps } from './models/Graph';

const mapStateToProps = (state: AppState): StateProps => ({
  data: state.portfolio.selected.data,
  name: state.portfolio.selected.name,
});

export default connect(mapStateToProps)(Graph);
