import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, prodEndpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Sidebar';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleSidebar(_, variables, {cache}) {
            // read the sidebarOpen value from the cache
            const { sidebarOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            // Write sidebarOpen state to the opposite
            const data = {
              data: { sidebarOpen: !sidebarOpen }
            };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        sidebarOpen: false,
      }
    }
  });
}

export default withApollo(createClient);
