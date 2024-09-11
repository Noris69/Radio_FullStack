// src/PackageList/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout/LayoutPackageList'; // Ajustez le chemin si nécessaire
import UserList from '../components/UserList/UserList'; // Ajustez le chemin si nécessaire
import axios from 'axios';

const PackageListPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
          router.push('/'); // Redirection vers la page d'accueil si pas connecté
          return;
        }

        // Vérifiez les informations de l'utilisateur et son rôle
        const response = await axios.get(`https://radio-fullstack.onrender.com/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { role } = response.data.user;
        if (role === 'admin') {
          setIsAdmin(true);
        } else {
          router.push('/'); // Redirige si l'utilisateur n'est pas admin
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du rôle utilisateur:', error);
        router.push('/'); // Redirige en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Affichage d'un état de chargement
  }

  if (!isAdmin) {
    return null; // Ne rien afficher si l'utilisateur n'est pas admin
  }

  return (
    <Layout>
      <UserList />
    </Layout>
  );
};

export default PackageListPage;
