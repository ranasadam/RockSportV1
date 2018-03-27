import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {StackNavigator} from 'react-navigation';

import configureStore from './Store';
import HomeScreen from './Screens/HomeScreen';
import SignUpScreen from "./Screens/SignUpScreen";
import LoginScreen from "./Screens/LoginScreen";
import LandingScreen from "./Screens/LandingScreen";
import PostDetailScreen from "./Screens/PostDetailScreen";
import PostScreen from "./Screens/PostScreen";
import PodcastScreen from "./Screens/PodcastScreen";
import PodcastDetailScreen from "./Screens/PodcastDetailScreen";
import ShowScreen from "./Screens/ShowScreen";
import ShowDetailScreen from "./Screens/ShowDetailScreen";
import VideoScreen from "./Screens/VideoScreen";
import VideoDetailScreen from "./Screens/VideoDetailScreen";
import ContactUsScreen from "./Screens/ContactUsScreen";
import SplashScreen from "./Screens/SplashScreen";
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';


const Store = configureStore();

export default class App extends Component {
    render() {
        const MainNavigator = StackNavigator({
            Splash: {screen: SplashScreen},
            Landing: {screen: LandingScreen},
            SignUp: {screen: SignUpScreen},
            Login: {screen: LoginScreen},
            HomeView: {screen: HomeScreen},
            Post: {screen: PostScreen},
            PostDetail: {screen: PostDetailScreen},
            Podcast: {screen: PodcastScreen},
            PodcastDetail: {screen: PodcastDetailScreen},
            ShowScreen: {screen: ShowScreen},
            ShowDetail: {screen: ShowDetailScreen},
            VideoScreen: {screen: VideoScreen},
            VideoDetail: {screen: VideoDetailScreen},
            ContactUsScreen: {screen: ContactUsScreen},
        }, {
            transitionConfig: getSlideFromRightTransition,
            navigationOptions: {
                header: null,
                gesturesEnabled: false,
            }
        });

        const prevGetStateForActionHomeStack = MainNavigator.router.getStateForAction;
        MainNavigator.router.getStateForAction = (action, state) => {
            if (state && action.type === 'ReplaceCurrentScreen') {
                const routes = state.routes.slice(state.routes.length - 2, state.routes.length - 1);
                routes.push(action);
                return {
                    ...state,
                    routes,
                    index: routes.length - 1,
                };
            }
            return prevGetStateForActionHomeStack(action, state);
        };

        return (
            <Provider store={Store}>
                <MainNavigator/>
            </Provider>
        );
    }
}
