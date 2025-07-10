import React, { useState } from 'react';
import { Users, Calendar, Award, MessageCircle, QrCode, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { mockChildren, mockCHWs } from '../../data/mockData';
import { Child } from '../../types';

interface CHWDashboardProps {
  onBack: () => void;
}

export const CHWDashboard: React.FC<CHWDashboardProps> = ({ onBack }) => {
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [view, setView] = useState<'overview' | 'children' | 'schedule' | 'achievements' | 'register'>('overview');
  
  const chw = mockCHWs[0]; // Current CHW
  const children = mockChildren;
  const overdueCases = children.filter(child => 
    child.vaccinations.some(v => v.status === 'overdue')
  );
  const upcomingVaccinations = children.filter(child =>
    child.vaccinations.some(v => v.status === 'due')
  );

  const generateQRCode = (childId: string) => {
    return `https://vaccinewatch.app/child/${childId}`;
  };

  const getVaccinationStatus = (child: Child) => {
    const overdue = child.vaccinations.some(v => v.status === 'overdue');
    const due = child.vaccinations.some(v => v.status === 'due');
    if (overdue) return { status: 'overdue', variant: 'danger' as const };
    if (due) return { status: 'due', variant: 'warning' as const };
    return { status: 'up-to-date', variant: 'success' as const };
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Children Registered</p>
                <p className="text-2xl font-bold text-gray-900">{chw.childrenRegistered}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Vaccinations</p>
                <p className="text-2xl font-bold text-gray-900">{chw.vaccinationsCompleted}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Points</p>
                <p className="text-2xl font-bold text-gray-900">{chw.points}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Level</p>
                <p className="text-2xl font-bold text-gray-900">{chw.level}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={(_e) => setView('register')} className="h-16 flex-col">
              <UserPlus className="h-6 w-6 mb-2" />
              Register Child
            </Button>
            <Button onClick={(_e) => setView('children')} variant="secondary" className="h-16 flex-col">
              <Users className="h-6 w-6 mb-2" />
              View Children
            </Button>
            <Button onClick={(_e) => setView('schedule')} variant="secondary" className="h-16 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Schedule
            </Button>
            <Button onClick={(_e) => setView('achievements')} variant="secondary" className="h-16 flex-col">
              <Award className="h-6 w-6 mb-2" />
              Achievements
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Overdue Cases ({overdueCases.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueCases.slice(0, 3).map(child => (
                <div key={child.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{child.name}</p>
                    <p className="text-sm text-gray-600">
                      {child.vaccinations.find(v => v.status === 'overdue')?.vaccine} overdue
                    </p>
                  </div>
                  <Button size="sm" variant="danger">
                    Contact
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-600">Upcoming ({upcomingVaccinations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingVaccinations.slice(0, 3).map(child => (
                <div key={child.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{child.name}</p>
                    <p className="text-sm text-gray-600">
                      {child.vaccinations.find(v => v.status === 'due')?.vaccine} due
                    </p>
                  </div>
                  <Button size="sm" variant="warning">
                    Remind
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderChildren = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Registered Children</h2>
        <Button onClick={() => setView('register')}>
          <UserPlus className="h-4 w-4 mr-2" />
          Register New
        </Button>
      </div>
      
      <div className="grid gap-4">
        {children.map(child => {
          const status = getVaccinationStatus(child);
          return (
            <Card key={child.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{child.name}</h3>
                      <p className="text-sm text-gray-600">
                        DOB: {new Date(child.dateOfBirth).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">Guardian: {child.guardianName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={status.variant}>{status.status}</Badge>
                    <Button size="sm" variant="secondary" onClick={(_e) => setSelectedChild(child)}>
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderRegister = () => (
    <Card>
      <CardHeader>
        <CardTitle>Register New Child</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Child's Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter child's full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guardian's Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter guardian's name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guardian's Phone
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter address"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <Button>Register Child</Button>
            <Button variant="secondary" onClick={(_e) => setView('overview')}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Level {chw.level}</span>
              <span className="text-sm text-gray-500">{chw.points} / {(chw.level + 1) * 500} points</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{width: `${(chw.points % 500) / 5}%`}}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chw.achievements.map(achievement => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.earned 
                    ? 'border-yellow-300 bg-yellow-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    achievement.earned ? 'bg-yellow-200' : 'bg-gray-200'
                  }`}>
                    <Award className={`h-6 w-6 ${
                      achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    {achievement.earned && achievement.earnedDate && (
                      <p className="text-xs text-yellow-600 mt-1">
                        Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNavigation = () => (
    <div className="grid grid-cols-5 gap-2 p-4 bg-white border-t border-gray-200">
      {[
        { key: 'overview', icon: Users, label: 'Overview' },
        { key: 'children', icon: Users, label: 'Children' },
        { key: 'schedule', icon: Calendar, label: 'Schedule' },
        { key: 'achievements', icon: Award, label: 'Awards' },
        { key: 'register', icon: UserPlus, label: 'Register' }
      ].map(nav => (
        <button
          key={nav.key}
          onClick={() => setView(nav.key as 'overview' | 'children' | 'schedule' | 'achievements' | 'register')}
          className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
            view === nav.key 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
          }`}
        >
          <nav.icon className="h-5 w-5 mb-1" />
          <span className="text-xs">{nav.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {view === 'overview' && renderOverview()}
        {view === 'children' && renderChildren()}
        {view === 'register' && renderRegister()}
        {view === 'achievements' && renderAchievements()}
      </div>
      
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        {renderNavigation()}
      </div>
      
      {/* QR Code Modal */}
      {selectedChild && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>QR Code - {selectedChild.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="w-48 h-48 bg-gray-200 mx-auto mb-4 rounded-lg flex items-center justify-center">
                <QrCode className="h-24 w-24 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Scan this QR code to access child's vaccination record
              </p>
              <div className="flex space-x-2">
                <Button onClick={() => setSelectedChild(null)} variant="secondary">
                  Close
                </Button>
                <Button>Share</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};