import psycopg2
import csv

SRC_CONN = {
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "postgres",
    "dbname": "automotive"
}
DW_CONN = {
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "postgres",
    "dbname": "dw_demo"
}

def extract_orders():
    conn = psycopg2.connect(**SRC_CONN)
    cur = conn.cursor()
    cur.execute("SELECT id, customer_id, created_at FROM orders LIMIT 10;")
    rows = cur.fetchall()
    with open("orders.csv", "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["id", "customer_id", "created_at"])
        writer.writerows(rows)
    cur.close()
    conn.close()

def load_orders():
    conn = psycopg2.connect(**DW_CONN)
    cur = conn.cursor()
    with open("orders.csv", "r") as f:
        next(f)
        for line in f:
            fields = line.strip().split(",")
            cur.execute(
                "INSERT INTO fact_orders (order_id, customer_id, time_id) VALUES (%s, %s, NULL) ON CONFLICT DO NOTHING;",
                (fields[0], fields[1])
            )
    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    extract_orders()
    load_orders()
