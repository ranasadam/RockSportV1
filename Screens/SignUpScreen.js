import React from 'react';
import {
    AsyncStorage,
    ImageBackground,
    Image,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import {Divider} from 'react-native-elements';
import * as Constants from '../Constants';
import {APP_NAME, SCREEN_WIDTH} from '../Constants';
import {connect} from "react-redux";
import {signUpRequest, toggleMenuAction} from "../Actions";
import DatePicker from 'react-native-datepicker'
import {RadioButton, RadioGroup} from "react-native-flexi-radio-button";
import {ConfirmDialog, ProgressDialog} from "react-native-simple-dialogs";
import BottomBannerAd from "../Components/BottomBannerAd";
import {TextField} from 'react-native-material-textfield';
import CustomStatusBar from "../Components/CustomStatusBar";
import {ApplicationStyles, Colors, Images} from "../Themes";
import {NavigationActions} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ReactNative from "react-native";

const DOB_FORMAT = "DD-MM-YYYY";

class SignUpScreen extends React.Component {
    scroll = null;
    componentDidMount() {
        this.getNOnce()
        this.props.toggleMenuAction(false);
    }

    componentWillMount() {

    }

    constructor(props) {
        super(props);
        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);

        this.onSubmitUserName = this.onSubmitUserName.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        this.onSubmitMobile = this.onSubmitMobile.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);

        this.userNameRef = this.updateRef.bind(this, 'userName');
        this.emailRef = this.updateRef.bind(this, 'email');
        this.mobileRef = this.updateRef.bind(this, 'mobile');
        this.passwordRef = this.updateRef.bind(this, 'password');


        this.state = {
            today: new Date(),
            date: '',
            userName: '',
            email: '',
            mobile: '',
            password: '',
            gender: 'male',
            DOB: 'DOB',
            nOnce: '',
            progressVisible: false,
            failureDialog: false,
            secureTextEntry: true,
            errors: {},
        };
    }

    onSubmitUserName() {
        this.email.focus();
    }

    onSubmitEmail() {
        this.mobile.focus();
    }

    onSubmitMobile() {
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
        ['userName', 'email', 'mobile', 'password']
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

        ['userName', 'mobile', 'email', 'password']
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

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    signUp = () => {
        if (this.onSubmit()) {
            const {userName, email, password, nOnce} = this.state;
            this.setState({progressVisible: true})
            this.props.signUpRequest(userName, email, password, nOnce)
        }
    };

    getNOnce = () => {
        return fetch('http://www.rocksportradio.co.uk/api/get_nonce/?controller=user&method=register')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({nOnce: responseJson.nonce.toString()})
            })
            .catch((error) => {
              
            });
    }

    onSelect(index, value) {

        this.setState({
            gender: value
        });
    }


    render() {
        const {signUpData} = this.props;
        const {navigate, goBack} = this.props.navigation;
        let {errors = {}, secureTextEntry, ...data} = this.state;

        const {
            container,
            centerIcon,
            topContainer,
            bottomContainer,
            signUpTextStyle,
            dividerStyle,
            cancelSignUpTextStyle,
            genderPickerStyle,
            genderTextStyle,
            radioGroupStyle,
            radioButtonTextStyle,
            datePickerStyle,
            dateTextStyle
        } = styles;
        return (
            <View style={container}>
                <ImageBackground
                    source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                    <CustomStatusBar/>
                    <KeyboardAwareScrollView  ref='scrollView'>

                        <ProgressDialog
                            visible={this.state.progressVisible}
                            message="Authenticating..."
                        />
                        <ConfirmDialog
                            title={APP_NAME}
                            message={signUpData.errorMessage}
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
                        </View>
                        <Text style={signUpTextStyle}> Sign up for {"\n"} exclusive deals</Text>
                        <View style={bottomContainer}>


                            <TextField
                                ref={this.userNameRef}
                                value={data.userName}
                                defaultValue={'Name'}
                                autoCapitalize='none'
                                textColor={Colors.white}
                                baseColor={Colors.white}
                                tintColor={Colors.white}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitUserName}
                                returnKeyType='next'
                                label='Name'
                                error={errors.userName}
                            />

                            <TextField
                                ref={this.emailRef}
                                value={data.email}
                                defaultValue={'example@mail.com'}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                textColor={Colors.white}
                                baseColor={Colors.white}
                                tintColor={Colors.white}
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
                                ref={this.mobileRef}
                                value={data.mobile}
                                defaultValue={'Mobile'}
                                autoCapitalize='none'
                                textColor={Colors.white}
                                baseColor={Colors.white}
                                tintColor={Colors.white}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitMobile}
                                returnKeyType='next'
                                label='Mobile'
                                error={errors.mobile}
                            />

                            <TextField
                                ref={this.passwordRef}
                                value={data.password}
                                defaultValue={'Password'}
                                autoCapitalize='none'
                                clearTextOnFocus={true}
                                secureTextEntry={secureTextEntry}
                                textColor={Colors.white}
                                baseColor={Colors.white}
                                tintColor={Colors.white}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitPassword}
                                returnKeyType='next'
                                error={errors.password}
                                label='Password'
                            />

                            <View style={genderPickerStyle}>
                                <Text style={genderTextStyle}>Gender</Text>
                                <RadioGroup style={radioGroupStyle}
                                            size={24}
                                            thickness={2}
                                            color='#ffffff'
                                            selectedIndex={0}
                                            onSelect={(index, value) => this.onSelect(index, value)}
                                >

                                    <RadioButton value='male'>
                                        <Text style={radioButtonTextStyle}>Male</Text>
                                    </RadioButton>

                                    <RadioButton value='female'>
                                        <Text style={radioButtonTextStyle}>Female</Text>
                                    </RadioButton>

                                    <RadioButton value='other'>
                                        <Text style={radioButtonTextStyle}>Other</Text>
                                    </RadioButton>

                                </RadioGroup>
                            </View>
                            <Divider style={dividerStyle}/>
                            <View style={datePickerStyle}>
                                <Text style={dateTextStyle}>Date of birth:</Text>
                                <Text style={dateTextStyle}>{this.state.date}</Text>
                                <DatePicker
                                    style={{flex: 1}}
                                    mode="date"
                                    format="DD-MM-YYYY"
                                    minDate="01-01-1900"
                                    maxDate={this.state.today}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    hideText='false'
                                    customStyles={{
                                        dateInput: {
                                            marginLeft: 36,
                                            borderWidth: 0, color: Colors.white
                                        },
                                        dateIcon: {
                                            position: 'absolute',
                                            right: 0,

                                        },
                                        btnTextConfirm:{
                                            color:Colors.black,
                                        },
                                        btnTextCancel:{
                                            color:Colors.black,
                                        },
                                        btnConfirm:{
                                            color:Colors.black,

                                        },
                                        btnCancel:{
                                            color:Colors.black,
                                        }
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({date: date})
                                    }}
                                />

                            </View>
                            <Divider style={dividerStyle}/>

                            <TouchableOpacity activeOpacity={0.7} style={ApplicationStyles.buttonStyle}
                                              onPress={this.signUp}
                            >
                                <Text style={ApplicationStyles.buttonTextStyle}>Sign up</Text>
                            </TouchableOpacity>
                            <Text style={cancelSignUpTextStyle}
                                  onPress={() => goBack(null)}
                            >Cancel sign up</Text>
                        </View>
                    </KeyboardAwareScrollView>
                    <BottomBannerAd/>
                </ImageBackground>
            </View>
        );
    }

    componentWillReceiveProps(nextProps) {
        const {signUpData} = nextProps;
        if (!signUpData.isFetching && !signUpData.failure) {
            AsyncStorage.setItem(Constants.USER_DATA_KEY, JSON.stringify(signUpData.user))
            this.setState({progressVisible: signUpData.isFetching})
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'HomeView'})],
            });
            this.props.navigation.dispatch(resetAction);
        } else if (!signUpData.isFetching && signUpData.failure) {
            this.setState({progressVisible: signUpData.isFetching})
            this.setState({failureDialog: signUpData.failure})
        }
    }
}

const styles = {
    container: {
        backgroundColor: '#2b2b2b',
        flex: 1,
    },
    centerIcon: {
        width: 150,
        height: 100,
        marginTop: 30,
    },
    topContainer: {

        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    signUpTextStyle: {
        fontSize: 24,
        color: Colors.white,
        fontWeight: '900',
        marginTop: 50,
        marginLeft: 10,
    },
    cancelSignUpTextStyle: {
        fontSize: 12,
        color: Colors.white,
        marginTop: 16,
        marginBottom: 16,
        alignItems: 'center',
        alignSelf: 'center',
    },
    inputFieldStyle: {
        flex: 1,
        width: SCREEN_WIDTH,
        color: Colors.white,
        paddingLeft: 10,
        paddingBottom: 2.5,
        paddingTop: 2.5,
        fontSize: 14,
    },
    genderTextStyle: {

        color: Colors.white,
        paddingBottom: 2.5,
        paddingTop: 2.5,
        fontSize: 16,
    },
    dividerStyle: {
        width: SCREEN_WIDTH - 36,
        backgroundColor: Colors.white
    },
    genderPickerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'space-between'
    },
    radioGroupStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 4,
    },

    radioButtonTextStyle: {
        color: Colors.white,
    },
    dateTextStyle: {
        color: Colors.white,
        paddingBottom: 2.5,
        paddingTop: 2.5,
        fontSize: 16,
    },
    datePickerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 8,
        paddingTop: 8,
    },

};

const mapStateToProps = ({signUpData}) => ({signUpData});

export default connect(mapStateToProps, {signUpRequest, toggleMenuAction})(SignUpScreen);
