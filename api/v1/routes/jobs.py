from flask import Blueprint, request, jsonify
from models import Job, Company
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils import role_required, login_required

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/jobs', methods=['POST'])
@login_required()
def post_job():
    current_user = get_jwt_identity()

    if current_user['role'] != 'company':
        return jsonify({"msg": "Permission denied"}), 403

    data = request.get_json()
    job = Job(
        title=data.get('title'),
        description=data.get('description'),
        requirements=data.get('requirements'),
        location=data.get('location'),
        company=current_user['id']
    )
    job.save()

    return jsonify(job.to_json()), 201

@jobs_bp.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.objects().to_json()

    return jsonify(jobs), 200

@jobs_bp.route('/jobs/<string:id>', methods=['GET'])
def get_job(id):
    job = Job.objects(id=id).first().to_json()

    if not job:
        return jsonify({"msg": "Job not found"}), 404
    
    return jsonify(job), 200

@jobs_bp.route('/jobs/<string:id>', methods=['PUT'])
@login_required()
@role_required('company')
def update_job(id):
    data = request.get_json()
    current_user = get_jwt_identity()
    job = Job.objects(id=id, company=current_user['id']).first()

    if not job:
        return jsonify({"msg": "Job not found"}), 404
    
    job.update(**data)

    return jsonify({"msg": "Job updated successfully"}), 200

@jobs_bp.route('/jobs/<string:id>', methods=['DELETE'])
@login_required()
@role_required('company')
def delete_job(id):
    current_user = get_jwt_identity()
    job = Job.objects(id=id, company=current_user['id']).first()

    if not job:
        return jsonify({"msg": "Job not found"}), 404
    
    job.delete()
    
    return jsonify({"msg": "Job deleted successfully"}), 200

