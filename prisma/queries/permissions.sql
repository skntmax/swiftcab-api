-- truncate table public.permissions RESTART IDENTITY CASCADE ;  
INSERT INTO public.permissions (id, permission_name, created_on, updated_on)
VALUES
(1, 'Create Users', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Edit Users', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Delete Users', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'View Users', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Assign Roles', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Create Leads', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Edit Leads', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Delete Leads', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'View Leads', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Assign Leads', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'Create Contacts', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'Edit Contacts', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 'Delete Contacts', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'View Contacts', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 'Create Deals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(16, 'Edit Deals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 'Delete Deals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 'View Deals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(19, 'Assign Deals', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(20, 'Create Tasks', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(21, 'Edit Tasks', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(22, 'Delete Tasks', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(23, 'View Tasks', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(24, 'Assign Tasks', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(25, 'Create Campaigns', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(26, 'Edit Campaigns', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(27, 'Delete Campaigns', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(28, 'View Campaigns', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(29, 'Send Marketing Emails', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(30, 'View Reports', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(31, 'Generate Reports', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(32, 'Export Reports', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(33, 'Manage Invoices', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(34, 'View Transactions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(35, 'Process Payments', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(36, 'Access CRM Settings', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(37, 'Manage Integrations', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(38, 'Customize Workflows', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(39, 'Configure Automations', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
