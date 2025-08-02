import React, { useState } from 'react';
import { Send, Mic, Loader, AlertCircle } from 'lucide-react';

interface QueryInterfaceProps {
  onQuery: (query: string) => void;
  isProcessing: boolean;
  hasDocuments: boolean;
}

export function QueryInterface({ onQuery, isProcessing, hasDocuments }: QueryInterfaceProps) {
  const [query, setQuery] = useState('');

  const sampleQueries = [
    "Does this policy cover knee surgery, and what are the conditions?",
    "What are the pre-authorization requirements for medical procedures?",
    "What is the maximum coverage limit for orthopedic treatments?",
    "Are there any exclusions for pre-existing conditions?",
    "What documentation is required for claim processing?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && hasDocuments && !isProcessing) {
      onQuery(query.trim());
    }
  };

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Query Interface</h3>
        <p className="text-sm text-gray-600 mt-1">
          Ask questions about your uploaded documents
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Query Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query here... (e.g., Does this policy cover knee surgery?)"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={!hasDocuments || isProcessing}
            />
            
            <div className="absolute bottom-3 right-3 flex items-center space-x-2">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={!hasDocuments || isProcessing}
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {query.length}/500 characters
            </div>
            
            <button
              type="submit"
              disabled={!query.trim() || !hasDocuments || isProcessing}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Query</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* No Documents Warning */}
        {!hasDocuments && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <p className="text-sm text-amber-800">
                Please upload documents first to enable querying
              </p>
            </div>
          </div>
        )}

        {/* Sample Queries */}
        {hasDocuments && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Sample Queries</h4>
            <div className="space-y-2">
              {sampleQueries.map((sampleQuery, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleQuery(sampleQuery)}
                  className="w-full text-left p-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                  disabled={isProcessing}
                >
                  {sampleQuery}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}