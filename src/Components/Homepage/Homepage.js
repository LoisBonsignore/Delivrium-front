//Charement des CSS et dépendances
import Critic from "../Critic/Critic";

import "./Homepage.css";

// NOTE : la fonction commentaire à déjà de quoi récup l'user qui est en train de publier
// Note : dans le modèle POSTS.JS j'ai laissé le CURRENTPOST (pour des raisons)
// note : j'ai intégré le like dans le modèle COMMENT pour le moment, même si nous ne l'avons pas encore implanté. 

// DONE LIST : 
// VIDER LA HOMEPAGE. Ouais, c'est vide c'est cool, ça m'a pris qu'une heure tout au plus !
// séparé les élements de la homepage en créant deux COMPOSANTS distincs : CRITIC.JS et COMMENT.JS 
// les faire fonctionner dans l'élement HOMEPAGE.JS. Attention du coup, CRITIC devient enfant de HOMEPAGE et COMMENT devient enfant de CRITIC.
// Faire en sorte qu'il n'y ai pas toutes les critiques sous chaque titre ... 
// recalibrer les modèles et les routes pour leurs retirer les commentaires
// -- recrée les nouvelles routes/collection/controlleurs pour les commentaires
// faire imprimer au moins un comm dans la nouvelle collection \o/ Encore une victoire de cananrd !
// rajouter un currentPost dans le modèle de commentaire.
// récuperer l'id de la publication sur laquelle on envoi un commentaire à faire dans comment.js
// les balancer en fetch post dans la BD (DONE !)
// get en fonction de l'id de celui qui publie. 
// publier les commentaires que en fonction de l'id de la critique
// faire un peu de css au niveau de la reception commentaire et de la comment-box

// TO DO LIST

// APRES TO DO LIST
// topper l'API des bookins dans le NEWCRIT si possible
// l'intégrer dans un type de recherche

// APRES APRES TO DO
// passer sur le like
// trouver un moyen que l'user ne puisse en faire qu'un 
// l'implenter dans comments (la BD)
// compte la longueur de l'array de like

function Homepage({ isLog, setIsLog }) {

  // la HomePage est la page ou les gens arrivent lorsqu'ils sont connectés.
  // c'est aussi la page vers laquelle ils sont redirigés une fois qu'ils ont envoyé une critique. 
  // elle se situe sur deux routes : /homepage et / pour des soucis de navigation, refresh etc

  return (
    <div className="critAndCom">
      {isLog && <Critic />}
    </div>
  );
}

export default Homepage;
