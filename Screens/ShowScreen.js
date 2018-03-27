import React from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fetchShowsAction, selectShow, toggleMenuAction} from "../Actions";
import {connect} from "react-redux";
import { SCREEN_HEIGHT, SCREEN_WIDTH} from "../Constants";
import CustomStatusBar from "../Components/CustomStatusBar";
import LoadingViewComponent from "../Components/LoadingViewComponent";
import BottomBannerAd from "../Components/BottomBannerAd";
import getDateDifferenceString from "../Constants";
import HTMLView from "react-native-htmlview/HTMLView";
import ShowDetailScreen from "./ShowDetailScreen";
import CustomNavigationBar from "../Components/CustomNavigationBar";
import {ApplicationStyles, Colors, Images} from "../Themes";
import {ProgressDialog} from "react-native-simple-dialogs";

class ShowScreen extends React.Component {
    componentDidMount() {
        this.props.toggleMenuAction(false);
    }
    componentWillMount() {
        this.props.fetchShowsAction();
    }

    render() {
        const {showData} = this.props;


        return (
            <ImageBackground
                source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                <CustomStatusBar/>
                <CustomNavigationBar navigator={this.props.navigation}/>
                <ProgressDialog
                    visible={showData.isFetching}
                    message="Loading..."
                    activityIndicatorColor="black"
                />
                <ScrollView>
                    {
                        showData.data.length ?
                            this.renderTopShow(showData.data[0])
                            : null
                    }
                    {
                        showData.data.length ?
                            this.renderShows(showData.data.slice(1))
                            : null
                    }
                </ScrollView>
                <BottomBannerAd/>
            </ImageBackground>
        );
    }

    renderTopShow(show) {
        const {
            bannerImageStyle,
            showTextContainerStyle,
            showTextStyle,
            bottomContainer,
            showTitleContainer,
            showTitleStyle,
            rightArrowStyle,
            showInfoTextStyle,
        } = styles;
        return (

            <View>
                <ImageBackground
                    source={{uri: show.thumbnail_images.medium_large.url}}
                    style={bannerImageStyle}>
                    <View style={showTextContainerStyle}>
                        <Text style={showTextStyle}>SHOWS</Text>
                    </View>
                </ImageBackground>
                <TouchableOpacity  activeOpacity={0.7} onPress={() => this.showDetails(show)}>
                    <View style={bottomContainer}>
                        <View style={showTitleContainer}>
                            <HTMLView style={showTitleStyle}
                                      value={'<h3>' + show.title + '</h3>'}
                                      stylesheet={htmlViewStyles}
                            />
                            <Image
                                source={Images.arrowRight}
                                style={rightArrowStyle}/>
                        </View>
                        <Text
                            style={showInfoTextStyle}>
                            {
                                getDateDifferenceString(show.modified)
                            }
                            &nbsp;ago&nbsp;
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }

    renderShows(shows) {
        const {
            bottomContainer,
            showItemContainerStyle,
            showItemImageStyle,
            showItemTextContainerStyle,
            showItemTitleStyle,
            showInfoTextStyle,
            showArrowIconStyle,
            showItemDetailContainerStyle
        } = styles;
        return shows.map((show, i) => {
            return (
                <TouchableOpacity  activeOpacity={0.7} key={i} onPress={() => this.showDetails(show)}>
                    <View style={[showItemContainerStyle, bottomContainer]}>
                        <Image
                            source={{uri: show.thumbnail_images.medium_large.url}}
                            style={showItemImageStyle}>
                        </Image>
                        <View style={showItemDetailContainerStyle}>
                            <View style={showItemTextContainerStyle}>
                                <HTMLView style={showItemTitleStyle}
                                          value={'<h4>' + show.title + '</h4>'}
                                          stylesheet={htmlViewStyles}
                                />
                                <Text
                                    style={showInfoTextStyle}>
                                    {
                                        getDateDifferenceString(show.modified)
                                    }
                                    &nbsp;ago&nbsp;
                                </Text>
                            </View>
                            <Image
                                source={Images.arrowRight}
                                style={showArrowIconStyle}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    showDetails(show) {
        this.props.selectShow(show);
        this.props.navigation.navigate('ShowDetail')
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
    bottomContainer: {
        paddingLeft: 20,
        paddingRight: 10,
    },
    showTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    showTitleStyle: {
        marginTop: 10,
        width:SCREEN_WIDTH*0.80,
    },
    rightArrowStyle: {
        width: 36,
        height: 36,
        alignSelf: 'center'
    },
    showShortDescStyle: {
        marginTop: 10,
        color: Colors.white
    },
    timeCategoryTextStyle: {
        marginTop: 10,
        color: Colors.grey
    },

    showItemContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    showItemImageStyle: {
        width: 100,
        height: 100 / 1.8,
        alignSelf: 'center'
    },
    showItemDetailContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    }, showItemTextContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    showItemTitleStyle: {},
    showInfoTextStyle: {
        fontSize: 12,
        color: Colors.grey
    },
    showArrowIconStyle: {
        width: 24,
        height: 24,
        alignSelf: 'center'
    },
}

const mapStateToProps = ({showData}) => ({showData});

export default connect(mapStateToProps, {fetchShowsAction,selectShow,toggleMenuAction})(ShowScreen);