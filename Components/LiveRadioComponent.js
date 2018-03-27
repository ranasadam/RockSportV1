import React from 'react';
import {Image,Text, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors, Images} from "../Themes";
import {connect} from "react-redux";
import {toggleLiveRadioAction} from "../Actions";

class LiveRadioComponent extends React.Component {

    render() {
        const {isLiveRadioPlaying} = this.props.navigatorState;
        const {container, toggleIcon, listenLiveStyle} = styles;
        return (
            <View style={container}>
                <TouchableOpacity activeOpacity={0.7}
                                  onPress={() => this.props.toggleLiveRadioAction()}>
                    <Image
                        source={isLiveRadioPlaying ? Images.pauseIcon : Images.playIcon}
                        style={toggleIcon}/>
                </TouchableOpacity>
                <Text style={listenLiveStyle}>Listen Live</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,

        flexDirection:"row",
        alignItems: "center",
        backgroundColor: Colors.themeRed,
    },
    toggleIcon: {
        width: 32,
        height: 32,
        marginLeft:10,
    },
    listenLiveStyle: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: '100',
        marginLeft:10,
    }
});


const mapStateToProps = ({navigatorState}) => ({navigatorState});

export default connect(mapStateToProps, {toggleLiveRadioAction})(LiveRadioComponent);