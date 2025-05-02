document.addEventListener('DOMContentLoaded', () => {
    const previewSize = 150;

    // Öppna modal
    const modalButtons = document.querySelectorAll('[data-modal="true"]');
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalTarget = button.getAttribute('data-target');
            const modal = document.querySelector(modalTarget);

            if (modal) {
                modal.classList.add('show');
            }
        });
    });

    // Stäng modal
    const closeButtons = document.querySelectorAll('[data-close="true"]');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('show');

                // Rensa data
                modal.querySelectorAll('form').forEach(form => {
                    form.reset();

                    const imagePreview = form.querySelector('.image-preview');
                    if (imagePreview) imagePreview.src = '';

                    const imagePreviewer = form.querySelector('.image-previewer');
                    if (imagePreviewer) imagePreviewer.classList.remove('selected');
                });
            }
        });
    });

    // Hantera image-previewer
    document.querySelectorAll('.image-previewer').forEach(previewer => {
        const fileInput = previewer.querySelector('input[type="file"]');
        const imagePreview = previewer.querySelector('.image-preview');

        previewer.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', async ({ target: { files } }) => {
            const file = files[0];
            if (file) {
                processImage(file, imagePreview, previewer, previewSize);
            }
        });
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            clearErrorMessages(form);

            const formData = new FormData(form);

            try {
                const res = await fetch(form.action, {
                    method: 'post',
                    body: formData
                });

                if (res.ok) {
                    const modal = form.closest('.modal');
                    if (modal)
                        modal.style.display = 'none';
                }
  
                const data = await res.json(); 

                if (res.status === 400 && data.errors) {
                    Object.keys(data.errors).forEach(key => {
                        addErrorMessage(form, key, data.errors[key].join('\n'));

                        const input = form.querySelector(`[name="${key}"]`);
                        if (input) {
                            input.classList.add('input-validation-error');
                        }

                        const span = form.querySelector(`[data-valmsg-for="${key}"]`);
                        if (span) {
                            span.innerText = data.errors[key].join('\n');
                            span.classList.add('field-validation-error');
                        }
                    });
                }
            } catch (err) {
                console.log('error submitting the form', err);
            }
        });
    });
});

// Rensa felmeddelanden
function clearErrorMessages(form) {
    form.querySelectorAll('[data-val="true"]').forEach(input => {
        input.classList.remove('input-validation-error');
    });

    form.querySelectorAll('[data-valmsg-for]').forEach(span => {
        span.innerText = '';
        span.classList.remove('field-validation-error');
    });
}

// Lägg till felmeddelande
function addErrorMessage(form, key, errorMessage) {
    const input = form.querySelector(`[name="${key}"]`);
    if (input) {
        input.classList.add('input-validation-error');
    }

    const span = form.querySelector(`[data-valmsg-for="${key}"]`);
    if (span) {
        span.innerText = errorMessage;
        span.classList.add('field-validation-error');
    }
}

// Ladda bild
async function loadImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onerror = () => reject(new Error('Failed to load file'));
        reader.onload = (e) => {
            const img = new Image();
            img.onerror = () => reject(new Error("Failed to load image"));
            img.onload = () => resolve(img);
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    });
}

// Processa bild
async function processImage(file, imagePreview, previewer, previewSize = 150) {
    try {
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = previewSize;
        canvas.height = previewSize;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, previewSize, previewSize);
        imagePreview.src = canvas.toDataURL('image/jpeg');
        previewer.classList.add('selected');
    } catch (error) {
        console.error('Failed on image-processing:', error);
    }
}


/* ADD PROJECT /*



/* Add Project closing tab */

document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.querySelector('[data-close="true"]');
    const modal = document.getElementById("projectModal");

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
});



/* Add project validering*/

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addProjectForm');

    form.addEventListener('submit', function (e) {
        if (!form.checkValidity()) {
            e.preventDefault(); // Stoppa formuläret från att skickas om det är fel
            e.stopPropagation();
        } else {
            // Kopiera Quill-editor innehållet till hidden input
            document.getElementById('hidden-description').value = quill.root.innerHTML;
        }
    });
});



/* Add Project Create Project */


// Fånga formuläret
document.getElementById('addProjectForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Förhindra att sidan laddar om

    // Hämta värden från inputfält
    const projectName = document.getElementById('projectNameInput').value;
    const clientName = document.getElementById('clientNameInput').value;
    const description = quill.root.innerHTML; // Quill description

    // Skapa nytt kort i DOM
    const projectGrid = document.querySelector('.project-grid');

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card-header">
            <img src="/images/ProjectImage.svg" alt="App Icon" class="icon" />
            <div class="text-content">
                <div class="title">${projectName}</div>
                <div class="subtitle">${clientName}</div>
            </div>
            <div class="menu">⋯</div>
        </div>
        <p class="description">
            ${description}
        </p>
    `;

    // Lägg till nya kortet i griden
    projectGrid.appendChild(card);

    // Stäng modalen
    document.getElementById('addProjectModal').style.display = 'none';

    // Återställ formuläret
    document.getElementById('addProjectForm').reset();
    quill.setText(''); // Töm Quill-editor
});

/* Edit project */


document.querySelector('.project-grid').addEventListener('click', function (e) {
    // Om användaren klickar på edit-knappen
    if (e.target.classList.contains('edit-btn')) {
        const card = e.target.closest('.card');

        // Hämta data från kortet
        const name = card.dataset.projectName;
        const client = card.dataset.clientName;
        const description = card.dataset.description;

        // Fyll fälten i edit-formuläret
        document.getElementById('editProjectName').value = name;
        document.getElementById('editClientName').value = client;
        document.getElementById('editBudget').value = 0; // Du kan justera detta senare
        document.getElementById('editStartDate').value = "";
        document.getElementById('editEndDate').value = "";

        // Fyll beskrivning i Quill-editor
        const quillEditor = Quill.find(document.querySelector('#editEditor'));
        quillEditor.root.innerHTML = description;

        // Visa modalen
        document.getElementById('editProjectModal').style.display = 'block';
    }

    // Stäng modal
    if (e.target.matches('[data-close]')) {
        document.getElementById('editProjectModal').style.display = 'none';
    }
});



document.querySelector('.project-grid').addEventListener('click', function (e) {
    if (e.target.classList.contains('menu')) {
        const dropdown = e.target.nextElementSibling;
        dropdown.classList.toggle('hidden');
    }

    if (e.target.classList.contains('delete-btn')) {
        const card = e.target.closest('.card');
        card.remove();
    }

    if (e.target.classList.contains('edit-btn')) {
        openEditModal(e.target);
    }
});



function toggleProfileMenu() {
    const menu = document.querySelector('.profile-menu');
    menu.classList.toggle('hidden');
}

function logout() {
    alert("Logging out... (här kan du lägga riktig logout senare)");
}


function setActive(button) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    button.classList.add('active');
}






function setActive(button) {
    // Ta bort "active" från alla länkar
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Lägg till "active" på knappen man klickade på
    button.classList.add('active');

    // Ta fram vilket filter som är aktivt ("all", "started", "completed")
    const filter = button.textContent.trim().toLowerCase().split(' ')[0];
    const cards = document.querySelectorAll('.card');

    // Visa eller dölj kort beroende på filter
    cards.forEach(card => {
        const status = card.getAttribute('data-status');

        if (filter === 'all') {
            card.style.display = 'block';
        } else if (status === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
