import React, {Component} from 'react';
import {AsyncStorage, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import PostViewPagerComponent from "../Components/PostsViewPagerComponent";
import {LIVE_STREAM_URL, SCREEN_WIDTH, USER_DATA_KEY} from "../Constants";
import {Divider} from "react-native-elements";
import {connect} from "react-redux";
import {liveRadioReadyAction, toggleLiveRadioAction, toggleMenuAction} from "../Actions";
import CustomStatusBar from "../Components/CustomStatusBar";
import BottomBannerAd from "../Components/BottomBannerAd";
import CustomNavigationBar from "../Components/CustomNavigationBar";
import MyDrawerScreen from "./MyDrawerScreen";
import {ApplicationStyles, Colors, Images} from "../Themes";
import LiveRadioComponent from "../Components/LiveRadioComponent";
// import RNAudioStreamer from "react-native-audio-streamer";
// import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
class HomeScreen extends Component {
    componentDidMount() {
        this.props.toggleMenuAction(false);
    }

    state = {
        isUserAvailable: false,
    }

    componentWillMount() {
        AsyncStorage.getItem(USER_DATA_KEY).then(ret => {
            if (ret !== null) {
                this.setState({isUserAvailable: true})
            } else {
                this.setState({isUserAvailable: false})
            }
        });
//         RNAudioStreamer.setUrl(LIVE_STREAM_URL);
    }
    componentWillReceiveProps(nextProps) {
        const {isLiveRadioPlaying, isLiveRadioReady} = nextProps.navigatorState;
        if (isLiveRadioReady) {
            if (isLiveRadioPlaying) {
                // ReactNativeAudioStreaming.play(LIVE_STREAM_URL, {showIniOSMediaCenter: false, showInAndroidNotifications: false});
//                 RNAudioStreamer.play();
            } else if (!isLiveRadioPlaying) {
//                 RNAudioStreamer.pause();
                // ReactNativeAudioStreaming.stop();
            }
        }

    }
    componentWillUnmount() {
        if (this.props.navigatorState.isLiveRadioPlaying) {
//             RNAudioStreamer.pause();
//           ReactNativeAudioStreaming.stop();
            this.props.liveRadioReadyAction(false);
            this.props.toggleLiveRadioAction(false);
        }
    }
    render() {
        const {navigate} = this.props.navigation;
        const {
            homeItemsContainer,
            homeItemTouchableContainer,
            homeItemView,
            homeItemTextStyle,
            homeItemRightArrow,
            dividerStyle, modalStyle
        } = styles;
        return (
            <ImageBackground source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                <CustomStatusBar/>
                <CustomNavigationBar navigator={this.props.navigation} showMenuIcon={true} showBackButton={this.state.isUserAvailable}/>
                <View style={{flex: 1}}>
                    <PostViewPagerComponent navigator={this.props.navigation}/>
                    <View style={homeItemsContainer}>
                        <TouchableOpacity activeOpacity={0.7} style={homeItemTouchableContainer}
                                          onPress={() => navigate('Post')}>
                            <View style={homeItemView}>
                                <Text style={homeItemTextStyle}>NEWS</Text>
                                <Image
                                    source={Images.arrowRight}
                                    style={homeItemRightArrow}/>
                            </View>
                        </TouchableOpacity>
                        <Divider style={dividerStyle}/>
                        <TouchableOpacity activeOpacity={0.7} style={homeItemTouchableContainer}
                                          onPress={() => navigate('Podcast')}>
                            <View style={homeItemView}>
                                <Text style={homeItemTextStyle}>PODCASTS</Text>
                                <Image
                                    source={Images.arrowRight}
                                    style={homeItemRightArrow}/>
                            </View>
                        </TouchableOpacity>
                        <Divider style={dividerStyle}/>
                        <TouchableOpacity activeOpacity={0.7} style={homeItemTouchableContainer}
                                          onPress={() => navigate('VideoScreen')}>
                            <View style={homeItemView}>
                                <Text style={homeItemTextStyle}>VIDEOS</Text>
                                <Image
                                    source={Images.arrowRight}
                                    style={homeItemRightArrow}/>
                            </View>
                        </TouchableOpacity>
                        <Divider style={dividerStyle}/>
                        <TouchableOpacity activeOpacity={0.7} style={homeItemTouchableContainer}
                                          onPress={() => navigate('ShowScreen')}>
                            <View style={homeItemView}>
                                <Text style={homeItemTextStyle}>SHOWS</Text>
                                <Image
                                    source={Images.arrowRight}
                                    style={homeItemRightArrow}/>
                            </View>
                        </TouchableOpacity>
                        <Divider style={dividerStyle}/>
                       {/* <TouchableOpacity activeOpacity={0.7} style={homeItemTouchableContainer}>
                            <View style={homeItemView}>
                                <Text style={homeItemTextStyle}>LATEST TRACKS</Text>
                                <Image
                                    source={Images.arrowRight}
                                    style={homeItemRightArrow}/>
                            </View>
                        </TouchableOpacity>
                        <Divider style={dividerStyle}/>*/}
                        <TouchableOpacity activeOpacity={0.7} style={homeItemTouchableContainer}
                                          onPress={() => navigate('ContactUsScreen')}>
                            <View style={homeItemView}>
                                <Text style={homeItemTextStyle}>CONTACT US</Text>
                                <Image
                                    source={Images.arrowRight}
                                    style={homeItemRightArrow}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <LiveRadioComponent/>
                    <MyDrawerScreen navigator={this.props.navigation}/>
                </View>
                <BottomBannerAd/>
            </ImageBackground>
        );

    }


}

const styles = {
    homeItemsContainer: {
        flex: 1,
    },
    homeItemTouchableContainer: {
        flex: 1,
    },
    homeItemView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    homeItemTextStyle: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: '100',
        alignSelf: 'center'
    },
    homeItemRightArrow: {
        width: 36,
        height: 36,
        alignSelf: 'center'
    },
    dividerStyle: {
        width: SCREEN_WIDTH - 20,
        backgroundColor: Colors.white,
        alignSelf: 'center'
    },
    modalStyle: {
        position: 'absolute',
        backgroundColor: 'green',
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
    },
}

const mapStateToProps = ({navigatorState}) => ({navigatorState});

export default connect(mapStateToProps, {toggleMenuAction,liveRadioReadyAction,toggleLiveRadioAction})(HomeScreen);
