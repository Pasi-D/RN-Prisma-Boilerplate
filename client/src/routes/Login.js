import React, { Component } from 'react';
import {
  TouchableHighlight, View, StyleSheet, Text, AsyncStorage,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { gql } from 'apollo-boost';
import TextField from '../Components/TextField';
import { TOKEN_KEY } from '../constants';

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
  warnText: {
    alignItems: 'center',
    color: 'red',
    marginBottom: 5,
  },
});

const defaultState = {
  values: {
    email: '',
    password: '',
  },
  errors: {},
  isSubmitting: false,
};

class Login extends Component {
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

  moveToProducts = async (response) => {
    const { history } = this.props;
    await AsyncStorage.setItem(TOKEN_KEY, response.data.login.token);
    history.push('/products');
  };

  submit = async () => {
    const { loginMutation } = this.props;
    const { values } = this.state;

    console.log('submitting the login');

    await loginMutation({
      variables: values,
    })
      .then((response) => {
        if (response) {
          this.moveToProducts(response);
        }
      })
      .catch((error) => {
        if (error) {
          this.setState({
            errors: {
              message: error.graphQLErrors[0].message,
            },
          });
        }
      });
  };

  goToSignupPage = () => {
    const { history } = this.props;
    history.push('/signup');
  };

  render() {
    const {
      errors,
      values: { email, password },
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
        {errors.message && <Text style={styles.warnText}>{errors.message}</Text>}
        <View style={{ width: 200 }}>
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
            <Text> Login </Text>
          </TouchableHighlight>
          <Text style={{ textAlign: 'center', marginTop: 10 }}>Or</Text>
          <TouchableHighlight
            style={styles.LoginButton}
            activeOpacity={0.7}
            onPress={this.goToSignupPage}
          >
            <Text style={{ color: 'blue' }}>Create an Account</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default compose(graphql(loginMutation, { name: 'loginMutation' }))(Login);
