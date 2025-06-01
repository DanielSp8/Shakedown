create database if not exists flexpath_final;
use flexpath_final;

drop table if exists users, roles, backpacks, gear_lists;

create table users (
    username varchar(255) primary key,
    password varchar(255)
);

create table roles (
    username varchar(255) not null,
    role varchar(250) not null,
    primary key (username, role),
    foreign key (username) references users(username) on delete cascade
);


insert into users (username, password) values ('admin', '$2a$10$tBTfzHzjmQVKza3VSa5lsOX6/iL93xPVLlLXYg2FhT6a.jb1o6VDq');
insert into roles (username, role) values ('admin', 'ADMIN');

insert into users (username, password) values ('user', '$2a$10$rdrt3j7YkAaVTQJcGnPX.ORrpMZ3ZXUMZqhfx0jR68vLaqB2jvsH2');
insert into roles (username, role) values ('user', 'USER');

CREATE TABLE backpacks (
	backpack_id INT AUTO_INCREMENT PRIMARY KEY,
    backpack_name VARCHAR(25) NOT NULL,
    location VARCHAR(100),
	owner_username VARCHAR(255),
	private_value BOOLEAN,

    FOREIGN KEY (owner_username) REFERENCES users(username)
		ON DELETE CASCADE
);

CREATE TABLE gear_lists (
	item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    weight_lbs INT NOT NULL DEFAULT 0,
    weight_oz DECIMAL(4,2) NOT NULL DEFAULT 0,
    price DECIMAL(8,2) NOT NULL DEFAULT 0,
	private_value BOOLEAN,
	owner_username VARCHAR(255),
    need_to_purchase BOOLEAN,
    backpack_id INT,
    
	FOREIGN KEY (backpack_id) REFERENCES backpacks(backpack_id)
		ON DELETE CASCADE
);

INSERT INTO backpacks (backpack_name, owner_username, location, private_value)
	VALUES ('AT-Thru Hike', 'admin', 'Georgia to Maine', false),
		('Hidden Pond', 'user', 'Ocala, Florida', false),
        ('Philmont 2027', 'user', 'Cimarron, New Mexico', true);

INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, private_value, owner_username, need_to_purchase, backpack_id)
	VALUES ('Fly Creek 2 Person 3 Season Tent', 'Shelter', 'The Fly Creek HV UL Solution Dye Two-Person Tent still maintains the ultralight weight that minimalist backpackers look for, but Big Agnes redesigned it with a higher volume to give a comfier sleeping space.', 
			1, 15, 279.96, false, 'admin', false, 1),
			('Mariposa 60 Backpack', 'Backpack', 'Named for the butterflies that can travel 100 miles a day. This world-famous pack weighs a little and hauls a lot.', 
			2, 3.7, 315, false, 'admin', false, 1),
			('Magma 15 Sleeping Bag', 'Sleep', 'The updated REI Co-op Magma 15 sleeping bag ensures comfort and toasty warmth without adding extra weight. An extended range of sizes delivers your best fit for better sleep.',
			1, 7.3, 429, false, 'admin', false, 1),
			('Silk Mummy Liner', 'Sleep', 'Use the COCOON Silk mummy liner on its own in warm climates or put it inside your sleeping bag to add some extra warmth on chilly winter nights.',
            0, 4.7, 89.95, false, 'admin', false, 1),
            ('Z Lite SOL Sleeping Pad', 'Sleep', 'Lightest, most compact closed-cell foam pad with boosted warmth.',
            0, 14, 49.95, false, 'admin', false, 1),
            ('La Sportiva Wildcat Trail-Running Shoes - Men', 'Footwear', 'For neutral runners wanting superb cushioning on their trail runs, look no further than the La Sportiva Wildcat trail-running shoes.',
            1, 9, 145, false, 'admin', false, 1),
            ('MERIWOOL Mens Base Layer Thermal Shirt', 'Clothing', 'SUPER SOFT & BREATHABLE: 17.5micron rib knit construction is comfortable on your skin while raglan sleeves give you greater freedom of movement for an active lifestyle.',
            0, 12, 44.99, false, 'admin', false, 1),
            ('Patagonia R1 Pullover', 'Clothing', 'The Patagonia R1 pullover maintains a similar focus, with a technical fit that can be worn over base layers or as a standalone top.',
            0, 11.7, 68.83, false, 'admin', false, 1),
            ('Patagonia Nano Puff Insulated Jacket', 'Clothing', 'The resilient insulation brings the heat and leaves the heft and bulk behind, keeping our load light, while the tough treated exterior blocks winds and sheds flakes.',
            0, 12.8, 239, false, 'admin', false, 1),
            ('Mont-bell Versalite Rain Jacket', 'Clothing', 'A masterpiece of lightweight design, the Versalite Jacket keeps weight to a minimum and offers extreme packability to ultralight backpackers and hikers.',
            0, 6.4, 260, false, 'admin', false, 1),
            ('Darn Tough COOLMAX Hiker Crew Socks', 'Footwear', 'The ultimate companion for hot summer hikes, these socks are engineered to move moisture away from your skin, dry quickly and enhance comfort.',
            0, 2, 25, false, 'admin', false, 1),
            ('Smartwool Classic Mountaineer Socks', 'Footwear', 'Made to keep your feet comfortable over long, cold distances, the Smartwool Classic Mountaineer Maximum Cushion Crew socks are made with thick, warm wool and feature full, plush cushioning.',
            0, 2, 27, false, 'admin', false, 1),
            ('REI Co-op Lightweight Base Layer Bottoms', 'Clothing', 'A synthetic base layer for moderate temps, the REI Co-op Lightweight base layer bottoms keep you dry and comfortable whether venturing into the mountains or trekking across open desert.',
            0, 5.7, 39.95, false, 'admin', false, 1),
            ('NORTHYARD Athletic Running Shorts', 'Clothing', 'These hiking Shorts are made quality 4-Way Stretch/breathable and quick-drying fabric helps to wick away moisture and dry quickly keep you cool.',
            0, 4.5, 24.99, false, 'admin', false, 1),
            ('260 Tech Glove Liner', 'Clothing', 'Liner gloves for cold-weather fun.',
            0, .8, 45, false, 'admin', false, 1),
            ('Thermal Merino Beanie', 'Clothing', 'With a roll cuff for added warmth over the ears, the Smartwool Thermal Merino Reversible Cuffed beanie is ideal for mild- and cold-weather activities alike.',
            0, 1, 35, false, 'admin', false, 1),
            ('Bedrock Sandals', 'Footwear', 'Designed around thick, soft footbeds, the Bedrock Evo C sandals comfort your feet when playing at the lake, working a long shift or heading out on a casual city stroll.',
            1, 3.4, 135, false, 'admin', false, 1),
            ('Compression Stuff Sack', 'Miscellaneous', 'Secure your clothes and essentials inside the Granite Gear Event SIL Compression DrySack.', 
            0, .8, 25.86, false, 'admin', false, 1),
            ('Jetboil Flash Cooking System', 'Cooking and Eating', 'It boils water in 100 seconds, allowing you to conserve fuel and dig in faster.',
            0, 13.1, 97.39, false, 'admin', false, 1),
            ('Snow Peak Titanium Spork', 'Cooking and Eating', 'The ultimate eating utensil for your backpacking adventures—a Snow Peak titanium spork.',
            0, .6, 9.95, false, 'admin', false, 1),
            ('REI Co-op Trekking Poles', 'Miscellaneous', 'Take on rocky traverses, snowy slopes and mossy logs more confidently with the light, strong REI Co-op Traverse trekking poles.', 
            1, 2.5, 119, false, 'admin', false, 1),
            ('Black Diamond- Storm 450 Headlamp', 'Gadgets and Gear', 'Whether we are making a camp meal after dark or we need light to get back to the trailhead from the backcountry, you can trust the Black Diamond Storm 450 Headlamp.',
            0, 2, 32.97, false, 'admin', false, 1),
            ('Steripen UV Water Purifier', 'Water', 'When traveling or backpacking, put your trust in the rechargeable Katadyn Steripen Ultra UV water purifier to be your source for potable water.',
            0, 4.94, 129.95, false, 'admin', false, 1),
            ('Gatorate Bottle', 'Water', 'Nalgene bottles are heavy, bulky, expensive, and largely unnecessary. A disposable water bottle will do.',
            2, 4, 3.99, false, 'admin', false, 1),
            ('Gatorate Bottle', 'Water', 'Nalgene bottles are heavy, bulky, expensive, and largely unnecessary. A disposable water bottle will do.',
            2, 4, 3.99, false, 'admin', false, 1),
            ('Ultralight/Watertight .3 Medical Kit', 'Emergencies', 'Ideal for hiking, kayaking, biking and climbing, the Adventure Medical Kits Ultralight/Watertight .3 medical kit contains first-aid items for solo day trips, and it all comes in a watertight bag.',
            0, 2.6, 10.95, false, 'admin', false, 1),
            ('Toothbrush', 'Hygiene', 'Optionally cut in half to save space',
            0, .5, 1, false, 'admin', false, 1),
            ('Toothpaste', 'Hygiene', 'Conserve.  And pick up along the way.',
            0, .2, 2.99, false, 'admin', false, 1),
            ('Hand Sanitizer', 'Hygiene', 'Nice to have, while backpacking.',
            0, .2, 1.99, false, 'admin', false, 1),
            ('Baby Wipes', 'Hygiene', 'Optional, but nice to have for cleanliness.',
            0, .2, 1.99, false, 'admin', false, 1),
            ('Appalachian Trail Thru-Hiker Companion', 'Orienteering', 'Covering 23 miles at a time, 50 maps, and comprehensive tables for more at-a-glance information on-trail.',
            0, 12, 13.81, false, 'admin', false, 1),
            ('Rite in the Rain Journal', 'Misc', 'Made to hold up to your most rugged adventures, the Rite in the Rain 3 x 5 Weatherproof Top Spiral notebook fits perfectly in your pack or pocket, for use on the road or in the backcountry.',
            0, 1.9, 4.95, false, 'admin', false, 1),
            ('Portable Phone Charger', 'Gadgets and Gear', 'Triple USB Charging & PD Fast Recharge -- The Dual USB ports (2.1A+1A) to charge your two devices simultaneously, Fully recharges itself in 8~12 hours with 2.1A input charger, or 12-24 hours with 1A charge.',
            0, 2, 25.95, false, 'admin', false,1),
            ('The DirtSaw Deuce Trowel', 'Hygiene', 'This trowel has an updated design that makes it faster and easier to create the perfect hole in rocky, rooty ground.',
            0, .9, 23.95, false, 'admin', false, 1);

INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, private_value, owner_username, need_to_purchase, backpack_id)
	VALUES ('Hennesy Hammock', 'Shelter', 'This is a mix of a tent and a hammock.  Lightweight and mixes it up!', 1, .5, 169.95, false, 'user', false, 2),
			('40 Degree Marmot Sleeping Bag', 'Sleeping', 'This is an old, but good sleeping bag I own', 2, 10, 148.51, false, 'user', true, 2),
            ('Therma-a-Rest Sleeping Pad', 'Sleeping', 'Great for a more comfortable night sleep!', 2, 7, 120, false, 'user', true, 2),
            ('Deuter Backpack', 'Backpack', 'A great backpack I own, comfortable and durable.', 1, 9, 200, false, 'user', false, 2),
            ('Sandals', 'Footwear', 'Great for comfort at the campsite!', 1, 10, 39.99, false, 'user', false, 2),
            ('Toothbrush', 'Hygiene', 'Optionally cut in half to save space!', 0, .5, 7.96, false, 'user', false, 2),
            ('Toothpaste', 'Hygiene', 'Freshen up!', 0, .2, 1.97, false, 'user', false, 2),
            ('Hand Sanitizer', 'Hygiene', 'Nice to have, while backpacking.', 0, 1, 5.43, false, 'user', true, 2),
            ('Baby Wipes', 'Hygiene', 'Optional, but nice to have for cleanliness.', 0, .2, 8.24, false, 'user', true, 2),
            ('Smart Phone', 'Gadgets and Gear', 'Great for listening to music or potentially contacting people, especially in emergencies.', 0, 13, 215, false, 'user', false, 2),
            ('Portable Phone Charger', 'Gadgets and Gear', 'Great and useful item to have on the trail.', 0, 2, 19.98, false, 'user', true, 2),
            ('Rain Jacket', 'Clothing', 'Important, crucial item to have!', 0, 15, 43.99, false, 'user', false, 2),
            ('Nalgene 1 Quart Water Bottle', 'Water', 'Crucial for staying hydrated!', 2, 4, 16.78, false, 'user', false, 2),
            ('Nalgene 1 Quart Water Bottle', 'Water', 'Crucial for staying hydrated!', 2, 4, 16.78, false, 'user', false, 2),
			('Steripen UV Water Purifier', 'Water', 'When backpacking, the rechargeable Katadyn Steripen Ultra UV water purifier is a great source for potable water.',
                 0, 4.94, 129.95, false, 'user', true, 2),
			('Platypus Platy 2L Reservoir', 'Water', 'Great item to have for storing water!', 0, 7, 44.99, false, 'user', true, 2),
            ('Jetboil Stove', 'Cooking and Eating', 'Great stove!  Boils water quickly!', 1, 15, 108.96, false, 'user', false, 2),
            ('Headlamp', 'Gadgets and Gear', 'Incredibly useful!', 0, 2, 20, false, 'user', false, 2),
            ('Trowel', 'Hygiene', 'Important for digging a hole, to drop a deuce in the woods!', 0, 7, 15.99, false, 'user', false, 2),
            ('Toilet Paper', 'Hygiene', 'Use leaves instead?  No thankyou!', 0, 6, 3.99, false, 'user', false, 2),
            ('Waterproof Small Journal', 'Miscellaneous', 'Great for journaling, taking notes and writing down my thoughts.', 0, 5, 7.99, false, 'user', true, 2),
            ('Wallet', 'Miscellaneous', 'Important to keep valuables with me.', 0, 1, 9.99, false, 'user', false, 2),
            ('Spyder Knife', 'Gadgets and Gear', 'Very useful!', 0, 3, 60, false, 'user', false, 2),
            ('Board Shorts', 'Clothing', 'Great for going for a dip in pond and relaxing!', 0, 2, 44.94, false, 'user', false, 2),
            ('Hiking Socks', 'Clothing', 'Valuable item to help prevent blisters', 0, 1, 25.95, false, 'user', true, 2),
            ('Saucony Trail Shoes', 'Footwear', 'Wonderful, lightweight item to bring along.  A great help to keep my feet comfortable.', 0, 15, 59.98, false, 'user', true, 2),
            ('Underwear', 'Clothing', 'Tight-fitting to help prevent chaffing.  Comfort is a must!', 0, 2, 19.98, false, 'user', false, 2),
            ('Spork', 'Cooking and Eating', 'Remember this helpful utensil...', 0, .7, 8.49, false, 'user', false, 2),
            ('Stuff Sack', 'Miscellaneous', 'Useful for hanging smellables in a bear bag', 0, 4.5, 7.88, false, 'user', false, 2), 
            ('Ultralight/Watertight .3 Medical Kit', 'Emergencies', 'Ideal for backpacking', 0, 2.6, 10.95, false, 'user', true, 2);
            
INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, private_value, owner_username, need_to_purchase, backpack_id)
	VALUES ('Eureka 2 Person Tent', 'Shelter', 'This is a decent tent.  Lightweight and durable!', 3, 5, 118.98, true, 'user', true, 3),
			('35 Degree Marmot Sleeping Bag', 'Sleeping', 'This is good sleeping bag!', 2, 10, 138, true, 'user', true, 3),
            ('Therma-a-Rest Sleeping Pad', 'Sleeping', 'Great for a more comfortable night sleep!', 2, 7, 120, true, 'user', true, 3),
            ('Arc Teryx Alpha Backpack', 'Backpack', 'A wonderful backpack!  Comfortable and durable.', 1, 11, 250, true, 'user', true, 3),
            ('Sandals', 'Footwear', 'Great for comfort at the campsite!', 1, 10, 23.45, true, 'user', true, 3),
            ('Toothbrush', 'Hygiene', 'Cut in half to save space and weight!', 0, .5, 7.96, true, 'user', false, 3),
            ('Toothpaste', 'Hygiene', 'Freshen up!', 0, .2, 1.97, true, 'user', false, 3),
            ('Hand Sanitizer', 'Hygiene', 'Nice to have', 0, .2, 5.43, true, 'user', false, 3),
            ('Combat Wipes', 'Hygiene', 'Optional, but nice to have for cleanliness.', 0, .2, 8.89, true, 'user', true, 3),
            ('Kugnala Rain Jacket', 'Clothing', 'Crucial item to have!', 0, 15, 32.99, true, 'user', true, 3),
            ('Nalgene 1 Quart Water Bottle', 'Water', 'Crucial for staying hydrated!', 2, 4, 16.78, true, 'user', true, 3),
            ('Nalgene 1 Quart Water Bottle', 'Water', 'Crucial for staying hydrated!', 2, 4, 16.78, true, 'user', true, 3),
			('Steripen UV Water Purifier', 'Water', 'When backpacking, the rechargeable Katadyn Steripen Ultra UV water purifier is a great source for potable water.',
                 0, 4.94, 129.95, true, 'user', true, 3),
			('Platypus Platy 2L Reservoir', 'Water', 'Great item to have for storing water!', 0, 7, 44.99, true, 'user', true, 3),
            ('Jetboil Stove', 'Cooking and Eating', 'Great stove!  Boils water quickly!', 1, 15, 110, true, 'user', true, 3),
            ('Headlamp', 'Gadgets and Gear', 'Incredibly useful!', 0, 2, 25, true, 'user', true, 3),
            ('Trowel', 'Hygiene', 'Important for digging a hole, to drop a deuce in the woods!', 0, 7, 2.99, true, 'user', true, 3),
            ('Toilet Paper', 'Hygiene', 'Use leaves instead?  No thankyou!', 0, 6, 3.99, true, 'user', true, 3),
            ('Small Journal', 'Miscellaneous', 'Great for journaling, taking notes and writing down my thoughts.', 0, 5, 9.95, true, 'user', false, 3),
            ('Wallet', 'Miscellaneous', 'Important to keep valuable with me.', 0, 1, 21.95, true, 'user', false, 3),
            ('Spyder Knife', 'Gadgets and Gear', 'Very useful!', 0, 3, 59.95, true, 'user', false, 3),
            ('Board Shorts', 'Clothing', 'Comfortable and great for going for a dip in the water and relaxing!', 0, 2, 49.95, true, 'user', false, 3),
            ('Hiking Socks', 'Clothing', 'Valuable item to help prevent blisters', 0, 1, 19.95, true, 'user', true, 3),
            ('Merrel Trail Shoes', 'Footwear', 'Wonderful, lightweight item to bring along.  A great help to keep my feet comfortable.', 0, 15, 84, true, 'user', true, 3),
            ('Underwear', 'Clothing', 'Tight-fitting to help prevent chaffing.  Comfort is a must!', 0, 2, 19.95, true, 'user', false, 3),
            ('Spork', 'Cooking and Eating', 'Remember this helpful utensil...', 0, .7, 8, true, 'user', false, 3),
            ('Stuff Sack', 'Miscellaneous', 'Useful for hanging smellables in a bear bag', 0, 4.5, 7.88, true, 'user', true, 3), 
            ('Ultralight/Watertight .3 Medical Kit', 'Emergencies', 'Ideal for backpacking', 0, 2.6, 10.95, true, 'user', true, 3);
		