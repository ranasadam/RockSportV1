import React from 'react';
import {AdMobBanner} from 'react-native-admob';
import {StyleSheet,View} from "react-native";
import {AdMobBannerID} from "../Constants";

const BottomBannerAd = () => (
    <View style={styles.container}>
        <AdMobBanner
            adSize="banner"
            adUnitID={AdMobBannerID}
            testDevices={[AdMobBanner.simulatorId]}
        />
    </View>
);
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});
export default BottomBannerAd;