-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUM types
CREATE TYPE user_role_enum AS ENUM ('admin', 'manager', 'advisor', 'technician', 'warehouse', 'finance', 'customer');
CREATE TYPE ro_status_enum AS ENUM ('DRAFT', 'QUOTED', 'APPROVED', 'IN_PROGRESS', 'QA', 'COMPLETED', 'INVOICED', 'CLOSED');
CREATE TYPE payment_status_enum AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
CREATE TYPE order_status_enum AS ENUM ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- USERS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(32),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ROLES
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    name VARCHAR(64) UNIQUE NOT NULL,
    description TEXT
);

-- PERMISSIONS
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    name VARCHAR(128) UNIQUE NOT NULL,
    description TEXT
);

-- USER_ROLES
CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- ROLE_PERMISSIONS
CREATE TABLE role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- AUTH_TOKENS
CREATE TABLE auth_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(512) NOT NULL,
    type VARCHAR(16) NOT NULL,
    expires_at TIMESTAMPTZ,
    revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- GARAGES
CREATE TABLE garages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(32),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- GARAGE_STAFF
CREATE TABLE garage_staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    garage_id UUID REFERENCES garages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role user_role_enum NOT NULL,
    joined_at TIMESTAMPTZ DEFAULT now()
);

-- CUSTOMERS
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    garage_id UUID REFERENCES garages(id),
    full_name VARCHAR(255),
    phone VARCHAR(32),
    email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- VEHICLES
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    vin VARCHAR(64) UNIQUE,
    license_plate VARCHAR(32),
    brand VARCHAR(64),
    model VARCHAR(64),
    year INT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- APPOINTMENTS
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    garage_id UUID REFERENCES garages(id),
    customer_id UUID REFERENCES customers(id),
    vehicle_id UUID REFERENCES vehicles(id),
    scheduled_at TIMESTAMPTZ NOT NULL,
    status VARCHAR(32) DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- REPAIR_ORDERS
CREATE TABLE repair_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    garage_id UUID REFERENCES garages(id),
    customer_id UUID REFERENCES customers(id),
    vehicle_id UUID REFERENCES vehicles(id),
    appointment_id UUID REFERENCES appointments(id),
    status ro_status_enum DEFAULT 'DRAFT',
    total_price NUMERIC(12,2) DEFAULT 0,
    discount NUMERIC(12,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- TASKS
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    repair_order_id UUID REFERENCES repair_orders(id) ON DELETE CASCADE,
    name VARCHAR(255),
    description TEXT,
    assigned_to UUID REFERENCES users(id),
    status VARCHAR(32) DEFAULT 'PENDING',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- SERVICE_PACKAGES
CREATE TABLE service_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    name VARCHAR(255),
    description TEXT,
    price NUMERIC(12,2),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- PRODUCTS
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(64) UNIQUE,
    description TEXT,
    price NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- PRODUCT_MEDIA
CREATE TABLE product_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    type VARCHAR(32)
);

-- WAREHOUSES
CREATE TABLE warehouses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    name VARCHAR(255),
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- INVENTORY
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    warehouse_id UUID REFERENCES warehouses(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (warehouse_id, product_id)
);

-- ORDERS
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    customer_id UUID REFERENCES customers(id),
    status order_status_enum DEFAULT 'PENDING',
    total_price NUMERIC(12,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ORDER_ITEMS
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INT DEFAULT 1,
    price NUMERIC(12,2) NOT NULL
);

-- PRICE_RULES
CREATE TABLE price_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    name VARCHAR(255),
    description TEXT,
    discount_percent NUMERIC(5,2),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- WORK_LOGS
CREATE TABLE work_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    notes TEXT
);

-- QUALITY_CHECKS
CREATE TABLE quality_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    repair_order_id UUID REFERENCES repair_orders(id) ON DELETE CASCADE,
    checked_by UUID REFERENCES users(id),
    checked_at TIMESTAMPTZ,
    result VARCHAR(32),
    notes TEXT
);

-- WARRANTY
CREATE TABLE warranty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    vehicle_id UUID REFERENCES vehicles(id),
    repair_order_id UUID REFERENCES repair_orders(id),
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    terms TEXT
);

-- MAINTENANCE_SCHEDULE
CREATE TABLE maintenance_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    vehicle_id UUID REFERENCES vehicles(id),
    next_service_at TIMESTAMPTZ,
    notes TEXT
);

-- INVOICES
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    repair_order_id UUID REFERENCES repair_orders(id),
    order_id UUID REFERENCES orders(id),
    customer_id UUID REFERENCES customers(id),
    amount NUMERIC(12,2) NOT NULL,
    issued_at TIMESTAMPTZ DEFAULT now(),
    status payment_status_enum DEFAULT 'PENDING'
);

-- PAYMENTS
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    invoice_id UUID REFERENCES invoices(id),
    amount NUMERIC(12,2) NOT NULL,
    paid_at TIMESTAMPTZ,
    status payment_status_enum DEFAULT 'PENDING',
    method VARCHAR(32)
);

-- EXPENSES
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    garage_id UUID REFERENCES garages(id),
    amount NUMERIC(12,2) NOT NULL,
    description TEXT,
    incurred_at TIMESTAMPTZ DEFAULT now()
);

-- COMMISSION_RECORDS
CREATE TABLE commission_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID REFERENCES users(id),
    invoice_id UUID REFERENCES invoices(id),
    amount NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- AUDIT_LOGS
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(255),
    resource VARCHAR(255),
    resource_id UUID,
    timestamp TIMESTAMPTZ DEFAULT now(),
    details JSONB
);

-- SYSTEM_SETTINGS
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    key VARCHAR(128) UNIQUE NOT NULL,
    value JSONB,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- NOTIFICATIONS
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(32),
    content TEXT,
    sent_at TIMESTAMPTZ DEFAULT now(),
    read BOOLEAN DEFAULT FALSE
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_vehicles_vin ON vehicles(vin);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_invoices_customer_id ON invoices(customer_id);
CREATE INDEX idx_inventory_product_id ON inventory(product_id);
