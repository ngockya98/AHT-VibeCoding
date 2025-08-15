SELECT
    o.id AS order_id,
    o.customer_id,
    oi.product_id,
    EXTRACT(YEAR FROM o.created_at) AS year,
    EXTRACT(MONTH FROM o.created_at) AS month,
    oi.quantity,
    oi.price * oi.quantity AS total_price
FROM orders o
JOIN order_items oi ON o.id = oi.order_id;
