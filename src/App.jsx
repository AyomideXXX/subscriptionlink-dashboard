javascript
import React, { useState } from 'react';
import { Plus, DollarSign, Users, Calendar, Settings, Trash2, Edit } from 'lucide-react';

const SubscriptionLinkDashboard = () => {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic Plan",
      price: 29.99,
      interval: "monthly",
      description: "Perfect for small businesses",
      subscribers: 12,
      status: "active"
    },
    {
      id: 2,
      name: "Pro Plan",
      price: 99.99,
      interval: "monthly",
      description: "Advanced features for growing companies",
      subscribers: 8,
      status: "active"
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    interval: 'monthly',
    description: ''
  });

  const handleCreatePlan = () => {
    if (!newPlan.name || !newPlan.price) return;

    const plan = {
      id: Date.now(),
      name: newPlan.name,
      price: parseFloat(newPlan.price),
      interval: newPlan.interval,
      description: newPlan.description,
      subscribers: 0,
      status: "active"
    };

    setPlans([...plans, plan]);
    setNewPlan({ name: '', price: '', interval: 'monthly', description: '' });
    setShowCreateForm(false);
  };

  const deletePlan = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  const totalRevenue = plans.reduce((sum, plan) => sum + (plan.price * plan.subscribers), 0);
  const totalSubscribers = plans.reduce((sum, plan) => sum + plan.subscribers, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">SubscriptionLink</h1>
                <p className="text-sm text-gray-500">Crypto Subscription Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 px-3 py-1 rounded-full">
                <span className="text-blue-700 text-sm font-medium">Testnet Mode</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Monthly Revenue</dt>
                  <dd className="text-lg font-medium text-gray-900">${totalRevenue.toLocaleString()} USDC</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Subscribers</dt>
                  <dd className="text-lg font-medium text-gray-900">{totalSubscribers}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Plans</dt>
                  <dd className="text-lg font-medium text-gray-900">{plans.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Subscription Plans</h3>
                <p className="mt-1 text-sm text-gray-500">Create and manage your crypto subscription plans</p>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Plan
              </button>
            </div>

            {/* Create Plan Form */}
            {showCreateForm && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h4 className="text-md font-medium text-gray-900 mb-4">Create New Plan</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                      <input
                        type="text"
                        value={newPlan.name}
                        onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="e.g., Premium Plan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price (USDC)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newPlan.price}
                        onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="29.99"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Billing Interval</label>
                    <select
                      value={newPlan.interval}
                      onChange={(e) => setNewPlan({...newPlan, interval: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={newPlan.description}
                      onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      rows={3}
                      placeholder="Describe what's included in this plan..."
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCreatePlan}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                      Create Plan
                    </button>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Plans List */}
            <div className="space-y-4">
              {plans.map((plan) => (
                <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-medium text-gray-900">{plan.name}</h4>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {plan.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{plan.description}</p>
                      <div className="flex items-center space-x-6 mt-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {plan.price} USDC/{plan.interval}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          {plan.subscribers} subscribers
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          Revenue: ${(plan.price * plan.subscribers).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deletePlan(plan.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {plans.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No subscription plans</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating your first subscription plan.</p>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">🚀 Next Development Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="font-medium text-blue-800">Phase 1 - Smart Contracts:</p>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Deploy subscription contract to Polygon testnet</li>
                <li>Add wallet connection (MetaMask/WalletConnect)</li>
                <li>Integrate USDC token handling</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-blue-800">Phase 2 - Customer Portal:</p>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Build customer subscription interface</li>
                <li>Add recurring payment authorization</li>
                <li>Implement CPN integration for fiat conversion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionLinkDashboard;
