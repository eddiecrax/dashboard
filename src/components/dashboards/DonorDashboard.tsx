import React from 'react';
import { DollarSign, TrendingUp, Target, BarChart3, PieChart as PieChartIcon, Smartphone, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { mockDonorData } from '../../data/mockData';

interface DonorDashboardProps {
  onBack: () => void;
}

export const DonorDashboard: React.FC<DonorDashboardProps> = ({ onBack }) => {
  const data = mockDonorData;
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const efficiencyData = [
    { metric: 'Traditional Method', cost: 120, efficiency: 45 },
    { metric: 'VaccineWatch', cost: 37.95, efficiency: 87 }
  ];

  return (
    <div className="space-y-8">
      {/* Investment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Investment</p>
                <p className="text-2xl font-bold text-gray-900">${data.totalInvestment.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">80% deployed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cost per Child</p>
                <p className="text-2xl font-bold text-gray-900">${data.costPerChild}</p>
                <p className="text-xs text-green-600 mt-1">68% below target</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Social ROI</p>
                <p className="text-2xl font-bold text-gray-900">{data.socialROI}:1</p>
                <p className="text-xs text-green-600 mt-1">Above industry avg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cost Avoidance</p>
                <p className="text-2xl font-bold text-gray-900">${(data.costAvoidance / 1000).toFixed(0)}K</p>
                <p className="text-xs text-green-600 mt-1">4.2x investment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Breakdown & Impact Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.investmentBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({category, percentage}) => `${category} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {data.investmentBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact Metrics vs Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.impactMetrics.map((metric, index) => {
                const progress = (metric.current / metric.target) * 100;
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{metric.metric}</span>
                      <span className="text-sm text-gray-500">
                        {typeof metric.current === 'number' ? 
                          (metric.metric.includes('Cost') ? `$${metric.current}` : 
                           metric.metric.includes('%') ? `${metric.current}%` : metric.current.toLocaleString()) : 
                          metric.current
                        } / {typeof metric.target === 'number' ? 
                          (metric.metric.includes('Cost') ? `$${metric.target}` : 
                           metric.metric.includes('%') ? `${metric.target}%` : metric.target.toLocaleString()) : 
                          metric.target
                        }
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          progress >= 90 ? 'bg-green-500' :
                          progress >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{width: `${Math.min(progress, 100)}%`}}
                      ></div>
                    </div>
                    <div className="mt-2">
                      <Badge variant={
                        progress >= 90 ? 'success' :
                        progress >= 70 ? 'warning' : 'danger'
                      }>
                        {Math.round(progress)}% of target
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Efficiency Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Efficiency Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Cost Comparison</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Bar dataKey="cost" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${(data.costAvoidance - data.totalInvestment).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Net Savings Generated</div>
                <div className="text-xs text-gray-500 mt-1">Healthcare cost avoidance</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {((data.costAvoidance - data.totalInvestment) / data.totalInvestment * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Financial ROI</div>
                <div className="text-xs text-gray-500 mt-1">Return on investment</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Investment Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 text-blue-600 mr-2" />
            Technology Investment Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                12,774
              </div>
              <div className="text-sm text-gray-600">Children Reached</div>
              <div className="text-xs text-gray-500 mt-1">Through mobile technology</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                77
              </div>
              <div className="text-sm text-gray-600">CHWs Equipped</div>
              <div className="text-xs text-gray-500 mt-1">With mobile apps</div>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                99.1%
              </div>
              <div className="text-sm text-gray-600">Data Sync Success</div>
              <div className="text-xs text-gray-500 mt-1">Offline-first reliability</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Categories Detail */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Categories Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.investmentBreakdown.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{backgroundColor: COLORS[index % COLORS.length]}}
                  ></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{category.category}</h3>
                    <p className="text-sm text-gray-600">{category.percentage}% of total investment</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    ${category.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    ${(category.amount / 12774).toFixed(2)} per child
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expansion Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Expansion Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">High-Impact Regions</h4>
              {[
                { region: 'Turkana County', potential: '3,200 children', investment: '$121,440', roi: '4.8:1' },
                { region: 'Marsabit County', potential: '2,850 children', investment: '$108,158', roi: '4.2:1' },
                { region: 'West Pokot County', potential: '2,150 children', investment: '$81,593', roi: '3.9:1' }
              ].map((opportunity, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900">{opportunity.region}</h5>
                    <Badge variant="info">High Priority</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Potential reach: {opportunity.potential}</p>
                  <p className="text-sm text-gray-600">Required investment: {opportunity.investment}</p>
                  <p className="text-sm text-green-600 font-medium">Projected ROI: {opportunity.roi}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Technology Enhancements</h4>
              {[
                { enhancement: 'AI-Powered Predictive Analytics', cost: '$75,000', impact: 'High', roi: '5.2:1' },
                { enhancement: 'Telemedicine Integration', cost: '$55,000', impact: 'High', roi: '4.1:1' },
                { enhancement: 'Nutrition Tracking Module', cost: '$35,000', impact: 'Medium', roi: '3.8:1' }
              ].map((enhancement, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-900">{enhancement.enhancement}</h5>
                    <Badge variant={enhancement.impact === 'High' ? 'success' : 'warning'}>
                      {enhancement.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Investment required: {enhancement.cost}</p>
                  <p className="text-sm text-green-600 font-medium">Projected ROI: {enhancement.roi}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};