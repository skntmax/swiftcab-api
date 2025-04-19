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




-- Submenus for "Dashboard" (nav_item_id = 10)
INSERT INTO sub_nav_items (sub_nav_item, sub_menu, href, icon, nav_item_id, created_on, updated_on) VALUES
('View Summary', false, '/driver/dashboard/summary', 'IconDashboard', 10, NOW(), NOW()),
('Notifications', false, '/driver/dashboard/notifications', 'IconBell', 10, NOW(), NOW());

-- Submenus for "My Rides" (nav_item_id = 11)
INSERT INTO sub_nav_items (sub_nav_item, sub_menu, href, icon, nav_item_id, created_on, updated_on) VALUES
('Upcoming Rides', false, '/driver/my-rides/upcoming', 'IconCalendarEvent', 11, NOW(), NOW()),
('Completed Rides', false, '/driver/my-rides/completed', 'IconCheck', 11, NOW(), NOW()),
('Cancelled Rides', false, '/driver/my-rides/cancelled', 'IconBan', 11, NOW(), NOW());

-- Submenus for "Earnings" (nav_item_id = 12)
INSERT INTO sub_nav_items (sub_nav_item, sub_menu, href, icon, nav_item_id, created_on, updated_on) VALUES
('Daily Earnings', false, '/driver/earnings/daily', 'IconCurrencyDollar', 12, NOW(), NOW()),
('Monthly Earnings', false, '/driver/earnings/monthly', 'IconCalendarStats', 12, NOW(), NOW()),
('Payment History', false, '/driver/earnings/history', 'IconHistory', 12, NOW(), NOW());

-- Submenus for "Ride History" (nav_item_id = 13)
INSERT INTO sub_nav_items (sub_nav_item, sub_menu, href, icon, nav_item_id, created_on, updated_on) VALUES
('All Rides', false, '/driver/ride-history/all', 'IconList', 13, NOW(), NOW()),
('Filter by Date', false, '/driver/ride-history/filter', 'IconFilter', 13, NOW(), NOW());

-- Submenus for "Profile" (nav_item_id = 14)
INSERT INTO sub_nav_items (sub_nav_item, sub_menu, href, icon, nav_item_id, created_on, updated_on) VALUES
('View Profile', false, '/driver/profile/view', 'IconUser', 14, NOW(), NOW()),
('Edit Profile', false, '/driver/profile/edit', 'IconEdit', 14, NOW(), NOW()),
('Change Password', false, '/driver/profile/password', 'IconLock', 14, NOW(), NOW());

-- Submenus for "Documents" (nav_item_id = 15)
INSERT INTO sub_nav_items (sub_nav_item, sub_menu, href, icon, nav_item_id, created_on, updated_on) VALUES
('Upload Documents', false, '/driver/documents/upload', 'IconUpload', 15, NOW(), NOW()),
('View Documents', false, '/driver/documents/view', 'IconFileText', 15, NOW(), NOW()),
('Document Status', false, '/driver/documents/status', 'IconFileSearch', 15, NOW(), NOW());

-- Submenus for "Support" (nav_item_id = 16)
INSERT INTO sub_nav_items (sub_nav_item, sub_menu, href, icon, nav_item_id, created_on, updated_on) VALUES
('Contact Support', false, '/driver/support/contact', 'IconPhoneCall', 16, NOW(), NOW()),
('FAQs', false, '/driver/support/faqs', 'IconQuestionMark', 16, NOW(), NOW());

-- Submenus for "Logout" (nav_item_id = 17)
INSERT INTO sub_nav_items (sub_nav_item, sub_menu, href, icon, nav_item_id, created_on, updated_on) VALUES
('Confirm Logout', false, '/logout', 'IconLogout', 17, NOW(), NOW());








