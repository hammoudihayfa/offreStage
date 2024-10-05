// pages/index.js

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession(); // Récupère les données de session

  return (
    <div>
      <h1>Accueil</h1>
      {session ? ( // Vérifie si l'utilisateur est connecté
        <div>
          <p>Bienvenue, {session.user.name}!</p> {/* Affiche le nom de l'utilisateur */}
          <button onClick={() => signOut()}>Se déconnecter</button> {/* Bouton de déconnexion */}
        </div>
      ) : (
        <p>Veuillez vous connecter pour continuer.</p> // Message si non connecté
      )}
    </div>
  );
}
