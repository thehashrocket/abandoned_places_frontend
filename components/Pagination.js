import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    locationsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (

  <Query query={ PAGINATION_QUERY }>
    { ({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>
      const count = data.locationsConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page
      return (
        <PaginationStyles>
          <Head>
            <title>Abandoned Places! { page } of { pages }</title>
          </Head>
          <Link
            prefetch
            href={ {
              pathname: 'locations',
              query: { page: page - 1 }
            } }>
            <a className="prev" aria-disabled={ page <= 1 }>Prev</a>
          </Link>

          <p>Page { props.page } of { pages }</p>
          <p>{ count } Locations Total</p>
          <Link
            prefetch
            href={ {
              pathname: 'locations',
              query: { page: page + 1 }
            } }>
            <a className="prev" aria-disabled={ page >= pages }>Next</a>
          </Link>
        </PaginationStyles>
      )
    } }
  </Query>

)

export default Pagination;