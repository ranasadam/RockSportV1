import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

class LoadingViewComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: props.height,
            color: props.color,
        };
    }

    componentWillReceiveProps(nextProps) {
        // update original states
        this.setState({
            height: nextProps.height,
            color: nextProps.color,
        });
    }

    render() {
        return (
            <View style={{height: this.state.height, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color={this.state.color}/>
                <Text style={{color: this.state.color}}>Loading...</Text>
            </View>
        );
    }
}

export default LoadingViewComponent;