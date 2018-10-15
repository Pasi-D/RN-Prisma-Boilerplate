import React, { Component } from 'react';
import {
  AsyncStorage, Text, View, Animated, Easing,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { gql } from 'apollo-boost';
import LottieView from 'lottie-react-native';
import { TOKEN_KEY } from '../constants';

const Loading = require('../lottie/material_wave_loading.json');

class CheckToken extends Component {  

  componentDidMount = async () => {
    const { refreshTokenMutation, history } = this.props;

    this.animation.play();

    this.timeoutHandle = setTimeout(async () => {
      const token = await AsyncStorage.getItem(TOKEN_KEY);

      if (!token) {
        history.push('/signup');
        return;
      }
      let response;
      try {
        response = await refreshTokenMutation({
          variables: {
            token,
          },
        });
      } catch (error) {
        history.push('/signup');
        return;
      }

      const { refreshToken } = response.data;
      await AsyncStorage.setItem(TOKEN_KEY, refreshToken);
      history.push('/products');
    }, 2500);
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
    // This is just necessary in the case that the screen is closed before the timeout fires,
    // otherwise it would cause a memory leak that would trigger the transition regardless,
    // breaking the user experience.
  }

  render() {
    return (
      <LottieView
        source={Loading}
        ref={(animation) => {
          this.animation = animation;
        }}
      />
    );
  }
}

const refreshTokenMutation = gql`
  mutation($token: String!) {
    refreshToken(token: $token)
  }
`;

export default compose(graphql(refreshTokenMutation, { name: 'refreshTokenMutation' }))(CheckToken);
