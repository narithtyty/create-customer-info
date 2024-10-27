import React from 'react';
import CustomerForm from './components/CustomerForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Customer Information
            </h1>
            <CustomerForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;