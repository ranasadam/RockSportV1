import React, {Component} from 'react';
import {View, Text, Image, ImageBackground, TouchableOpacity, AsyncStorage} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH} from '../Constants';
import * as Constants from "../Constants";
import BottomBannerAd from "../Components/BottomBannerAd";
import CustomStatusBar from "../Components/CustomStatusBar";
import {ApplicationStyles, Colors, Images} from "../Themes";
import {connect} from "react-redux";
import {loginRequest, toggleMenuAction} from "../Actions";


class LandingScreen extends Component {

    componentDidMount() {
        this.props.toggleMenuAction(false);
    }

    render() {
        const {state,navigate} = this.props.navigation;
        const {topContainer, centerIcon, buttonsContainer, signUpText, skipText} = styles;
        return (
            <View>
                <ImageBackground
                    source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                    <CustomStatusBar/>
                    <View style={topContainer}>
                        <Image source={Images.rockSportCenterLogoImage}
                               style={centerIcon}
                               resizeMode={'stretch'}/>

                    </View>
                    <View style={buttonsContainer}>
                        <Text style={signUpText}>    Sign up for {"\n"} exclusive deals</Text>
                        <TouchableOpacity style={ApplicationStyles.buttonStyle} activeOpacity={0.7}
                                          onPress={() => navigate('SignUp')}
                        >
                            <Text style={ApplicationStyles.buttonTextStyle}>Sign up</Text>
                        </TouchableOpacity>
                        <Text style={skipText}> Already have an account? </Text>
                        <TouchableOpacity style={ApplicationStyles.buttonStyle} activeOpacity={0.7}
                                          onPress={() => navigate('Login')}
                        >
                            <Text style={ApplicationStyles.buttonTextStyle}>Sign in</Text>
                        </TouchableOpacity>
                        <Text style={skipText}
                              onPress={() => navigate('HomeView')}
                        >Skip this</Text>
                    </View>
                    <BottomBannerAd/>
                </ImageBackground>
            </View>
        );
    }
}

const styles = {
    topContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    buttonsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 16,
    },
    centerIcon: {
        width: 300,
        height: 200,
    },
    signUpText: {
        fontSize: 22,
        color: Colors.white,
    },
    skipText: {
        color: Colors.white,
        marginTop: 16,
        fontSize: 12,
    }
};
const mapStateToProps = ({navigatorState}) => ({navigatorState});

export default connect(mapStateToProps, {toggleMenuAction})(LandingScreen);