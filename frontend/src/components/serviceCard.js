import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ServiceCard = ({ service }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{service.name}</Text>
            <Text style={styles.price}>{`£${service.price}`}</Text>
            <Text style={styles.description}>{service.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        color: '#2a9d8f',
    },
    description: {
        marginTop: 10,
        fontSize: 14,
        color: '#666',
    },
});

export default ServiceCard;
