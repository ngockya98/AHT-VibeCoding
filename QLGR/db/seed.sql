-- Roles
INSERT INTO roles (id, name, description) VALUES
  (uuid_generate_v7(), 'admin', 'Administrator'),
  (uuid_generate_v7(), 'technician', 'Technician'),
  (uuid_generate_v7(), 'manager', 'Manager'),
  (uuid_generate_v7(), 'advisor', 'Service Advisor'),
  (uuid_generate_v7(), 'warehouse', 'Warehouse Staff'),
  (uuid_generate_v7(), 'finance', 'Finance Staff'),
  (uuid_generate_v7(), 'customer', 'Customer');

-- Permissions
INSERT INTO permissions (id, name, description) VALUES
  (uuid_generate_v7(), 'user:create', 'Create user'),
  (uuid_generate_v7(), 'user:read', 'Read user'),
  (uuid_generate_v7(), 'user:update', 'Update user'),
  (uuid_generate_v7(), 'user:delete', 'Delete user'),
  (uuid_generate_v7(), 'garage:manage', 'Manage garage'),
  (uuid_generate_v7(), 'inventory:manage', 'Manage inventory'),
  (uuid_generate_v7(), 'order:create', 'Create order'),
  (uuid_generate_v7(), 'order:read', 'Read order'),
  (uuid_generate_v7(), 'finance:manage', 'Manage finance');

-- Garage
INSERT INTO garages (id, name, address, phone) VALUES
  (uuid_generate_v7(), 'AHT Garage', '123 Main St', '0123456789');

-- Distributor (as warehouse)
INSERT INTO warehouses (id, name, address) VALUES
  (uuid_generate_v7(), 'AHT Distributor', '456 Distributor Ave');

-- Users
INSERT INTO users (id, email, password_hash, full_name, phone) VALUES
  (uuid_generate_v7(), 'admin@example.com', 'admin123', 'Admin User', '0123456789'),
  (uuid_generate_v7(), 'tech@example.com', 'tech123', 'Tech User', '0987654321');

-- Assign roles
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r WHERE u.email='admin@example.com' AND r.name='admin';
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r WHERE u.email='tech@example.com' AND r.name='technician';

-- Products
INSERT INTO products (id, name, sku, description, price) VALUES
  (uuid_generate_v7(), 'Oil Filter', 'OF-001', 'High quality oil filter', 100.00),
  (uuid_generate_v7(), 'Brake Pad', 'BP-002', 'Ceramic brake pad', 200.00),
  (uuid_generate_v7(), 'Spark Plug', 'SP-003', 'Iridium spark plug', 50.00),
  (uuid_generate_v7(), 'Air Filter', 'AF-004', 'Performance air filter', 80.00),
  (uuid_generate_v7(), 'Timing Belt', 'TB-005', 'Durable timing belt', 300.00);

-- Warehouses
INSERT INTO warehouses (id, name, address) VALUES
  (uuid_generate_v7(), 'Main Warehouse', '789 Warehouse Rd');

-- Inventory
INSERT INTO inventory (id, warehouse_id, product_id, quantity)
SELECT uuid_generate_v7(), w.id, p.id, 100
FROM warehouses w, products p WHERE w.name='Main Warehouse';

-- Customer
INSERT INTO customers (id, user_id, garage_id, full_name, phone, email)
SELECT uuid_generate_v7(), u.id, g.id, 'Customer One', '0111222333', 'customer1@example.com'
FROM users u, garages g WHERE u.email='tech@example.com' AND g.name='AHT Garage';

-- Vehicle
INSERT INTO vehicles (id, customer_id, vin, license_plate, brand, model, year)
SELECT uuid_generate_v7(), c.id, 'VIN123456789', '30A-12345', 'Toyota', 'Vios', 2020
FROM customers c WHERE c.full_name='Customer One';

-- Repair Order
INSERT INTO repair_orders (id, garage_id, customer_id, vehicle_id, status, total_price, discount)
SELECT uuid_generate_v7(), g.id, c.id, v.id, 'DRAFT', 500.00, 0.00
FROM garages g, customers c, vehicles v
WHERE g.name='AHT Garage' AND c.full_name='Customer One' AND v.vin='VIN123456789';

-- Invoice
INSERT INTO invoices (id, repair_order_id, customer_id, amount, status)
SELECT uuid_generate_v7(), ro.id, c.id, 500.00, 'PENDING'
FROM repair_orders ro, customers c WHERE ro.status='DRAFT' AND c.full_name='Customer One';
