/**
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
    Alert,
    Linking
} from 'react-native';
import { sagaActions } from "../redux/saga/type";

import { useDispatch, useSelector } from "react-redux";
import { Scale } from '../helper/scale';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

const App = (props: object) => {

    const [pageNumber, setPageNumber] = useState(0);
    const users = useSelector((state: object) => state?.users)
    const loader = useSelector((state: object) => state?.loading)
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData()
    }, [])


    // Function to fetch  data (pagination)
    const fetchData = () => {
        dispatch({ type: sagaActions.FETCH_USER_LIST, payload: pageNumber + 10 })
    };

    //Funtion to export PDF
    const exportPDF = async (params: any) => {
        console.log('params', params)
        let { name, email, dob } = params;

        const htmlContent = `
    <h1>User Information</h1>
    <p><strong>Name:</strong> ${name?.title} ${name?.first} ${name?.last}</p>
    <p><strong>Age:</strong> ${dob?.date}</p>
    <p><strong>Email:</strong> ${email}</p>
  `;

        try {
            const options = {
                html: htmlContent,
                fileName: 'user_info', // Optional: Set a custom file name for the PDF
                directory: 'Documents',
            };
            console.log('RNFS', RNFS)
            const pdf = await RNHTMLtoPDF.convert(options);
            const destinationFilePath = RNFS.DocumentDirectoryPath + `/file${new Date().getMilliseconds()}.pdf`;
            console.log('PDF File:', pdf.filePath);
            console.log('destinationFilePath File:', destinationFilePath);

            await RNFS.moveFile(pdf.filePath, destinationFilePath);
            Alert.alert('Success!', 'PDF Exported Successfully!', [
                { text: 'OK', onPress: () => null }]);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error exporting PDF');
        }


    }


    const showList = ({ item }: any) => {
        console.log('showList', item)
        let { name, picture, email } = item
        return (
            <>
                <TouchableOpacity
                    onPress={() => props?.navigation.navigate('UserDetails', { item: item })}
                    style={styles.listMainViewStyle}>
                    <View style={styles.imageStyle}>
                        <Image
                            style={styles.imageStyleOFlist}
                            resizeMode="cover"
                            source={{ uri: picture?.thumbnail }}
                        />
                    </View>

                    <View style={styles.dependentName}>
                        <Text numberOfLines={2} style={styles.listNameTextStyle}>
                            {`${name?.title} ${name?.first} ${name?.last}`}
                        </Text>
                        <Text numberOfLines={1} style={styles.relationStyle}>
                            {`${email}`}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.rightViewStyle} onPress={() => exportPDF(item)}>
                        <Image
                            style={styles.rightIconStyle}
                            resizeMode="contain"
                            source={require('../assets/download.png')}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.bottomLineStyle} />
            </>
        );
    };

    // Render footer with loading indicator when fetching more data
    const renderFooter = () => {
        if (!loader) return null;
        return <ActivityIndicator size="large" color="blue" />;
    };

    return (
        <SafeAreaView style={styles.sectionContainer}>
            <FlatList
                data={users}
                renderItem={showList}
                onEndReached={fetchData}
                onEndReachedThreshold={0.1} // Adjust this value as needed
                ListFooterComponent={renderFooter}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },

    // style
    listMainViewStyle: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: '#E59866',
        display: 'flex',
        flexDirection: 'row',
        height: 75,
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    imageViewStyle: {
        flex: 0.5,
        // backgroundColor: '#E59866',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Scale(2),
    },
    imageStyleOFlist: {
        width: Scale(50),
        height: 60,
        borderRadius: 100,
    },
    imageStyle: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleStyle: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'gray',
        zIndex: 1000,
        bottom: 20,
        position: 'absolute',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        right: 120,
    },
    bottomViewStyle: {
        flex: 0.5,
        // backgroundColor: '#239B56',
        paddingHorizontal: Scale(2),
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    listStyle: {
        flex: 0.2,
        // backgroundColor: '#C3268C',
        paddingHorizontal: Scale(2),
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 5,
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
        color: '#000',
        fontSize: 18,
    },
    bottomLineStyle: {
        backgroundColor: 'gray',
        height: 1,
        width: 360,
        marginTop: 5,
        alignSelf: 'center',
    },
    dependentName: {
        flex: 0.55,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    listNameTextStyle: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    userNameStyle: {
        flex: 0.6,
        alignItems: 'flex-start',
        justifyContent: 'center',
        // backgroundColor: '#C3268C',
    },
    relationStyle: {
        fontSize: 13,
        color: '#707070',
    },
    rightViewStyle: {
        flex: 0.25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 15,
        paddingVertical: Scale(10)
    },
    rightIconStyle: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
});

export default App;
