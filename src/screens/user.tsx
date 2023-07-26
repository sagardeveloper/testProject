import React, { useState } from 'react';
import {
    SafeAreaView,
    FlatList,
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Scale } from '../helper/scale';

const UserDetails = ({route}:any) => {
    const { picture, name, location, email, cell, dob } = route?.params?.item;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.imageViewStyle}>
                    <Image
                        source={{ uri: picture?.medium }}
                        style={styles.imageStyle}
                        resizeMode="contain"
                    />
                    <View style={styles.circleStyle}>
                        <Text style={{ color: '#fff' }}>{dob?.age}</Text>
                    </View>
                </View>
                <View style={styles.bottomViewStyle}>
                    <View style={styles.bottomLineStyle} />
                    <Text style={styles.detailTextStyle}>Name: {`${name?.title} ${name?.first} ${name?.last}`}</Text>
                    <Text style={styles.detailTextStyle}>Email: {`${email}`}</Text>
                    <Text style={styles.detailTextStyle}>Cell: {`${cell}`}</Text>
                    <Text style={styles.detailTextStyle}>DOB: {`${dob?.date}`}</Text>

                    <Text
                        style={[styles.detailTextStyle, styles.locationText]}>
                        Location
                    </Text>
                    <View style={styles.bottomLineStyle} />
                    <Text style={styles.detailTextStyle}>City: {location?.city}</Text>
                    <Text style={styles.detailTextStyle}>State: {location?.state}</Text>
                    <Text style={styles.detailTextStyle}>Country: {location?.country}</Text>
                    <Text style={styles.detailTextStyle}>Post-Code: {location?.postcode}</Text>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    imageViewStyle: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Scale(10),
    },
    imageStyle: {
        width: Scale(140),
        height: Scale(140),
    },
    circleStyle: {
        width: Scale(35),
        height: Scale(35),
        borderRadius: Scale(25),
        backgroundColor: 'gray',
        zIndex: 100,
        bottom: Scale(0),
        position: 'absolute',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        right: Scale(90),
    },
    bottomViewStyle: {
        flex: 0.5,
        paddingHorizontal: Scale(30),
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    listStyle: {
        flex: 0.2,
        paddingHorizontal: Scale(20),
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: Scale(5),
    },
    detailsViewStyle: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailStyle: {
        flex: 0.8,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    detailTextStyle: {
        fontSize: Scale(14),
        marginTop:Scale(4)
    },
    bottomLineStyle: {
        backgroundColor: 'gray',
        height: 1.5,
        width: '100%',
        marginTop: 5,
        alignSelf: 'center',
    },
    locationText: {
        marginTop: Scale(20)
    }
});

export default UserDetails;
