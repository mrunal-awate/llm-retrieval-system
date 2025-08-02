import React, { useState } from 'react';
import { Code, Copy, CheckCircle, Play, Book } from 'lucide-react';

export function ApiDocumentation() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sampleRequest = `{
  "query": "Does this policy cover knee surgery, and what are the conditions?",
  "documents": ["policy_id_123", "terms_id_456"],
  "options": {
    "include_reasoning": true,
    "max_sources": 5,
    "confidence_threshold": 0.7
  }
}`;

  const sampleResponse = `{
  "query": "Does this policy cover knee surgery, and what are the conditions?",
  "answer": "Based on the analyzed policy documents, knee surgery is covered under the medical benefits section with specific conditions. The policy requires pre-authorization for elective procedures and covers up to 80% of the cost after the deductible is met.",
  "confidence": 0.87,
  "sources": [
    {
      "document": "Health_Insurance_Policy_2024.pdf",
      "clause": "Section 4.2.1 - Orthopedic Surgery Coverage",
      "relevance": 0.94,
      "page": 15
    }
  ],
  "reasoning": "The system analyzed multiple policy documents and identified relevant clauses using semantic similarity matching.",
  "timestamp": "2024-01-15T10:30:00Z",
  "processingTime": 1247
}`;

  const curlCommand = `curl -X POST "http://localhost:3000/api/v1/hackrx/run" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${sampleRequest.replace(/\n/g, ' ').replace(/\s+/g, ' ')}'`;

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/hackrx/run',
      description: 'Process query against uploaded documents',
      parameters: [
        { name: 'query', type: 'string', required: true, description: 'Natural language query' },
        { name: 'documents', type: 'array', required: false, description: 'Specific document IDs to search' },
        { name: 'options', type: 'object', required: false, description: 'Processing options' }
      ]
    },
    {
      method: 'POST',
      path: '/api/v1/documents/upload',
      description: 'Upload and process documents',
      parameters: [
        { name: 'files', type: 'file[]', required: true, description: 'PDF, DOCX, or email files' },
        { name: 'metadata', type: 'object', required: false, description: 'Document metadata' }
      ]
    },
    {
      method: 'GET',
      path: '/api/v1/documents',
      description: 'List uploaded documents',
      parameters: [
        { name: 'limit', type: 'number', required: false, description: 'Number of results' },
        { name: 'offset', type: 'number', required: false, description: 'Pagination offset' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* API Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Book className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">API Overview</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            RESTful API for document processing and intelligent querying
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Base URL</h4>
              <code className="text-sm text-blue-800 bg-blue-100 px-2 py-1 rounded">
                http://localhost:3000/api/v1
              </code>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Authentication</h4>
              <code className="text-sm text-green-800 bg-green-100 px-2 py-1 rounded">
                Bearer Token Required
              </code>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Features</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Multi-format document processing (PDF, DOCX, Email)</li>
              <li>• Semantic search with FAISS/Pinecone integration</li>
              <li>• Explainable AI with source citations</li>
              <li>• Structured JSON responses with confidence scores</li>
              <li>• Real-time processing with status updates</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Endpoints */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">API Endpoints</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  endpoint.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {endpoint.method}
                </span>
                <code className="text-sm font-mono text-gray-800">{endpoint.path}</code>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{endpoint.description}</p>

              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-900">Parameters:</h5>
                {endpoint.parameters.map((param, paramIndex) => (
                  <div key={paramIndex} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded text-sm">
                    <div className="flex items-center space-x-3">
                      <code className="font-mono text-blue-600">{param.name}</code>
                      <span className="text-gray-500">{param.type}</span>
                      {param.required && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">required</span>
                      )}
                    </div>
                    <span className="text-gray-600 text-xs">{param.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Request */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Sample Request</h3>
            <button
              onClick={() => copyToClipboard(sampleRequest, 'request')}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
            >
              {copiedCode === 'request' ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>Copy</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{sampleRequest}</code>
          </pre>
        </div>
      </div>

      {/* Sample Response */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Sample Response</h3>
            <button
              onClick={() => copyToClipboard(sampleResponse, 'response')}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
            >
              {copiedCode === 'response' ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>Copy</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{sampleResponse}</code>
          </pre>
        </div>
      </div>

      {/* cURL Example */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">cURL Example</h3>
            </div>
            <button
              onClick={() => copyToClipboard(curlCommand, 'curl')}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
            >
              {copiedCode === 'curl' ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>Copy</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{curlCommand}</code>
          </pre>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recommended Tech Stack</h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Backend</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-mono">FastAPI</span>
                  <span className="text-xs text-gray-600">Backend framework</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-mono">GPT-4</span>
                  <span className="text-xs text-gray-600">Language model</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Vector Storage</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-mono">Pinecone</span>
                  <span className="text-xs text-gray-600">Vector database</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-mono">PostgreSQL</span>
                  <span className="text-xs text-gray-600">Metadata storage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}