"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/Layout/LayoutProductList"; // Ajustez le chemin si nécessaire
import TimeSlots from "../components/ProductList/TimeSlots"; // Ajustez le chemin si nécessaire
import axios from "axios";

const ProductListPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          router.push("/"); // Redirige si aucun token ou ID utilisateur
          return;
        }

        // Récupérer les données de l'utilisateur pour vérifier le rôle
        const response = await axios.get(`https://radio-fullstack.onrender.com/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Utiliser le token Bearer pour l'autorisation
          },
        });

        const { role } = response.data.user;

        if (role === "admin") {
          setIsAdmin(true);
        } else {
          router.push("/"); // Redirige si l'utilisateur n'est pas un admin
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/"); // Redirige en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Afficher un état de chargement
  }

  if (!isAdmin) {
    return null; // Si ce n'est pas un admin, ne rien rendre
  }

  return (
    <Layout>
      <TimeSlots />
    </Layout>
  );
};

export default ProductListPage;
