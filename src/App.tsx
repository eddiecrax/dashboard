import React, { useState, useEffect, createContext, useContext } from "react";
import { DashboardSelector } from './components/DashboardSelector';
import { NGODashboard } from './components/dashboards/NGODashboard';
import { DonorDashboard } from './components/dashboards/DonorDashboard';
import { MinistryDashboard } from './components/dashboards/MinistryDashboard';
import { Layout } from './components/Layout';
import { DashboardType } from './types';
import { Lock, UserPlus as UserPlusIcon, LogIn, Building, DollarSign, Shield, Eye, EyeOff } from 'lucide-react';

// Auth context
type UserType = { email: string; password: string; role: string };
type AuthContextType = {
  user: UserType | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, role: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function useAuth() {
  return useContext(AuthContext)!;
}

const ROLES = [
  { value: 'ngo', label: 'NGO' },
  { value: 'donor', label: 'Donor' },
  { value: 'ministry', label: 'Ministry' }
];

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, password: string) => {
    const users: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      return true;
    }
    return false;
  };

  const signup = (email: string, password: string, role: string) => {
    const users: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) return false;
    const newUser: UserType = { email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(email, password)) setError("Invalid credentials");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-200 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-64 h-64 opacity-20 text-blue-300" fill="none" viewBox="0 0 400 400"><circle cx="200" cy="200" r="200" fill="currentColor" /></svg>
        <svg className="absolute bottom-0 right-0 w-80 h-80 opacity-10 text-purple-400" fill="none" viewBox="0 0 400 400"><circle cx="200" cy="200" r="200" fill="currentColor" /></svg>
      </div>
      <div className="relative z-10 bg-white/90 rounded-2xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <span className="bg-blue-100 p-3 rounded-full mb-2"><Lock className="h-7 w-7 text-blue-600" /></span>
          <h2 className="text-2xl font-bold text-blue-700 mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Sign in to your VaccineWatch account</p>
        </div>
        <div className="mb-4 text-xs text-blue-500 text-center font-medium">Sign up with any email and password. Your role determines which dashboard you see.</div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="mb-4">
            <label htmlFor="login-email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-b-2 border-gray-300 bg-transparent py-2 px-0 text-gray-900 focus:border-blue-600 focus:outline-none transition"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="login-password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-300 bg-transparent py-2 px-0 text-gray-900 focus:border-blue-600 focus:outline-none transition"
              autoComplete="off"
              required
            />
            <button type="button" className="absolute right-0 top-7 text-gray-400 hover:text-blue-600" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            <div className="text-xs text-gray-400 mt-1">Password must be at least 6 characters.</div>
          </div>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md" type="submit">
            <LogIn className="h-5 w-5" /> Login
          </button>
        </form>
        <div className="mt-6 text-sm text-center">
          No account? <button className="text-blue-600 underline font-medium" onClick={onSwitch}>Sign up</button>
        </div>
      </div>
    </div>
  );
}

const ROLE_ICONS: { [key: string]: JSX.Element } = {
  ngo: <Building className="h-6 w-6" />,
  donor: <DollarSign className="h-6 w-6" />,
  ministry: <Shield className="h-6 w-6" />,
};

function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(ROLES[0].value);
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signup(email, password, role)) setError("Email already exists");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-200 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-64 h-64 opacity-20 text-blue-300" fill="none" viewBox="0 0 400 400"><circle cx="200" cy="200" r="200" fill="currentColor" /></svg>
        <svg className="absolute bottom-0 right-0 w-80 h-80 opacity-10 text-purple-400" fill="none" viewBox="0 0 400 400"><circle cx="200" cy="200" r="200" fill="currentColor" /></svg>
      </div>
      <div className="relative z-10 bg-white/90 rounded-2xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <span className="bg-purple-100 p-3 rounded-full mb-2"><UserPlusIcon className="h-7 w-7 text-purple-600" /></span>
          <h2 className="text-2xl font-bold text-purple-700 mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm">Sign up for VaccineWatch</p>
        </div>
        <div className="mb-4 text-xs text-purple-500 text-center font-medium">Sign up with any email and password. Your role determines which dashboard you see.</div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="mb-4">
            <label htmlFor="signup-email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-b-2 border-gray-300 bg-transparent py-2 px-0 text-gray-900 focus:border-purple-600 focus:outline-none transition"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="signup-password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-300 bg-transparent py-2 px-0 text-gray-900 focus:border-purple-600 focus:outline-none transition"
              autoComplete="off"
              required
            />
            <button type="button" className="absolute right-0 top-7 text-gray-400 hover:text-purple-600" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            <div className="text-xs text-gray-400 mt-1">Password must be at least 6 characters.</div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between gap-2">
              {ROLES.map(r => (
                <button
                  type="button"
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={`flex-1 flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-150 shadow-sm
                    ${role === r.value ? 'border-purple-600 bg-purple-50' : 'border-gray-200 bg-white hover:border-purple-400'}
                  `}
                >
                  <span className={`mb-1 ${role === r.value ? 'text-purple-600' : 'text-gray-400'}`}>{ROLE_ICONS[r.value]}</span>
                  <span className={`font-medium ${role === r.value ? 'text-purple-700' : 'text-gray-700'}`}>{r.label}</span>
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-400 text-center mt-1">Select your role</div>
          </div>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-md" type="submit">
            <UserPlusIcon className="h-5 w-5" /> Sign Up
          </button>
        </form>
        <div className="mt-6 text-sm text-center">
          Already have an account? <button className="text-purple-600 underline font-medium" onClick={onSwitch}>Login</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const { user, logout } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardType | null>(null);

  // Automatically go to dashboard after login/signup
  React.useEffect(() => {
    if (user) {
      setSelectedDashboard(user.role as DashboardType);
    } else {
      setSelectedDashboard(null);
    }
  }, [user]);

  if (!user) {
    return showSignup
      ? <SignupForm onSwitch={() => setShowSignup(false)} />
      : <LoginForm onSwitch={() => setShowSignup(true)} />;
  }

  // Only allow dashboards matching the user's role
  const allowedDashboards = ROLES.filter(r => r.value === user.role);

  const handleDashboardSelect = (type: DashboardType) => {
    setSelectedDashboard(type);
  };

  const handleBack = () => {
    setSelectedDashboard(null);
  };

  const getDashboardTitle = (type: DashboardType) => {
    switch (type) {
      case 'ngo': return 'NGO Operations Dashboard';
      case 'donor': return 'Donor Impact Dashboard';
      case 'ministry': return 'Ministry Health Dashboard';
      default: return 'VaccineWatch Admin Dashboard';
    }
  };

  return (
    <Layout 
      title={selectedDashboard ? getDashboardTitle(selectedDashboard) : 'VaccineWatch Admin Dashboard'}
      onBack={selectedDashboard ? handleBack : undefined}
      dashboardType={selectedDashboard || undefined}
      onLogout={logout}
    >
      <div className="flex justify-end mb-4">
        <span className="mr-4 text-gray-600 font-medium">{user.email} ({user.role})</span>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">Logout</button>
      </div>
      {!selectedDashboard ? (
        <DashboardSelector
          onSelect={handleDashboardSelect}
          dashboards={allowedDashboards.map(r => r.value as DashboardType)}
        />
      ) : selectedDashboard === 'ngo' ? (
        <NGODashboard onBack={handleBack} />
      ) : selectedDashboard === 'donor' ? (
        <DonorDashboard onBack={handleBack} />
      ) : selectedDashboard === 'ministry' ? (
        <MinistryDashboard onBack={handleBack} />
      ) : null}
    </Layout>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}