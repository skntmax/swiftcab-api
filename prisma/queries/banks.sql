INSERT INTO banks (bank_name, created_on, updated_on)
VALUES 
  ('State Bank of India', NOW(), NOW()),
  ('HDFC Bank', NOW(), NOW()),
  ('ICICI Bank', NOW(), NOW()),
  ('Axis Bank', NOW(), NOW()),
  ('Kotak Mahindra Bank', NOW(), NOW()),
  ('Punjab National Bank', NOW(), NOW()),
  ('Bank of Baroda', NOW(), NOW()),
  ('Canara Bank', NOW(), NOW()),
  ('Union Bank of India', NOW(), NOW()),
  ('IDFC FIRST Bank', NOW(), NOW()),
  ('Indian Bank', NOW(), NOW()),
  ('Central Bank of India', NOW(), NOW()),
  ('Indian Overseas Bank', NOW(), NOW()),
  ('UCO Bank', NOW(), NOW()),
  ('Bank of India', NOW(), NOW()),
  ('YES Bank', NOW(), NOW()),
  ('IndusInd Bank', NOW(), NOW()),
  ('Federal Bank', NOW(), NOW()),
  ('South Indian Bank', NOW(), NOW()),
  ('RBL Bank', NOW(), NOW()),
  ('Jammu & Kashmir Bank', NOW(), NOW()),
  ('DCB Bank', NOW(), NOW()),
  ('Bandhan Bank', NOW(), NOW()),
  ('Karur Vysya Bank', NOW(), NOW()),
  ('City Union Bank', NOW(), NOW()),
  ('Tamilnad Mercantile Bank', NOW(), NOW()),
  ('AU Small Finance Bank', NOW(), NOW()),
  ('ESAF Small Finance Bank', NOW(), NOW()),
  ('Equitas Small Finance Bank', NOW(), NOW()),
  ('Suryoday Small Finance Bank', NOW(), NOW());









-- now inserting bank branches 
-- Branches for State Bank of India (ID: 1)
INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on) VALUES
('SBI Mumbai Main Branch', 1, NOW(), NOW()),
('SBI Delhi Connaught Place', 1, NOW(), NOW()),
('SBI Bangalore MG Road', 1, NOW(), NOW());

-- Branches for Punjab National Bank (ID: 2)
INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on) VALUES
('PNB Chandigarh Sector 17', 2, NOW(), NOW()),
('PNB Ludhiana Clock Tower', 2, NOW(), NOW());

-- Branches for HDFC Bank (ID: 3)
INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on) VALUES
('HDFC Bandra West', 3, NOW(), NOW()),
('HDFC Noida Sector 18', 3, NOW(), NOW());

-- Branches for ICICI Bank (ID: 4)
INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on) VALUES
('ICICI Andheri East', 4, NOW(), NOW()),
('ICICI Hyderabad Gachibowli', 4, NOW(), NOW());

-- Branches for Axis Bank (ID: 5)
INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on) VALUES
('Axis Chennai T Nagar', 5, NOW(), NOW()),
('Axis Pune Shivaji Nagar', 5, NOW(), NOW());

-- Branches for Bank of Baroda (ID: 6)
INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on) VALUES
('BoB Ahmedabad CG Road', 6, NOW(), NOW()),
('BoB Jaipur MI Road', 6, NOW(), NOW());

-- Branches for Kotak Mahindra Bank (ID: 7)
INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on) VALUES
('Kotak Gurugram Cyber City', 7, NOW(), NOW()),
('Kotak Indore Palasia', 7, NOW(), NOW());

-- Branches for Canara Bank (ID: 8)
INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on) VALUES
('Canara Kochi MG Road', 8, NOW(), NOW()),
('Canara Bhopal New Market', 8, NOW(), NOW());

-- Branches for Union Bank of India (ID: 9)
INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on) VALUES
('Union Bank Varanasi Lanka', 9, NOW(), NOW()),
('Union Bank Nagpur Sitabuldi', 9, NOW(), NOW());

-- Branches for IDFC FIRST Bank (ID: 10)
INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on) VALUES
('IDFC First Mumbai BKC', 10, NOW(), NOW()),
('IDFC First Bengaluru Indiranagar', 10, NOW(), NOW());


INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on)
VALUES 
  ('HDFC Bank - Mumbai Main Branch', 2, NOW(), NOW()),
  ('HDFC Bank - Delhi Connaught Place', 2, NOW(), NOW()),
  ('HDFC Bank - Bengaluru Koramangala', 2, NOW(), NOW()),
  ('HDFC Bank - Hyderabad Banjara Hills', 2, NOW(), NOW()),
  ('HDFC Bank - Kolkata Salt Lake', 2, NOW(), NOW()),
  ('HDFC Bank - Chennai T Nagar', 2, NOW(), NOW()),
  ('HDFC Bank - Pune Shivajinagar', 2, NOW(), NOW()),
  ('HDFC Bank - Ahmedabad CG Road', 2, NOW(), NOW());


INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on)
VALUES 
  ('ICICI Bank - Mumbai Andheri West', 3, NOW(), NOW()),
  ('ICICI Bank - Delhi South Extension', 3, NOW(), NOW()),
  ('ICICI Bank - Bengaluru MG Road', 3, NOW(), NOW()),
  ('ICICI Bank - Hyderabad Gachibowli', 3, NOW(), NOW()),
  ('ICICI Bank - Chennai Adyar', 3, NOW(), NOW()),
  ('ICICI Bank - Kolkata Park Street', 3, NOW(), NOW()),
  ('ICICI Bank - Pune Kothrud', 3, NOW(), NOW()),
  ('ICICI Bank - Ahmedabad Navrangpura', 3, NOW(), NOW()),
  ('ICICI Bank - Jaipur Malviya Nagar', 3, NOW(), NOW()),
  ('ICICI Bank - Chandigarh Sector 17', 3, NOW(), NOW()),
  ('ICICI Bank - Lucknow Hazratganj', 3, NOW(), NOW()),
  ('ICICI Bank - Bhopal MP Nagar', 3, NOW(), NOW()),
  ('ICICI Bank - Indore Vijay Nagar', 3, NOW(), NOW()),
  ('ICICI Bank - Kochi Edappally', 3, NOW(), NOW()),
  ('ICICI Bank - Surat Citylight', 3, NOW(), NOW()),
  ('ICICI Bank - Nagpur Dharampeth', 3, NOW(), NOW()),
  ('ICICI Bank - Noida Sector 18', 3, NOW(), NOW()),
  ('ICICI Bank - Gurugram Cyber City', 3, NOW(), NOW()),
  ('ICICI Bank - Patna Boring Road', 3, NOW(), NOW()),
  ('ICICI Bank - Ranchi Main Road', 3, NOW(), NOW());


  INSERT INTO bank_branch (branch_name, bank_id, created_on, updated_on)
VALUES 
  ('Axis Bank - Mumbai Bandra West', 4, NOW(), NOW()),
  ('Axis Bank - Delhi Karol Bagh', 4, NOW(), NOW()),
  ('Axis Bank - Bengaluru Indiranagar', 4, NOW(), NOW()),
  ('Axis Bank - Hyderabad Jubilee Hills', 4, NOW(), NOW()),
  ('Axis Bank - Chennai Velachery', 4, NOW(), NOW()),
  ('Axis Bank - Kolkata Behala', 4, NOW(), NOW()),
  ('Axis Bank - Pune Hadapsar', 4, NOW(), NOW()),
  ('Axis Bank - Ahmedabad Maninagar', 4, NOW(), NOW()),
  ('Axis Bank - Jaipur C-Scheme', 4, NOW(), NOW()),
  ('Axis Bank - Lucknow Gomti Nagar', 4, NOW(), NOW()),
  ('Axis Bank - Noida Sector 62', 4, NOW(), NOW()),
  ('Axis Bank - Gurugram Sector 14', 4, NOW(), NOW()),
  ('Axis Bank - Bhopal New Market', 4, NOW(), NOW()),
  ('Axis Bank - Surat Vesu', 4, NOW(), NOW()),
  ('Axis Bank - Kochi Kakkanad', 4, NOW(), NOW());

  




