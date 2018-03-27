import React from 'react';
import {
    Image,
    ImageBackground,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import YouTube from 'react-native-youtube';
import CustomStatusBar from "../Components/CustomStatusBar";
import {connect} from "react-redux";
import {ApplicationStyles, Colors, Images} from "../Themes";
import HTMLView from "react-native-htmlview/HTMLView";
import {selectVideo} from "../Actions";
import getDateDifferenceString, {SCREEN_WIDTH, YOUTUBE_API_KEY} from "../Constants";
import BottomBannerAd from "../Components/BottomBannerAd";
import LiveRadioComponent from "../Components/LiveRadioComponent";
import CustomNavigationBar from "../Components/CustomNavigationBar";

class VideoDetailScreen extends React.Component {
    state = {
        isReady: false,
        status: null,
        quality: null,
        error: null,
        isPlaying: false,
        isLooping: false,
        duration: 0,
        currentTime: 0,
        fullscreen: false,
        showFullscreenButton: false,
        containerMounted: false,
        containerWidth: null,
    };

    youtube_parser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    render() {
        const {
            bottomScrollViewStyle,
            videoTitleStyle,
            bottomContainer,
            videoInformationContainerStyle,
            videoInfoTextStyle,
            timeCategoryTextStyle,
            videoInfoSocialStyle,
            videoContentStyle,
            socialImagesStyle,
            videoInfoShareStyle,

        } = styles;
        const {selectedVideo} = this.props.navigatorState;
        return (
            <View
                style={styles.container}
                onLayout={({nativeEvent: {layout: {width}}}) => {
                    if (!this.state.containerMounted) this.setState({containerMounted: true});
                    if (this.state.containerWidth !== width) this.setState({containerWidth: width});
                }}
            >
                <ImageBackground
                    source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                    <CustomStatusBar/>
                    <CustomNavigationBar navigator={this.props.navigation}/>
                    {this.state.containerMounted && (
                        <YouTube
                            ref={component => {
                                this._youTubeRef = component;
                            }}
                            apiKey={YOUTUBE_API_KEY}
                            videoId={this.youtube_parser(selectedVideo.custom_fields._videolove_url_key[0])}
                            play={this.state.isPlaying}
                            loop={this.state.isLooping}
                            fullscreen={this.state.fullscreen}
                            showFullscreenButton={this.state.showFullscreenButton}
                            controls={1}
                            style={[
                                {height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9))},
                                styles.player,
                            ]}
                            onError={e => this.setState({error: e.error})}
                            onReady={e => this.setState({isReady: true})}
                            onChangeState={e => this.setState({status: e.state})}
                            onChangeQuality={e => this.setState({quality: e.quality})}
                            onChangeFullscreen={e => this.setState({fullscreen: e.isFullscreen})}
                            onProgress={e => this.setState({duration: e.duration, currentTime: e.currentTime})}
                        />
                    )}
                    <ScrollView style={bottomScrollViewStyle}>
                        <View style={bottomContainer}>
                            <HTMLView style={videoTitleStyle}
                                      value={'<h3>' + selectedVideo.title + '</h3>'}
                                      stylesheet={htmlViewStyles}
                            />
                            <View style={videoInformationContainerStyle}>
                                <View style={videoInfoTextStyle}>
                                    <Text>by {selectedVideo.author.name}</Text>
                                    <Text
                                        style={timeCategoryTextStyle}>
                                        {
                                            getDateDifferenceString(selectedVideo.modified)
                                        }
                                    </Text>
                                </View>
                                <View style={videoInfoSocialStyle}>
                                    <Text style={videoInfoShareStyle}>Share this</Text>
                                    <TouchableHighlight onPress={() => this.tweet(selectedVideo)}>
                                        <Image
                                            source={Images.twitterIcon}
                                            style={socialImagesStyle}
                                        />
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={() => this.facebookShare(selectedVideo)}>
                                        <Image
                                            source={Images.facebookIcon}
                                            style={socialImagesStyle}
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <HTMLView style={videoContentStyle}
                                      value={selectedVideo.content}
                                      stylesheet={htmlViewStyles}
                            />
                        </View>
                    </ScrollView>
                    <LiveRadioComponent/>
                    <BottomBannerAd/>
                </ImageBackground>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    player: {
        alignSelf: 'stretch',
    },
    videoTextContainerStyle: {
        width: SCREEN_WIDTH,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    videoTextStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        color: Colors.white,
        fontSize: 16,
        fontWeight: "400"
    },

    videoTitleStyle: {
        marginTop: 20,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    bottomScrollViewStyle: {
        flex: 1,
        backgroundColor:Colors.white,
    },
    bottomContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    videoInformationContainerStyle: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    videoInfoTextStyle: {},
    videoInfoShareStyle: {
        paddingRight: 5,
    },
    videoInfoSocialStyle: {
        flexDirection: 'row',
        alignItems: 'flex-end',

    },
    socialImagesStyle: {
        width: 24,
        height: 24,
    },
    timeCategoryTextStyle: {
        color: Colors.themeRed
    },
    videoContentStyle: {
        marginTop: 20,
    },
});
const htmlViewStyles = StyleSheet.create({
    h3: {
        fontSize: 22,
    },

});
const mapStateToProps = ({navigatorState}) => ({navigatorState});


export default connect(mapStateToProps, {selectVideo})(VideoDetailScreen);
