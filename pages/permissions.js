import PleaseSignIn from '../components/PleaseSignIn';
import Permissions from '../components/Permissions';
import HasPermission from '../components/HasPermission';

const PermissionsPage = props => (
  <div>
    <PleaseSignIn>
      <Permissions />
    </PleaseSignIn>
  </div>
);

export default PermissionsPage;