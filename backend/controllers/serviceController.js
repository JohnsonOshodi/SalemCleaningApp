import nodemailer from 'nodemailer';
import Service from '../models/Service';
import Order from '../models/Order';
import User from '../models/User';


  
  // Get all services
const getAllServices = async (req, res) => {
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
  const getServiceById = async (req, res) => {
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
  const placeOrder = async (req, res) => {
    const { userId, selectedServiceIds } = req.body;
  
    try {
      const selectedServices = await Service.find({
        '_id': { $in: selectedServiceIds }
      });
  
      if (selectedServices.length !== selectedServiceIds.length) {
        return res.status(400).json({ success: false, message: 'Some selected services are invalid' });
      }
  
      const newOrder = new Order({
        user: userId,
        services: selectedServices,
      });
      await newOrder.save();
  
      const adminEmail = 'admin@salemcleaningpro.com';
      const user = await User.findById(userId);
      const serviceList = selectedServices.map(service => service.name).join(', ');
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: 'New Service Request',
        text: `User ${user.name} has placed an order for the following services: ${serviceList}.`
      };
  
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        }
      });
  
      await transporter.sendMail(mailOptions);
  
      res.status(201).json({ success: true, message: 'Order placed successfully', data: newOrder });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
      // Respond to the user with success
     
      const respondToOrder = async (req, res) => {
        const { orderId, responseMessage } = req.body;
      
        try {
          const order = await Order.findById(orderId).populate('user');
          if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
          }
      
          const user = order.user;
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Response to your Service Request',
            text: `The admin has responded to your service request: ${responseMessage}.`
          };
      
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            }
          });
      
          await transporter.sendMail(mailOptions);
      
          res.status(200).json({ success: true, message: 'Response sent to user successfully' });
        } catch (err) {
          res.status(500).json({ success: false, message: err.message });
        }
      };
      
  export  {
    getAllServices,
    getServiceById,
    placeOrder,
    respondToOrder
  
  };
  