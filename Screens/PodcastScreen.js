import React from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fetchPodcastAction, selectPodcast, toggleMenuAction} from "../Actions";
import {connect} from "react-redux";
import getDateDifferenceString, { SCREEN_HEIGHT, SCREEN_WIDTH} from "../Constants";
import CustomStatusBar from "../Components/CustomStatusBar";
import LoadingViewComponent from "../Components/LoadingViewComponent";
import BottomBannerAd from "../Components/BottomBannerAd";
import HTMLView from "react-native-htmlview/HTMLView";
import CustomNavigationBar from "../Components/CustomNavigationBar";
import {ApplicationStyles, Colors, Images} from "../Themes";
import {ProgressDialog} from "react-native-simple-dialogs";

class PodcastScreen extends React.Component {
    componentDidMount() {
        this.props.toggleMenuAction(false);
    }
    componentWillMount() {
        this.props.fetchPodcastAction();
    }

    render() {
        const {podcastData} = this.props;

        return (
            <ImageBackground
                source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                <CustomStatusBar/>
                <CustomNavigationBar navigator={this.props.navigation}/>
                <ProgressDialog
                    visible={podcastData.isFetching}
                    message="Loading..."
                    activityIndicatorColor="black"
                />
                <ScrollView>
                    {
                        podcastData.data.length ?
                            this.renderTopPodcast(podcastData.data[0])
                            : null
                    }
                    {
                        podcastData.data.length ?
                            this.renderPodcasts(podcastData.data.slice(1))
                            : null
                    }
                </ScrollView>
                <BottomBannerAd/>
            </ImageBackground>
        );
    }

    renderTopPodcast(podcast) {
        const {
            bannerImageStyle,
            podcastTextContainerStyle,
            podcastTextStyle,
            bottomContainer,
            podcastTitleContainer,
            podcastTitleStyle,
            rightArrowStyle,
            podcastShortDescStyle,
            timeCategoryTextStyle,
        } = styles;
        return (

            <View>
                <ImageBackground
                    source={{uri: podcast.thumbnail_images.medium_large.url}}
                    style={bannerImageStyle}>
                    <View style={podcastTextContainerStyle}>
                        <Text style={podcastTextStyle}>PODCASTS</Text>
                    </View>
                </ImageBackground>
                <TouchableOpacity activeOpacity={0.7} onPress={() => this.showPodcastDetails(podcast)}>
                    <View style={bottomContainer}>
                        <View style={podcastTitleContainer}>
                            <HTMLView style={podcastTitleStyle}
                                      value={'<h3>' + podcast.title + '</h3>'}
                                      stylesheet={htmlViewStyles}
                            />
                            <Image
                                source={Images.arrowRight}
                                style={rightArrowStyle}/>
                        </View>
                        <Text style={podcastShortDescStyle}>
                            {
                                //   striptags(podcast.excerpt).split(".")[0] + "..."
                            }
                        </Text>
                        <Text
                            style={timeCategoryTextStyle}>
                            {
                                getDateDifferenceString(podcast.modified)
                            }
                            &nbsp;ago |&nbsp;
                            {
                                podcast.taxonomy_podcastfilter.length && podcast.taxonomy_podcastfilter[0].title
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }

    renderPodcasts(podcasts) {
        const {
            bottomContainer,
            podcastItemContainerStyle,
            podcastItemImageStyle,
            podcastItemTextContainerStyle,
            podcastItemTitleStyle,
            podcastInfoTextStyle,
            podcastArrowIconStyle,
            podcastItemDetailContainerStyle
        } = styles;
        return podcasts.map((podcast, i) => {
            return (
                <TouchableOpacity activeOpacity={0.7} key={i} onPress={() => this.showPodcastDetails(podcast)}>
                    <View style={[podcastItemContainerStyle, bottomContainer]}>
                        <Image
                            source={{uri: podcast.thumbnail_images.medium_large.url}}
                            style={podcastItemImageStyle}>
                        </Image>
                        <View style={podcastItemDetailContainerStyle}>
                            <View style={podcastItemTextContainerStyle}>
                                <HTMLView style={podcastItemTitleStyle}
                                          value={'<h4>' + podcast.title + '</h4>'}
                                          stylesheet={htmlViewStyles}
                                />
                                <Text
                                    style={podcastInfoTextStyle}>
                                    {
                                        getDateDifferenceString(podcast.modified)
                                    }
                                    &nbsp;ago |&nbsp;
                                    {
                                        podcast.taxonomy_podcastfilter.length && podcast.taxonomy_podcastfilter[0].title
                                    }
                                </Text>
                            </View>
                            <Image
                                source={Images.arrowRight}
                                style={podcastArrowIconStyle}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    showPodcastDetails(podcast) {
        this.props.selectPodcast(podcast);
        this.props.navigation.navigate('PodcastDetail')
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
    podcastTextContainerStyle: {
        width: SCREEN_WIDTH,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    podcastTextStyle: {
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
    podcastTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    podcastTitleStyle: {
        marginTop: 10,
        width: SCREEN_WIDTH * 0.80,
    },
    rightArrowStyle: {
        width: 36,
        height: 36,
        alignSelf: 'center'
    },
    podcastShortDescStyle: {
        marginTop: 10,
        color: Colors.white
    },
    timeCategoryTextStyle: {
        marginTop: 10,
        color: Colors.grey
    },

    podcastItemContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    podcastItemImageStyle: {
        width: 100,
        height: 100 / 1.8,
        alignSelf: 'center'
    },
    podcastItemDetailContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    }, podcastItemTextContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    podcastItemTitleStyle: {},
    podcastInfoTextStyle: {
        fontSize: 12,
        color: Colors.grey
    },
    podcastArrowIconStyle: {
        width: 24,
        height: 24,
        alignSelf: 'center'
    },
}

const mapStateToProps = ({podcastData}) => ({podcastData});

export default connect(mapStateToProps, {fetchPodcastAction, selectPodcast,toggleMenuAction})(PodcastScreen);