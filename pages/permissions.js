import PleaseSignIn from '../components/PleaseSignIn';
import Permissions from '../components/Permissions';
import HasPermission from '../components/HasPermission';

const PermissionsPage = props => (
  <div>
    <PleaseSignIn>
      <HasPermission permissions="ADMIN,PERMISSIONUPDATE">
        <Permissions />
      </HasPermission>
    </PleaseSignIn>
  </div>
);

export default PermissionsPage;