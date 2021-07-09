import React,{ useEffect, useState } from 'react';
import {View, Text,StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItems,DrawerItemList} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


export default function Drawerscreen(props) {
    const [ison, setison] = useState(false);
   useEffect(async () => {
     let isonic = await AsyncStorage.getItem('toggleval');
     console.log('isonic==>drawer.js', isonic);
     setison(isonic == 'true');
   }, [ison]);
  return (
    <View style={styles.darktheme}>
      <DrawerContentScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginTop:5, color: '#ff9100', fontWeight: '600', fontSize: 18}}>
            Hii,Dhruv
          </Text>
        </View>
        <View style={styles.drawerSection}>
        <DrawerItemList {...props} />
         
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  drawerSection: {
    marginTop: 15,
    // flexDirection:'row',
  },
  darktheme:{
      backgroundColor:'#212121',
      flex: 1
  },
  whitetheme:{
      backgroundColor:'white',
      flex: 1
  }
});
