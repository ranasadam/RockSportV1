import React from 'react';
import {connect} from "react-redux";
import {contactUsAction, toggleMenuAction} from "../Actions";
import ReactNative, {Image, ImageBackground, Text, TouchableOpacity, View,} from "react-native";
import {APP_BASE_STYLE, APP_NAME, SCREEN_WIDTH} from "../Constants";
import {Divider} from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {TextField} from "react-native-material-textfield";
import {ConfirmDialog, ProgressDialog} from "react-native-simple-dialogs";
import Communications from 'react-native-communications';
import CustomNavigationBar from "../Components/CustomNavigationBar";
import CustomStatusBar from "../Components/CustomStatusBar";
import {ApplicationStyles, Colors, Images} from "../Themes";

class ContactUsScreen extends React.Component {

    componentDidMount() {
        this.props.toggleMenuAction(false);
    }

    constructor(props) {
        super(props);
        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
        this.onSubmitLastName = this.onSubmitLastName.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        this.onSubmitMessage = this.onSubmitMessage.bind(this);

        this.fistNameRef = this.updateRef.bind(this, 'firstName');
        this.lastNameRef = this.updateRef.bind(this, 'lastName');
        this.emailRef = this.updateRef.bind(this, 'email');
        this.messageRef = this.updateRef.bind(this, 'message');


        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            message: '',
            progressVisible: false,
            failureDialog: false,
            errors: {},
        };
    }

    onSubmitFirstName() {
        this.lastName.focus();
    }

    onSubmitLastName() {
        this.email.focus();
    }

    onSubmitEmail() {
        this.message.focus();
    }

    onSubmitMessage() {
        this.message.blur();
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
        // Add a 'scroll' ref to your ScrollView
        //  alert(this.scroll)
        this.refs.scrollView.scrollToFocusedInput(reactNode)
    }

    onChangeText(text) {
        ['firstName', 'lastName', 'email', 'message']
            .map((name) => ({name, ref: this[name]}))
            .forEach(({name, ref}) => {
                if (ref.isFocused()) {
                    this.setState({[name]: text});
                }
            });
    }

    sendMessage = () => {
        if (this.onSubmit()) {
            this.setState({progressVisible: true})
            const {firstName, lastName, email, message} = this.state;
            this.props.contactUsAction(firstName, lastName, email, message)
        }
    }

    onSubmit() {
        let errors = {};

        ['firstName', 'lastName', 'email', 'message']
            .forEach((name) => {
                let value = this[name].value();
                if (!value) {
                    errors[name] = 'Should not be empty';
                } else {
                    if ('email' === name && !this.validateEmail(this.state.email)) {
                        errors[name] = 'Invalid Email Address';
                    }
                }
            });
        this.setState({errors});
        return Object.keys(errors).length === 0 && errors.constructor === Object
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    validateEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        const {contactUsData} = this.props;
        const {
            sendMessageContainer, contactUsContainer, weAreHereContainer,
            headerText, contactUsText, contactUsImage, dividerStyle
        } = styles
        let {errors = {}, secureTextEntry, ...data} = this.state;

        return (

            <ImageBackground
                source={Images.backgroundImage} style={ApplicationStyles.backgroundImageStyle}>
                <CustomStatusBar/>
                <CustomNavigationBar navigator={this.props.navigation}/>
                <KeyboardAwareScrollView ref='scrollView'>
                    <ProgressDialog
                        visible={this.state.progressVisible}
                        message="Authenticating..."
                    />
                    <ConfirmDialog
                        title={APP_NAME}
                        message={contactUsData.errorMessage}
                        visible={this.state.failureDialog}
                        onTouchOutside={() => this.setState({failureDialog: false})}
                        positiveButton={{
                            title: "Ok",
                            onPress: () => this.setState({failureDialog: false})
                        }}
                    />
                    <View style={sendMessageContainer}>
                        <Text style={headerText}>SEND A MESSAGE</Text>
                        <Divider style={dividerStyle}/>

                        <TextField
                            ref={this.fistNameRef}
                            value={data.firstName}
                            defaultValue={'First name'}
                            autoCapitalize='none'
                            textColor={'#000'}
                            baseColor={'#0ec6d5'}
                            tintColor={'#0ec6d5'}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitFirstName}
                            returnKeyType='next'
                            label='First name'
                            error={errors.firstName}
                        />

                        <TextField
                            ref={this.lastNameRef}
                            value={data.lastName}
                            defaultValue={'Last name'}
                            autoCapitalize='none'
                            textColor={'#000'}
                            baseColor={'#0ec6d5'}
                            tintColor={'#0ec6d5'}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitLastName}
                            returnKeyType='next'
                            label='Last name'
                            error={errors.lastName}
                        />

                        <TextField
                            ref={this.emailRef}
                            value={data.email}
                            defaultValue={'Email'}
                            autoCapitalize='none'
                            textColor={'#000'}
                            baseColor={'#0ec6d5'}
                            tintColor={'#0ec6d5'}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitEmail}
                            returnKeyType='next'
                            label='Email'
                            error={errors.email}
                        />

                        <TextField
                            ref={this.messageRef}
                            value={data.message}
                            defaultValue={'Message'}
                            autoCapitalize='none'
                            textColor={'#000'}
                            baseColor={'#0ec6d5'}
                            tintColor={'#0ec6d5'}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitMessage}
                            returnKeyType='next'
                            label='Message'
                            error={errors.email}
                        />
                        <TouchableOpacity activeOpacity={0.7} style={ApplicationStyles.buttonStyle}
                                          onPress={this.sendMessage}
                        >
                            <Text style={ApplicationStyles.buttonTextStyle}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={contactUsContainer}>
                        <Text style={headerText}>CONTACT US</Text>
                        <Divider style={dividerStyle}/>

                        <TouchableOpacity
                            onPress={() => Communications.phonecall('03339000789', true)}>
                            <Image source={Images.phoneIcon}
                                   style={contactUsImage}
                                   resizeMode={'stretch'}/>
                            <Text style={contactUsText}>03339000789</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => Communications.email(['hello@rocksportradio.co.uk'], null, null, 'RockSport', null)}>
                            <Image source={Images.emailIcon}
                                   style={contactUsImage}
                                   resizeMode={'stretch'}/>
                            <Text style={contactUsText}>hello@rocksportradio.co.uk</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image source={Images.locationIcon}
                                   style={contactUsImage}
                                   resizeMode={'stretch'}/>
                            <Text style={contactUsText}>Block 9000, First Floor</Text>
                            <Text style={contactUsText}>51 Gower Street</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={weAreHereContainer}>
                        <Text style={headerText}>WE ARE HERE</Text>
                        <Divider style={dividerStyle}/>

                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>

        )
    }
}

const styles = {
    sendMessageContainer: {
        backgroundColor: Colors.white,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    contactUsContainer: {
        backgroundColor: Colors.white,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    weAreHereContainer: {
        backgroundColor: Colors.white,
        marginTop: 12,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    headerText: {
        fontSize: 20,
        marginTop: 12,
        alignSelf: 'center',
        color: Colors.themeRed,
    },
    contactUsImage: {
        alignSelf: 'center',
        width: 80,
        marginTop: 12,
        height: 80,
    },
    contactUsText: {
        fontSize: 20,
        alignSelf: 'center',
        color: Colors.black,
    },
    dividerStyle: {
        width: SCREEN_WIDTH - 36,
        marginTop: 8,
        backgroundColor: Colors.themeRed
    }
}


const mapStateToProps = ({contactUsData}) => ({contactUsData});

export default connect(mapStateToProps, {contactUsAction, toggleMenuAction})(ContactUsScreen);