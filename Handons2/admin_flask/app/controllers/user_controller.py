from flask import Blueprint, request, jsonify, render_template, abort
from app.services.user_service import UserService
import re

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/api/users', methods=['GET'])
def get_users():
    users = UserService.get_all_users()
    return jsonify([user.to_dict() for user in users])

@user_bp.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = UserService.get_user_by_id(user_id)
    return jsonify(user.to_dict())

@user_bp.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    # Validate required fields
    if not data or not all(k in data for k in ('name', 'email', 'age', 'password')):
        abort(400, 'Missing required fields')
    # Validate username: no whitespace, min 6, max 25
    name = data['name']
    if not (6 <= len(name) <= 25) or re.search(r'\s', name):
        abort(400, 'Username must be 6-25 characters, no whitespace')
    user = UserService.create_user(data)
    return jsonify(user.to_dict()), 201

@user_bp.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = UserService.get_user_by_id(user_id)
    data = request.get_json()
    # Validate username if present
    if 'name' in data:
        name = data['name']
        if not (6 <= len(name) <= 25) or re.search(r'\s', name):
            abort(400, 'Username must be 6-25 characters, no whitespace')
    user = UserService.update_user(user, data)
    return jsonify(user.to_dict())

@user_bp.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = UserService.get_user_by_id(user_id)
    UserService.delete_user(user)
    return jsonify({'message': 'User deleted'})

@user_bp.route('/users', methods=['GET'])
def get_users_html():
    users = UserService.get_all_users()
    return render_template('user_list.html', users=users)
