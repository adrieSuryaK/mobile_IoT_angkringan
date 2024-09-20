import React from 'react';

import { View, Image } from 'react-native';

const ActionBarImage = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        source={require('../../../assets/mars-logo.png')}
        style={{
          width: 30,
          height: 30,
          borderRadius: 40 / 2,
          marginRight:10
        }}
      />
    </View>
  );
};

export default ActionBarImage;
