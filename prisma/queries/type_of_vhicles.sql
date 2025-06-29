INSERT INTO public.type_of_vhicle (vhicle_type, disc, updated_on, avatar) VALUES
('Car', 'Four-wheeled motor vehicle used for passenger transport', NOW(), 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653256/11_gqvdrc.png'),
('Motorcycle', 'Two-wheeled motor vehicle for individual or two-passenger travel', NOW(), 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653254/motorbike_w9c55u.png'),
('Truck', 'Heavy motor vehicle used for transporting goods', NOW(), 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653254/truck_ps4jeg.png'),
('Bus', 'Large motor vehicle designed to carry many passengers', NOW(), 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653254/public-transport_pinssp.png'),
('Bicycle', 'Human-powered two-wheeled vehicle', NOW(), 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653254/bicycle_kv4cha.png'),
('Electric Scooter', 'Small two-wheeled electric-powered vehicle', NOW(), 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745686927/vecteezy_3d-scooter-isolated-on-transparent-background_48690780_abviiu.png'),
('Van', 'Medium-sized motor vehicle used for goods or passenger transport', NOW(), 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653254/camper-van_xkpvvu.png'),
('Tractor', 'Heavy-duty vehicle used in agriculture and construction', NOW(), 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653254/ambulance_itwcxf.png'),
('Ambulance', 'Emergency vehicle used for medical transport', NOW(), 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653254/ambulance_itwcxf.png'),
('Fire Truck', 'Emergency vehicle equipped to handle fire emergencies', NOW(), 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653254/fire-truck_yqjvb2.png');

INSERT INTO public.type_of_vhicle (vhicle_type, disc, updated_on, is_active, avatar)
VALUES 
  ('bike', 'Bike (Swiftcab)', CURRENT_TIMESTAMP, true, 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1751209236/png-clipart-erik-buell-racing-motorcycle-ebr-1190rs-fim-superbike-world-championship-sport-bike-racing-motorbike-s-exhaust-system-car-thumbnail_gtjwbx.png'),
  ('cabEconomy', 'Cab Economy', CURRENT_TIMESTAMP, true, 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653256/11_gqvdrc.png'),
  ('cabXL', 'Cab XL', CURRENT_TIMESTAMP, true, 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653255/2_toed5p.png'),
  ('autoNCR', 'Auto (NCR)', CURRENT_TIMESTAMP, true, 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1751209237/auto_zdiutr.png'),
  ('cabPremium', 'Cab Premium', CURRENT_TIMESTAMP, true, 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653257/33_bkyvma.png'),
  ('sharedCab', 'Shared Cab', CURRENT_TIMESTAMP, true, 'https://res.cloudinary.com/dw0hahzkn/image/upload/v1745653255/0_ogjocj.png');
  