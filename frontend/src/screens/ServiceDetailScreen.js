import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getServiceById } from '../services/api';

const ServiceDetailScreen = ({ route, navigation }) => {
    const [service, setService] = useState(null);

    useEffect(() => {
        async function fetchService() {
            const data = await getServiceById(route.params.id);
            setService(data);
        }
        fetchService();
    }, [route.params.id]);

    if (!service) {
        return <Text>Loading...</Text>;
    }

    return (
        <View>
            <Text>{service.name}</Text>
            <Text>{`£${service.price}`}</Text>
            <Text>{service.description}</Text>
            <Button title="Book Service" onPress={() => navigation.navigate('Payment', { serviceId: service._id })} />
        </View>
    );
};

export default ServiceDetailScreen;
