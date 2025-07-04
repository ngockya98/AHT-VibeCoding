import unittest
from app import app, db
from app.models import User
import json

class UserApiTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_create_user(self):
        response = self.app.post('/users', json={
            'name': 'Test User',
            'email': 'test@example.com',
            'age': 30,
            'password': 'secret123'
        })
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['name'], 'Test User')
        self.assertEqual(data['email'], 'test@example.com')

    def test_get_users(self):
        self.test_create_user()
        response = self.app.get('/users')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(isinstance(data, list))
        self.assertGreaterEqual(len(data), 1)

    def test_update_user(self):
        self.test_create_user()
        response = self.app.put('/users/1', json={'name': 'Updated Name'})
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['name'], 'Updated Name')

    def test_delete_user(self):
        self.test_create_user()
        response = self.app.delete('/users/1')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['message'], 'User deleted')

if __name__ == '__main__':
    unittest.main()
