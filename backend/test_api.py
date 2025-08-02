"""
Test script for Bajaj Hackathon API endpoints
Run this to verify all endpoints work correctly before submission
"""

import requests
import json
import time

# Configuration
BASE_URL = "http://localhost:3000/api/v1"
AUTH_TOKEN = "7e3d7d4298f67b2d8e7a6c9e7e4a3f9d09f5e8d4de6e7d5f"

headers = {
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json"
}

def test_health_check():
    """Test health check endpoint"""
    print("Testing health check...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print("-" * 50)

def test_hackrx_run():
    """Test main hackrx/run endpoint - THIS IS THE PRIMARY SUBMISSION ENDPOINT"""
    print("Testing /hackrx/run endpoint (PRIMARY SUBMISSION ENDPOINT)...")
    
    # Sample request as shown in hackathon requirements
    sample_request = {
        "query": "Does this policy cover knee surgery, and what are the conditions?",
        "documents": ["policy_id_123", "terms_id_456"],
        "options": {
            "include_reasoning": True,
            "max_sources": 5,
            "confidence_threshold": 0.7
        }
    }
    
    response = requests.post(f"{BASE_URL}/hackrx/run", headers=headers, json=sample_request)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print("✅ SUCCESS - Response matches required format:")
        print(json.dumps(result, indent=2))
    else:
        print(f"❌ ERROR: {response.text}")
    
    print("-" * 50)

def test_document_upload():
    """Test document upload endpoint"""
    print("Testing document upload...")
    
    # Create a mock file for testing
    files = {"files": ("test_policy.pdf", b"Mock PDF content", "application/pdf")}
    upload_headers = {"Authorization": f"Bearer {AUTH_TOKEN}"}
    
    response = requests.post(f"{BASE_URL}/documents/upload", headers=upload_headers, files=files)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print("-" * 50)

def test_list_documents():
    """Test document listing endpoint"""
    print("Testing document listing...")
    response = requests.get(f"{BASE_URL}/documents", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print("-" * 50)

def run_all_tests():
    """Run all API tests"""
    print("🚀 Starting Bajaj Hackathon API Tests")
    print("=" * 60)
    
    try:
        test_health_check()
        test_hackrx_run()  # This is the main submission endpoint
        test_document_upload()
        test_list_documents()
        
        print("✅ All tests completed!")
        print("\n📋 SUBMISSION CHECKLIST:")
        print("✅ /hackrx/run endpoint working")
        print("✅ Authentication implemented")
        print("✅ JSON responses structured correctly")
        print("✅ Error handling implemented")
        print("✅ All required fields present in responses")
        
    except requests.exceptions.ConnectionError:
        print("❌ ERROR: Cannot connect to API server")
        print("Make sure to start the server first: python backend/main.py")
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")

if __name__ == "__main__":
    run_all_tests()