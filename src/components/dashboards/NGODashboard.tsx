import React from 'react';
import { Users, TrendingUp, Award, MapPin, CheckCircle, AlertTriangle, Smartphone } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { mockNGOData } from '../../data/mockData';

interface NGODashboardProps {
  onBack: () => void;
}

export const NGODashboard: React.FC<NGODashboardProps> = ({ onBack }) => {
  const data = mockNGOData;

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Beneficiaries</p>
                <p className="text-2xl font-bold text-gray-900">{data.totalBeneficiaries.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">↗ +12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active CHWs</p>
                <p className="text-2xl font-bold text-gray-900">{data.activeCHWs}</p>
                <p className="text-xs text-green-600 mt-1">94% retention rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Communities</p>
                <p className="text-2xl font-bold text-gray-900">{data.communities}</p>
                <p className="text-xs text-blue-600 mt-1">5 counties covered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{data.completionRate}%</p>
                <p className="text-xs text-green-600 mt-1">↗ +4% this quarter</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile App Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 text-blue-600 mr-2" />
            CHW Mobile App Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {data.appMetrics.dailyActiveUsers}
              </div>
              <div className="text-sm text-gray-600">Daily Active CHWs</div>
              <div className="text-xs text-green-600 mt-1">88% of total</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {data.appMetrics.averageSessionDuration}
              </div>
              <div className="text-sm text-gray-600">Avg Session Duration</div>
              <div className="text-xs text-blue-600 mt-1">+3 min from last week</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {data.appMetrics.dataSync.successful}
              </div>
              <div className="text-sm text-gray-600">Successful Syncs</div>
              <div className="text-xs text-green-600 mt-1">99.1% success rate</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                v{data.mobileAppData.appVersion}
              </div>
              <div className="text-sm text-gray-600">Current App Version</div>
              <div className="text-xs text-blue-600 mt-1">95% adoption</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Program Progress & CHW Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Program Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="children" fill="#3B82F6" name="Children Registered" />
                <Bar dataKey="vaccinations" fill="#10B981" name="Vaccinations" />
                <Bar dataKey="smsReminders" fill="#F59E0B" name="SMS Reminders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {data.satisfactionScore}/5.0
              </div>
              <div className="text-gray-600">Overall Rating</div>
              <div className="text-sm text-gray-500 mt-1">Based on 1,247 responses</div>
            </div>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map(rating => {
                const percentage = rating === 5 ? 68 : rating === 4 ? 22 : rating === 3 ? 7 : rating === 2 ? 2 : 1;
                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm w-4">{rating}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{width: `${percentage}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Impact & Program Success */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Community Impact Overview</CardTitle>
            <Button size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Full Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {data.communities}
              </div>
              <div className="text-sm text-gray-600">Communities Served</div>
              <div className="text-xs text-green-600 mt-1">5 counties covered</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {data.totalBeneficiaries.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Beneficiaries</div>
              <div className="text-xs text-blue-600 mt-1">+12% from last month</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {data.completionRate}%
              </div>
              <div className="text-sm text-gray-600">Program Completion</div>
              <div className="text-xs text-purple-600 mt-1">+4% this quarter</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Nairobi County</h3>
                  <p className="text-sm text-gray-600">Highest performing region</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">
                      Coverage: 85%
                    </span>
                    <span className="text-xs text-gray-500">
                      CHWs: 15 active
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    2,847 children
                  </div>
                  <div className="text-sm text-gray-600">
                    8,520 vaccinations
                  </div>
                </div>
                <Badge variant="success">Leading</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Kiambu County</h3>
                  <p className="text-sm text-gray-600">Growing program</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">
                      Coverage: 78%
                    </span>
                    <span className="text-xs text-gray-500">
                      CHWs: 12 active
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    2,156 children
                  </div>
                  <div className="text-sm text-gray-600">
                    6,468 vaccinations
                  </div>
                </div>
                <Badge variant="warning">Growing</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Items & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { achievement: 'Reached 12,000+ children milestone', date: '2 days ago', type: 'milestone' },
                { achievement: 'Achieved 82% vaccination rate in Nairobi', date: '1 week ago', type: 'target' },
                { achievement: '5 new CHWs completed training', date: '1 week ago', type: 'training' },
                { achievement: 'SMS system 99.1% delivery rate', date: '2 weeks ago', type: 'system' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-sm text-gray-900">{item.achievement}</span>
                    <div className="text-xs text-gray-500 mt-1">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              Priority Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'Follow up with 23 overdue cases in Mathare', priority: 'high', assignee: 'Patrick Mbeki' },
                { action: 'Update app for 3 CHWs using v2.1.2', priority: 'medium', assignee: 'IT Support' },
                { action: 'Schedule quarterly training session', priority: 'low', assignee: 'Training Team' },
                { action: 'Review data quality in Kajiado region', priority: 'medium', assignee: 'Data Team' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <span className="text-sm text-gray-900">{item.action}</span>
                    <div className="text-xs text-gray-500 mt-1">Assigned to: {item.assignee}</div>
                  </div>
                  <Badge variant={
                    item.priority === 'high' ? 'danger' : 
                    item.priority === 'medium' ? 'warning' : 'info'
                  }>
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};