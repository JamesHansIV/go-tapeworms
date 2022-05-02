-- use tapeworms db
-- tapeworms;
-- creates the orders table
CREATE TABLE IF NOT EXISTS orders (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(75) NOT NULL UNIQUE,    
    min_length int DEFAULT NULL,-- length in mm
    max_length int DEFAULT NULL, -- length in mm
    min_testes int DEFAULT NULL,
    max_testes int DEFAULT NULL,
    num_bothria int DEFAULT NULL,  -- scolex
    num_bothridia int DEFAULT NULL,
    num_suckers int DEFAULT NULL,
    parasite_of varchar(40) NOT NULL, -- what this tapeworm is a parasite of
    apical_organ_color varchar(30) DEFAULT NULL -- color of apical organ
);

-- create apical organ table

-- create scolex table

-- create demo tapeworms
insert ignore into orders (name,min_length,max_length,min_testes,max_testes,num_bothria,num_bothridia,num_suckers,parasite_of,apical_organ_color)
values  ('Diphyllidea',NULL,2,5,10,2,NULL,NULL,'stingrays',NULL),
        ('Seussapex',5,NULL,9,20,NULL,NULL,4,'stingrays','orange'),
        ('New Genus',NULL,2,6,6,0,0,4,'eagle rays','purple'),
        ('Onchoproteocephalidea',10,NULL,50,65,0,4,0,'sharks',NULL)
on DUPLICATE KEY UPDATE name = Values(name);