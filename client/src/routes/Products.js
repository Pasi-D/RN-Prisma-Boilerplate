import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

const styles = StyleSheet.create({
  productListBtn: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

class Products extends Component {
  state = {}

  goToNewProduct = () => {
    const { history } = this.props;
    history.push('/new-product');
  }

  render() {
    return (
      <View>
        <Text style={{ marginTop: 50, marginLeft: 10 }}>Products page</Text>
        <TouchableHighlight
          style={styles.productListBtn}
          activeOpacity={0.7}
          onPress={this.goToNewProduct}
        >
          <Text>Create Product</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Products;
