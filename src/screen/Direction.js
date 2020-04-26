import React, { Component } from 'react';
import { View, Sty } from 'react-native';
import openMap from 'react-native-open-maps';
import getDirections from 'react-native-google-maps-directions';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
export default class Direction extends Component {
  handleDirection = () => {
    const location = this.props.route.params.to.coords;
    const data = {
      destination: location,
      params: [],
    };

    getDirections(data);
  };
  render() {
    return (
      <View style>
        <Button
          title='Navigate to direction'
          icon={<Icon name='direction' size={40} color='#fff' />}
          onPress={this.handleDirection}
        />
      </View>
    );
  }
}
