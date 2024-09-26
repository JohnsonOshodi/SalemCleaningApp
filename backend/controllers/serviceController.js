//this is the service controller

const services = [
    {
      id: "1",
      name: "Basic Home Plan",
      description: "Custom schedules every day. Includes Carpet Cleaning, Windows Cleaning, Floor Vacuum Clean, Bathrooms Cleaning, Kitchen Cleaning.",
      price: 95,
      billingCycle: "per clean / billed weekly",
      discount: "30% discount on your first month"
    },
    {
      id: "2",
      name: "Small Business",
      description: "Suitable for small businesses. Includes desks and workstations cleaning, washrooms cleaning, floor cleaning, waiting area cleaning.",
      price: 60,
      billingCycle: "per clean / billed weekly"
    },
    {
      id: "3",
      name: "Large Business",
      description: "Suitable for large businesses. Includes desks and workstations cleaning, washrooms cleaning, floor cleaning, waiting area cleaning.",
      price: 200,
      billingCycle: "per clean / billed weekly"
    },
    {
      id: "4",
      name: "Residential Cleaning",
      description: "Flexible residential cleaning services. Includes eco-friendly products to ensure a fresh and healthy living space.",
      price: 20,
      pricePer: "hourly",
    },
    {
      id: "5",
      name: "Commercial Cleaning",
      description: "Meticulous commercial cleaning to enhance hygiene in your office or commercial space.",
      price: 100,
      pricePer: "hourly",
    },
    {
      id: "6",
      name: "Construction Cleaning",
      description: "Expert post-construction cleaning, stain removals, comprehensive window cleaning, and floor scrubbing.",
      price: 100,
    },
    {
      id: "7",
      name: "Windows Cleaning",
      description: "Professional window cleaning for streak-free clarity in homes and offices.",
      price: 50,
      pricePer: "hourly",
    },
    {
      id: "8",
      name: "Carpet Cleaning",
      description: "Specialized carpet cleaning to keep your upholstery looking new.",
      price: 35,
      pricePer: "hourly",
    },
    {
      id: "9",
      name: "Furniture Cleaning",
      description: "Specialized furniture cleaning to keep your furnishings in top condition.",
      price: 20,
      pricePer: "hourly",
    },
    {
      id: "10",
      name: "Gardening",
      description: "Comprehensive garden care, including lawn maintenance and plant care.",
      price: 30,
      pricePer: "hourly",
    }
  ];
  
  // Get all services
exports.getAllServices = async (req, res) => {
    try {
      const services = await Service.find();
      res.status(200).json({
        success: true,
        count: services.length,
        data: services,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  // Get a single service by ID
  exports.getService = async (req, res) => {
    try {
      const service = await Service.findById(req.params.serviceId);
      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
      res.status(200).json({ success: true, data: service });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  // Place an order for selected services
  exports.placeOrder = async (req, res) => {
    const { userId, selectedServiceIds } = req.body; // User selects services by their IDs
    
    try {
      // Validate the selected services
      const selectedServices = await Service.find({
        '_id': { $in: selectedServiceIds }
      });
  
      if (selectedServices.length !== selectedServiceIds.length) {
        return res.status(400).json({ success: false, message: 'Some selected services are invalid' });
      }
  
      // Create the order
      const newOrder = new Order({
        user: userId,
        services: selectedServices,
      });
      await newOrder.save();
  
      // Notify the admin about the new order
      const adminEmail = 'admin@salemcleaningpro.com'; // Admin email address
      const user = await User.findById(userId);
  
      const serviceList = selectedServices.map(service => service.name).join(', '); // List selected services
      const mailOptions = {
        from: 'noreply@salemcleaningpro.com',
        to: adminEmail,
        subject: 'New Service Request',
        text: `User ${user.name} has placed an order for the following services: ${serviceList}.`
      };
  
      // Setup Nodemailer
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youremail@gmail.com',
          pass: 'yourpassword'
        }
      });
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
      });
  
      // Respond to the user with success
      res.status(201).json({ success: true, message: 'Order placed successfully', data: newOrder });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  // Admin responds to an order
  exports.respondToOrder = async (req, res) => {
    const { orderId, responseMessage } = req.body;
  
    try {
      const order = await Order.findById(orderId).populate('user');
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
  
      const user = order.user;
  
      // Notify the user about the admin's response
      const mailOptions = {
        from: 'noreply@salemcleaningpro.com',
        to: user.email,
        subject: 'Response to your Service Request',
        text: `The admin has responded to your service request: ${responseMessage}.`
      };
  
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'youremail@gmail.com',
          pass: 'yourpassword'
        }
      });
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
      });
  
      res.status(200).json({ success: true, message: 'Response sent to user successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  
  module.exports = {
    getAllServices,
    getServiceById,
    selectServices,
  };
  