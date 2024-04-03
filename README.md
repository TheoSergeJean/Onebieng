# Onebieng

Bienvenue sur le projet Onébieng !

Afin de pouvoir utiliser l'application, téléchargez vscode : https://code.visualstudio.com/Download

Une fois installé, créez un dossier, démarrez vscode et sélectionnez ce dossier depuis l'onglet file en appuyant sur Open folder.

Copiez le lien du projet sur github ( ou ici : https://github.com/TheoSergeJean/Onebieng.git ) et ouvrez un terminal sur vscode en cliquant sur Terminal puis New terminal.

Entrer la commande:  git clone https://github.com/TheoSergeJean/Onebieng.git

Sélectionnez le dossier Onebieng dans vos dossier ou entrez la commande : cd Onebieng

Entrez la commande: npm install 


L'application fonctionne avec des API (application programming interface) utilisant des clés spécifiques pour les utilisateurs, vous devrez créer des comptes chez les hébergeurs de ces API afin de pouvoir bénéficier de leur clé API et ainsi l'ajouter dans le programme.

API NINJA:
Rendez-vous sur le site : https://api-ninjas.com/ et créez un compte.
Connectez vous et vous devriez pouvoir accéder à une clé api en cliquant sur le bouton "Show API key"
Copiez cette clé et collez la entre guillemets '' à la ligne 27 du fichier ProgramSport.js (chemin : app/screens/ProgramSport.js)
Sauvegardez avec ctrl+S

SPOONACULAR:
Rendez vous sur le site : https://spoonacular.com/food-api et créez un compte.
Connectez vous et vous devriez pouvoir accéder à une clé api en cliquant sur le bouton "Show/Hide API key" dans l'onglet Profile.
Copiez cette clé et collez la entre guillemets '' à la ligne 28 du fichier Nutrition.js (chemin : app/screens/Nutrition.js)
Sauvegardez avec ctrl+S
Copiez cette clé et collez la entre guillemets '' à la ligne 12 du fichier Food.js (chemin : app/screens/Food.js)
Sauvegardez avec ctrl+S



Entrez dans le terminal la commande : yarn expo start --tunnel     Regardez dans votre terminal, un QR code devrait apparaître dans les informations les plus récentes.

Sur votre téléphone téléchargez l'application expo go.

Une fois téléchargée, ouvrez l'application expo go.

Sélectionnez le lecteur de QR code et scannez le code présent dans votre terminal vscode.

Patientez quelques secondes et l'application Onébieng devrait s'afficher prête à être utilisée.
