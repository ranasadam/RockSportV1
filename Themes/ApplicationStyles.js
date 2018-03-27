
import Colors from './Colors'
import {Dimensions} from "react-native";

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
    backgroundImageStyle: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH
    },
    buttonStyle: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Colors.themeRed,
        marginTop: 20,
        width: 130,
        height: 40,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        borderRadius: 2

    },
    buttonTextStyle: {
        color: '#fff'
    },

}

export default ApplicationStyles
