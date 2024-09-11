// src/Order/page.tsx
"use client";

import Layout from '../components/Layout/Layout'; // Ajustez le chemin si nécessaire
import ProfilePage from '../components/ProfilePage/ProfilePage'; // Ajustez le chemin si nécessaire
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



const ProfileUser: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

 


  

  return (
    <Layout>
      <ProfilePage />
    </Layout>
  );
};

export default ProfileUser;
