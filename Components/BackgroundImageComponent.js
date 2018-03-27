import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Images,ApplicationStyles} from "../Themes";

class BackgroundImageComponent extends React.Component {
    render() {
        return (
            <ImageBackground source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}/>
        );
    }
}


export default BackgroundImageComponent;