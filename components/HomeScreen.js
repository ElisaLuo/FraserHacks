import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  DeviceEventEmitter,
} from 'react-native';

import Bridgefy from 'react-native-bridgefy-sdk'
import BridgefyClient from './BridgefyClient'

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  componentDidMount() {

    Bridgefy.init("e79ca836-8a57-4dc9-b53a-578e77d93d64",
      (error, message)=>{
        console.log("ERROR"+error+":"+message);
      },
      (client) => {
        console.log(JSON.stringify(client));
      }
    );
    BridgefySDK.start();
    var message = {
      content: { // Custom content
        message: "Hello world!!"
      }
    };
    Bridgefy.sendBroadcastMessage(message);

    //
    // BridgefyMessageListener
    //

    DeviceEventEmitter.addListener('onMessageReceived', (message) => {
      console.log('onMessageReceived: ' + JSON.stringify(message));
    }
    );

    DeviceEventEmitter.addListener('onMessageSent', (message) => {
      console.log('onMessageSent: ' + JSON.stringify(message));
    }
    );

    DeviceEventEmitter.addListener('onMessageReceivedException', (error) => {

      console.log('onMessageReceivedException: ' + error);
      console.log('sender: ' + error.sender); // User ID of the sender
      console.log('code: ' + error.code); // error code
      console.log('message' + error.message); // message object empty
      console.log('description' + error.description); // Error cause 

    }
    );

    DeviceEventEmitter.addListener('onMessageFailed', (error) => {
      console.log('onMessageFailed: ' + error);

      console.log('code: ' + error.conde); // error code
      console.log('message' + error.message); // message object
      console.log('description' + error.description); // Error cause 

    }
    );

    DeviceEventEmitter.addListener('onBroadcastMessageReceived', (message) => {
      console.log('onBroadcastMessageReceived: ' + JSON.stringify(message));
    });

    //
    // BridgefyStateListener
    //   

    DeviceEventEmitter.addListener('onStarted', (device) => {
      console.log('onStarted: ' + JSON.stringify(device));
    }
    );

    DeviceEventEmitter.addListener('onStartError', (error) => {
      console.log('onStartError: ' + error);
      console.log('code: ' + error.conde); // error code
      console.log('description' + error.description); // Error cause 
    }
    );

    DeviceEventEmitter.addListener('onStopped', () => {
      console.log('onStopped');
    }
    );

    DeviceEventEmitter.addListener('onDeviceConnected', (device) => {
      BridgefyClient.deviceList.push(device);
      console.log('onDeviceConnected: ' + device.DeviceName + " size: " + BridgefyClient.deviceList.length);
    }
    );

    DeviceEventEmitter.addListener('onDeviceLost', (device) => {
      console.log('onDeviceLost: ' + device);
    }
    );

  }

  render() {
    return (
      <View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
