<b>PROCEDURE</b>
Pour faire fonctionner ces scripts, vous devez:
- Exécuter un serveur node pour les connexions wegsocket
- Exécuter un serveur web local pour le stockage et l'accessibilité des fichier (HTML, CSS, JS, images, etc..)
- Connaître l'addresse IP de l'ordinateur sur lequel tournent les serveur.

<b>Lancement du serveur web</b>
Il faut lancer MAMP et vérifier que vous tombiez sur une page accessible à l'addresse http://localhost ou http://localhost:8888 si vous fonctionnez sur les port par défaut de MAMP
Il faut également lancer le serveur NODE en executant la commande "node Node_server/diceServer.js" depuis le terminal. Attention suivant où vous êtes positionnés dans l'arborescence, il faudra peut-etre vous déplacer dnas un autre dossier avec la commande "cd2".

<b>Connexion du dé sur iphone et synchronisation avec le jeu correspondant</a>
Afin de faciliter le pairing entre le dé et l'interface, une palette de couleurs s'affiche lorsque l'utilisateur se connect au serveur, et il suffit de cliquer sur la couleur correspopndante pour faire correspondre le dé avec l'écran en question.

<b>Script detail</b>
Pour ce jeu il y a 3 scripts de base:
- dice.js  (script qui fait fonctionneer les dés)
- game.js  (script qui met en place tout le jeu)
- socket_connections.js (script du serveur)

<b>Les fonctions à éditer</b>
line 58 => <b>activeFunction:function(val){}</b>
line 63 => <b>passiveFunction:function(val){</b>
line 68 =><br>init</b>

<b>Exemple de la grille </b>
Le script Jeu.js, est un simple exemple de comment un jeu sur ce système peut fonctionner avec les 3 functions principale:
line 9  => <b>initJeu()</b>
line 28 => <b>move()</b>
line 49 => <b>moveBack()</b>

Cet exemple fait 3 choses:
- Il cré les cases et le pion au chargement
- Fait avancer le pion quand le joueur "actif" tire le dé
- Fait reculer le pion quand le joueur "passif" tire le dé

Pour ceci, l'idée est de récupérer la position de chaque case via son ID, et de récupérer son positionnement dans la page.

Tout le code du Jeu.js est proposé sous la forme d'un prototype JS qui est instancié dans le script Game.js.