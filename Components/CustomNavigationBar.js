import React from 'react';
import {Image,ImageBackground, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ApplicationStyles, Images} from '../Themes'
import {fetchSponsorsAction, toggleMenuAction} from "../Actions";
import {connect} from "react-redux";
import {web} from "react-native-communications";

class CustomNavigationBar extends React.Component {

    componentWillMount() {
        this.props.fetchSponsorsAction();
    }

    constructor(props) {
        super(props);

        this.state = {
            navigator: props.navigator,
            showMenuIcon: props.showMenuIcon,
            showBackButton: props.showBackButton,
            currentSponsorIndex: 0,
            numberOfSponsors: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        // update original states
        this.setState({
            navigator: nextProps.navigator,
            showMenuIcon: nextProps.showMenuIcon,
            showBackButton: nextProps.showBackButton,
        });
    }


    render() {
        const {isSideMenuOpen} = this.props.navigatorState;
        const {sponsorsData} = this.props;
        const {
            containerStyle,
            rightContainerStyle,
            leftContainerStyle,
            backIcon,
            rockSportLogo,
            sponsorImage,
            menuIcon,

        } = styles;
        return (
            <View
               style={containerStyle}>
                <View style={leftContainerStyle}>
                    <View>
                        {
                            !this.state.showBackButton &&
                            <TouchableOpacity activeOpacity={0.7}
                                              onPress={() => this.handleBackPress()}>
                                <Image
                                    source={Images.backIcon}
                                    style={backIcon}/>
                            </TouchableOpacity>
                        }
                    </View>
                    <Image
                        source={Images.rockSportLogoImage}
                        style={rockSportLogo}/>
                </View>
                <View style={rightContainerStyle}>
                    <TouchableOpacity activeOpacity={0.7}
                                      onPress={() => this.onSponsorClicked(sponsorsData.data.length ? sponsorsData.data[0].url : null)}>
                        <Image
                            source={sponsorsData.data.length ? {uri: sponsorsData.data[0].thumbnail_images.medium_large.url} : null}
                            style={sponsorImage}/>
                    </TouchableOpacity>
                    {this.state.showMenuIcon &&
                    <TouchableOpacity activeOpacity={0.7}
                                      onPress={() => isSideMenuOpen ? this.props.toggleMenuAction(false) : this.props.toggleMenuAction(true)}>
                        <Image
                            source={isSideMenuOpen ? Images.crossIcon : Images.menuIcon}
                            style={menuIcon}/>
                    </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    handleBackPress() {
        if (this.props.navigatorState.isSideMenuOpen) {
            this.props.toggleMenuAction(false);
        } else {
            this.state.navigator.goBack(null);
        }
    }

    onSponsorClicked = (url) => {
        web(url)
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        height: Platform.OS === 'ios' ? 64 : 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    rightContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    leftContainerStyle: {
        alignItems: "center",
        flexDirection: 'row',
    },
    rockSportLogo: {
        width: (30) * 3,
        marginLeft: 20,
        height: 30,
    },
    sponsorImage: {
        width: (30) * 3,
        marginRight: 20,
        height: 30,
    },
    backIcon: {
        width: 36,
        height: 36,
    },
    menuIcon: {
        width: 36,
        height: 36,
    },
});
const mapStateToProps = ({sponsorsData, navigatorState}) => ({sponsorsData, navigatorState});

export default connect(mapStateToProps, {fetchSponsorsAction, toggleMenuAction})(CustomNavigationBar);

