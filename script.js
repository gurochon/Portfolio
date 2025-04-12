document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour ouvrir l'image dans une nouvelle fenêtre
    const openImageInNewWindow = (imageSrc) => {
        const newWindow = window.open("", "_blank");
        if (newWindow) {
            newWindow.document.write(`
                <html>
                <head>
                    <title>Image</title>
                    <style>
                        body {
                            margin: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 100vh;
                            background-color: #1e1e2e;
                        }
                        img {
                            max-width: 90%;
                            max-height: 90vh;
                            border-radius: 10px;
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
                        }
                    </style>
                </head>
                <body>
                    <img src="${imageSrc}" alt="Image">
                </body>
                </html>
            `);
            newWindow.document.close();
        } else {
            alert("La fenêtre n'a pas pu être ouverte. Veuillez vérifier les paramètres de votre navigateur.");
        }
    };

    // Ouvrir l'image du CV dans une nouvelle fenêtre au clic
    document.getElementById('cvImage').onclick = function() {
        openImageInNewWindow(this.src);
    };

    // Fonction pour ouvrir le modal d'image
    const openModal = (modalId, imageSrc) => {
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
        modal.querySelector('.modal-content').src = imageSrc;
    };

    // Fonction pour fermer le modal
    const closeModal = (modalId) => {
        document.getElementById(modalId).style.display = "none";
    };

    // Ouvrir le modal d'image au clic sur "Voir plus" pour les certifications
    document.querySelectorAll('.voir-plus').forEach(button => {
        button.onclick = function() {
            const imageSrc = this.getAttribute('data-image');
            openModal('imageModal', imageSrc);
        };
    });

    // Fermer la modal au clic sur le bouton de fermeture
    document.querySelectorAll('.close').forEach(closeButton => {
        closeButton.onclick = function() {
            closeModal('imageModal');
        };
    });

    // Fonction de défilement fluide vers chaque section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetId === "accueil" ? 0 : targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});
