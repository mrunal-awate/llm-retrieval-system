import React from 'react';
import { CheckCircle, Clock, ExternalLink, Brain, Target, Zap } from 'lucide-react';
import type { QueryResponse } from '../App';

interface ResponseDisplayProps {
  response: QueryResponse | null;
  isProcessing: boolean;
  currentQuery: string;
}

export function ResponseDisplay({ response, isProcessing, currentQuery }: ResponseDisplayProps) {
  if (!response && !isProcessing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center text-gray-500">
          <Brain className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">Ready to Process Queries</h3>
          <p className="text-sm">
            Upload documents and ask questions to see intelligent responses
          </p>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <h3 className="text-lg font-semibold text-gray-900">Processing Query</h3>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Current Query:</h4>
            <p className="text-blue-800">{currentQuery}</p>
          </div>

          <div className="space-y-4">
            {[
              { step: 'Parsing query intent', status: 'complete' },
              { step: 'Searching document embeddings', status: 'complete' },
              { step: 'Matching relevant clauses', status: 'active' },
              { step: 'Generating response', status: 'pending' },
              { step: 'Formatting output', status: 'pending' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                {item.status === 'complete' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : item.status === 'active' ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                ) : (
                  <Clock className="h-5 w-5 text-gray-300" />
                )}
                <span className={`text-sm ${
                  item.status === 'complete' ? 'text-green-700' :
                  item.status === 'active' ? 'text-blue-700' :
                  'text-gray-500'
                }`}>
                  {item.step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!response) return null;

  return (
    <div className="space-y-6">
      {/* Query Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Query Response</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Processed in {response.processingTime}ms</span>
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>{(response.confidence * 100).toFixed(1)}% confidence</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Your Query:</h4>
            <p className="text-blue-800">{response.query}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Answer:</h4>
            <p className="text-green-800 leading-relaxed">{response.answer}</p>
          </div>
        </div>
      </div>

      {/* Sources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Source References</h3>
          <p className="text-sm text-gray-600 mt-1">
            Documents and clauses used to generate this response
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {response.sources.map((source, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ExternalLink className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{source.document}</h4>
                      <p className="text-sm text-gray-600">{source.clause}</p>
                      {source.page && (
                        <p className="text-xs text-gray-500 mt-1">Page {source.page}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {(source.relevance * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">relevance</div>
                  </div>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${source.relevance * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reasoning */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Reasoning</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            How the system arrived at this answer
          </p>
        </div>

        <div className="p-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-purple-800 leading-relaxed">{response.reasoning}</p>
          </div>
        </div>
      </div>

      {/* JSON Response */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Structured Response</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            JSON format for API integration
          </p>
        </div>

        <div className="p-6">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{JSON.stringify({
  query: response.query,
  answer: response.answer,
  confidence: response.confidence,
  sources: response.sources,
  reasoning: response.reasoning,
  timestamp: response.timestamp.toISOString(),
  processingTime: response.processingTime
}, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}