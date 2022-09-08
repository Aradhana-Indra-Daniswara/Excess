import React from 'react';
import { Text, View,StyleSheet,Image, Button, TouchableOpacity} from 'react-native';

const Chat =() =>{
    return (
        <View>
            <View style={styles.header}>
            <Image 
                style ={{
                    
                    // width :40,
                    // height  :40, 
                    // marginLeft :20,
                    // marginRight  : 17,
                    // marginTop : 10,
                }}
                source = {require("../../assets/unsplash_-GFCYhoRe48.png")}
                />
                <View style={styles.isi}><Text style={styles.title}>Burger Queen</Text><Text style={styles.online}>Online</Text></View>
                
            </View>
            <View>
                <View style={styles.kotak1}>
                    <Text style={{
                        fontSize :12,
                        fontWeight :'600',
                        alignSelf : 'center',
                        position : 'absolute',
                        marginTop : 10,
                    }}>Halo Barang Ready?</Text>
                </View>
            </View>
            <View>
                <View style={styles.kotak2}>
                    <Text style={{
                        fontSize : 12,
                        fontWeight :'600',
                        alignSelf : 'center',
                        position : 'absolute',
                        marginTop : 10,
                    }}>Ready kak</Text>
                </View>
            </View>
            <View>
                <View style={styles.kotak1}>
                    <Text style={{
                        fontSize :12,
                        fontWeight :'600',
                        alignSelf : 'center',
                        position : 'absolute',
                        marginTop : 10,
                    }}>Barang masih bagus?</Text>
                </View>
            </View>
            <View>
                <View style={styles.kotak2}>
                    <Text style={{
                        fontSize : 12,
                        fontWeight :'600',
                        alignSelf : 'center',
                        position : 'absolute',
                        marginTop : 10,
                    }}>Masih bagus kak</Text>
                </View>
            </View>
            <View>
                <View style={styles.kotak1}>
                    <Text style={{
                        fontSize :12,
                        fontWeight :'600',
                        alignSelf : 'center',
                        position : 'absolute',
                        marginTop : 10,
                    }}>Bisa diantar sekarang</Text>
                </View>
            </View>
            <View>
                <View style={styles.kotak2}>
                    <Text style={{
                        fontSize : 12,
                        fontWeight :'600',
                        alignSelf : 'center',
                        position : 'absolute',
                        marginTop : 10,
                    }}>Bisa kak</Text>
                </View>
            </View>
            <View>
                <View style={styles.kotak1}>
                    <Text style={{
                        fontSize :12,
                        fontWeight :'600',
                        alignSelf : 'center',
                        position : 'absolute',
                        marginTop : 10,
                    }}>Oke</Text>
                </View>
            </View>
            <View>
                <View style={styles.kotak2}>
                    <Text style={{
                        fontSize : 12,
                        fontWeight :'600',
                        alignSelf : 'center',
                        position : 'absolute',
                        marginTop : 10,
                    }}>Silahkan dipesan</Text>
                </View>
            </View>
            {/* <View>
                <View style={styles.kotak1}>
                    <Text style={{
                        fontSize :12,
                        fontWeight :'600',
                        alignSelf : 'center',
                        position : 'absolute',
                        marginTop : 10,
                    }}>Baik kak terima kasih</Text>
                </View>
            </View> */}
            <View>
            <View  style={styles.tes}>

                <View style={styles.typingbox}>
                    <Text style={{
                        fontSize :17,
                        color : '#666666',
                        fontWeight :'600',
                        alignSelf : 'center',
                        position : 'absolute',
                        marginTop : 10,
                    }}>Type Here</Text>
                </View>
                <View ></View>
                <View styles={styles.circle}><Text>s</Text></View>
            </View>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    circle:{
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: "red",
        marginTop:100,
    },
    tes:{
        flexDirection : 'row',
    },
    typingbox:{
        // flex:1,
        // flexDirection:'row',
        marginTop :60,
        borderRadius :25,
        width: 291,
        height: 42,
        backgroundColor: '#fff',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation :5,
    },
kotak2:{
    marginTop :25,
    borderRadius :14,
    width: 160,
    height: 36,
    backgroundColor: "#E4E2E2",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 2,
    shadowRadius: 3,
    elevation :5,
},
kotak1:{
    marginTop :25,
    borderRadius :14,
    width: 160,
    height: 36,
    backgroundColor: "#94D0B9",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 2,
    shadowRadius: 3,
    elevation :5,
    marginLeft : 200,
    // paddingLeft : 100,
},
header:{
    // marginLeft:130,
    flexDirection : 'row',
},
isi:{
    marginLeft:42,
    
},
title:{
    fontSize:20,
    fontWeight :'600',


},
online :{
    fontWeight: '600',
    fontSize : 11,
    

},
});
export default Chat