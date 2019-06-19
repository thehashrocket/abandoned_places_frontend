import Link from 'next/link';
import CreateLocation from '../components/CreateLocation';
import PleaseSignIn from '../components/PleaseSignIn';
const Add = props => (
  <div>
    <PleaseSignIn>
      <CreateLocation></CreateLocation>
    </PleaseSignIn>
  </div>
);

export default Add;