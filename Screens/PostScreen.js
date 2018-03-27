import React from 'react';
import {
    Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity,
    View
} from 'react-native';
import {connect} from "react-redux";
import {fetchPostAction, selectPost, toggleMenuAction} from "../Actions";
import getDateDifferenceString, { SCREEN_HEIGHT, SCREEN_WIDTH} from "../Constants";
import CustomStatusBar from "../Components/CustomStatusBar";
import CustomNavigationBar from "../Components/CustomNavigationBar";
import LoadingViewComponent from "../Components/LoadingViewComponent";
import HTMLView from "react-native-htmlview/HTMLView";
import BottomBannerAd from "../Components/BottomBannerAd";
import {ApplicationStyles, Colors, Images} from "../Themes";
import {ProgressDialog} from "react-native-simple-dialogs";

var striptags = require('striptags');

class PostScreen extends React.Component {
    componentDidMount() {
        this.props.toggleMenuAction(false);
    }
    componentWillMount() {
        this.props.fetchPostAction();
    }

    render() {
        const {postData} = this.props;

        return (
            <ImageBackground
                source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                <CustomStatusBar/>
                <CustomNavigationBar navigator={this.props.navigation}/>
                <ProgressDialog
                    visible={postData.isFetching}
                    message="Loading..."
                    activityIndicatorColor="black"
                />
                <ScrollView>

                    {
                        postData.data.length ?
                            this.renderTopPost(postData.data[0])
                            : null
                    }
                    {
                        postData.data.length ?
                            this.renderPosts(postData.data.slice(1))
                            : null
                    }
                </ScrollView>
                <BottomBannerAd/>
            </ImageBackground>
        );
    }


    renderTopPost(post) {
        const {
            bannerImageStyle,
            newsTextContainerStyle,
            newsTextStyle,
            bottomContainer,
            postTitleContainer,
            postTitleStyle,
            rightArrowStyle,
            postShortDescStyle,
            timeCategoryTextStyle,
        } = styles;
        return (

            <View>
                <ImageBackground
                    source={{uri: post.thumbnail_images.medium_large.url}}
                    style={bannerImageStyle}>
                    <View style={newsTextContainerStyle}>
                        <Text style={newsTextStyle}>NEWS</Text>
                    </View>
                </ImageBackground>
                <TouchableOpacity  activeOpacity={0.7} onPress={() => this.showPostDetails(post)}>
                    <View style={bottomContainer}>
                        <View style={postTitleContainer}>
                            <HTMLView style={postTitleStyle}
                                      value={'<h3>' + post.title + '</h3>'}
                                      stylesheet={htmlViewStyles}
                            />
                            <Image
                                source={Images.arrowRight}
                                style={rightArrowStyle}/>
                        </View>
                        <Text style={postShortDescStyle}>
                            {
                                striptags(post.excerpt).split(".")[0] + "..."
                            }
                        </Text>
                        <Text
                            style={timeCategoryTextStyle}>
                            {
                                getDateDifferenceString(post.modified)
                            }
                            &nbsp;ago |&nbsp;
                            {
                                post.categories.length && post.categories[0].title
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }

    renderPosts(data) {
        const {
            bottomContainer,
            postItemContainerStyle,
            postItemImageStyle,
            postItemTextContainerStyle,
            postItemTitleStyle,
            postInfoTextStyle,
            postArrowIconStyle,
            postItemDetailContainerStyle
        } = styles;
        return data.map((post, i) => {
            return (
                <TouchableOpacity  activeOpacity={0.7} key={i} onPress={() => this.showPostDetails(post)}>
                    <View style={[postItemContainerStyle, bottomContainer]}>
                        <Image
                            source={{uri: post.thumbnail_images.medium_large.url}}
                            style={postItemImageStyle}>
                        </Image>
                        <View style={postItemDetailContainerStyle}>
                            <View style={postItemTextContainerStyle}>
                                <HTMLView style={postItemTitleStyle}
                                          value={'<h4>' + post.title + '</h4>'}
                                          stylesheet={htmlViewStyles}
                                />
                                <Text
                                    style={postInfoTextStyle}>
                                    {
                                        getDateDifferenceString(post.modified)
                                    }
                                    &nbsp;ago |&nbsp;
                                    {
                                        post.categories.length && post.categories[0].title
                                    }
                                </Text>
                            </View>
                            <Image
                                source={Images.arrowRight}
                                style={postArrowIconStyle}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    showPostDetails(post) {
        this.props.selectPost(post);
        this.props.navigation.navigate('PostDetail')
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
    bottomContainer: {
        paddingLeft: 20,
        paddingRight: 10,
    },
    postTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postTitleStyle: {
        marginTop: 10,
        width:SCREEN_WIDTH*0.80,
    },
    rightArrowStyle: {
        width: 36,
        height: 36,
        alignSelf: 'center'
    },
    postShortDescStyle: {
        marginTop: 10,
        color: Colors.white
    },
    timeCategoryTextStyle: {
        marginTop: 10,
        color: Colors.grey
    },

    postItemContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    postItemImageStyle: {
        width: 100,
        height: 100 / 1.8,
        alignSelf: 'center'
    },
    postItemDetailContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    }, postItemTextContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    postItemTitleStyle: {},
    postInfoTextStyle: {
        fontSize: 12,
        color: Colors.grey
    },
    postArrowIconStyle: {
        width: 24,
        height: 24,
        alignSelf: 'center'
    },
}
const mapStateToProps = ({postData}) => ({postData});

export default connect(mapStateToProps, {fetchPostAction, selectPost,toggleMenuAction})(PostScreen);
