import React from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import {fetchVideosAction, selectVideo, toggleMenuAction} from "../Actions";
import { SCREEN_HEIGHT, SCREEN_WIDTH} from "../Constants";
import CustomStatusBar from "../Components/CustomStatusBar";
import LoadingViewComponent from "../Components/LoadingViewComponent";
import BottomBannerAd from "../Components/BottomBannerAd";
import getDateDifferenceString from "../Constants";
import HTMLView from "react-native-htmlview/HTMLView";
import CustomNavigationBar from "../Components/CustomNavigationBar";
import {ApplicationStyles, Colors, Images} from "../Themes";
import {ProgressDialog} from "react-native-simple-dialogs";

class VideoScreen extends React.Component {
    componentDidMount() {
        this.props.toggleMenuAction(false);
    }
    componentWillMount() {
        this.props.fetchVideosAction();
    }

    render() {
        const {videoData} = this.props;
        return (
            <ImageBackground
                source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                <CustomStatusBar/>
                <CustomNavigationBar navigator={this.props.navigation}/>
                <ProgressDialog
                    visible={videoData.isFetching}
                    message="Loading..."
                    activityIndicatorColor="black"
                />
                <ScrollView>
                    {
                        videoData.data.length ?
                            this.renderTopVideo(videoData.data[0])
                            : null
                    }
                    {
                        videoData.data.length ?
                            this.renderVideos(videoData.data.slice(1))
                            :null
                    }
                </ScrollView>
                <BottomBannerAd/>
            </ImageBackground>
        );
    }

    renderTopVideo(video) {
        const {
            bannerImageStyle,
            videoTextContainerStyle,
            videoTextStyle,
            bottomContainer,
            videoTitleContainer,
            videoTitleStyle,
            rightArrowStyle,
            videoShortDescStyle,
            timeCategoryTextStyle,
        } = styles;
        return (

            <View>
                <ImageBackground
                    source={{uri: video.thumbnail_images.medium_large.url}}
                    style={bannerImageStyle}>
                    <View style={videoTextContainerStyle}>
                        <Text style={videoTextStyle}>VIDEOS</Text>
                    </View>
                </ImageBackground>
                <TouchableOpacity  activeOpacity={0.7} onPress={() => this.showVideoDetails(video)}>
                    <View style={bottomContainer}>
                        <View style={videoTitleContainer}>
                            <HTMLView style={videoTitleStyle}
                                      value={'<h3>' + video.title + '</h3>'}
                                      stylesheet={htmlViewStyles}
                            />
                            <Image
                                source={Images.arrowRight}
                                style={rightArrowStyle}/>
                        </View>
                        <Text style={videoShortDescStyle}>
                            {
                                //   striptags(video.excerpt).split(".")[0] + "..."
                            }
                        </Text>
                        <Text
                            style={timeCategoryTextStyle}>
                            {
                                getDateDifferenceString(video.modified)
                            }
                            &nbsp;ago
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }

    renderVideos(videos) {
        const {
            bottomContainer,
            videoItemContainerStyle,
            videoItemImageStyle,
            videoItemTextContainerStyle,
            videoItemTitleStyle,
            videoInfoTextStyle,
            videoArrowIconStyle,
            videoItemDetailContainerStyle
        } = styles;
        return videos.map((video, i) => {
            return (
                <TouchableOpacity  activeOpacity={0.7} key={i} onPress={() => this.showVideoDetails(video)}>
                    <View style={[videoItemContainerStyle, bottomContainer]}>
                        <Image
                            source={{uri: video.thumbnail_images.medium_large.url}}
                            style={videoItemImageStyle}>
                        </Image>
                        <View style={videoItemDetailContainerStyle}>
                            <View style={videoItemTextContainerStyle}>
                                <HTMLView style={videoItemTitleStyle}
                                          value={'<h4>' + video.title + '</h4>'}
                                          stylesheet={htmlViewStyles}
                                />
                                <Text
                                    style={videoInfoTextStyle}>
                                    {
                                        getDateDifferenceString(video.modified)
                                    }
                                    &nbsp;ago
                                </Text>
                            </View>
                            <Image
                                source={Images.arrowRight}
                                style={videoArrowIconStyle}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    showVideoDetails(video) {
        this.props.selectVideo(video);
     this.props.navigation.navigate('VideoDetail')
    }
}

const htmlViewStyles = StyleSheet.create({
    h3: {
        fontSize: 22,
        color: Colors.white
    },
    h4: {
        fontSize: 14,
        color: Colors.white
    },
    p: {
        fontSize: 14,
        color: Colors.white
    },
});
const styles = {

    bannerImageStyle: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH / 2.1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
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
    bottomContainer: {
        paddingLeft: 20,
        paddingRight: 10,
    },
    videoTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    videoTitleStyle: {
        marginTop: 10,
        width:SCREEN_WIDTH*0.80,
    },
    rightArrowStyle: {
        width: 36,
        height: 36,
        alignSelf: 'center'
    },
    videoShortDescStyle: {
        marginTop: 10,
        color: Colors.white
    },
    timeCategoryTextStyle: {
        marginTop: 10,
        color: Colors.grey
    },

    videoItemContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    videoItemImageStyle: {
        width: 100,
        height: 100 / 1.8,
        alignSelf: 'center'
    },
    videoItemDetailContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    }, videoItemTextContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    videoItemTitleStyle: {},
    videoInfoTextStyle: {
        fontSize: 12,
        color: Colors.grey
    },
    videoArrowIconStyle: {
        width: 24,
        height: 24,
        alignSelf: 'center'
    },
}

const mapStateToProps = ({videoData}) => ({videoData});

export default connect(mapStateToProps, {fetchVideosAction,selectVideo,toggleMenuAction})(VideoScreen);