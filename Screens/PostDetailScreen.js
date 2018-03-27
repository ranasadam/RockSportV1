import React from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {selectPost} from "../Actions";
import {connect} from "react-redux";
import getDateDifferenceString, {SCREEN_WIDTH} from "../Constants";
import CustomStatusBar from "../Components/CustomStatusBar";
import HTMLView from "react-native-htmlview/HTMLView";
import CustomNavigationBar from "../Components/CustomNavigationBar";
import BottomBannerAd from "../Components/BottomBannerAd";
import {ApplicationStyles, Colors, Images} from "../Themes";


class PostDetailScreen extends React.Component {

    tweet(post) {

        alert('tweet')
    }

    facebookShare(post) {

        alert("post")
    }

    render() {
        const {
            container,
            bottomScrollViewContainer,
            bannerImageStyle,
            newsTextContainerStyle,
            newsTextStyle,
            postTitleStyle,
            bottomContainer,
            postInformationContainerStyle,
            postInfoTextStyle,
            timeCategoryTextStyle,
            postInfoSocialStyle,
            postContentStyle,
            socialImagesStyle,
            postInfoShareStyle,

        } = styles;
        const {selectedPost} = this.props.navigatorState;
        return (
            <View style={container}>
                <ImageBackground
                    source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                    <CustomStatusBar/>
                    <CustomNavigationBar navigator={this.props.navigation}/>
                    <ScrollView style={bottomScrollViewContainer}>
                        <ImageBackground
                            source={{uri: selectedPost.thumbnail_images.medium_large.url}}
                            style={bannerImageStyle}>
                            <View style={newsTextContainerStyle}>
                                <Text style={newsTextStyle}>NEWS</Text>
                            </View>
                        </ImageBackground>
                        <View style={bottomContainer}>
                            <HTMLView style={postTitleStyle}
                                      value={'<h3>' + selectedPost.title + '</h3>'}
                                      stylesheet={htmlViewStyles}
                            />
                            <View style={postInformationContainerStyle}>
                                <View style={postInfoTextStyle}>
                                    <Text>by {selectedPost.author.name}</Text>
                                    <Text
                                        style={timeCategoryTextStyle}>
                                        {
                                            getDateDifferenceString(selectedPost.modified)
                                        }
                                        &nbsp; ago | &nbsp;
                                        {
                                            selectedPost.categories.length && selectedPost.categories[0].title
                                        }
                                    </Text>
                                </View>
                                <View style={postInfoSocialStyle}>
                                    <Text style={postInfoShareStyle}>Share this</Text>
                                    <TouchableHighlight onPress={() => this.tweet(selectedPost)}>
                                        <Image
                                            source={Images.twitterIcon}
                                            style={socialImagesStyle}
                                        />
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={() => this.facebookShare(selectedPost)}>
                                        <Image
                                            source={Images.facebookIcon}
                                            style={socialImagesStyle}
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <HTMLView style={postContentStyle}
                                      value={selectedPost.content}
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
    newsTextContainerStyle: {
        width: SCREEN_WIDTH,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    newsTextStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        color: Colors.white,
        fontSize: 16,
        fontWeight: "400"
    },

    postTitleStyle: {
        marginTop: 20,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    bottomScrollViewContainer: {
        backgroundColor: Colors.white,
    },
    bottomContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    postInformationContainerStyle: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postInfoTextStyle: {},
    postInfoShareStyle: {
        paddingRight: 5,
    },
    postInfoSocialStyle: {
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
    postContentStyle: {
        marginTop: 20,
    },
}
const htmlViewStyles = StyleSheet.create({
    h3: {
        fontSize: 22,
    },

});
const mapStateToProps = ({navigatorState}) => ({navigatorState});


export default connect(mapStateToProps, {selectPost})(PostDetailScreen);
