import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getServices } from '../services/api';

const ServiceList = ({ navigation }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        async function fetchServices() {
            const data = await getServices();
            setServices(data);
        }
        fetchServices();
    }, []);

    return (
        <FlatList
            data={services}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('ServiceDetail', { id: item._id })}>
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{`£${item.price}`}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default ServiceList;
