-- give me all the localities according to this schema : 
-- CREATE TABLE public.localities (
-- 	id serial4 NOT NULL,
-- 	city_id int4 NOT NULL,
-- 	created_on timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
-- 	updated_on timestamp(3) NOT NULL,
-- 	locality text NOT NULL,
-- 	CONSTRAINT localities_pkey PRIMARY KEY (id),
-- 	CONSTRAINT localities_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(id) ON DELETE RESTRICT ON UPDATE CASCADE
-- ); ,

-- assuming  city_id = 754  and cover all the localities of varanasi 


INSERT INTO public.localities (city_id, created_on, updated_on, locality)
VALUES
-- Varanasi (city_id = 754)
(754, NOW(), NOW(), 'Assi'),
(754, NOW(), NOW(), 'Bhelupur'),
(754, NOW(), NOW(), 'Bhiti'),
(754, NOW(), NOW(), 'Bajardiha'),
(754, NOW(), NOW(), 'Chaukaghat'),
(754, NOW(), NOW(), 'Gulab Bagh'),
(754, NOW(), NOW(), 'Jagatganj'),
(754, NOW(), NOW(), 'Kachahri'),
(754, NOW(), NOW(), 'Kedar Ghat'),
(754, NOW(), NOW(), 'Lanka'),
(754, NOW(), NOW(), 'Manduwala'),
(754, NOW(), NOW(), 'Mahmoorganj'),
(754, NOW(), NOW(), 'Maidagin'),
(754, NOW(), NOW(), 'Paharia'),
(754, NOW(), NOW(), 'Purna Puri'),
(754, NOW(), NOW(), 'Rathyatra'),
(754, NOW(), NOW(), 'Rohania'),
(754, NOW(), NOW(), 'Sigra'),
(754, NOW(), NOW(), 'Sunderpur'),
(754, NOW(), NOW(), 'Tulsi Manas Mandir'),
(754, NOW(), NOW(), 'Barkachha'),
(754, NOW(), NOW(), 'Durgakund'),
(754, NOW(), NOW(), 'Mughal Sarai'),
(754, NOW(), NOW(), 'Maidagin'),
(754, NOW(), NOW(), 'Lalapura'),
(754, NOW(), NOW(), 'Nati Imli'),
(754, NOW(), NOW(), 'Khajuri'),
(754, NOW(), NOW(), 'Vikramshila'),
(754, NOW(), NOW(), 'Paharia'),
(754, NOW(), NOW(), 'Rajatalab'),
(754, NOW(), NOW(), 'Sant Ravidas Nagar'),
(754, NOW(), NOW(), 'Ramnagar'),
(754, NOW(), NOW(), 'Panchkoshi Road'),
(754, NOW(), NOW(), 'Sonarpura'),
(754, NOW(), NOW(), 'Nagwa'),
(754, NOW(), NOW(), 'Nandeshwar'),
(754, NOW(), NOW(), 'Bhagwanpur'),
(754, NOW(), NOW(), 'Khurshedabad'),
(754, NOW(), NOW(), 'Chandrapuri'),
(754, NOW(), NOW(), 'Dandupur'),
(754, NOW(), NOW(), 'Ghatampur'),
(754, NOW(), NOW(), 'Madanpura'),
(754, NOW(), NOW(), 'Lal Kuan'),
(754, NOW(), NOW(), 'Ramnagari'),
(754, NOW(), NOW(), 'Chandrapur'),
(754, NOW(), NOW(), 'Subedarganj'),
(754, NOW(), NOW(), 'Vishwanath Gali'),
(754, NOW(), NOW(), 'Karkhiya'),
(754, NOW(), NOW(), 'Mahavir Nagar'),
(754, NOW(), NOW(), 'Rohaniya'),
(754, NOW(), NOW(), 'Baraipur'),
(754, NOW(), NOW(), 'Deendayal Nagar'),
(754, NOW(), NOW(), 'Kachahri Road'),
(754, NOW(), NOW(), 'Sundar Nagar'),
(754, NOW(), NOW(), 'Tulsi Ghat Road'),
(754, NOW(), NOW(), 'Mau Aima'),
(754, NOW(), NOW(), 'Mughal Sarai'),
(754, NOW(), NOW(), 'Aghor Dham'),
(754, NOW(), NOW(), 'Sarnath'),
(754, NOW(), NOW(), 'Vidyapath'),
(754, NOW(), NOW(), 'Bhagwanpur'),
(754, NOW(), NOW(), 'Rajendrapur'),
(754, NOW(), NOW(), 'Sankat Mochan'),
(754, NOW(), NOW(), 'Lal Mandir'),
(754, NOW(), NOW(), 'Bengali Tola'),
(754, NOW(), NOW(), 'Bajardiha'),
(754, NOW(), NOW(), 'Golghar'),
(754, NOW(), NOW(), 'Paltan Bazaar'),
(754, NOW(), NOW(), 'Rath Yatra'),
(754, NOW(), NOW(), 'Durgakund Road'),
(754, NOW(), NOW(), 'Gauri Ghat'),
(754, NOW(), NOW(), 'Rajendra Nagar'),
(754, NOW(), NOW(), 'Dalmau'),
(754, NOW(), NOW(), 'Vijay Nagar'),
(754, NOW(), NOW(), 'Sikhpura'),
(754, NOW(), NOW(), 'Bhandara'),
(754, NOW(), NOW(), 'Rishipur'),
(754, NOW(), NOW(), 'Chaubeypur'),
(754, NOW(), NOW(), 'Ramnagar'),
(754, NOW(), NOW(), 'Paharipur'),
(754, NOW(), NOW(), 'Karmel'),
(754, NOW(), NOW(), 'Lalpur'),
(754, NOW(), NOW(), 'Panditpur'),
(754, NOW(), NOW(), 'Vishalgarh'),
(754, NOW(), NOW(), 'Patel Nagar'),
(754, NOW(), NOW(), 'Mau'),
(754, NOW(), NOW(), 'Banaras Hindu University (BHU)'),
(754, NOW(), NOW(), 'Suraj Kund'),
(754, NOW(), NOW(), 'Kachari'),
(754, NOW(), NOW(), 'Dhanwantri Nagar'),
(754, NOW(), NOW(), 'Chiraigaon'),
(754, NOW(), NOW(), 'Shivpur');




INSERT INTO public.localities (city_id, created_on, updated_on, locality)
VALUES
-- Delhi (city_id = 815)
(815, NOW(), NOW(), 'Central Delhi'),
(815, NOW(), NOW(), 'North Delhi'),
(815, NOW(), NOW(), 'South Delhi'),
(815, NOW(), NOW(), 'East Delhi'),
(815, NOW(), NOW(), 'West Delhi'),
(815, NOW(), NOW(), 'New Delhi'),
(815, NOW(), NOW(), 'Karol Bagh'),
(815, NOW(), NOW(), 'Connaught Place'),
(815, NOW(), NOW(), 'Chandni Chowk'),
(815, NOW(), NOW(), 'Rajouri Garden'),
(815, NOW(), NOW(), 'Saket'),
(815, NOW(), NOW(), 'Dwarka'),
(815, NOW(), NOW(), 'Vasant Vihar'),
(815, NOW(), NOW(), 'Rohini'),
(815, NOW(), NOW(), 'Pitampura'),
(815, NOW(), NOW(), 'Model Town'),
(815, NOW(), NOW(), 'Shahdara'),
(815, NOW(), NOW(), 'Lajpat Nagar'),
(815, NOW(), NOW(), 'Hazrat Nizamuddin'),
(815, NOW(), NOW(), 'Mayur Vihar'),
(815, NOW(), NOW(), 'Nehru Place'),
(815, NOW(), NOW(), 'Greater Kailash'),
(815, NOW(), NOW(), 'Kalkaji'),
(815, NOW(), NOW(), 'Dwarka Mor'),
(815, NOW(), NOW(), 'Mehrauli'),
(815, NOW(), NOW(), 'Chhatarpur'),
(815, NOW(), NOW(), 'Patel Nagar'),
(815, NOW(), NOW(), 'Wazirabad'),
(815, NOW(), NOW(), 'Badarpur'),
(815, NOW(), NOW(), 'Azadpur'),
(815, NOW(), NOW(), 'Kamla Nagar'),
(815, NOW(), NOW(), 'Munirka'),
(815, NOW(), NOW(), 'Vikaspuri'),
(815, NOW(), NOW(), 'Gurgaon Road'),
(815, NOW(), NOW(), 'Rajinder Nagar'),
(815, NOW(), NOW(), 'Vasant Kunj'),
(815, NOW(), NOW(), 'R K Puram'),
(815, NOW(), NOW(), 'Tughlakabad'),
(815, NOW(), NOW(), 'Panchsheel Park'),
(815, NOW(), NOW(), 'Okhla'),
(815, NOW(), NOW(), 'Jangpura'),
(815, NOW(), NOW(), 'Nangloi'),
(815, NOW(), NOW(), 'Baba Kharak Singh Marg'),
(815, NOW(), NOW(), 'Pragati Maidan'),
(815, NOW(), NOW(), 'Moti Bagh'),
(815, NOW(), NOW(), 'Narela'),
(815, NOW(), NOW(), 'Rajeev Chowk'),
(815, NOW(), NOW(), 'Sarai Kale Khan'),
(815, NOW(), NOW(), 'Daryaganj'),
(815, NOW(), NOW(), 'Khan Market'),
(815, NOW(), NOW(), 'Chirag Delhi'),
(815, NOW(), NOW(), 'Dwarka Sector 21'),
(815, NOW(), NOW(), 'Madhuban Chowk'),
(815, NOW(), NOW(), 'Patel Chowk'),
(815, NOW(), NOW(), 'Defence Colony'),
(815, NOW(), NOW(), 'Green Park'),
(815, NOW(), NOW(), 'Lodhi Colony'),
(815, NOW(), NOW(), 'Friends Colony'),
(815, NOW(), NOW(), 'Sunder Nagar'),
(815, NOW(), NOW(), 'Jasola'),
(815, NOW(), NOW(), 'Sarai Rohilla'),
(815, NOW(), NOW(), 'Civil Lines'),
(815, NOW(), NOW(), 'Tilak Nagar'),
(815, NOW(), NOW(), 'Bengali Market'),
(815, NOW(), NOW(), 'Shakti Nagar'),
(815, NOW(), NOW(), 'Sadar Bazar'),
(815, NOW(), NOW(), 'Dholewal'),
(815, NOW(), NOW(), 'Dundahera'),
(815, NOW(), NOW(), 'Shahpur Jat'),
(815, NOW(), NOW(), 'Maujpur'),
(815, NOW(), NOW(), 'Farsh Bazar'),
(815, NOW(), NOW(), 'Jama Masjid'),
(815, NOW(), NOW(), 'Chawri Bazar'),
(815, NOW(), NOW(), 'Paharganj'),
(815, NOW(), NOW(), 'Subzi Mandi'),
(815, NOW(), NOW(), 'Sarai Rohilla'),
(815, NOW(), NOW(), 'Ajmeri Gate'),
(815, NOW(), NOW(), 'Moti Nagar'),
(815, NOW(), NOW(), 'Ramesh Nagar'),
(815, NOW(), NOW(), 'Hari Nagar'),
(815, NOW(), NOW(), 'Uttam Nagar'),
(815, NOW(), NOW(), 'Jaitpur'),
(815, NOW(), NOW(), 'Kalyanpuri'),
(815, NOW(), NOW(), 'Kalkaji Extension'),
(815, NOW(), NOW(), 'Munirka Village'),
(815, NOW(), NOW(), 'Mundka'),
(815, NOW(), NOW(), 'Naraina'),
(815, NOW(), NOW(), 'Nehru Nagar'),
(815, NOW(), NOW(), 'Okhla Phase 2'),
(815, NOW(), NOW(), 'Okhla Phase 3'),
(815, NOW(), NOW(), 'Rajiv Nagar'),
(815, NOW(), NOW(), 'Rohini Sector 1'),
(815, NOW(), NOW(), 'Rohini Sector 2'),
(815, NOW(), NOW(), 'Rohini Sector 3'),
(815, NOW(), NOW(), 'Shivaji Park'),
(815, NOW(), NOW(), 'Subhash Nagar'),
(815, NOW(), NOW(), 'Sushant Lok'),
(815, NOW(), NOW(), 'Vikas Nagar'),
(815, NOW(), NOW(), 'Vishnu Garden'),
(815, NOW(), NOW(), 'Wazirabad'),
(815, NOW(), NOW(), 'Yamuna Vihar');





INSERT INTO public.localities (city_id, created_on, updated_on, locality)
VALUES
-- Noida (city_id = 757)
(757, NOW(), NOW(), 'Sector 1'),
(757, NOW(), NOW(), 'Sector 2'),
(757, NOW(), NOW(), 'Sector 3'),
(757, NOW(), NOW(), 'Sector 4'),
(757, NOW(), NOW(), 'Sector 5'),
(757, NOW(), NOW(), 'Sector 6'),
(757, NOW(), NOW(), 'Sector 7'),
(757, NOW(), NOW(), 'Sector 8'),
(757, NOW(), NOW(), 'Sector 9'),
(757, NOW(), NOW(), 'Sector 10'),
(757, NOW(), NOW(), 'Sector 11'),
(757, NOW(), NOW(), 'Sector 12'),
(757, NOW(), NOW(), 'Sector 13'),
(757, NOW(), NOW(), 'Sector 14'),
(757, NOW(), NOW(), 'Sector 15'),
(757, NOW(), NOW(), 'Sector 16'),
(757, NOW(), NOW(), 'Sector 17'),
(757, NOW(), NOW(), 'Sector 18'),
(757, NOW(), NOW(), 'Sector 19'),
(757, NOW(), NOW(), 'Sector 20'),
(757, NOW(), NOW(), 'Sector 21'),
(757, NOW(), NOW(), 'Sector 22'),
(757, NOW(), NOW(), 'Sector 23'),
(757, NOW(), NOW(), 'Sector 24'),
(757, NOW(), NOW(), 'Sector 25'),
(757, NOW(), NOW(), 'Sector 26'),
(757, NOW(), NOW(), 'Sector 27'),
(757, NOW(), NOW(), 'Sector 28'),
(757, NOW(), NOW(), 'Sector 29'),
(757, NOW(), NOW(), 'Sector 30'),
(757, NOW(), NOW(), 'Sector 31'),
(757, NOW(), NOW(), 'Sector 32'),
(757, NOW(), NOW(), 'Sector 33'),
(757, NOW(), NOW(), 'Sector 34'),
(757, NOW(), NOW(), 'Sector 35'),
(757, NOW(), NOW(), 'Sector 36'),
(757, NOW(), NOW(), 'Sector 37'),
(757, NOW(), NOW(), 'Sector 38'),
(757, NOW(), NOW(), 'Sector 39'),
(757, NOW(), NOW(), 'Sector 40'),
(757, NOW(), NOW(), 'Sector 41'),
(757, NOW(), NOW(), 'Sector 42'),
(757, NOW(), NOW(), 'Sector 43'),
(757, NOW(), NOW(), 'Sector 44'),
(757, NOW(), NOW(), 'Sector 45'),
(757, NOW(), NOW(), 'Sector 46'),
(757, NOW(), NOW(), 'Sector 47'),
(757, NOW(), NOW(), 'Sector 48'),
(757, NOW(), NOW(), 'Sector 49'),
(757, NOW(), NOW(), 'Sector 50'),
(757, NOW(), NOW(), 'Sector 51'),
(757, NOW(), NOW(), 'Sector 52'),
(757, NOW(), NOW(), 'Sector 53'),
(757, NOW(), NOW(), 'Sector 54'),
(757, NOW(), NOW(), 'Sector 55'),
(757, NOW(), NOW(), 'Sector 56'),
(757, NOW(), NOW(), 'Sector 57'),
(757, NOW(), NOW(), 'Sector 58'),
(757, NOW(), NOW(), 'Sector 59'),
(757, NOW(), NOW(), 'Sector 60'),
(757, NOW(), NOW(), 'Sector 61'),
(757, NOW(), NOW(), 'Sector 62'),
(757, NOW(), NOW(), 'Sector 63'),
(757, NOW(), NOW(), 'Sector 64'),
(757, NOW(), NOW(), 'Sector 65'),
(757, NOW(), NOW(), 'Sector 66'),
(757, NOW(), NOW(), 'Sector 67'),
(757, NOW(), NOW(), 'Sector 68'),
(757, NOW(), NOW(), 'Sector 69'),
(757, NOW(), NOW(), 'Sector 70'),
(757, NOW(), NOW(), 'Sector 71'),
(757, NOW(), NOW(), 'Sector 72'),
(757, NOW(), NOW(), 'Sector 73'),
(757, NOW(), NOW(), 'Sector 74'),
(757, NOW(), NOW(), 'Sector 75'),
(757, NOW(), NOW(), 'Sector 76'),
(757, NOW(), NOW(), 'Sector 77'),
(757, NOW(), NOW(), 'Sector 78'),
(757, NOW(), NOW(), 'Sector 79'),
(757, NOW(), NOW(), 'Sector 80'),
(757, NOW(), NOW(), 'Sector 81'),
(757, NOW(), NOW(), 'Sector 82'),
(757, NOW(), NOW(), 'Sector 83'),
(757, NOW(), NOW(), 'Sector 84'),
(757, NOW(), NOW(), 'Sector 85'),
(757, NOW(), NOW(), 'Sector 86'),
(757, NOW(), NOW(), 'Sector 87'),
(757, NOW(), NOW(), 'Sector 88'),
(757, NOW(), NOW(), 'Sector 89'),
(757, NOW(), NOW(), 'Sector 90'),
(757, NOW(), NOW(), 'Sector 91'),
(757, NOW(), NOW(), 'Sector 92'),
(757, NOW(), NOW(), 'Sector 93'),
(757, NOW(), NOW(), 'Sector 94'),
(757, NOW(), NOW(), 'Sector 95'),
(757, NOW(), NOW(), 'Sector 96'),
(757, NOW(), NOW(), 'Sector 97'),
(757, NOW(), NOW(), 'Sector 98'),
(757, NOW(), NOW(), 'Sector 99'),
(757, NOW(), NOW(), 'Sector 100'),
(757, NOW(), NOW(), 'Noida Phase 1'),
(757, NOW(), NOW(), 'Noida Phase 2'),
(757, NOW(), NOW(), 'Noida Phase 3'),
(757, NOW(), NOW(), 'Noida Extension'),
(757, NOW(), NOW(), 'Greater Noida'),
(757, NOW(), NOW(), 'Surajpur'),
(757, NOW(), NOW(), 'Beta 1'),
(757, NOW(), NOW(), 'Beta 2'),
(757, NOW(), NOW(), 'Gamma 1'),
(757, NOW(), NOW(), 'Gamma 2'),
(757, NOW(), NOW(), 'Zeta 1'),
(757, NOW(), NOW(), 'Zeta 2'),
(757, NOW(), NOW(), 'Omicron 1'),
(757, NOW(), NOW(), 'Omicron 2'),
(757, NOW(), NOW(), 'Techzone 1'),
(757, NOW(), NOW(), 'Techzone 2'),
(757, NOW(), NOW(), 'Alpha 1'),
(757, NOW(), NOW(), 'Alpha 2'),
(757, NOW(), NOW(), 'Chi 1'),
(757, NOW(), NOW(), 'Chi 2'),
(757, NOW(), NOW(), 'Tata Nagar'),
(757, NOW(), NOW(), 'Shahberi'),
(757, NOW(), NOW(), 'Mohan Nagar'),
(757, NOW(), NOW(), 'Indirapuram'),
(757, NOW(), NOW(), 'Kaushambi'),
(757, NOW(), NOW(), 'Vasundhara'),
(757, NOW(), NOW(), 'Vasundhara Sector 9'),
(757, NOW(), NOW(), 'Vaishali'),
(757, NOW(), NOW(), 'Sector 12 Noida'),
(757, NOW(), NOW(), 'Sector 15 Noida'),
(757, NOW(), NOW(), 'Sector 16 Noida'),
(757, NOW(), NOW(), 'Sector 17 Noida'),
(757, NOW(), NOW(), 'Sector 18 Noida'),
(757, NOW(), NOW(), 'Sector 19 Noida'),
(757, NOW(), NOW(), 'Sector 20 Noida');





-- for kanpur 

INSERT INTO public.localities (city_id, locality, created_on, updated_on) 
VALUES 
    (755, 'Swaroop Nagar', NOW(), NOW()),
    (755, 'Arya Nagar', NOW(), NOW()),
    (755, 'Tilak Nagar', NOW(), NOW()),
    (755, 'Kakadeo', NOW(), NOW()),
    (755, 'Naveen Market', NOW(), NOW()),
    (755, 'Pandu Nagar', NOW(), NOW()),
    (755, 'Kidwai Nagar', NOW(), NOW()),
    (755, 'Shastri Nagar', NOW(), NOW()),
    (755, 'Civil Lines', NOW(), NOW()),
    (755, 'Barra', NOW(), NOW()),
    (755, 'Govind Nagar', NOW(), NOW()),
    (755, 'Sisamau', NOW(), NOW()),
    (755, 'Fazalganj', NOW(), NOW()),
    (755, 'Ashok Nagar', NOW(), NOW()),
    (755, 'Juhi', NOW(), NOW()),
    (755, 'Yashoda Nagar', NOW(), NOW()),
    (755, 'Tatmil Chauraha', NOW(), NOW()),
    (755, 'Mall Road', NOW(), NOW()),
    (755, 'Harjinder Nagar', NOW(), NOW()),
    (755, 'Chunni Ganj', NOW(), NOW()),
    (755, 'Ratanlal Nagar', NOW(), NOW()),
    (755, 'Darshanpurwa', NOW(), NOW()),
    (755, 'Naubasta', NOW(), NOW()),
    (755, 'Parade', NOW(), NOW()),
    (755, 'Chakeri', NOW(), NOW()),
    (755, 'Kalyanpur', NOW(), NOW()),
    (755, 'Panki', NOW(), NOW()),
    (755, 'Rawatpur', NOW(), NOW()),
    (755, 'Vishnupuri', NOW(), NOW()),
    (755, 'Shyam Nagar', NOW(), NOW()),
    (755, 'Barasirohi', NOW(), NOW()),
    (755, 'Azad Nagar', NOW(), NOW()),
    (755, 'Juhi Kalan', NOW(), NOW()),
    (755, 'Kanpur Cantonment', NOW(), NOW()),
    (755, 'Rail Bazar', NOW(), NOW()),
    (755, 'Chamanganj', NOW(), NOW()),
    (755, 'Becon Ganj', NOW(), NOW()),
    (755, 'Gwaltoli', NOW(), NOW()),
    (755, 'Mohammad Ali Park', NOW(), NOW()),
    (755, 'Hallett Road', NOW(), NOW()),
    (755, 'Bithoor', NOW(), NOW()),
    (755, 'Mandhana', NOW(), NOW()),
    (755, 'Baba Nagar', NOW(), NOW()),
    (755, 'Makhania Bazar', NOW(), NOW()),
    (755, 'Halwa Khanda', NOW(), NOW()),
    (755, 'Moolganj', NOW(), NOW()),
    (755, 'Birhana Road', NOW(), NOW()),
    (755, 'Permat', NOW(), NOW()),
    (755, 'Rania', NOW(), NOW()),
    (755, 'Jajmau', NOW(), NOW()),
    (755, 'Bhannana Purwa', NOW(), NOW()),
    (755, 'Fatehpur Roshanai', NOW(), NOW());



--  for  lucknow
INSERT INTO public.localities (city_id, created_on, updated_on, locality) VALUES
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Gomti Nagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Hazratganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Alambagh'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Indira Nagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Aminabad'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Chowk'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Mahanagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Rajajipuram'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Vikas Nagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sitapur Road'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Kapoorthala'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Nirala Nagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Jankipuram'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Ashiyana'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Telibagh'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Krishna Nagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Kalyanpur'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Khurram Nagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Aashiana'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Gautam Palli'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Rahim Nagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Amar Shaheed Path'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Golaganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Kaiserbagh'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Qaiserbagh'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Naka Hindola'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Thakurganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Dubagga'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sarojini Nagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Triveni Nagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Ganeshganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Nishatganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Bhootnath Market'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sushant Golf City'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Faizabad Road'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Chinhat'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Itaunja'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Malihabad'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Kakori'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Mohaan Road'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Bakshi Ka Talab'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Malasa'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Madiyaon'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Saadatganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Wazirganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Rusa'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Bijnor'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Kukrail'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Bhagwant Nagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Safedabad'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Banda Bahadur Nagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Balaganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Nawazganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Para'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Raja Bazaar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Qadam Rasul'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Qaiserbagh'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lalbagh'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Nirala Nagar'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector B, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector C, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector D, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector E, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector F, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector G, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector H, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector I, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector J, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector K, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector L, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector M, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector N, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector O, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector P, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector Q, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector R, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector S, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector T, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector U, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector V, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector W, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector X, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector Y, Aliganj'),
(756, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Sector Z, Aliganj');

--  for gazibad 757 



INSERT INTO public.localities (city_id, locality, created_on, updated_on) 
VALUES 
    -- Major Residential & Commercial Areas
    (758, 'Indirapuram', NOW(), NOW()),
    (758, 'Vaishali', NOW(), NOW()),
    (758, 'Vasundhara', NOW(), NOW()),
    (758, 'Raj Nagar', NOW(), NOW()),
    (758, 'Raj Nagar Extension', NOW(), NOW()),
    (758, 'Kaushambi', NOW(), NOW()),
    (758, 'Crossings Republik', NOW(), NOW()),
    (758, 'Kavi Nagar', NOW(), NOW()),
    (758, 'Govindpuram', NOW(), NOW()),
    (758, 'Sahibabad', NOW(), NOW()),

    -- Streets & Chowks
    (758, 'Ambedkar Road', NOW(), NOW()),
    (758, 'Meerut Road', NOW(), NOW()),
    (758, 'GT Road', NOW(), NOW()),
    (758, 'Hapur Road', NOW(), NOW()),
    (758, 'Navyug Market', NOW(), NOW()),
    (758, 'Shani Chowk', NOW(), NOW()),
    (758, 'Dundahera Chowk', NOW(), NOW()),
    (758, 'Teela More', NOW(), NOW()),
    (758, 'Bhartendu Harish Chandra Marg', NOW(), NOW()),
    (758, 'Sikanderpur Chowk', NOW(), NOW()),

    -- Mid-Level Localities
    (758, 'Brij Vihar', NOW(), NOW()),
    (758, 'Mohan Nagar', NOW(), NOW()),
    (758, 'Shastri Nagar', NOW(), NOW()),
    (758, 'Pratap Vihar', NOW(), NOW()),
    (758, 'Dundahera', NOW(), NOW()),
    (758, 'Chander Nagar', NOW(), NOW()),
    (758, 'Bhopura', NOW(), NOW()),
    (758, 'Madhuban Bapudham', NOW(), NOW()),
    (758, 'Rajendra Nagar', NOW(), NOW()),
    (758, 'Nyay Khand', NOW(), NOW()),

    -- Industrial & Factory Areas
    (758, 'Sahibabad Industrial Area', NOW(), NOW()),
    (758, 'Modinagar Industrial Area', NOW(), NOW()),
    (758, 'Loni Industrial Area', NOW(), NOW()),
    (758, 'Meerut Road Industrial Area', NOW(), NOW()),
    (758, 'Bulandshahr Road Industrial Area', NOW(), NOW()),

    -- Small Residential Streets & Sectors
    (758, 'Sector 3 Vaishali', NOW(), NOW()),
    (758, 'Sector 4 Vaishali', NOW(), NOW()),
    (758, 'Sector 5 Vaishali', NOW(), NOW()),
    (758, 'Sector 9 Vasundhara', NOW(), NOW()),
    (758, 'Sector 10 Vasundhara', NOW(), NOW()),
    (758, 'Sector 11 Vasundhara', NOW(), NOW()),
    (758, 'Sector 12 Vasundhara', NOW(), NOW()),
    (758, 'Sector 13 Vasundhara', NOW(), NOW()),
    (758, 'Sector 15 Vasundhara', NOW(), NOW()),
    (758, 'Sector 18 Vasundhara', NOW(), NOW()),
    (758, 'Sector 23 Raj Nagar', NOW(), NOW()),
    (758, 'Sector 9 Kavi Nagar', NOW(), NOW()),
    (758, 'Sector 10 Kavi Nagar', NOW(), NOW()),
    (758, 'Sector 16 Kavi Nagar', NOW(), NOW()),
    (758, 'Gyan Khand 1', NOW(), NOW()),
    (758, 'Gyan Khand 2', NOW(), NOW()),
    (758, 'Gyan Khand 3', NOW(), NOW()),
    (758, 'Niti Khand 1', NOW(), NOW()),
    (758, 'Niti Khand 2', NOW(), NOW()),
    (758, 'Niti Khand 3', NOW(), NOW()),
    (758, 'Abhay Khand 1', NOW(), NOW()),
    (758, 'Abhay Khand 2', NOW(), NOW()),
    (758, 'Nyay Khand 1', NOW(), NOW()),
    (758, 'Nyay Khand 2', NOW(), NOW()),

    -- Suburban & Outskirts Localities
    (758, 'Dasna', NOW(), NOW()),
    (758, 'Morta', NOW(), NOW()),
    (758, 'Muradnagar', NOW(), NOW()),
    (758, 'Modinagar', NOW(), NOW()),
    (758, 'Lal Kuan', NOW(), NOW()),
    (758, 'Tronica City', NOW(), NOW()),
    (758, 'Duhai', NOW(), NOW()),
    (758, 'Basantpur Sainthli', NOW(), NOW()),
    (758, 'Razia Nagar', NOW(), NOW()),
    (758, 'Ankur Vihar', NOW(), NOW()),
    (758, 'Madhopura', NOW(), NOW()),
    (758, 'New Arya Nagar', NOW(), NOW()),

    -- Miscellaneous
    (758, 'Hindon Vihar', NOW(), NOW()),
    (758, 'GTB Nagar', NOW(), NOW()),
    (758, 'Shalimar Garden Extension', NOW(), NOW()),
    (758, 'Bamheta', NOW(), NOW()),
    (758, 'Vijay Nagar', NOW(), NOW()),
    (758, 'Shani Bazar Road', NOW(), NOW()),
    (758, 'Bank Colony', NOW(), NOW()),
    (758, 'Navyug Market Lane', NOW(), NOW()),
    (758, 'Guldhar', NOW(), NOW()),
    (758, 'Ramte Ram Road', NOW(), NOW()),
    (758, 'Ramprastha', NOW(), NOW());




--  for meeruth
INSERT INTO public.localities (city_id, locality, created_on, updated_on) 
VALUES 
    -- Major Residential & Commercial Areas
    (759, 'Shastri Nagar', NOW(), NOW()),
    (759, 'Saket', NOW(), NOW()),
    (759, 'Ganga Nagar', NOW(), NOW()),
    (759, 'Modipuram', NOW(), NOW()),
    (759, 'Pallavpuram', NOW(), NOW()),
    (759, 'Jagrati Vihar', NOW(), NOW()),
    (759, 'Meerut Cantt', NOW(), NOW()),
    (759, 'Mawana Road', NOW(), NOW()),
    (759, 'Begum Bagh', NOW(), NOW()),
    (759, 'Abdullahpur', NOW(), NOW()),

    -- Streets & Chowks
    (759, 'Abu Lane', NOW(), NOW()),
    (759, 'Sadar Bazar', NOW(), NOW()),
    (759, 'Gol Market', NOW(), NOW()),
    (759, 'Meerut Clock Tower', NOW(), NOW()),
    (759, 'Delhi Road', NOW(), NOW()),
    (759, 'Hapur Road', NOW(), NOW()),
    (759, 'Rohta Road', NOW(), NOW()),
    (759, 'Gokalpur Chowk', NOW(), NOW()),
    (759, 'Lisari Gate', NOW(), NOW()),
    (759, 'Suraj Kund Road', NOW(), NOW()),

    -- Mid-Level Localities
    (759, 'Kanker Khera', NOW(), NOW()),
    (759, 'Gandhi Nagar', NOW(), NOW()),
    (759, 'Lalkurti', NOW(), NOW()),
    (759, 'Lohia Nagar', NOW(), NOW()),
    (759, 'Rajban Market', NOW(), NOW()),
    (759, 'Nauchandi', NOW(), NOW()),
    (759, 'Transport Nagar', NOW(), NOW()),
    (759, 'Rakshapuram', NOW(), NOW()),
    (759, 'Sarai Behleem', NOW(), NOW()),
    (759, 'Islamabad', NOW(), NOW()),

    -- Industrial & Factory Areas
    (759, 'Partapur Industrial Area', NOW(), NOW()),
    (759, 'Meerut Bypass', NOW(), NOW()),
    (759, 'Modipuram Industrial Area', NOW(), NOW()),
    (759, 'Puth Khas Industrial Area', NOW(), NOW()),
    (759, 'Lohia Nagar Industrial Zone', NOW(), NOW()),

    -- Small Residential Streets & Sectors
    (759, 'Sector 1 Shastri Nagar', NOW(), NOW()),
    (759, 'Sector 2 Shastri Nagar', NOW(), NOW()),
    (759, 'Sector 3 Shastri Nagar', NOW(), NOW()),
    (759, 'Sector 4 Shastri Nagar', NOW(), NOW()),
    (759, 'Sector 5 Shastri Nagar', NOW(), NOW()),
    (759, 'Sector 6 Shastri Nagar', NOW(), NOW()),
    (759, 'Sector 9 Pallavpuram', NOW(), NOW()),
    (759, 'Sector 10 Pallavpuram', NOW(), NOW()),
    (759, 'Sector 11 Pallavpuram', NOW(), NOW()),
    (759, 'Sector 13 Modipuram', NOW(), NOW()),
    (759, 'Sector 15 Modipuram', NOW(), NOW()),
    (759, 'Sector 18 Ganga Nagar', NOW(), NOW()),
    (759, 'Sector 23 Ganga Nagar', NOW(), NOW()),
    (759, 'Shradhapuri Phase 1', NOW(), NOW()),
    (759, 'Shradhapuri Phase 2', NOW(), NOW()),
    (759, 'Brij Vihar', NOW(), NOW()),
    (759, 'Bhavanpur', NOW(), NOW()),
    (759, 'Balwant Nagar', NOW(), NOW()),
    (759, 'Rithani', NOW(), NOW()),

    -- Suburban & Outskirts Localities
    (759, 'Mawana', NOW(), NOW()),
    (759, 'Daurala', NOW(), NOW()),
    (759, 'Jani Khurd', NOW(), NOW()),
    (759, 'Parikshitgarh', NOW(), NOW()),
    (759, 'Kithore', NOW(), NOW()),
    (759, 'Saradhana', NOW(), NOW()),
    (759, 'Kankerpur', NOW(), NOW()),
    (759, 'Daurli', NOW(), NOW()),
    (759, 'Khair Nagar', NOW(), NOW()),
    (759, 'Chandni Chowk Meerut', NOW(), NOW()),

    -- Miscellaneous
    (759, 'Nehru Nagar', NOW(), NOW()),
    (759, 'Hapur Adda', NOW(), NOW()),
    (759, 'Sanjay Nagar', NOW(), NOW()),
    (759, 'Kalyan Nagar', NOW(), NOW()),
    (759, 'Brahmpuri', NOW(), NOW()),
    (759, 'Aminagar', NOW(), NOW()),
    (759, 'Lakhipura', NOW(), NOW()),
    (759, 'Medical Road', NOW(), NOW()),
    (759, 'Dharampur', NOW(), NOW()),
    (759, 'Kankar Khera Extension', NOW(), NOW()),
    (759, 'Dulehra', NOW(), NOW()),
    (759, 'Bhudhana Gate', NOW(), NOW()),
    (759, 'Jattiwara', NOW(), NOW()),
    (759, 'Maliwara', NOW(), NOW()),
    (759, 'Tirana', NOW(), NOW()),
    (759, 'Radhanpur', NOW(), NOW()),
    (759, 'Ganganagar Colony', NOW(), NOW());

