import React from 'react';
import PageLayoutBuilder from './components/PageLayoutBuilder';

const App: React.FC = () => (
  <div className="p-8 bg-gray-50 min-h-screen">
    <h1 className="text-2xl font-bold mb-6">Page Layout Metadata Form</h1>
    <PageLayoutBuilder />
  </div>
);

export default App;
