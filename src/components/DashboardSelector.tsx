import React from 'react';
import { Building, DollarSign, Shield, Smartphone, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { DashboardType } from '../types';

interface DashboardSelectorProps {
  onSelect: (type: DashboardType) => void;
  dashboards?: DashboardType[]; // Optional: restrict which dashboards are shown
}

export const DashboardSelector: React.FC<DashboardSelectorProps> = ({ onSelect, dashboards }) => {
  const allDashboards = [
    {
      type: 'ngo' as DashboardType,
      title: 'NGO Operations Dashboard',
      description: 'Monitor field operations, track CHW performance, and manage community health initiatives with real-time mobile app integration.',
      icon: Building,
      color: 'bg-green-500',
      stats: ['12,774 beneficiaries', '77 active CHWs', '45 communities', '82% completion rate']
    },
    {
      type: 'donor' as DashboardType,
      title: 'Donor Impact Dashboard',
      description: 'Track investment impact, analyze ROI, and monitor cost-effectiveness of digital health programs.',
      icon: DollarSign,
      color: 'bg-purple-500',
      stats: ['$485,000 invested', '4.2:1 social ROI', '$37.95 cost per child', '87% efficiency']
    },
    {
      type: 'ministry' as DashboardType,
      title: 'Ministry Health Dashboard',
      description: 'National health monitoring, policy compliance tracking, WHO reporting, and digital health integration.',
      icon: Shield,
      color: 'bg-red-500',
      stats: ['82% national coverage', '78% SDG progress', '5 counties monitored', 'DHIS2 integrated']
    }
  ];
  const filteredDashboards = dashboards ? allDashboards.filter(d => dashboards.includes(d.type)) : allDashboards;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-2xl">
              <BarChart3 className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">VaccineWatch Admin Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive administrative oversight for the VaccineWatch digital health platform. 
            Monitor CHW mobile app usage, track vaccination coverage, and analyze program impact 
            across all stakeholder organizations.
          </p>
        </div>

        {/* Mobile App Status Banner */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">CHW Mobile App Status</h3>
                    <p className="text-blue-100">Real-time monitoring of field operations</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">77</div>
                    <div className="text-sm text-blue-100">Active CHWs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">v2.1.3</div>
                    <div className="text-sm text-blue-100">App Version</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">99.1%</div>
                    <div className="text-sm text-blue-100">Sync Success</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">24m</div>
                    <div className="text-sm text-blue-100">Avg Session</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredDashboards.map((dashboard) => {
            const IconComponent = dashboard.icon;
            return (
              <Card 
                key={dashboard.type} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                onClick={() => onSelect(dashboard.type)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-4 ${dashboard.color} rounded-xl group-hover:scale-110 transition-transform shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                        {dashboard.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {dashboard.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {dashboard.stats.map((stat, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm text-gray-700">{stat}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(dashboard.type);
                    }}
                    className="w-full group-hover:bg-blue-700 transition-colors"
                  >
                    Access Dashboard
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Platform Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Smartphone className="h-5 w-5 text-blue-600 mr-2" />
                  CHW Mobile App (Flutter)
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant="success">Offline-First</Badge>
                    <span className="text-sm text-gray-600">Works without internet</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="info">Real-time Sync</Badge>
                    <span className="text-sm text-gray-600">Automatic data synchronization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="purple">Gamification</Badge>
                    <span className="text-sm text-gray-600">Achievement system for CHWs</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-green-600 mr-2" />
                  Web Admin Dashboard
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant="success">Multi-Stakeholder</Badge>
                    <span className="text-sm text-gray-600">NGO, Donor, Ministry views</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="info">Real-time Analytics</Badge>
                    <span className="text-sm text-gray-600">Live performance monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="purple">DHIS2 Integration</Badge>
                    <span className="text-sm text-gray-600">National health system sync</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};