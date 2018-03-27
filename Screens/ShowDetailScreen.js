import React from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {selectShow} from "../Actions";
import {connect} from "react-redux";
import getDateDifferenceString, {SCREEN_WIDTH} from "../Constants";
import CustomStatusBar from "../Components/CustomStatusBar";
import HTMLView from "react-native-htmlview/HTMLView";
import BottomBannerAd from "../Components/BottomBannerAd";
import {ApplicationStyles, Colors, Images} from "../Themes";
import CustomNavigationBar from "../Components/CustomNavigationBar";


class ShowDetailScreen extends React.Component {

    tweet(show) {

        alert('tweet')
    }

    facebookShare(show) {

        alert("show")
    }

    render() {
        const {
            container,
            bottomScrollViewContainer,
            bannerImageStyle,
            showTextContainerStyle,
            showTextStyle,
            showTitleStyle,
            bottomContainer,
            showInformationContainerStyle,
            showInfoTextStyle,
            timeCategoryTextStyle,
            showInfoSocialStyle,
            showContentStyle,
            socialImagesStyle,
            showInfoShareStyle,

        } = styles;
        const {selectedShow} = this.props.navigatorState;
        return (
            <View style={container}>
                <ImageBackground
                    source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                    <CustomStatusBar/>
                    <CustomNavigationBar navigator={this.props.navigation}/>
                    <ScrollView style={bottomScrollViewContainer}>
                        <ImageBackground
                            source={{uri: selectedShow.thumbnail_images.medium_large.url}}
                            style={bannerImageStyle}>
                            <View style={showTextContainerStyle}>
                                <Text style={showTextStyle}>SHOW</Text>
                            </View>
                        </ImageBackground>
                        <View style={bottomContainer}>
                            <HTMLView style={showTitleStyle}
                                      value={'<h3>' + selectedShow.title + '</h3>'}
                                      stylesheet={htmlViewStyles}
                            />
                            <View style={showInformationContainerStyle}>
                                <View style={showInfoTextStyle}>
                                    <Text>by {selectedShow.author.name}</Text>
                                    <Text
                                        style={timeCategoryTextStyle}>
                                        {
                                            getDateDifferenceString(selectedShow.modified)
                                        }
                                    </Text>
                                </View>
                                <View style={showInfoSocialStyle}>
                                    <Text style={showInfoShareStyle}>Share this</Text>
                                    <TouchableHighlight onPress={() => this.tweet(selectedShow)}>
                                        <Image
                                            source={Images.twitterIcon}
                                            style={socialImagesStyle}
                                        />
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={() => this.facebookShare(selectedShow)}>
                                        <Image
                                            source={Images.facebookIcon}
                                            style={socialImagesStyle}
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <HTMLView style={showContentStyle}
                                      value={selectedShow.content}
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
    showTextContainerStyle: {
        width: SCREEN_WIDTH,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    showTextStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        color: Colors.white,
        fontSize: 16,
        fontWeight: "400"
    },

    showTitleStyle: {
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
    showInformationContainerStyle: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    showInfoTextStyle: {},
    showInfoShareStyle: {
        paddingRight: 5,
    },
    showInfoSocialStyle: {
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
    showContentStyle: {
        marginTop: 20,
    },
}
const htmlViewStyles = StyleSheet.create({
    h3: {
        fontSize: 22,
    },

});
const mapStateToProps = ({navigatorState}) => ({navigatorState});


export default connect(mapStateToProps, {selectShow})(ShowDetailScreen);