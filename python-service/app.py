from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
import os
import time
import sys

app = Flask(__name__)
CORS(app)

# Store service start time for uptime calculation
start_time = time.time()

def calculate_statistics(data):
    """Calculate basic statistics for a list of numbers"""
    if not data:
        return {"mean": 0, "sum": 0, "count": 0}
    
    return {
        "mean": sum(data) / len(data),
        "sum": sum(data),
        "count": len(data)
    }

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint with service metadata"""
    uptime_seconds = time.time() - start_time
    uptime_minutes = int(uptime_seconds // 60)
    uptime_hours = int(uptime_minutes // 60)
    uptime_str = f"{uptime_hours}h {uptime_minutes % 60}m"
    
    return jsonify({
        "status": "healthy",
        "service": "python-service",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "uptime": uptime_str
    }), 200

@app.route('/info', methods=['GET'])
def get_info():
    """Info endpoint with data statistics and processing logic"""
    # Sample data for processing
    sample_data = [1, 2, 3, 4, 5, 8, 13, 21, 34, 55]
    
    # Calculate statistics
    stats = calculate_statistics(sample_data)
    
    return jsonify({
        "service": "python-service",
        "language": "Python",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "dataProcessing": {
            "sampleData": sample_data,
            "statistics": stats
        },
        "pythonVersion": sys.version.split()[0]
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8082))
    app.run(host='0.0.0.0', port=port, debug=False)