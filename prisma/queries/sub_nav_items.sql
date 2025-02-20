INSERT INTO sub_nav_items (sub_nav_item, sub_menu, href, icon, nav_item_id, created_on, updated_on) VALUES
-- Submenus for "Vhicles" (nav_item_id = 1)
('Add Vhicles', false, '/add-vhicles', 'IconCar', 1, NOW(), NOW()),
('Registered Vhicles', false, '/registered-vhicles', 'IconReservedLine', 1, NOW(), NOW()),
('Add vhicle services', false, '/add-vhicles-services', 'IconDeviceImacSearch', 1, NOW(), NOW()),
('Vhicles occupied services', false, '/vhicles-services', 'IconDevicesHeart', 1, NOW(), NOW()),
('KYC update', false, '/kyc-update', 'IconCaravan', 1, NOW(), NOW()),

-- Submenus for "Rides" (nav_item_id = 2)
('Today rides', false, '/today-rides', 'IconRoad', 2, NOW(), NOW()),
('All Rides', false, '/all-rides', 'IconBrandStrava', 2, NOW(), NOW()),

-- Submenus for "Master" (nav_item_id = 3)
('All Vhicles', false, '/all-vhicles', 'IconHelmet', 3, NOW(), NOW()),
('Roles', false, '/roles', 'IconUserPlus', 3, NOW(), NOW()),

-- Submenus for "Settlements" (nav_item_id = 4)
('Active Month', false, '/active-month-settlement', 'IconMoodHappy', 4, NOW(), NOW()),
('Any Month', false, '/any-month-settlement', 'IconAperture', 4, NOW(), NOW()),



-- Submenus for admin section  "Customers" (nav_item_id = 5)
('Active customers', false, '/active-customers', 'IconUser', 5, NOW(), NOW()),
('Customer management', false, '/customer-management', 'IconUsers', 5, NOW(), NOW()),





-- Submenus for admin section  "owner" (nav_item_id = 6)
('User Management', false, '/user-management', 'IconCrown', 6, NOW(), NOW()),



-- Submenus for admin section  "roles" (nav_item_id = 7)
('Role management', false, '/role-management', 'IconUserCircle', 7, NOW(), NOW()),


-- Submenus for admin section  "permissions" (nav_item_id = 8)
('Permission management', false, '/permission-management', 'IconUserPlus', 8, NOW(), NOW()),


-- Submenus for admin section  "KYC request" (nav_item_id = 9)
('Kyc request approvals', false, '/kyc-request-approval', 'IconUserPlus', 9, NOW(), NOW());











