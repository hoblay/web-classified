select person.*, publication.*
from person
left join person_publication on person_publication.person_id = person.id
left join publication on person_publication.publication_id = publication.id;

SELECT products.id, products.name, categories.id, categories.name FROM products LEFT JOIN product_category ON products.id = product_category.product_id LEFT JOIN categories ON product_category.categories_id = categories.id
        

SELECT products.id, 
    products.name, 
    categories.id, 
    categories.name
FROM products
    LEFT JOIN product_category
        ON products.id = product_category.product_id products.id
    LEFT JOIN categories
        ON product_category.categories_id = categories.id


        