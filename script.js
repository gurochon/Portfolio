document.addEventListener("DOMContentLoaded", function() {
    // Modal - Ouvrir l'image du CV au clic
    document.getElementById('cvImage').onclick = function() {
        document.getElementById('modalImage').src = this.src;
        document.getElementById('cvModal').style.display = "block";
    }

    // Fermer la modal au clic sur le bouton de fermeture
    document.querySelectorAll('.close').forEach(closeButton => {
        closeButton.onclick = function() {
            document.getElementById('cvModal').style.display = "none";
            document.getElementById('imageModal').style.display = "none";
        }
    });

    // Ouvrir le modal d'image au clic sur "Voir plus"
    document.querySelectorAll('.voir-plus').forEach(button => {
        button.onclick = function() {
            const imageSrc = this.getAttribute('data-image');
            document.getElementById('imageModalContent').src = imageSrc;
            document.getElementById('imageModal').style.display = "block";
        }
    });

    // Fonction de défilement fluide vers chaque section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetId === "accueil") {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
