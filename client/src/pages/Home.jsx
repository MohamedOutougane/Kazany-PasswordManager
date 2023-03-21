import React from 'react'

function Home() {
  return (
    <>
    <h1>KAZANY - Password Manager</h1>
    <section className='bloc-text'>
      <h2>Qu'est-ce que c'est ?</h2>
      <p>Le gestionnaire de mots de passe est une application web qui permet de stocker et de gérer ses mots de passe en toute sécurité.</p>
      <p>Le Password Manager de KAZANY est fait avec la stack "MERN", "MERN" fait référence aux technologies utilisées pour développer l'application : MongoDB, Express, React et Node.js.</p>
    </section>
    <section className='bloc-text'>
      <h2>Comment ça marche ?</h2>
      <p>Pour utiliser le gestionnaire de mots de passe, il faut créer un compte utilisateur en fournissant un nom, une adresse email et un mot de passe maître. Le mot de passe maitre sera hashé et stocké dans une base de données MongoDB</p>
      <p>Une fois connecté, l'utilisateur peut ajouter des comptes avec des identifiants, des liens de connexion et des mots de passe associés. Les informations sont stockées, eux, de manière chiffrée.</p>
      <p>L'utilisateur peut également générer des mots de passe aléatoires, avec différents critères, de manière sécurisée et les copier dans le presse-papiers pour les utiliser sur d'autres sites web.</p>
    </section>
    <section className='bloc-text'>
      <h2>Pourquoi utiliser un gestionnaire de mots de passe ?</h2>
      <p>Les mots de passe sont souvent la première ligne de défense contre les attaques informatiques. Cependant, il est difficile de se souvenir de mots de passe différents pour chaque compte en ligne.</p>
      <p>Un gestionnaire de mots de passe permet de générer des mots de passe forts et uniques pour chaque compte, tout en les stockant de manière sécurisée. Cela facilite la gestion des mots de passe et améliore la sécurité en ligne.</p>
    </section>
    </>
  )
}

export default Home