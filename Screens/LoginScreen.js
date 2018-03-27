import React from 'react';
import ReactNative, {AsyncStorage, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import * as Constants from "../Constants";
import {APP_NAME} from "../Constants";
import {connect} from "react-redux";
import {loginRequest, toggleMenuAction} from "../Actions";
import {ConfirmDialog, ProgressDialog} from "react-native-simple-dialogs";
import BottomBannerAd from "../Components/BottomBannerAd";
import {TextField} from 'react-native-material-textfield';
import CustomStatusBar from "../Components/CustomStatusBar";
import {ApplicationStyles, Colors, Images} from "../Themes";
import {NavigationActions} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

class SignInScreen extends React.Component {

    componentDidMount() {
        this.props.toggleMenuAction(false);
    }

    constructor(props) {
        super(props);
        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);

        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);

        this.emailRef = this.updateRef.bind(this, 'email');
        this.passwordRef = this.updateRef.bind(this, 'password');

        this.state = {
            email: '',
            password: '',
            progressVisible: false,
            failureDialog: false,
            secureTextEntry: true,
            errors: {},
        };
    }

    onSubmitEmail() {
        this.password.focus();
    }

    onSubmitPassword() {
        this.password.blur();
    }

    onFocus(event) {
        let {errors = {}} = this.state;

        for (let name in errors) {
            let ref = this[name];

            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }

        this.setState({errors});
        this._scrollToInput(ReactNative.findNodeHandle(event.target))
    }

    _scrollToInput(reactNode: any) {
        this.refs.scrollView.scrollToFocusedInput(reactNode)
    }

    onChangeText(text) {
        ['email', 'password']
            .map((name) => ({name, ref: this[name]}))
            .forEach(({name, ref}) => {
                if (ref.isFocused()) {
                    this.setState({[name]: text});
                }
            });
    }

    onAccessoryPress() {
        this.setState(({secureTextEntry}) => ({secureTextEntry: !secureTextEntry}));
    }

    onSubmit() {
        let errors = {};

        ['email', 'password']
            .forEach((name) => {
                let value = this[name].value();

                if (!value) {
                    errors[name] = 'Should not be empty';
                } else {
                    if ('email' === name && !this.validateEmail(this.state.email)) {
                        errors[name] = 'Invalid Email Address';
                    } else if ('password' === name && value.length < 6) {
                        errors[name] = 'Too short';
                    }
                }
            });
        this.setState({errors});
        return Object.keys(errors).length === 0 && errors.constructor === Object
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    updateRef(name, ref) {
        this[name] = ref;
    }


    login = () => {
        if (this.onSubmit()) {
            this.setState({progressVisible: true})
            const {email, password} = this.state;
            this.props.loginRequest(email, password)
        }
    };

    render() {
        const {goBack} = this.props.navigation;
        const {loginData} = this.props;
        let {errors = {}, secureTextEntry, ...data} = this.state;

        const {
            container,
            centerIcon,
            topContainer,
            bottomContainer,
            signInTextStyle,
            cancelSignInTextStyle,
        } = styles;
        return (
            <ImageBackground
                source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                <CustomStatusBar/>
                <KeyboardAwareScrollView ref='scrollView'>
                    <View style={container}>
                        <ProgressDialog
                            visible={this.state.progressVisible}
                            message="Authenticating..."
                            activityIndicatorColor="black"
                        />
                        <ConfirmDialog
                            title={APP_NAME}
                            message={loginData.errorMessage}
                            visible={this.state.failureDialog}
                            onTouchOutside={() => this.setState({failureDialog: false})}
                            positiveButton={{
                                title: "Ok",
                                onPress: () => this.setState({failureDialog: false})
                            }}
                        />


                        <View style={topContainer}>
                            <Image source={Images.rockSportCenterLogoImage}
                                   style={centerIcon}
                                   resizeMode={'stretch'}/>
                            <Text style={signInTextStyle}> Sign in for {"\n"} exclusive deals</Text>
                        </View>

                        <View style={bottomContainer}>

                            <TextField
                                ref={this.emailRef}
                                value={data.email}
                                defaultValue={'example@mail.com'}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                textColor={'#fff'}
                                baseColor={'#fff'}
                                tintColor={'#fff'}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitEmail}
                                returnKeyType='next'
                                label='Email Address'
                                error={errors.email}
                            />

                            <TextField
                                ref={this.passwordRef}
                                value={data.password}
                                secureTextEntry={secureTextEntry}
                                autoCapitalize='none'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                clearTextOnFocus={true}
                                textColor={'#fff'}
                                baseColor={'#fff'}
                                tintColor={'#fff'}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitPassword}
                                returnKeyType='done'
                                label='Password'
                                error={errors.password}

                            />
                            <TouchableOpacity activeOpacity={0.7} style={ApplicationStyles.buttonStyle}
                                              onPress={this.login}
                            >
                                <Text style={ApplicationStyles.buttonTextStyle}>Sign In</Text>
                            </TouchableOpacity>
                            <Text style={cancelSignInTextStyle}
                                  onPress={() => goBack(null)}
                            >Cancel sign in</Text>
                        </View>

                    </View>
                </KeyboardAwareScrollView>
                <BottomBannerAd/>
            </ImageBackground>
        );
    }

    componentWillReceiveProps(nextProps) {
        const {loginData} = nextProps;
        if (loginData.isAuthenticated) {
            AsyncStorage.setItem(Constants.USER_DATA_KEY, JSON.stringify(loginData.user));
            this.setState({progressVisible: loginData.isFetching})
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'HomeView'})],
            });
            this.props.navigation.dispatch(resetAction);
        } else if (loginData.failure) {
            this.setState({progressVisible: loginData.isFetching})
            this.setState({failureDialog: loginData.failure})
        }

    }
}

const styles = {
    container: {
        flex: 1,

    },
    centerIcon: {
        width: 150,
        height: 100,
        marginTop: 30,
        alignSelf: "center"
    },
    topContainer: {
        flex: 1,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: 16,
        paddingRight: 16,
        marginTop:50
    },
    signInTextStyle: {
        fontSize: 24,
        color: Colors.white,
        fontWeight: '900',
        marginLeft: 10,
        marginTop: 40
    },
    cancelSignInTextStyle: {
        fontSize: 12,
        color: Colors.white,
        marginTop: 16,
        marginBottom: 16,
        alignItems: 'center',
        alignSelf: 'center',
    },

};

const mapStateToProps = ({loginData}) => ({loginData});

export default connect(mapStateToProps, {loginRequest, toggleMenuAction})(SignInScreen);