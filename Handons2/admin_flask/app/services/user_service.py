from app import db, bcrypt
from app.models import User
from flask import abort

class UserService:
    @staticmethod
    def get_all_users():
        return User.query.all()

    @staticmethod
    def get_user_by_id(user_id):
        return User.query.get_or_404(user_id)

    @staticmethod
    def create_user(data):
        """
        Create a new user with the provided data.

        Args:
            data (dict): A dictionary containing user information with the following keys:
            - 'name' (str): The name of the user.
            - 'email' (str): The email address of the user.
            - 'age' (int): The age of the user.
            - 'password' (str): The plain text password of the user.

        Returns:
            User: The newly created User object.

        Raises:
            KeyError: If any required field is missing from the data dictionary.
            SQLAlchemyError: If there is an error committing the user to the database.

        API:
            This endpoint allows clients to create a new user by providing the required user details.
            The password is securely hashed before storing in the database.

        Example:
            >>> data = {
            ...     'name': 'Alice',
            ...     'email': 'alice@example.com',
            ...     'age': 30,
            ...     'password': 'securepassword'
            ... }
            >>> user = UserService.create_user(data)
            >>> print(user.name)
            Alice
        """
        hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(name=data['name'], email=data['email'], age=data['age'], password=hashed_pw)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def update_user(user, data):
        if 'name' in data:
            user.name = data['name']
        if 'email' in data:
            user.email = data['email']
        if 'age' in data:
            user.age = data['age']
        if 'password' in data:
            user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        db.session.commit()
        return user

    @staticmethod
    def delete_user(user):
        db.session.delete(user)
        db.session.commit()
