import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { processPayment } from '../services/api';
import { sendPaymentDataToAdmin } from '../services/api';
import PropTypes from 'prop-types';

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

PaymentScreen.propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        serviceId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

export default PaymentScreen;
