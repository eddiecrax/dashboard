import React, { useState } from 'react';
import { Shield, Target, TrendingUp, Globe, Users, AlertTriangle, Smartphone, FileText, UserPlus, Settings, Award, MapPin, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadialBarChart, RadialBar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { mockMinistryData, mockCHWs } from '../../data/mockData';

interface MinistryDashboardProps {
  onBack: () => void;
}

export const MinistryDashboard: React.FC<MinistryDashboardProps> = ({ onBack }) => {
  const data = mockMinistryData;
  const [chws, setChws] = useState(mockCHWs);
  const [selectedCHW, setSelectedCHW] = useState<string | null>(null);
  const [chwView, setChwView] = useState<'overview' | 'management' | 'training' | 'performance' | 'gamification'>('overview');
  const [modal, setModal] = useState<null | 'add' | 'manage' | 'assign' | 'performance' | 'reassign' | 'appversion' | 'analytics' | 'report' | 'achievements' | 'leaderboard' | 'rewards'>(null);
  const [modalCHW, setModalCHW] = useState<any>(null);

  // Modal content components
  const AddCHWModal = () => {
    const [form, setForm] = useState({ name: '', region: '', community: '', level: 1, phone: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setChws([...chws, { ...form, id: Date.now().toString(), points: 0, childrenRegistered: 0, vaccinationsCompleted: 0, lastActiveDate: new Date().toISOString(), appVersion: '2.1.3', deviceInfo: '', performance: { weeklyRegistrations: 0, weeklyVaccinations: 0, followUpRate: 0, dataQualityScore: 0, communityEngagement: 0 }, achievements: [] }]);
      setModal(null);
    };
    return (
      <Modal title="Add New CHW" onClose={() => setModal(null)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
          <input name="region" value={form.region} onChange={handleChange} placeholder="Region" className="w-full border p-2 rounded" required />
          <input name="community" value={form.community} onChange={handleChange} placeholder="Community" className="w-full border p-2 rounded" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded" required />
          <select name="level" value={form.level} onChange={handleChange} className="w-full border p-2 rounded">
            {[1,2,3,4,5].map(l => <option key={l} value={l}>Level {l}</option>)}
          </select>
          <div className="flex space-x-2">
            <Button type="submit">Add</Button>
            <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    );
  };

  const ManageCHWModal = () => {
    if (!modalCHW) return null;
    const [form, setForm] = useState({ ...modalCHW });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSave = () => {
      setChws(chws.map(chw => chw.id === form.id ? { ...chw, ...form } : chw));
      setModal(null);
    };
    const handleDelete = () => {
      setChws(chws.filter(chw => chw.id !== form.id));
      setModal(null);
    };
    return (
      <Modal title={`Manage CHW: ${form.name}`} onClose={() => setModal(null)}>
        <div className="space-y-2">
          <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="region" value={form.region} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="community" value={form.community} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" />
          <select name="level" value={form.level} onChange={handleChange} className="w-full border p-2 rounded">
            {[1,2,3,4,5].map(l => <option key={l} value={l}>Level {l}</option>)}
          </select>
          <div className="flex space-x-2 mt-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
            <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    );
  };

  // Simple Modal component
  function Modal({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}><X /></button>
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          {children}
        </div>
      </div>
    );
  }

  // Other modals (assign, performance, reassign, appversion, analytics, report)
  const PlaceholderModal = ({ title }: { title: string }) => (
    <Modal title={title} onClose={() => setModal(null)}>
      <div className="text-gray-600">This feature is a placeholder for demonstration. Implement as needed.</div>
      <div className="mt-4 flex space-x-2">
        <Button variant="secondary" onClick={() => setModal(null)}>Close</Button>
      </div>
    </Modal>
  );

  const sdgData = [
    { name: 'SDG 3.2', value: data.sdgProgress, fill: '#10B981' }
  ];

  return (
    <div className="space-y-8">
      {/* National Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">National Coverage</p>
                <p className="text-2xl font-bold text-gray-900">{data.nationalCoverage}%</p>
                <p className="text-xs text-green-600 mt-1">↗ +2% this year</p>
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
                <p className="text-sm font-medium text-gray-600">WHO Target</p>
                <p className="text-2xl font-bold text-gray-900">{data.whoTarget}%</p>
                <p className="text-xs text-yellow-600 mt-1">8% gap remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">SDG Progress</p>
                <p className="text-2xl font-bold text-gray-900">{data.sdgProgress}%</p>
                <p className="text-xs text-green-600 mt-1">On track for 2030</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Children Registered</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data.registeredChildren.toLocaleString()}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {((data.registeredChildren / data.totalPopulation) * 100).toFixed(1)}% of target population
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Digital Health Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 text-blue-600 mr-2" />
            Digital Health Platform Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">77</div>
              <div className="text-sm text-gray-600">Active CHWs</div>
              <div className="text-xs text-green-600 mt-1">Using mobile app</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">99.1%</div>
              <div className="text-sm text-gray-600">Data Sync Success</div>
              <div className="text-xs text-blue-600 mt-1">Real-time reporting</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">45</div>
              <div className="text-sm text-gray-600">Communities</div>
              <div className="text-xs text-green-600 mt-1">Digitally connected</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-1">DHIS2</div>
              <div className="text-sm text-gray-600">Integration</div>
              <div className="text-xs text-blue-600 mt-1">National system</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coverage Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Regional Coverage Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.regionalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Coverage Rate']} />
                <Bar dataKey="coverage" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coverage Trends (2020-2024)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.coverageTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[60, 90]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Coverage Rate']} />
                <Line 
                  type="monotone" 
                  dataKey="coverage" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* SDG Progress */}
      <Card>
        <CardHeader>
          <CardTitle>SDG 3.2 Progress - Under-5 Mortality Reduction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart data={sdgData}>
                  <RadialBar
                    minAngle={15}
                    label={{ position: 'insideStart', fill: '#fff' }}
                    background
                    clockWise
                    dataKey="value"
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="text-2xl font-bold text-green-600">{data.sdgProgress}%</div>
              <div className="text-sm text-gray-600">Progress toward SDG 3.2</div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">Current Status</div>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{width: `${data.sdgProgress}%`}}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{data.sdgProgress}%</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">Target by 2030</div>
                <Badge variant="info">95% Coverage Rate</Badge>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">Digital Contribution</div>
                <Badge variant="success">12% improvement via technology</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">On Track</div>
                <div className="text-xs text-green-600">Meeting intermediate targets</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Digital Impact</div>
                <div className="text-xs text-blue-600">Technology accelerating progress</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm font-medium text-yellow-800">Focus Areas</div>
                <div className="text-xs text-yellow-600">2 regions need attention</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.regionalData.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">
                      {region.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{region.name}</h3>
                    <p className="text-sm text-gray-600">
                      Population: {region.population.toLocaleString()} | CHWs: {region.activeCHWs}
                    </p>
                    <p className="text-sm text-gray-600">
                      Registered: {region.registeredChildren.toLocaleString()} children
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{region.coverage}%</div>
                    <div className="text-sm text-gray-600">Coverage Rate</div>
                  </div>
                  <Badge variant={
                    region.coverage >= 90 ? 'success' :
                    region.coverage >= 80 ? 'warning' : 'danger'
                  }>
                    {region.coverage >= 90 ? 'Excellent' :
                     region.coverage >= 80 ? 'Good' : 'Needs Improvement'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Policy Compliance & Reporting */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              Policy Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.policyCompliance.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{item.policy}</div>
                    <div className="text-sm text-gray-600">Compliance Score: {item.score}%</div>
                  </div>
                  <Badge variant={
                    item.status === 'Compliant' ? 'success' : 'warning'
                  }>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              International Reporting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { organization: 'WHO', report: 'Annual Coverage Report', status: 'Submitted', date: '2024-01-15', automated: true },
                { organization: 'UNICEF', report: 'Quarterly Update', status: 'Auto-Generated', date: '2024-01-30', automated: true },
                { organization: 'GAVI', report: 'Performance Framework', status: 'In Progress', date: '2024-02-15', automated: false }
              ].map((report, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{report.organization}</div>
                    <div className="flex items-center space-x-2">
                      {report.automated && (
                        <Badge variant="purple" size="sm">Auto</Badge>
                      )}
                      <Badge variant={
                        report.status === 'Submitted' || report.status === 'Auto-Generated' ? 'success' :
                        report.status === 'Due' ? 'danger' : 'warning'
                      }>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{report.report}</div>
                  <div className="text-xs text-gray-500">{report.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CHW Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              Community Health Worker Management
            </CardTitle>
            <div className="flex space-x-2">
              <Button size="sm" onClick={(_e) => setChwView('overview')}>
                <Users className="h-4 w-4 mr-2" />
                Overview
              </Button>
              <Button size="sm" variant="secondary" onClick={(_e) => setChwView('management')}>
                <Settings className="h-4 w-4 mr-2" />
                Manage
              </Button>
              <Button size="sm" variant="secondary" onClick={(_e) => setChwView('training')}>
                <Award className="h-4 w-4 mr-2" />
                Training
              </Button>
              <Button size="sm" variant="secondary" onClick={(_e) => setChwView('performance')}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Performance
              </Button>
              <Button size="sm" variant="secondary" onClick={(_e) => setChwView('gamification')}>
                <Award className="h-4 w-4 mr-2" />
                Gamification
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {chwView === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {chws.length}
                  </div>
                  <div className="text-sm text-gray-600">Total CHWs</div>
                  <div className="text-xs text-blue-600 mt-1">Active nationwide</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {chws.filter(chw => chw.level >= 3).length}
                  </div>
                  <div className="text-sm text-gray-600">Senior Level</div>
                  <div className="text-xs text-green-600 mt-1">Level 3+</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {chws.reduce((sum, chw) => sum + chw.childrenRegistered, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Children Registered</div>
                  <div className="text-xs text-purple-600 mt-1">Total across all CHWs</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">
                    {chws.reduce((sum, chw) => sum + chw.vaccinationsCompleted, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Vaccinations</div>
                  <div className="text-xs text-yellow-600 mt-1">Completed</div>
                </div>
              </div>
              
              <div className="space-y-4">
                {chws.map((chw) => (
                  <div key={chw.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">
                          {chw.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{chw.name}</h3>
                        <p className="text-sm text-gray-600">{chw.community}, {chw.region}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            Level {chw.level} • {chw.points} points
                          </span>
                          <span className="text-xs text-gray-500">
                            Last active: {new Date(chw.lastActiveDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {chw.childrenRegistered} children
                        </div>
                        <div className="text-sm text-gray-600">
                          {chw.vaccinationsCompleted} vaccinations
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Badge variant={chw.performance.dataQualityScore >= 90 ? 'success' : 'warning'}>
                          Quality: {chw.performance.dataQualityScore}%
                        </Badge>
                        <Badge variant="info">Level {chw.level}</Badge>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={(_e) => { setModal('manage'); setModalCHW(chw); }}
                      >
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {chwView === 'management' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">CHW Management Actions</h3>
                <Button onClick={() => setModal('add')}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New CHW
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button size="sm" variant="secondary" className="w-full justify-start" onClick={() => setModal('assign')}>
                      <Settings className="h-4 w-4 mr-2" />
                      Update CHW Assignments
                    </Button>
                    <Button size="sm" variant="secondary" className="w-full justify-start" onClick={() => setModal('performance')}>
                      <Award className="h-4 w-4 mr-2" />
                      Review Performance
                    </Button>
                    <Button size="sm" variant="secondary" className="w-full justify-start" onClick={() => setModal('reassign')}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Reassign Regions
                    </Button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">System Management</h4>
                  <div className="space-y-2">
                    <Button size="sm" variant="secondary" className="w-full justify-start" onClick={() => setModal('appversion')}>
                      <Smartphone className="h-4 w-4 mr-2" />
                      App Version Management
                    </Button>
                    <Button size="sm" variant="secondary" className="w-full justify-start" onClick={() => setModal('analytics')}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Performance Analytics
                    </Button>
                    <Button size="sm" variant="secondary" className="w-full justify-start" onClick={() => setModal('report')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Reports
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {chwView === 'training' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Training & Development</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Training Programs</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Basic Training</span>
                      <Badge variant="success">Completed</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Advanced Protocols</span>
                      <Badge variant="warning">In Progress</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Digital Skills</span>
                      <Badge variant="info">Scheduled</Badge>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Certifications</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">WHO Standards</span>
                      <Badge variant="success">Certified</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Digital Health</span>
                      <Badge variant="success">Certified</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Emergency Response</span>
                      <Badge variant="warning">Pending</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {chwView === 'performance' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Performance Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">94%</div>
                  <div className="text-sm text-gray-600">Average Quality Score</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">88%</div>
                  <div className="text-sm text-gray-600">Follow-up Rate</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">96%</div>
                  <div className="text-sm text-gray-600">Data Accuracy</div>
                </div>
              </div>
            </div>
          )}

          {chwView === 'gamification' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Gamification Management</h3>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => setModal('achievements')}>
                    <Award className="h-4 w-4 mr-2" />
                    Manage Achievements
                  </Button>
                  <Button size="sm" onClick={() => setModal('leaderboard')}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Leaderboards
                  </Button>
                  <Button size="sm" onClick={() => setModal('rewards')}>
                    <Award className="h-4 w-4 mr-2" />
                    Rewards
                  </Button>
                </div>
              </div>

              {/* Gamification Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {chws.reduce((sum, chw) => sum + chw.points, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Points Earned</div>
                  <div className="text-xs text-purple-600 mt-1">Across all CHWs</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">
                    {chws.reduce((sum, chw) => sum + chw.achievements.filter(a => a.earned).length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Achievements Unlocked</div>
                  <div className="text-xs text-yellow-600 mt-1">This month</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {chws.filter(chw => chw.level >= 3).length}
                  </div>
                  <div className="text-sm text-gray-600">Senior Level CHWs</div>
                  <div className="text-xs text-green-600 mt-1">Level 3+</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {Math.round(chws.reduce((sum, chw) => sum + chw.points, 0) / chws.length)}
                  </div>
                  <div className="text-sm text-gray-600">Avg Points per CHW</div>
                  <div className="text-xs text-blue-600 mt-1">Active engagement</div>
                </div>
              </div>

              {/* Gaming Features Management */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Points System */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                      Points System Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Child Registration</div>
                          <div className="text-sm text-gray-600">Points per child registered</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600">+50</div>
                          <Badge variant="success">Active</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Vaccination Completed</div>
                          <div className="text-sm text-gray-600">Points per vaccination</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">+25</div>
                          <Badge variant="success">Active</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Perfect Week</div>
                          <div className="text-sm text-gray-600">Bonus for weekly goals</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-yellow-600">+100</div>
                          <Badge variant="warning">Conditional</Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="secondary" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure Points System
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 text-yellow-600 mr-2" />
                      Achievements & Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: 'First Registration', description: 'Register first child', earned: 45, total: 77, icon: '👶' },
                        { title: 'Community Champion', description: 'Register 50+ children', earned: 12, total: 77, icon: '🏆' },
                        { title: 'Perfect Week', description: 'Complete all weekly goals', earned: 23, total: 77, icon: '⭐' },
                        { title: 'Digital Master', description: 'Complete digital training', earned: 34, total: 77, icon: '💻' }
                      ].map((achievement, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{achievement.icon}</span>
                            <div>
                              <div className="font-medium text-gray-900">{achievement.title}</div>
                              <div className="text-sm text-gray-600">{achievement.description}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {achievement.earned}/{achievement.total}
                            </div>
                            <div className="text-xs text-gray-500">
                              {Math.round((achievement.earned / achievement.total) * 100)}% earned
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button size="sm" variant="secondary" className="w-full">
                        <Award className="h-4 w-4 mr-2" />
                        Manage Achievements
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Leaderboards & Competition */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                    Leaderboards & Competition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Top CHWs */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Top CHWs This Month</h4>
                      <div className="space-y-2">
                        {chws
                          .sort((a, b) => b.points - a.points)
                          .slice(0, 5)
                          .map((chw, index) => (
                            <div key={chw.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center space-x-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  index === 0 ? 'bg-yellow-400 text-white' :
                                  index === 1 ? 'bg-gray-300 text-white' :
                                  index === 2 ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                  {index + 1}
                                </span>
                                <span className="text-sm font-medium">{chw.name}</span>
                              </div>
                              <div className="text-sm font-bold text-blue-600">{chw.points} pts</div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Regional Competition */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Regional Competition</h4>
                      <div className="space-y-2">
                        {[
                          { region: 'Nairobi County', points: 2847, chws: 15 },
                          { region: 'Kiambu County', points: 2156, chws: 12 },
                          { region: 'Machakos County', points: 2634, chws: 18 },
                          { region: 'Kajiado County', points: 1892, chws: 10 },
                          { region: 'Murang\'a County', points: 3245, chws: 22 }
                        ]
                          .sort((a, b) => b.points - a.points)
                          .map((region, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center space-x-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  index === 0 ? 'bg-yellow-400 text-white' :
                                  index === 1 ? 'bg-gray-300 text-white' :
                                  index === 2 ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                  {index + 1}
                                </span>
                                <span className="text-sm font-medium">{region.region}</span>
                              </div>
                              <div className="text-sm font-bold text-green-600">{region.points} pts</div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Gaming Analytics */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Gaming Analytics</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm font-medium text-blue-900">Daily Active Gamers</div>
                          <div className="text-2xl font-bold text-blue-600">68</div>
                          <div className="text-xs text-blue-600">88% of total CHWs</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-sm font-medium text-green-900">Avg Session Time</div>
                          <div className="text-2xl font-bold text-green-600">24m</div>
                          <div className="text-xs text-green-600">+3m from last week</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-sm font-medium text-purple-900">Engagement Rate</div>
                          <div className="text-2xl font-bold text-purple-600">94%</div>
                          <div className="text-xs text-purple-600">High retention</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rewards & Incentives */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 text-yellow-600 mr-2" />
                    Rewards & Incentives Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Active Rewards</h4>
                      <div className="space-y-3">
                        {[
                          { title: 'Level 5 Achievement', description: 'Reach level 5', reward: 'Certificate + Recognition', points: 1000 },
                          { title: 'Perfect Month', description: 'Complete all monthly goals', reward: 'Bonus Allowance', points: 500 },
                          { title: 'Community Hero', description: 'Register 100+ children', reward: 'Training Opportunity', points: 750 },
                          { title: 'Digital Pioneer', description: 'Master all digital tools', reward: 'Leadership Role', points: 1200 }
                        ].map((reward, index) => (
                          <div key={index} className="p-3 border border-gray-200 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-medium text-gray-900">{reward.title}</div>
                                <div className="text-sm text-gray-600">{reward.description}</div>
                              </div>
                              <Badge variant="success">{reward.points} pts</Badge>
                            </div>
                            <div className="text-sm text-blue-600">Reward: {reward.reward}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Gaming Settings</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Notifications</div>
                            <div className="text-sm text-gray-600">Achievement alerts</div>
                          </div>
                          <Badge variant="success">Enabled</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Competition Mode</div>
                            <div className="text-sm text-gray-600">Regional leaderboards</div>
                          </div>
                          <Badge variant="success">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Auto-Leveling</div>
                            <div className="text-sm text-gray-600">Automatic level progression</div>
                          </div>
                          <Badge variant="warning">Manual</Badge>
                        </div>
                        <Button size="sm" variant="secondary" className="w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure Gaming Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Render modals */}
      {modal === 'add' && <AddCHWModal />}
      {modal === 'manage' && <ManageCHWModal />}
      {modal === 'assign' && <PlaceholderModal title="Update CHW Assignments" />}
      {modal === 'performance' && <PlaceholderModal title="Review Performance" />}
      {modal === 'reassign' && <PlaceholderModal title="Reassign Regions" />}
      {modal === 'appversion' && <PlaceholderModal title="App Version Management" />}
      {modal === 'analytics' && <PlaceholderModal title="Performance Analytics" />}
      {modal === 'report' && <PlaceholderModal title="Generate Reports" />}
      {modal === 'achievements' && <PlaceholderModal title="Achievements Management" />}
      {modal === 'leaderboard' && <PlaceholderModal title="Leaderboard Management" />}
      {modal === 'rewards' && <PlaceholderModal title="Rewards Management" />}

      {/* Priority Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            Priority Actions & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Immediate Actions</h4>
              {[
                { action: 'Improve coverage in Kajiado County', urgency: 'High', deadline: '30 days', digital: true },
                { action: 'Scale CHW program to 3 new counties', urgency: 'Medium', deadline: '60 days', digital: true },
                { action: 'Update vaccination protocols', urgency: 'Medium', deadline: '45 days', digital: false }
              ].map((item, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-gray-900">{item.action}</div>
                    <div className="flex items-center space-x-1">
                      {item.digital && (
                        <Badge variant="info" size="sm">Digital</Badge>
                      )}
                      <Badge variant={
                        item.urgency === 'High' ? 'danger' :
                        item.urgency === 'Medium' ? 'warning' : 'info'
                      }>
                        {item.urgency}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Deadline: {item.deadline}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Strategic Initiatives</h4>
              {[
                { initiative: 'Expand digital health infrastructure', impact: 'High', timeline: '6 months' },
                { initiative: 'Integrate with DHIS2 nationwide', impact: 'High', timeline: '4 months' },
                { initiative: 'Develop predictive analytics', impact: 'Medium', timeline: '8 months' }
              ].map((item, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-gray-900">{item.initiative}</div>
                    <Badge variant={item.impact === 'High' ? 'success' : 'warning'}>
                      {item.impact} Impact
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">Timeline: {item.timeline}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};