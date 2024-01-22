import React, { useEffect } from 'react';

import { api } from '../api';

const Dashboard: React.FC = () => {
  useEffect(() => {
    api.get('/me');
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Dashboard;