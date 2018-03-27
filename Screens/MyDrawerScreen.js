import React from 'react';
import {Image, ImageBackground, Modal, Text, TextInput, TouchableOpacity, View, AsyncStorage} from "react-native";
import {SCREEN_WIDTH, USER_DATA_KEY} from "../Constants";
import {toggleMenuAction} from "../Actions";
import {connect} from "react-redux";
import CustomNavigationBar from "../Components/CustomNavigationBar";
import {ApplicationStyles, Images} from '../Themes'
import BottomBannerAd from "../Components/BottomBannerAd";
import {Colors} from "../Themes";
import {NavigationActions} from "react-navigation";

class MyDrawerScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            navigator: props.navigator,
            isUserAvailable: false,
            lastOptionText: 'Sign Up'
        }
    }

    componentWillMount() {
        AsyncStorage.getItem(USER_DATA_KEY).then(ret => {
            if (ret !== null) {
                this.setState({isUserAvailable: true})
                this.setState({lastOptionText: 'Logout'})
            } else {
                this.setState({isUserAvailable: false})
                this.setState({lastOptionText: 'Sign Up'})
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        // update original states
        this.setState({
            navigator: nextProps.navigator,
        });
    }

    render() {
        const {container, content, searchBgView, contentText, headerTextSimple} = styles;
        return (
            <Modal
                transparent
                animationType={'fade'}
                visible={this.props.navigatorState.isSideMenuOpen}
                onRequestClose={() => this.props.toggleMenuAction(false)}
            >
                <ImageBackground
                    source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                    <CustomNavigationBar navigator={this.state.navigator} showMenuIcon={true} showBackButton={false}/>
                    <View style={container}>
                        <View style={searchBgView}>
                            <TextInput underlineColorAndroid={'transparent'}
                                       placeHolder={'Search'} placeholderTextColor={Colors.black}
                                       style={{paddingLeft: 30}}/>
                        </View>
                        <TouchableOpacity onPress={() => this.state.navigator.navigate('HomeView')}>
                            <Text style={headerTextSimple}>HOME</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.state.navigator.navigate('Post')}>
                            <Text style={headerTextSimple}>NEWS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.state.navigator.navigate('Podcast')}>
                            <Text style={headerTextSimple}>PODCASTS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.state.navigator.navigate('VideoScreen')}>
                            <Text style={headerTextSimple}>VIDEO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.state.navigator.navigate('ShowScreen')}>
                            <Text style={headerTextSimple}>SHOWS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={headerTextSimple}>LATEST TRACKS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.state.navigator.navigate('ContactUsScreen')}>
                            <Text style={headerTextSimple}>CONTACT US</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.navigateLastOption(this.state.isUserAvailable)}>
                            <Text style={headerTextSimple}>{this.state.lastOptionText}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Modal>

        )
    }

    navigateToNext(screen) {
        this.state.navigator.navigate(screen);
    }

    navigateLastOption(userAvailable) {
        if (userAvailable) {
            AsyncStorage.removeItem(USER_DATA_KEY)
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Landing'})],
            });
            this.state.navigator.dispatch(resetAction);
        } else {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'SignUp'})],
            });
            this.state.navigator.dispatch(resetAction);
        }
    }
}

const styles = {
    container: {
        flex: 1,

    },
    headerText: {
        fontSize: 20,
        color: Colors.white,
    },
    headerTextSimple: {
        fontSize: 20,
        paddingLeft: 40,
        marginTop: 8,
        color: Colors.white,
    },
    content: {
        paddingLeft: 60,
    },
    contentText: {
        fontSize: 12,
        color: Colors.white,
    },
    searchBgView: {
        width: SCREEN_WIDTH - 20,
        height: 30,
        backgroundColor: Colors.white,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        borderRadius: 10,
    },
}
const mapStateToProps = ({navigatorState}) => ({navigatorState});

export default connect(mapStateToProps, {toggleMenuAction})(MyDrawerScreen);