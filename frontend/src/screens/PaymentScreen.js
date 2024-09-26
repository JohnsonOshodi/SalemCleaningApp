import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { processPayment } from '../services/api';

const PaymentScreen = ({ route }) => {
    const [cardToken, setCardToken] = useState('');

    const handlePayment = async () => {
        const response = await processPayment(route.params.serviceId, cardToken);
        alert(response.message);
    };

    return (
        <View>
            <Text>Enter your card information:</Text>
            <TextInput
                value={cardToken}
                onChangeText={setCardToken}
                placeholder="Card Token"
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Button title="Make Payment" onPress={handlePayment} />
        </View>
    );
};

export default PaymentScreen;
