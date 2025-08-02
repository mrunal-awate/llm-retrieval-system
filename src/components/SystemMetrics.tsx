import React from 'react';
import { Database, Cpu, Clock, TrendingUp } from 'lucide-react';

interface SystemMetricsProps {
  documentsCount: number;
  processedCount: number;
  totalClauses: number;
}

export function SystemMetrics({ documentsCount, processedCount, totalClauses }: SystemMetricsProps) {
  const processingRate = documentsCount > 0 ? (processedCount / documentsCount) * 100 : 0;

  const metrics = [
    {
      label: 'Documents',
      value: documentsCount,
      icon: Database,
      color: 'blue'
    },
    {
      label: 'Processed',
      value: processedCount,
      icon: Cpu,
      color: 'green'
    },
    {
      label: 'Total Clauses',
      value: totalClauses,
      icon: Clock,
      color: 'purple'
    },
    {
      label: 'Success Rate',
      value: `${processingRate.toFixed(0)}%`,
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">System Metrics</h3>
        <p className="text-sm text-gray-600 mt-1">
          Real-time processing statistics
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              green: 'bg-green-100 text-green-600',
              purple: 'bg-purple-100 text-purple-600',
              orange: 'bg-orange-100 text-orange-600'
            };

            return (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-600">
                      {metric.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {documentsCount > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Processing Progress</span>
              <span className="font-medium">{processedCount}/{documentsCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${processingRate}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}