import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import Route from 'next/router';
import Form from './styles/Form';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import Router from 'next/router';

const CREATE_LOCATION_MUTATION = gql`
  mutation CREATE_LOCATION_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createLocation(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateLocation extends Component {
  state = {
    title: 'cool shoes',
    description: 'i love this context',
    image: 'dog.jpb',
    largeImage: 'large-dog.jpg',
  }
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  uploadFile = async e => {
    console.log('uploading file');
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'dmlvx3ht');
    const res = await fetch('https://api.cloudinary.com/v1_1//chaos-elevators-inc/image/upload', { method: 'POST', body: data });
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
  }
  render() {
    return (
      <div>
        <Mutation mutation={ CREATE_LOCATION_MUTATION } variables={ this.state }>
          { (createLocation, { loading, error, called, data }) => (
            <Form
              onSubmit={ async e => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await createLocation();
                // change them to the single item page.
                Router.push({
                  pathname: '/location',
                  query: { id: res.data.createLocation.id },
                });
              } }
            >
              <Error error={ error } />
              <fieldset disabled={ loading } aria-busy={ loading }>
                <label htmlFor='file'>
                  Image
								<input
                    type='file'
                    id='file'
                    name='file'
                    placeholder='Upload Image'
                    required
                    onChange={ this.uploadFile }
                  />
                  { this.state.image && <img width="200" src={ this.state.image } alt="Upload Preview" /> }
                </label>
                <label htmlFor='title'>
                  Title
								<input
                    type='text'
                    id='title'
                    name='title'
                    placeholder='Cool Shoes'
                    required
                    value={ this.state.title }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor='description'>
                  Description
								<textarea
                    id='description'
                    name='description'
                    placeholder='Enter a description'
                    required
                    value={ this.state.description }
                    onChange={ this.handleChange }
                  />
                </label>
                <button type='submit'>Submit</button>
              </fieldset>
            </Form>
          ) }
        </Mutation>
      </div>
    );
  }
}

export default CreateLocation;
export { CREATE_LOCATION_MUTATION as CREATE_LOCATION_MUTATION };