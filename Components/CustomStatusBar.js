import React, {Component,} from 'react';
import {Platform, StatusBar, StyleSheet, View,} from 'react-native';
import {Colors} from '../Themes';
const CustomStatusBar = () => (
    <View style={styles.statusBar}>
        <StatusBar translucent backgroundColor={Colors.statusBarBackground} barStyle="light-content" />
    </View>
);


const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: STATUS_BAR_HEIGHT,
        backgroundColor: Colors.statusBarBackground,
    },
});

export default CustomStatusBar;