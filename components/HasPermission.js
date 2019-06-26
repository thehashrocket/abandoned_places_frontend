import { Query, Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import gql from 'graphql-tag';

const HAS_PERMISSIONS_QUERY = gql`
	query hasPermissions($permissions: String!) {
		hasPermissions(permissions: $permissions) {
      id
      email
    }
	}
`;

const HasPermission = props => <Query
  query={ HAS_PERMISSIONS_QUERY }
  variables={ { permissions: props.permissions } }>
  { ({ data, loading }) => {
    if (loading) return <p>Loading...</p>
    if (!data.hasPermissions) {
      return (
        <div>
          <p>You do not have permission to be here.</p>
        </div>
      )
    }
    return props.children
  } }
</Query>

export default HasPermission;