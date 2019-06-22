import Locations from '../components/Locations';
const Home = props => (
  <div>
    <Locations page={ parseFloat(props.query.page) || 1 } />
  </div>
)

export default Home;