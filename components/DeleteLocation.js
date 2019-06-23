import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_LOCATIONS_QUERY as ALL_LOCATIONS_QUERY } from './Locations';

const DELETE_LOCATION_MUTATION = gql`
  mutation DELETE_LOCATION_MUTATION($id: ID!) {
    deleteLocation(id: $id) {
      id
    }
  }
`;

class DeleteLocation extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the locations we want
    const data = cache.readQuery({ query: ALL_LOCATIONS_QUERY });
    console.log(data, payload);
    // 2. Filter the deleted locations of the page
    data.locations = data.locations.filter(location => location.id !== payload.data.deleteLocation.id);
    // 3. Put the items back!
    cache.writeQuery({ query: ALL_LOCATIONS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={ DELETE_LOCATION_MUTATION }
        variables={ { id: this.props.id } }
        update={ this.update }
      >
        { (deleteLocation, { error }) => (
          <button
            onClick={ () => {
              if (confirm('Are you sure you want to delete this item?')) {
                deleteLocation().catch(err => {
                  alert(err.message);
                });
              }
            } }
          >
            { this.props.children }
          </button>
        ) }
      </Mutation>
    );
  }
}

export default DeleteLocation;
