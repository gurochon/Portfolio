document.addEventListener("DOMContentLoaded", function() {

    // Modal - Ouvrir l'image du CV au clic
    document.getElementById('cvImage').onclick = function() {
        document.getElementById('modalImage').src = this.src;
        document.getElementById('cvModal').style.display = "block";
    }

    // Fermer la modal au clic sur le bouton de fermeture
    document.getElementsByClassName('close')[0].onclick = function() {
        document.getElementById('cvModal').style.display = "none";
    }

    // Fonction de défilement fluide vers chaque section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1); // Récupère l'ID de la section cible
            const targetElement = document.getElementById(targetId); // Trouve l'élément cible

            // Si c'est la section "Accueil", on scroll tout en haut de la page
            if (targetId === "accueil") {
                window.scrollTo({
                    top: 0, // Position en haut de la page
                    behavior: 'smooth' // Effet de défilement fluide
                });
            } else {
                // Défilement fluide vers les autres sections
                window.scrollTo({
                    top: targetElement.offsetTop, // Position de la section cible
                    behavior: 'smooth' // Effet de défilement fluide
                });
            }
        });
    });

});
