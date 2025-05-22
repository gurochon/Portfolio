document.addEventListener("DOMContentLoaded", function () {
    let currentImageIndex = 1;
    let baseImagePath = "";

    // Fonction pour ouvrir l'image dans une nouvelle fenêtre (CV uniquement)
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

    // Ouvrir le CV dans une nouvelle fenêtre
    document.getElementById('cvImage').onclick = function () {
        openImageInNewWindow(this.src);
    };

    // Fonction pour ouvrir un modal
    const openModal = (modalId, imageSrc, isDoc = false) => {
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
        const modalImage = modal.querySelector('.modal-content');
        modalImage.src = imageSrc;

        if (isDoc) {
            const parts = imageSrc.split('/');
            baseImagePath = parts.slice(0, -1).join('/');
            currentImageIndex = parseInt(parts[parts.length - 1]);

            // Ajouter les flèches si elles ne sont pas déjà là
            if (!modal.querySelector('.arrow-left')) {
                const leftArrow = document.createElement("span");
                leftArrow.innerHTML = "&#9664;";
                leftArrow.className = "arrow arrow-left";
                modal.appendChild(leftArrow);

                const rightArrow = document.createElement("span");
                rightArrow.innerHTML = "&#9654;";
                rightArrow.className = "arrow arrow-right";
                modal.appendChild(rightArrow);

                leftArrow.onclick = () => {
                    if (currentImageIndex > 1) {
                        currentImageIndex--;
                        modalImage.src = `${baseImagePath}/${currentImageIndex}.jpg`;
                    }
                };

                rightArrow.onclick = () => {
                    currentImageIndex++;
                    modalImage.src = `${baseImagePath}/${currentImageIndex}.jpg`;
                };
            }
        }
    };

    // Ouvrir une image en modal (certifs, docs, etc.)
    document.querySelectorAll('.voir-plus').forEach(button => {
        button.onclick = function () {
            const imageSrc = this.getAttribute('data-image');
            const isDoc = this.getAttribute('data-type') === 'doc'; // uniquement pour "Documentation"
            openModal('imageModal', imageSrc, isDoc);
        };
    });

    // Fermer les modales
    document.querySelectorAll('.close').forEach(closeButton => {
        closeButton.onclick = function () {
            const modal = document.getElementById('imageModal');
            modal.style.display = "none";

            // Nettoyer les flèches si elles existent
            const left = modal.querySelector('.arrow-left');
            const right = modal.querySelector('.arrow-right');
            if (left) left.remove();
            if (right) right.remove();
        };
    });

    // Défilement fluide vers les sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const offset = 15;

            if (targetElement) {
                const scrollPosition = targetElement.offsetTop - offset;
                window.scrollTo({
                    top: scrollPosition < 0 ? 0 : scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Mise à jour active lien navbar
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.parentElement.classList.add('active');
    } else {
        link.parentElement.classList.remove('active');
    }
});


