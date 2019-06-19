import Locations from '../components/Locations';
const Home = props => (
  <div>
    <Locations page={ parseFloat(props.query.page) || 1 } />
    Hi everybody!

  </div>
)

export default Home;