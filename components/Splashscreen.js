import React, {useEffect} from 'react';
import {View, Text, Image, AsyncStorage} from 'react-native';

export default function Splashscreen({navigation}) {
    useEffect(async() => {
          
        setTimeout(async()=>{
          const value = await AsyncStorage.getItem('userdata');
          console.log('Emaildata=====', value);
          {value == null || value == ''
            ? navigation.reset({index: 0, routes: [{name: 'Login'}]})
            : navigation.reset({index: 0, routes: [{name: 'Home'}]});}        
        }, 1000);
    }, [])
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex : 1,
          backgroundColor:'#ff9100'
        }}>
        <Image
          source={require('../images/animation_500_kqq49szh.gif')}
          style={{resizeMode:'contain' ,height:"70%",width:'70%'}}
        />
      </View>
    );
}
