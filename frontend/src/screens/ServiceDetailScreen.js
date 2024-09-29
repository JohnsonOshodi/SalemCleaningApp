import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getServiceById } from '../services/api';
import { sendBookingDataToAdmin } from '../services/api';
import PropTypes from 'prop-types';

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
const handleBooking = async () => {
  const response = await sendBookingDataToAdmin({ serviceId: service._id, userId: 'user_id' });
  if (response.success) {
    navigation.navigate('Payment', { serviceId: service._id });
  } else {
    alert(response.message);
  }
};

<Button title="Book Service" onPress={handleBooking} />

ServiceDetailScreen.propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };
  

export default ServiceDetailScreen;
