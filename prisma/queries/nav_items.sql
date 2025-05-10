--  for owners
INSERT INTO nav_items (nav_item, sub_menu, href, icon, created_on, updated_on) VALUES
('Vhicles', true, NULL, NULL, NOW(), NOW()),
('Rides', true, NULL, NULL, NOW(), NOW()),
('Master', true, NULL, NULL, NOW(), NOW()),
('Settlements', true, NULL, NULL, NOW(), NOW()),

-- for admin 
('Customers', true, NULL, NULL, NOW(), NOW()),
('Users', true, NULL, NULL, NOW(), NOW()),
('Roles', true, NULL, NULL, NOW(), NOW()),
('Permissions', true, NULL, NULL, NOW(), NOW()),
('Requests', true, NULL, NULL, NOW(), NOW()) ,

-- for  driver partners
('Dashboard', true, NULL, NULL, NOW(), NOW()),
('My Rides', true, NULL, NULL, NOW(), NOW()),
('Earnings', true, NULL, NULL, NOW(), NOW()),
('Ride History', true, NULL, NULL, NOW(), NOW()),
('Profile', true, NULL, NULL, NOW(), NOW()),
('Documents', true, NULL, NULL, NOW(), NOW()),
('Support', true, NULL, NULL, NOW(), NOW()),
('Logout', true, NULL, NULL, NOW(), NOW()),

--  for admin 
('Vehicle Management', true, NULL, 'IconCar', NOW(), NOW()),
('Vehicle Types', false, '/vhicle-types', 'IconCar', NOW(), NOW()),
('Driver Documents', true, NULL, 'IconFileText', NOW(), NOW()),
('Service Areas', true, NULL, 'IconMap2', NOW(), NOW()),
('Cities', true, NULL, 'IconMapPin', NOW(), NOW()),
('Promo Codes', true, NULL, 'IconDiscount2', NOW(), NOW()),
('Earnings Settings', true, NULL, 'IconWallet', NOW(), NOW()),
('Cancellation Reasons', true, NULL, 'IconCircleX', NOW(), NOW()),
('Support Topics', true, NULL, 'IconHelpCircle', NOW(), NOW()),

-- owners 
('Drivers', true, NULL, NULL, NOW(), NOW()),
('Manage Navbar', true, NULL, NULL, NOW(), NOW());

