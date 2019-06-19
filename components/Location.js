import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link';
import Title from './styles/Title';
import LocationStyles from './styles/LocationStyles';
import formatMoney from '../lib/formatMoney'
import DeleteLocation from './DeleteLocation';

export default class Location extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { location: location } = this.props;

    return (
      <LocationStyles>
        { location.image && <img src={ location.image } alt={ location.title } /> }
        <Title>
          <Link href={ {
            pathname: '/item',
            query: { id: location.id }
          } }>
            <a>{ location.title }</a>
          </Link>
        </Title>
        <div className="buttonList">
          <Link href={ {
            pathname: 'update',
            query: { id: location.id }
          } }><a>Edit ✏</a></Link>
          <DeleteLocation id={ location.id }>Delete This Location</DeleteLocation>
        </div>
      </LocationStyles>
    )
  }
}
