-- Dimension tables
CREATE TABLE dim_customer (
    customer_id UUID PRIMARY KEY,
    full_name VARCHAR(255),
    phone VARCHAR(32),
    email VARCHAR(255)
);

CREATE TABLE dim_vehicle (
    vehicle_id UUID PRIMARY KEY,
    vin VARCHAR(64),
    license_plate VARCHAR(32),
    brand VARCHAR(64),
    model VARCHAR(64),
    year INT
);

CREATE TABLE dim_product (
    product_id UUID PRIMARY KEY,
    name VARCHAR(255),
    sku VARCHAR(64),
    price NUMERIC(12,2)
);

CREATE TABLE dim_time (
    time_id SERIAL PRIMARY KEY,
    date DATE,
    year INT,
    month INT,
    day INT,
    week INT
);

CREATE TABLE dim_location (
    location_id UUID PRIMARY KEY,
    name VARCHAR(255),
    address TEXT
);

-- Fact tables
CREATE TABLE fact_orders (
    order_id UUID PRIMARY KEY,
    customer_id UUID REFERENCES dim_customer(customer_id),
    product_id UUID REFERENCES dim_product(product_id),
    time_id INT REFERENCES dim_time(time_id),
    location_id UUID REFERENCES dim_location(location_id),
    quantity INT,
    total_price NUMERIC(12,2)
);

CREATE TABLE fact_repair (
    repair_order_id UUID PRIMARY KEY,
    customer_id UUID REFERENCES dim_customer(customer_id),
    vehicle_id UUID REFERENCES dim_vehicle(vehicle_id),
    time_id INT REFERENCES dim_time(time_id),
    location_id UUID REFERENCES dim_location(location_id),
    status VARCHAR(32),
    total_price NUMERIC(12,2),
    discount NUMERIC(12,2)
);
