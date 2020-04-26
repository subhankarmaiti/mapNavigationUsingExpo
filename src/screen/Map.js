import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, MapViewAnimated } from 'react-native-maps';
import { Button } from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
export default class Map extends Component {
  state = {
    location: { coords: { latitude: 0, longitude: 0 } },
    region: {
      latitude: 0,
      longitude: 0,
      longitudeDelta: 0.01,
      latitudeDelta: 0.03,
    },
    errorMsg: null,
  };
  setCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ errorMsg: 'Permission to access location was denied' });
    } else {
      this.setState({ errorMsg: null });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location,
      region: { ...this.state.region, ...location.coords },
    });
  };
  componentDidMount() {
    this.setCurrentLocation();
  }
  onLocationUpdate = (res) => {
    this.setState({
      location: {
        ...this.state.location,
        coords: {
          ...this.state.location.coords,
          ...res.nativeEvent.coordinate,
        },
      },
    });
  };
  onRegionUpdate = (region) => {
    this.setState({ region });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            region={this.state.region}
            onPress={this.onLocationUpdate}
            onRegionChangeComplete={this.onRegionUpdate}
          >
            <Marker
              coordinate={this.state.location.coords}
              draggable
              onDragEnd={this.onLocationUpdate}
            />
          </MapView>
          <TouchableOpacity
            onPress={this.setCurrentLocation}
            style={styles.floatingBtn}
          >
            <MaterialIcon name='my-location' size={40} color='#035aa6' />
          </TouchableOpacity>
        </View>
        <Button
          title='Go next!'
          onPress={() =>
            this.props.navigation.navigate('direction', {
              to: this.state.location,
            })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  floatingBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
    right: 10,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
