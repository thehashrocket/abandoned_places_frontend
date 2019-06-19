import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const SingleLocationStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_LOCATION_QUERY = gql`
	query SINGLE_LOCATION_QUERY($id: ID!) {
		location(where: { id: $id }) {
			id
			title
			description
			largeImage
		}
	}
`;

class SingleLocation extends Component {
  render() {
    return (
      <Query query={ SINGLE_LOCATION_QUERY } variables={ { id: this.props.id } }>
        { ({ error, loading, data }) => {
          if (error) return <Error error={ error } />;
          if (loading) return <p>Loading...</p>;
          if (!data.location) return <p>No Location Found for id: { this.props.id }</p>;
          const location = data.location;
          return <SingleLocationStyles>
            <Head><title>Abandoned Places | { location.title }</title></Head>
            <img src={ location.largeImage } alt={ location.title }></img>
            <div className="details">
              <h2>Viewing { location.title }</h2>
              <p>{ location.description }</p>
            </div>
          </SingleLocationStyles>;
        } }
      </Query>
    );
  }
}
export default SingleLocation;
