import React, { useState } from 'react';
import { Header } from './components/Header';
import { DocumentUpload } from './components/DocumentUpload';
import { QueryInterface } from './components/QueryInterface';
import { ResponseDisplay } from './components/ResponseDisplay';
import { SystemMetrics } from './components/SystemMetrics';
import { ApiDocumentation } from './components/ApiDocumentation';

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  processed: boolean;
  clauses: number;
}

export interface QueryResponse {
  query: string;
  answer: string;
  confidence: number;
  sources: Array<{
    document: string;
    clause: string;
    relevance: number;
    page?: number;
  }>;
  reasoning: string;
  timestamp: Date;
  processingTime: number;
}

function App() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [queryResponse, setQueryResponse] = useState<QueryResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'query' | 'docs' | 'api'>('query');

  const handleDocumentUpload = (files: FileList) => {
    const newDocuments: Document[] = Array.from(files).map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date(),
      processed: Math.random() > 0.3, // Simulate processing status
      clauses: Math.floor(Math.random() * 50) + 10
    }));

    setDocuments(prev => [...prev, ...newDocuments]);
  };

  const handleQuery = async (query: string) => {
    setCurrentQuery(query);
    setIsProcessing(true);

    // Simulate API processing
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    const mockResponse: QueryResponse = {
      query,
      answer: generateMockAnswer(query),
      confidence: 0.85 + Math.random() * 0.14,
      sources: generateMockSources(),
      reasoning: generateMockReasoning(query),
      timestamp: new Date(),
      processingTime: 1200 + Math.random() * 800
    };

    setQueryResponse(mockResponse);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm border">
          {[
            { id: 'query', label: 'Query Interface', icon: '🔍' },
            { id: 'docs', label: 'Document Management', icon: '📄' },
            { id: 'api', label: 'API Documentation', icon: '⚡' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input/Controls */}
          <div className="lg:col-span-1 space-y-6">
            {activeTab === 'query' && (
              <>
                <QueryInterface 
                  onQuery={handleQuery}
                  isProcessing={isProcessing}
                  hasDocuments={documents.length > 0}
                />
                <SystemMetrics 
                  documentsCount={documents.length}
                  processedCount={documents.filter(d => d.processed).length}
                  totalClauses={documents.reduce((sum, d) => sum + d.clauses, 0)}
                />
              </>
            )}
            
            {activeTab === 'docs' && (
              <DocumentUpload 
                onUpload={handleDocumentUpload}
                documents={documents}
              />
            )}

            {activeTab === 'api' && (
              <div className="lg:col-span-3">
                <ApiDocumentation />
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          {activeTab !== 'api' && (
            <div className="lg:col-span-2">
              <ResponseDisplay 
                response={queryResponse}
                isProcessing={isProcessing}
                currentQuery={currentQuery}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Mock data generators
function generateMockAnswer(query: string): string {
  const answers = [
    "Based on the analyzed policy documents, knee surgery is covered under the medical benefits section with specific conditions. The policy requires pre-authorization for elective procedures and covers up to 80% of the cost after the deductible is met.",
    "The insurance policy provides comprehensive coverage for knee surgery under orthopedic procedures. Coverage includes both emergency and planned surgeries, with a maximum benefit limit of $50,000 per incident.",
    "Knee surgery coverage is available with certain limitations. The policy covers medically necessary procedures but excludes cosmetic or experimental treatments. A 30-day waiting period applies for non-emergency cases."
  ];
  return answers[Math.floor(Math.random() * answers.length)];
}

function generateMockSources() {
  return [
    {
      document: "Health_Insurance_Policy_2024.pdf",
      clause: "Section 4.2.1 - Orthopedic Surgery Coverage",
      relevance: 0.94,
      page: 15
    },
    {
      document: "Medical_Benefits_Guide.docx",
      clause: "Chapter 3 - Surgical Procedures",
      relevance: 0.87,
      page: 8
    },
    {
      document: "Policy_Terms_Conditions.pdf",
      clause: "Article 7.1 - Pre-authorization Requirements",
      relevance: 0.82,
      page: 23
    }
  ];
}

function generateMockReasoning(query: string): string {
  return "The system analyzed multiple policy documents and identified relevant clauses using semantic similarity matching. Key factors considered include: surgical procedure classification, medical necessity criteria, benefit limits, and pre-authorization requirements. The confidence score reflects the alignment between query intent and document content.";
}

export default App;