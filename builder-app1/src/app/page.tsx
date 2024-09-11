"use client";

import React from "react";
import Layout from "./components/Layout";
import Link from 'next/link'; // Pour la navigation

const HomePage: React.FC = () => {
  return (
    <Layout>
      <h1>Bienvenue sur la page d'accueil</h1>
      <Link href="/Order">Aller à la page des commandes</Link>
    </Layout>
  );
};

export default HomePage;
