import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Supreme from './styles/Supreme';
import SidebarStyles from './styles/SidebarStyles';
import CloseButton from './styles/CloseButton';
import TheButton from './styles/TheButton';

const LOCAL_STATE_QUERY = gql`
  query {
    sidebarOpen @client
  }
`;

const TOGGLE_SIDEBAR_MUTATION = gql`
  mutation {
    toggleSidebar @client
  }
`;

const Sidebar = () => (
  <Mutation mutation={ TOGGLE_SIDEBAR_MUTATION }>
    { (toggleSidebar) => (
        <Query query={ LOCAL_STATE_QUERY }>
          { ({ data }) => (
            <SidebarStyles open={data.sidebarOpen}>
              <header>
                <CloseButton title="close" onClick={toggleSidebar}>&times;</CloseButton>
                <Supreme>Your Sidebar</Supreme>
              </header>

              <footer>
                <p>Things</p>
                <TheButton>Do Things</TheButton>
              </footer>
            </SidebarStyles>
          )}
        </Query>
    )}
  </Mutation>
);

export default Sidebar;
export { LOCAL_STATE_QUERY, TOGGLE_SIDEBAR_MUTATION };