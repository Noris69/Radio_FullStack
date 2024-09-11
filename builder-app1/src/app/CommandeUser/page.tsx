'use client'; // Add 'use client' for client-side rendering

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import Layout from '../components/Layout/Layout'; // Adjust the path if necessary
import CommandeUser from '../components/CommandeUser/CommandeUser'; // Adjust the path if necessary
import axios from 'axios';

const CommandeUserPage: React.FC = () => {
  const router = useRouter(); // Use the hook from next/navigation
  

  return (
    <Layout>
      <CommandeUser />
    </Layout>
  );
};

export default CommandeUserPage;
