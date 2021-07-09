import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Car from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const Details = props => {
  const {ison} = props;
  console.log('ison=======>', ison);
  return (
    // <>
    //   <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //     <View style={{flex: 8}}>
    //       <Image source={props.item.symbol} style={styles.imgsymbol} />
    //       <Text
    //         style={[
    //           {
    //             margin: 10,
    //             fontSize: 18,
    //             fontWeight: 'bold',
    //           },
    //           ison ? styles.darkcontaint : styles.whitecontaint,
    //         ]}>
    //         {props.item.model}
    //       </Text>
    //       <Text
    //         style={[
    //           {
    //             fontSize: 18,
    //             margin: 10,
    //             fontWeight: 'bold',
    //           },
    //           ison ? styles.darkcontaint : styles.whitecontaint,
    //         ]}>
    //         {props.item.year}
    //       </Text>
    //     </View>
    //     <View style={{alignItems: 'center', flex: 4, margin: 15}}>
    //       <Text
    //         style={{
    //           backgroundColor: '#afd7ef',
    //           fontSize: 20,
    //           borderRadius: 30,
    //           padding: 10,
    //           width: 130,
    //           textAlign: 'center',
    //         }}>
    //         {props.item.status}
    //       </Text>
    //     </View>
    //   </View>
    //   <TouchableOpacity
    //     onPress={() => {
    //       props.navigation.navigate('Detailing', props.item);
    //     }}>
    //     <View style={{margin: 0}}>
    //       <Image source={props.item.img} style={styles.img} />
    //     </View>
    //   </TouchableOpacity>
    // </>
    <>
      {/* <View style={ison?styles.darkcontaint : styles.whitecontaint}> */}
      <TouchableOpacity
        style={[styles.container,ison?styles.whiteborder:styles.darkcolor]}
        onPress={() => {
          props.navigation.navigate('Detailing', props.item);
        }}>
        <Image source={props.item.img} style={styles.img} />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            width: '100%',
            marginTop:-20,
          }}>
          <View>
            <Image
              source={props.item.symbol}
              style={{
                borderRadius: 60,
                height: 50,
                width: 50,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{flexDirection: 'column',marginBottom:10}}>
            <Text style={styles.title}>{props.item.company}</Text>
            <Text style={styles.title}>{props.item.model}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* </View> */}
    </>
  );
};
const styles = StyleSheet.create({
  img: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
    // height: '50%',
    borderRadius: 15,
    // marginTop: -30,
  },
  header: {
    flex: 1,
    margin: 5,
  },
  footer: {
    flex: 5,
    margin: 5,
  },
  imgsymbol: {
    borderRadius: 50,
    height: 50,
    width: 50,
    // marginLeft: 15,
    // marginTop: 10,
    margin: 10,
  },
  darkcontaint: {
    color: 'white',
  },
  whitecontaint: {
    color: 'black',
  },
  container: {
    // margin: 10,
    // padding: 10,
    // borderWidth: 1,
    // marginLeft:10,
    // width: '100%',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
     width: '45%',
    borderWidth: 1,
    borderRadius: 30,
    margin: 10,
    // height:'100%'
    // justifyContent: 'space-between',
    // backgroundColor: 'white',
    // width: '100%',
  },
  img: {
    height: 150,
    // marginRight:5,
    margin: 8,
    width: '90%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
  title: {
    //  marginTop: -10,
    fontSize: 18,
    // marginLeft: 15,
    color: '#ff9100',
  },
  subtitle: {
    fontSize: 18,
    marginLeft: 15,
  },
  whiteborder:{
    borderColor:'white'
  },
  darkcolor:{
    borderColor:'black'
  }
});
export default Details;
