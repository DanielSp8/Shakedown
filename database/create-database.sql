create database if not exists test_db;

create database if not exists flexpath_final;
use flexpath_final;

drop table if exists users, roles, main_trail_info, gear_lists;

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

CREATE TABLE main_trail_info (
	trail_id INT AUTO_INCREMENT PRIMARY KEY,
    trail_name VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    difficulty VARCHAR(10),
    total_miles DECIMAL(6,2),
    food_pickups BOOLEAN,
    username VARCHAR(255) NOT NULL,
    
    FOREIGN KEY (username) REFERENCES users(username)
		ON DELETE CASCADE
);

CREATE TABLE gear_lists (
	item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    weight_lbs INT NOT NULL DEFAULT 0,
    weight_oz DECIMAL(4,2) NOT NULL DEFAULT 0,
    price DECIMAL(8,2) NOT NULL DEFAULT 0,
    trail_id INT,
	username VARCHAR(255) NOT NULL,

	FOREIGN KEY (trail_id) REFERENCES main_trail_info(trail_id)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
        
	FOREIGN KEY (username) REFERENCES users(username)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO main_trail_info (trail_id, trail_name, description, location, difficulty, total_miles, food_pickups, username)
	VALUES (1, 'Appalachian Trail', 'A long, adventurous thru-hike, spanning beautiful views and places!', 'Georgia to Maine', 'hard', 2194, true, 'admin');
    
INSERT INTO main_trail_info (trail_id, trail_name, description, location, difficulty, total_miles, food_pickups, username)
	VALUES (2, 'Hidden Pond', 'A secluded and precious place', 'Ocala, Florida', 'easy', 3.5, false, 'user');

INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, trail_id, username)
	VALUES ('Fly Creek 2 Person 3 Season Tent', 'Shelter', 'The Fly Creek HV UL Solution Dye Two-Person Tent still maintains the ultralight weight that minimalist backpackers look for, but Big Agnes redesigned it with a higher volume to give a comfier sleeping space.', 
			1, 15, 279.96, 1, 'admin'),
			('Mariposa 60 Backpack', 'Backpack', 'Named for the butterflies that can travel 100 miles a day. This world-famous pack weighs a little and hauls a lot.', 
			2, 3.7, 315, 1, 'admin'),
			('Magma 15 Sleeping Bag', 'Sleep System', 'The updated REI Co-op Magma 15 sleeping bag ensures comfort and toasty warmth without adding extra weight. An extended range of sizes delivers your best fit for better sleep.',
			1, 7.3, 429, 1, 'admin'),
			('Silk Mummy Liner', 'Sleep System', 'Use the COCOON Silk mummy liner on its own in warm climates or put it inside your sleeping bag to add some extra warmth on chilly winter nights.',
            0, 4.7, 89.95, 1, 'admin'),
            ('Z Lite SOL Sleeping Pad', 'Sleep System', 'Lightest, most compact closed-cell foam pad with boosted warmth.',
            0, 14, 49.95, 1, 'admin'),
            ('La Sportiva Wildcat Trail-Running Shoes - Men', 'Footwear', 'For neutral runners wanting superb cushioning on their trail runs, look no further than the La Sportiva Wildcat trail-running shoes.',
            1, 9, 145, 1, 'admin'),
            ('MERIWOOL Mens Base Layer Thermal Shirt', 'Clothing', 'SUPER SOFT & BREATHABLE: 17.5micron rib knit construction is comfortable on your skin while raglan sleeves give you greater freedom of movement for an active lifestyle.',
            0, 12, 44.99, 1, 'admin'),
            ('Patagonia R1 Pullover', 'Clothing', 'The Patagonia R1 pullover maintains a similar focus, with a technical fit that can be worn over base layers or as a standalone top.',
            0, 11.7, 68.83, 1, 'admin'),
            ('Patagonia Nano Puff Insulated Jacket', 'Clothing', 'The resilient insulation brings the heat and leaves the heft and bulk behind, keeping our load light, while the tough treated exterior blocks winds and sheds flakes.',
            0, 12.8, 239, 1, 'admin'),
            ('Mont-bell Versalite Rain Jacket', 'Clothing', 'A masterpiece of lightweight design, the Versalite Jacket keeps weight to a minimum and offers extreme packability to ultralight backpackers and hikers.',
            0, 6.4, 260, 1, 'admin'),
            ('Darn Tough COOLMAX Hiker Crew Socks', 'Footwear', 'The ultimate companion for hot summer hikes, these socks are engineered to move moisture away from your skin, dry quickly and enhance comfort.',
            0, 2, 25, 1, 'admin'),
            ('Smartwool Classic Mountaineer Socks', 'Footwear', 'Made to keep your feet comfortable over long, cold distances, the Smartwool Classic Mountaineer Maximum Cushion Crew socks are made with thick, warm wool and feature full, plush cushioning.',
            0, 2, 27, 1, 'admin'),
            ('REI Co-op Lightweight Base Layer Bottoms', 'Clothing', 'A synthetic base layer for moderate temps, the REI Co-op Lightweight base layer bottoms keep you dry and comfortable whether venturing into the mountains or trekking across open desert.',
            0, 5.7, 39.95, 1, 'admin'),
            ('NORTHYARD Athletic Running Shorts', 'Clothing', 'These hiking Shorts are made quality 4-Way Stretch/breathable and quick-drying fabric helps to wick away moisture and dry quickly keep you cool.',
            0, 4.5, 24.99, 1, 'admin'),
            ('260 Tech Glove Liner', 'Clothing', 'Liner gloves for cold-weather fun.',
            0, .8, 45, 1, 'admin'),
            ('Thermal Merino Beanie', 'Clothing', 'With a roll cuff for added warmth over the ears, the Smartwool Thermal Merino Reversible Cuffed beanie is ideal for mild- and cold-weather activities alike.',
            0, 1, 35, 1, 'admin'),
            ('Bedrock Sandals', 'Footwear', 'Designed around thick, soft footbeds, the Bedrock Evo C sandals comfort your feet when playing at the lake, working a long shift or heading out on a casual city stroll.',
            1, 3.4, 135, 1, 'admin'),
            ('Compression Stuff Sack', 'Misc', 'Secure your clothes and essentials inside the Granite Gear Event SIL Compression DrySack.', 
            0, .8, 25.86, 1, 'admin'),
            ('Jetboil Flash Cooking System', 'Cooking and Eating', 'It boils water in 100 seconds, allowing you to conserve fuel and dig in faster.',
            0, 13.1, 97.39, 1, 'admin'),
            ('Snow Peak Titanium Spork', 'Cooking and Eating', 'The ultimate eating utensil for your backpacking adventures—a Snow Peak titanium spork.',
            0, .6, 9.95, 1, 'admin'),
            ('REI Co-op Trekking Poles', 'Misc', 'Take on rocky traverses, snowy slopes and mossy logs more confidently with the light, strong REI Co-op Traverse trekking poles.', 
            1, 2.5, 119, 1, 'admin'),
            ('Black Diamond- Storm 450 Headlamp', 'Gadgets and Gear', 'Whether we are making a camp meal after dark or we need light to get back to the trailhead from the backcountry, you can trust the Black Diamond Storm 450 Headlamp.',
            0, 2, 32.97, 1, 'admin'),
            ('Steripen UV Water Purifier', 'Water', 'When traveling or backpacking, put your trust in the rechargeable Katadyn Steripen Ultra UV water purifier to be your source for potable water.',
            0, 4.94, 129.95, 1, 'admin'),
            ('Gatorate Bottle', 'Water', 'Nalgene bottles are heavy, bulky, expensive, and largely unnecessary. A disposable water bottle will do.',
            2, 4, 0, 1, 'admin'),
            ('Gatorate Bottle', 'Water', 'Nalgene bottles are heavy, bulky, expensive, and largely unnecessary. A disposable water bottle will do.',
            2, 4, 0, 1, 'admin'),
            ('Ultralight/Watertight .3 Medical Kit', 'Emergencies', 'Ideal for hiking, kayaking, biking and climbing, the Adventure Medical Kits Ultralight/Watertight .3 medical kit contains first-aid items for solo day trips, and it all comes in a watertight bag.',
            0, 2.6, 10.95, 1, 'admin'),
            ('Toothbrush', 'Hygiene', 'Optionally cut in half to save space',
            0, .5, 1, 1, 'admin'),
            ('Toothpaste', 'Hygiene', 'Conserve.  And pick up along the way.',
            0, .2, 2.99, 1, 'admin'),
            ('Hand Sanitizer', 'Hygiene', 'Nice to have, while backpacking.',
            0, .2, 1.99, 1, 'admin'),
            ('Baby Wipes', 'Hygiene', 'Optional, but nice to have for cleanliness.',
            0, .2, 1.99, 1, 'admin'),
            ('Appalachoanm Trail Thru-Hiker Companion', 'Orienteering', 'Covering 23 miles at a time, 50 maps, and comprehensive tables for more at-a-glance information on-trail.',
            0, 12, 13.81, 1, 'admin'),
            ('Rite in the Rain Journal', 'Misc', 'Made to hold up to your most rugged adventures, the Rite in the Rain 3 x 5 Weatherproof Top Spiral notebook fits perfectly in your pack or pocket, for use on the road or in the backcountry.',
            0, 1.9, 4.95, 1, 'admin'),
            ('Portable Phone Charger', 'Gadgets and Gear', 'Triple USB Charging & PD Fast Recharge -- The Dual USB ports (2.1A+1A) to charge your two devices simultaneously, Fully recharges itself in 8~12 hours with 2.1A input charger, or 12-24 hours with 1A charge.',
            0, 2, 25.95, 1, 'admin'),
            ('The DirtSaw Deuce Trowel', 'Hygiene', 'This trowel has an updated design that makes it faster and easier to create the perfect hole in rocky, rooty ground.',
            0, .9, 23.95, 1, 'admin');
            
INSERT INTO gear_lists (item_name, category, description, weight_lbs, weight_oz, price, trail_id, username)
	VALUES ('Hennesy Hammock', 'Shelter', 'This is a mix of a tent and hammock.  Lightweight and mixes it up a bit!', 1, .5, 0, 2, 'user');
            