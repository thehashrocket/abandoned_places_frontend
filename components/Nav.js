import Link from 'next/link'
import { Mutation } from 'react-apollo';
import { TOGGLE_SIDEBAR_MUTATION } from './Sidebar';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';

const Nav = () => (

    <User>
    { ({ data: { me } }) => (

        <NavStyles>
          <Link href="/locations">
            <a>Locations</a>
          </Link>
        {
          me && (
            <>
              <Link href="/add">
                <a>Add</a>
              </Link>

              <Link href="/me">
                <a>Account</a>
              </Link>
              <Signout />
              <Mutation mutation={TOGGLE_SIDEBAR_MUTATION}>
                { (toggleSidebar) => (
                  <button onClick={toggleSidebar}>Sidebar</button>
                )}
              </Mutation>
            </>
          )
        }


        { !me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
          )}

        </NavStyles>
      )}
    </User>

);

export default Nav;