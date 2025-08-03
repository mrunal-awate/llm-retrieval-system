"""
Test script for deployed Bajaj Hackathon API
Update the BASE_URL with your deployed URL before running
"""

import requests
import json
import time

# UPDATE THIS WITH YOUR DEPLOYED URL
BASE_URL = "https://your-deployed-app.onrender.com/api/v1"  # Change this!
AUTH_TOKEN = "7e3d7d4298f67b2d8e7a6c9e7e4a3f9d09f5e8d4de6e7d5f"

headers = {
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json"
}

def test_hackrx_endpoint():
    """Test the main hackrx/run endpoint that judges will evaluate"""
    print("🧪 Testing DEPLOYED /hackrx/run endpoint...")
    print(f"URL: {BASE_URL}/hackrx/run")
    
    # Sample request matching hackathon requirements
    sample_request = {
        "query": "Does this policy cover knee surgery, and what are the conditions?",
        "documents": ["policy_id_123", "terms_id_456"],
        "options": {
            "include_reasoning": True,
            "max_sources": 5,
            "confidence_threshold": 0.7
        }
    }
    
    try:
        start_time = time.time()
        response = requests.post(f"{BASE_URL}/hackrx/run", headers=headers, json=sample_request, timeout=30)
        end_time = time.time()
        
        print(f"⏱️  Response Time: {(end_time - start_time):.2f} seconds")
        print(f"📊 Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS - API is working correctly!")
            print("\n📋 Response Summary:")
            print(f"   Query: {result.get('query', 'N/A')}")
            print(f"   Confidence: {result.get('confidence', 0):.2%}")
            print(f"   Sources: {len(result.get('sources', []))} found")
            print(f"   Processing Time: {result.get('processingTime', 0)}ms")
            
            print("\n🎯 READY FOR SUBMISSION!")
            print(f"   Submit this URL: {BASE_URL}/hackrx/run")
            print(f"   Auth Token: {AUTH_TOKEN}")
            
        else:
            print(f"❌ ERROR: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ CONNECTION ERROR: {str(e)}")
        print("Make sure your app is deployed and the URL is correct!")

def test_health_check():
    """Test if the API is accessible"""
    print("🏥 Testing health check...")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        if response.status_code == 200:
            print("✅ API is online and accessible")
            return True
        else:
            print(f"⚠️  Health check returned: {response.status_code}")
            return False
    except:
        print("❌ Cannot reach the API")
        return False

if __name__ == "__main__":
    print("🚀 BAJAJ HACKATHON - DEPLOYED API TEST")
    print("=" * 50)
    
    if "your-deployed-app" in BASE_URL:
        print("❌ ERROR: Please update BASE_URL with your actual deployed URL!")
        print("Example: https://bajaj-hackathon-api.onrender.com/api/v1")
        exit(1)
    
    print(f"Testing: {BASE_URL}")
    
    if test_health_check():
        test_hackrx_endpoint()
    else:
        print("\n💡 Deployment Tips:")
        print("1. Make sure your app is deployed successfully")
        print("2. Check the deployment logs for errors")
        print("3. Verify the URL is correct")
        print("4. Wait a few minutes for the service to start")