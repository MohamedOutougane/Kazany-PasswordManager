import React from 'react';
import withAuth from '../HOC/withAuth';

function Dashboard() {
  return (
    <div>Dashboard</div>
  );
}

export default withAuth(Dashboard);