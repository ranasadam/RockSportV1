import React, {Component} from 'react';
import {View, Text, Image, ImageBackground, TouchableOpacity, AsyncStorage} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../Constants';
import * as Constants from "../Constants";
import BottomBannerAd from "../Components/BottomBannerAd";
import CustomStatusBar from "../Components/CustomStatusBar";
import {ApplicationStyles, Colors, Images} from "../Themes";


class SplashScreen extends Component {


    componentDidMount() {
        setTimeout(() => {this.moveForward()}, 2000)
    }

    moveForward = () => {
        AsyncStorage.getItem(Constants.USER_DATA_KEY).then(ret => {
            if (ret !== null) {
                this.props.navigation.dispatch({
                    key: 'HomeView',
                    type: 'ReplaceCurrentScreen',
                    routeName: 'HomeView',
                    params: {
                        transition: 'myCustomTransition'
                    }
                });
            } else {
                this.props.navigation.dispatch({
                    key: 'Landing',
                    type: 'ReplaceCurrentScreen',
                    routeName: 'Landing',
                });
            }
        })
    }

    render() {
        const {topContainer, centerIcon} = styles;
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
                </ImageBackground>
            </View>
        );
    }
}

const styles = {
    topContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerIcon: {
        width: 300,
        height: 200,
    },
};

export default SplashScreen;