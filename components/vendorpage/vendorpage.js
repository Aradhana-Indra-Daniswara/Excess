import React from 'react';
import { Text, View,StyleSheet,Image} from 'react-native';
const Vendorpage = () => {
    return (
        <View>
        <View>
        <Text  style={{
        color: "black",
        fontWeight : "800",
        display : 'flex',
        fontSize : 20,


        }}>Pastry food, Alam Sutera</Text>
        <Text style = {{
            width : 120,
            height : 100,

        }}>Cake, europe food</Text>
            </View>
            <View style={styles.box}>
                <Image 
                style ={{
                    
                    width :40,
                    height  :40, 
                    marginLeft :20,
                    marginRight  : 17,
                    marginTop : 10,
                }}
                source = {require("../../assets/fast-delivery-1.png")}
                />
                <Text style ={{
                    fontSize : 14,
                    fontWeight : '600',
                    alignItems : 'center',
                    justifyContent : 'center',
                    alignSelf : 'center',
                    // marginTop : 30,
                }}>Delivered in 10 minutes</Text>
            </View>
            <View>
                <Text style={{
                    marginTop : 23,
                    justifyContent : 'center',
                    alignSelf : 'center',
                    fontSize : 16,
                    fontWeight : '600',
                    lineHeight : 19.5,

                }}>Running Out</Text>
            </View>
            <View style={styles.flexbox}>
                <View style={styles.rectangle}></View>
                <View style={styles.rectangle}></View>
            </View>
            </View>
    )
}
const styles = StyleSheet.create({
    box: {
    width : 257,
    height: 60,
    borderWidth: 1,
    flexDirection:'row',
    borderWidth : 2,
    borderRadius : 14,
    marginTop : -56,
    borderColor : '#51C699',
    },
    flexbox:{
        flex : 1,
        flexDirection : 'row',
    },
    rectangle:{
        width: 137,
        height: 207,
        backgroundColor: "#DDB9B9",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 2,
        shadowRadius: 3,
    },
    });

export default Vendorpage