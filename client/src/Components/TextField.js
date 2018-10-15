import React, { PureComponent } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  field: {
    borderBottomWidth: 1,
    fontSize: 20,
  },
});

class TextField extends PureComponent {
  onChangeText = (text) => {
    const { onChangeText, name } = this.props;
    onChangeText(name, text);
  };

  render() {
    const { value, secureTextEntry, name } = this.props;
    return (
      <TextInput
        onChangeText={this.onChangeText}
        style={styles.field}
        value={value}
        placeholder={name}
        autoCapitalize="none"
        secureTextEntry={!!secureTextEntry}
      />
    );
  }
}

export default TextField;
