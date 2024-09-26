import React from 'react';
import { SafeAreaView } from 'react-native';
import ServiceList from '../components/ServiceList';

const HomeScreen = () => {
    return (
        <SafeAreaView>
            <ServiceList />
        </SafeAreaView>
    );
};

export default HomeScreen;
