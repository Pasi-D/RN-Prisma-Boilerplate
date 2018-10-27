import React, { Component } from 'react';
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
  PixelRatio,
  TouchableOpacity,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import TextField from '../Components/TextField';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});

const defaultState = {
  values: {
    name: '',
    price: '',
    pictureUrl: '',
  },
  errors: {},
  isSubmitting: false,
};

class NewProduct extends Component {
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
      /* this.setState({
        errors: {
          email: 'Already taken',
        },
        isSubmitting: false,
      });
      return; */
    }

    /* await AsyncStorage.setItem('@ecommerce/token', response.data.signup.token); */
    history.push('/products');
  };

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          values: {
            pictureUrl: source,
          },
        });
      }
    });
  };

  render() {
    const {
      errors,
      values: { name, price, pictureUrl },
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
          <TextField value={price} name="price" onChangeText={this.onChangeText} />
          <TouchableOpacity onPress={this.selectPhotoTapped}>
            <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20, marginLeft: 20, marginTop: 10 }]}>
              {pictureUrl === '' ? (
                <Text>Select a Photo</Text>
              ) : (
                <Image style={styles.avatar} source={pictureUrl} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.7}
            underlayColor="#00868b"
            onPress={this.submit}
          >
            <Text> Add Product </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default NewProduct;
