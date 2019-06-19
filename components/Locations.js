import React, { Component } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Location from './Location';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_LOCATIONS_QUERY = gql`
  query ALL_LOCATIONS_QUERY($skip: Int = 0, $first: Int =${perPage}) {
    locations(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const LocationsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Locations extends Component {
  render() {
    return (
      <div>
        <Pagination page={ this.props.page }></Pagination>
        <Query
          query={ ALL_LOCATIONS_QUERY }
          variables={ {
            skip: this.props.page * perPage - perPage
          } }>
          { ({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error: { error.message }</p>
            return <LocationsList>{ data.locations.map(location => <Location location={ location } key={ location.id } />) }
            </LocationsList>
          } }
        </Query>
        <Pagination page={ this.props.page }></Pagination>
      </div>
    )
  }
}
export default Locations;
export { ALL_LOCATIONS_QUERY as ALL_LOCATIONS_QUERY };