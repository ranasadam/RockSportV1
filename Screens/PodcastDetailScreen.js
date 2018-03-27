import React from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {selectPodcast} from "../Actions";
import {connect} from "react-redux";
import getDateDifferenceString, {SCREEN_WIDTH} from "../Constants";
import HTMLView from "react-native-htmlview/HTMLView";
import BottomBannerAd from "../Components/BottomBannerAd";
import CustomStatusBar from "../Components/CustomStatusBar";
import {ApplicationStyles, Colors, Images} from "../Themes";
import CustomNavigationBar from "../Components/CustomNavigationBar";

class PodcastDetailScreen extends React.Component {
    tweet(podcast) {

        alert('tweet')
    }

    facebookShare(podcast) {

        alert("podcast")
    }

    render() {
        const {
            container,
            bannerImageStyle,
            bottomScrollViewContainer,
            podcastTextContainerStyle,
            podcastTextStyle,
            podcastTitleStyle,
            bottomContainer,
            podcastInformationContainerStyle,
            podcastInfoTextStyle,
            timeCategoryTextStyle,
            podcastInfoSocialStyle,
            podcastContentStyle,
            socialImagesStyle,
            podcastInfoShareStyle,

        } = styles;
        const {selectedPodcast} = this.props.navigatorState;
        return (
            <View style={container}>
                <ImageBackground
                    source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                    <CustomStatusBar/>
                    <CustomNavigationBar navigator={this.props.navigation}/>
                    <ScrollView style={bottomScrollViewContainer}>
                        <ImageBackground
                            source={{uri: selectedPodcast.thumbnail_images.medium_large.url}}
                            style={bannerImageStyle}>
                            <View style={podcastTextContainerStyle}>
                                <Text style={podcastTextStyle}>PODCAST</Text>
                            </View>
                        </ImageBackground>
                        <View style={bottomContainer}>
                            <HTMLView style={podcastTitleStyle}
                                      value={'<h3>' + selectedPodcast.title + '</h3>'}
                                      stylesheet={htmlViewStyles}
                            />
                            <View style={podcastInformationContainerStyle}>
                                <View style={podcastInfoTextStyle}>
                                    <Text>by {selectedPodcast.author.name}</Text>
                                    <Text
                                        style={timeCategoryTextStyle}>
                                        {
                                            getDateDifferenceString(selectedPodcast.modified)
                                        }
                                        &nbsp; ago | &nbsp;
                                        {
                                            selectedPodcast.taxonomy_podcastfilter.length && selectedPodcast.taxonomy_podcastfilter[0].title
                                        }
                                    </Text>
                                </View>
                                <View style={podcastInfoSocialStyle}>
                                    <Text style={podcastInfoShareStyle}>Share this</Text>
                                    <TouchableHighlight onPress={() => this.tweet(selectedPodcast)}>
                                        <Image
                                            source={Images.twitterIcon}
                                            style={socialImagesStyle}
                                        />
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={() => this.facebookShare(selectedPodcast)}>
                                        <Image
                                            source={Images.facebookIcon}
                                            style={socialImagesStyle}
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <HTMLView style={podcastContentStyle}
                                      value={selectedPodcast.content}
                                      stylesheet={htmlViewStyles}
                            />
                        </View>
                    </ScrollView>
                    <BottomBannerAd/>
                </ImageBackground>
            </View>
        );
    }
}


const styles = {

    bannerImageStyle: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH / 1.8,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    podcastTextContainerStyle: {
        width: SCREEN_WIDTH,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    bottomScrollViewContainer: {
        backgroundColor: Colors.white,
    },
    podcastTextStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        color: Colors.white,
        fontSize: 16,
        fontWeight: "400"
    },

    podcastTitleStyle: {
        marginTop: 20,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    bottomContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    podcastInformationContainerStyle: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    podcastInfoTextStyle: {},
    podcastInfoShareStyle: {
        paddingRight: 5,
    },
    podcastInfoSocialStyle: {
        flexDirection: 'row',
        alignItems: 'flex-end',

    },
    socialImagesStyle: {
        width: 24,
        height: 24,
    },
    timeCategoryTextStyle: {
        color: Colors.themeRed,
    },
    podcastContentStyle: {
        marginTop: 20,
    },
}
const htmlViewStyles = StyleSheet.create({
    h3: {
        fontSize: 22,
    },
    iframe: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH / 2,
    }

});

const mapStateToProps = ({navigatorState}) => ({navigatorState});

export default connect(mapStateToProps, {selectPodcast})(PodcastDetailScreen);