import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import {SCREEN_WIDTH} from "../Constants";
import {connect} from "react-redux";
import {fetchPostAction, selectPost} from "../Actions";
import HTMLView from "react-native-htmlview";
import LoadingViewComponent from "./LoadingViewComponent";
import {Colors} from "../Themes";

const TOTAL_POSTS_COUNT = 4;

class PostsViewPagerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navigator: props.navigator,
        };
    }

    componentDidMount() {
    }

    componentWillMount() {
        this.props.fetchPostAction();
    }

    componentWillReceiveProps(nextProps) {
        // update original states
        this.setState({
            navigator: nextProps.navigator,
        });
    }

    render() {
        const {postData} = this.props;
        const {
            imageBackgroundStyle, readMoreContainerStyle,
            readMoreTextStyle, postDescriptionStyle
        } = styles;
        return (
            <View style={{height: 200}}>
                {
                    postData.isFetching &&

                    <LoadingViewComponent height={200} color={Colors.white}/>

                }
                {
                    postData.data.length ? (
                        <IndicatorViewPager
                            style={{height: 200}}
                            indicator={this._renderDotIndicator()}
                        >
                            {
                                postData.data.map((post, i) => {
                                    if (i < TOTAL_POSTS_COUNT)
                                        return (
                                            <View key={i}>
                                                <ImageBackground
                                                    source={{uri: post.thumbnail_images.medium_large.url}}
                                                    style={imageBackgroundStyle}>
                                                    <View style={postDescriptionStyle}>
                                                        <HTMLView
                                                            value={'<p>' + post.title + '</p>'}
                                                            stylesheet={htmlViewStyles}
                                                        />
                                                        <TouchableOpacity
                                                            activeOpacity={0.7}
                                                            style={readMoreContainerStyle}
                                                            onPress={() => this.showPostDetails(post)}>
                                                            <Text
                                                                style={readMoreTextStyle}>
                                                                Read More
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        );
                                })
                            }
                        </IndicatorViewPager>
                    ) : null
                }
            </View>
        );
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={TOTAL_POSTS_COUNT}/>;
    }


    showPostDetails(post) {
        this.props.selectPost(post);
        this.state.navigator.navigate('PostDetail')
    }
}

const htmlViewStyles = StyleSheet.create({
    p: {
        fontSize: 22,
        paddingLeft: 40,
        paddingRight: 40,
        color: Colors.white,
        fontWeight: '500',
        textAlign: 'center'
    },
});
const styles = {
    imageBackgroundStyle: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH / 1.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postDescriptionStyle: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH / 1.8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    readMoreContainerStyle: {
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
        padding: 5,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.white
    },
    readMoreTextStyle: {
        fontSize: 14,
        color: Colors.white,
    },
};

const mapStateToProps = ({postData}) => ({postData});

export default connect(mapStateToProps, {fetchPostAction, selectPost})(PostsViewPagerComponent);
