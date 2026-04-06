CREATE DATABASE IF NOT EXISTS cakewala;
USE cakewala;

CREATE TABLE IF NOT EXISTS cakes (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)  NOT NULL,
    description TEXT          NOT NULL,
    price       INT           NOT NULL,
    tag         VARCHAR(100)  DEFAULT '',
    category    VARCHAR(100)  NOT NULL,
    image_url   VARCHAR(500)  DEFAULT '',
    available   TINYINT(1)    DEFAULT 1,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL UNIQUE,
    phone      VARCHAR(20)  DEFAULT '',
    password   VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    order_ref      VARCHAR(20)   NOT NULL UNIQUE,
    customer_name  VARCHAR(255)  NOT NULL,
    customer_email VARCHAR(255)  DEFAULT '',
    contact        VARCHAR(20)   NOT NULL,
    address        TEXT          NOT NULL,
    city           VARCHAR(100)  DEFAULT '',
    pincode        VARCHAR(10)   DEFAULT '',
    cake_id        INT           DEFAULT NULL,
    cake_name      VARCHAR(255)  NOT NULL,
    quantity       INT           DEFAULT 1,
    total_price    INT           NOT NULL,
    payment_method ENUM('Cash','UPI','Card') DEFAULT 'Cash',
    status         ENUM('Pending','Out for Delivery', 'Done','Cancelled') DEFAULT 'Pending',
    user_id        INT           DEFAULT NULL,
    created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cake_id) REFERENCES cakes(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO cakes (name, description, price, tag, category) VALUES
('Chocolate Truffle Cake',    'Rich layers of dark chocolate with silky ganache frosting.',                   649, 'Bestseller', 'Chocolate'),
('Strawberry Garden Cake',    'Fresh strawberries folded into vanilla sponge with cream rosettes.',           549, 'Seasonal',   'Fruit'),
('Lemon Drizzle Bliss',       'Zingy lemon sponge with a tangy glaze and candied peel.',                     499, 'New',        'Citrus'),
('Classic Red Velvet',        'Iconic cream cheese frosting on a velvety cocoa base.',                       599, 'Classic',    'Vanilla'),
('Mango Coconut Layer',       'Tropical mango curd nestled between coconut cream layers.',                   679, 'Seasonal',   'Fruit'),
('Salted Caramel Crunch',     'Buttery caramel drizzle with a crunchy praline crown.',                       729, 'Signature',  'Chocolate'),
('Blueberry Cheesecake',      'Thick New York style base with a blueberry compote topping.',                 599, 'Popular',    'Vanilla'),
('Rose & Pistachio',          'Persian-inspired rose water sponge with pistachio crumble.',                  749, 'Artisan',    'Custom'),
('Butterscotch Delight',      'Soft butterscotch sponge layered with whipped cream and praline.',            529, 'Popular',    'Vanilla'),
('Dark Forest Cake',          'Classic Black Forest with dark cherries and whipped cream.',                  619, 'Classic',    'Chocolate'),
('Tiramisu Cake',             'Espresso-soaked layers with mascarpone cream and cocoa dusting.',             699, 'Premium',    'Vanilla'),
('Pineapple Upside-Down',     'Caramelised pineapple rings atop a moist buttery sponge.',                   479, 'Classic',    'Fruit'),
('Funfetti Celebration Cake', 'Vanilla confetti sponge packed with rainbow sprinkles inside and out.',       549, 'Fun',        'Vanilla'),
('Hazelnut Praline Cake',     'Nutella-style layers with crunchy hazelnut feuilletine crumble.',             769, 'Signature',  'Chocolate'),
('Passion Fruit Tart Cake',   'Bright passion fruit curd between almond frangipane layers.',                 649, 'Artisan',    'Citrus'),
('Matcha White Chocolate',    'Japanese matcha sponge with creamy white chocolate ganache swirls.',          719, 'New',        'Custom'),
('Gulab Jamun Cake',          'Desi fusion: cardamom sponge soaked in rose syrup with jamun filling.',       589, 'Fusion',     'Custom'),
('Tres Leches',               'Ultra-moist milk-soaked cake with fresh cream and cinnamon.',                 559, 'Popular',    'Vanilla'),
('Coconut Lime Zest Cake',    'Toasted coconut layers with a sharp lime buttercream zing.',                  579, 'Seasonal',   'Citrus'),
('KitKat Crunch Cake',        'Chocolate mud cake wrapped in KitKat fingers with a Kinder surprise inside.', 799, 'Indulgent',  'Chocolate');
