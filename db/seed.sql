-- Owner MJ

-- USERS
INSERT INTO users (firstname, lastname, postcode, email, username, password, createdAt, updatedAt) VALUES ('Simon', 'Gruber', '6002', 'Simon.Gruber@gmx.com', 'Simon123', 'Simon1234', now(), now());
INSERT INTO users (firstname, lastname, postcode, email, username, password, createdAt, updatedAt) VALUES ('Bob', 'Thebuilder', '6008', 'Bob@gmx.com', 'Bob123', 'Bob1234', now(), now());
INSERT INTO users (firstname, lastname, postcode, email, username, password, createdAt, updatedAt) VALUES ('John', 'McLaine', '6245', 'John@gmx.com', 'John123', 'John1234', now(), now());
INSERT INTO users (firstname, lastname, postcode, email, username, password, createdAt, updatedAt) VALUES ('Frank', 'Drabbin', '6001', 'Frank@gmx.com', 'Frank123', 'Frank1234', now(), now());
INSERT INTO users (firstname, lastname, postcode, email, username, password, createdAt, updatedAt) VALUES ('John', 'Rambo', '6025', 'John.Rambo@gmx.com', 'JohnR123', 'JohnR1234', now(), now());
INSERT INTO users (firstname, lastname, postcode, email, username, password, createdAt, updatedAt) VALUES ('Evelyn', 'Salt', '6100', 'Evelyn@gmx.com', 'Evelyn123', 'Evelyn1234', now(), now());
INSERT INTO users (firstname, lastname, postcode, email, username, password, createdAt, updatedAt) VALUES ('James', 'Belushi', '6024', 'Belushi@gmx.com', 'Belushi123', 'Belushi1234', now(), now());
INSERT INTO users (firstname, lastname, postcode, email, username, password, createdAt, updatedAt) VALUES ('Edard', 'Stark', '6325', 'Edard@gmx.com', 'Edard123', 'Edard1234', now(), now());
INSERT INTO users (firstname, lastname, postcode, email, username, password, createdAt, updatedAt) VALUES ('Harry', 'Potter', '6354', 'Harry@gmx.com', 'Harry123', 'Harry1234', now(), now());
INSERT INTO users (firstname, lastname, postcode, email, username, password, createdAt, updatedAt) VALUES ('Ron', 'Wesley', '6087', 'Ron@gmx.com', 'Ron123', 'Ron1234', now(), now());
-- dogs
INSERT INTO dogs (breed, dogName, age, sex, desexed, allergies, childfriendly, usertext, dogImage, userId, createdAt, updatedAt) VALUES ('Bulldog', 'Bobby', '4', 'male', '1', 'grass' , '1', 'Very calm dog', 'placeholder', '1', now(), now());
INSERT INTO dogs (breed, dogName, age, sex, desexed, allergies, childfriendly, usertext, dogImage, userId, createdAt, updatedAt) VALUES ('Chihuahua', 'Rosie', '8', 'female', '0', 'broccoli' , '1', 'Always excited', 'placeholder', '2', now(), now());
INSERT INTO dogs (breed, dogName, age, sex, desexed, allergies, childfriendly, usertext, dogImage, userId, createdAt, updatedAt) VALUES ('French Bulldog', 'Martha', '5', 'female', '1', 'none' , '1', 'Good with kids', 'placeholder', '3', now(), now());
INSERT INTO dogs (breed, dogName, age, sex, desexed, allergies, childfriendly, usertext, dogImage, userId, createdAt, updatedAt) VALUES ('Rottweiler', 'Oscar', '6', 'male', '0', 'onion' , '0', 'Not good with kids', 'placeholder', '4', now(), now());
INSERT INTO dogs (breed, dogName, age, sex, desexed, allergies, childfriendly, usertext, dogImage, userId, createdAt, updatedAt) VALUES ('Pomeranian', 'Speedy', '2', 'male', '1', 'none' , '1', 'Happy dog', 'placeholder', '5', now(), now());
INSERT INTO dogs (breed, dogName, age, sex, desexed, allergies, childfriendly, usertext, dogImage, userId, createdAt, updatedAt) VALUES ('Doberman', 'Lexi', '10', 'female', '1', 'pepper' , '1', 'not good with big dogs', 'placeholder', '6', now(), now());
INSERT INTO dogs (breed, dogName, age, sex, desexed, allergies, childfriendly, usertext, dogImage, userId, createdAt, updatedAt) VALUES ('Maltese dog', 'Dobby', '12', 'male', '0', 'grass' , '1', 'no other males please', 'placeholder', '7', now(), now());
INSERT INTO dogs (breed, dogName, age, sex, desexed, allergies, childfriendly, usertext, dogImage, userId, createdAt, updatedAt) VALUES ('Basset Hound', 'Goldie', '4', 'female', '1', 'none' , '1', 'calm dog', 'placeholder', '8', now(), now());
INSERT INTO dogs (breed, dogName, age, sex, desexed, allergies, childfriendly, usertext, dogImage, userId, createdAt, updatedAt) VALUES ('Bull Terrier', 'Bibi', '8', 'female', '0', 'grass' , '1', 'does not like water', 'placeholder', '9', now(), now());
INSERT INTO dogs (breed, dogName, age, sex, desexed, allergies, childfriendly, usertext, dogImage, userId, createdAt, updatedAt) VALUES ('Basenji', 'Oscar', '3', 'male', '1', 'sweets' , '1', 'humps everything', 'placeholder', '10', now(), now());

-- create 10 matches
                                                                                                                                         
-- dailyMatchCounters
INSERT INTO dailyMatchCounters (numMatches, userId, createdAt, updatedAt) VALUES ('3', '1', now(), now());
INSERT INTO dailyMatchCounters (numMatches, userId, createdAt, updatedAt) VALUES ('1', '2', now(), now());
INSERT INTO dailyMatchCounters (numMatches, userId, createdAt, updatedAt) VALUES ('3', '3', now(), now());
INSERT INTO dailyMatchCounters (numMatches, userId, createdAt, updatedAt) VALUES ('2', '4', now(), now());
INSERT INTO dailyMatchCounters (numMatches, userId, createdAt, updatedAt) VALUES ('3', '5', now(), now());
INSERT INTO dailyMatchCounters (numMatches, userId, createdAt, updatedAt) VALUES ('2', '6', now(), now());
INSERT INTO dailyMatchCounters (numMatches, userId, createdAt, updatedAt) VALUES ('3', '6', now(), now());
INSERT INTO dailyMatchCounters (numMatches, userId, createdAt, updatedAt) VALUES ('3', '7', now(), now());
INSERT INTO dailyMatchCounters (numMatches, userId, createdAt, updatedAt) VALUES ('1', '8', now(), now());
INSERT INTO dailyMatchCounters (numMatches, userId, createdAt, updatedAt) VALUES ('3', '9', now(), now());
INSERT INTO dailyMatchCounters (numMatches, userId, createdAt, updatedAt) VALUES ('2', '10', now(), now());