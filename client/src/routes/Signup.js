import React, { Component } from 'react';
import {
  TouchableHighlight, View, StyleSheet, Text, AsyncStorage,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { gql } from 'apollo-boost';
import TextField from '../Components/TextField';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  LoginButton: {
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
  },
});

const defaultState = {
  values: {
    name: '',
    email: '',
    password: '',
  },
  errors: {},
  isSubmitting: false,
};

class Signup extends Component {
  state = defaultState;

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
      errors: {},
    }));
  };

  submit = async () => {
    const { history, signUpMutation } = this.props;
    const { values, isSubmitting } = this.state;

    if (isSubmitting) {
      return;
    }
    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await signUpMutation({
        variables: values,
      });
    } catch (error) {
      this.setState({
        errors: {
          email: 'Already taken',
        },
        isSubmitting: false,
      });
      return;
    }

    await AsyncStorage.setItem('@ecommerce/token', response.data.signup.token);
    history.push('/products');
  };

  goToLoginPage = () => {
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    const {
      errors,
      values: { name, email, password },
    } = this.state;

    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 200 }}>
          <TextField value={name} name="name" onChangeText={this.onChangeText} />
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
          <TextField value={email} name="email" onChangeText={this.onChangeText} />
          <TextField
            value={password}
            name="password"
            onChangeText={this.onChangeText}
            secureTextEntry
          />
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.7}
            underlayColor="#00868b"
            onPress={this.submit}
          >
            <Text> Create Account </Text>
          </TouchableHighlight>

          <Text style={{ textAlign: 'center', marginTop: 10 }}>Or</Text>
          <TouchableHighlight
            style={styles.LoginButton}
            activeOpacity={0.7}
            onPress={this.goToLoginPage}
          >
            <Text style={{ color: 'blue' }}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const signUpMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export default compose(graphql(signUpMutation, { name: 'signUpMutation' }))(Signup);
