
document.addEventListener('DOMContentLoaded', () => {
    const previewSize = 150;

    // Quill Editor (only once)
    const quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Type something...'
    });

    const quillEdit = new Quill('#editEditor', {
        theme: 'snow',
        placeholder: 'Update project description...'
    });


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

                modal.querySelectorAll('form').forEach(form => {
                    form.reset();
                    const imagePreview = form.querySelector('.image-preview');
                    if (imagePreview) imagePreview.src = '';
                    const imagePreviewer = form.querySelector('.image-previewer');
                    if (imagePreviewer) imagePreviewer.classList.remove('selected');
                });

                quill.setText('');
                quill.history.clear(); // extra säkert

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

    // Fixa addProjectForm
    const form = document.getElementById('addProjectForm');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        clearErrorMessages(form);

        document.getElementById('hidden-description').value = quill.root.innerHTML.trim();
        const formData = new FormData(form);

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (res.ok) {
                const projectName = form.querySelector('[name="ProjectName"]').value;
                const clientName = form.querySelector('[name="ClientName"]').value;
                const description = quill.root.innerHTML;


                const projectGrid = document.querySelector('.project-grid');
                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute('data-status', 'started');
                card.dataset.projectName = projectName;
                card.dataset.clientName = clientName;
                card.dataset.description = description;

                card.innerHTML = `
    <div class="card-header">
        <img src="/images/ProjectImage.svg" alt="App Icon" class="icon" />
        <div class="text-content">
            <div class="title">${projectName}</div>
            <div class="subtitle">${clientName}</div>
        </div>
        <div class="menu-container">
            <div class="menu">⋯</div>
            <div class="dropdown hidden">
                <button class="dropdown-btn edit-btn">✏️ Edit</button>
                <button class="dropdown-btn delete-btn">🗑️ Delete Project</button>
            </div>
        </div>
    </div>
    <p class="description">${description}</p>
`;


                projectGrid.appendChild(card);

                form.reset();
                quill.setText('');
                document.getElementById('addProjectModal').classList.remove('show');
            } else if (data.errors) {
                Object.entries(data.errors).forEach(([key, messages]) => {
                    const input = form.querySelector(`[name="${key}"]`);
                    const span = form.querySelector(`[data-valmsg-for="${key}"]`);
                    if (input) input.classList.add('input-validation-error');
                    if (span) span.innerText = messages.join(', ');
                });
            }
        } catch (err) {
            console.error('Error submitting form', err);
        }
    });

    // Kortmeny och redigering
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
            const card = e.target.closest('.card');
            editingCard = card; // spara referens

            const name = card.dataset.projectName;
            const client = card.dataset.clientName;
            const description = card.dataset.description;

            document.getElementById('editProjectName').value = name;
            document.getElementById('editClientName').value = client;
            document.getElementById('editBudget').value = 0;
            document.getElementById('editStartDate').value = '';
            document.getElementById('editEndDate').value = '';
            quillEdit.root.innerHTML = description;

            document.getElementById('editProjectModal').classList.add('show');
        }


    });
});

function clearErrorMessages(form) {
    form.querySelectorAll('[data-val="true"]').forEach(input => {
        input.classList.remove('input-validation-error');
    });
    form.querySelectorAll('[data-valmsg-for]').forEach(span => {
        span.innerText = '';
        span.classList.remove('field-validation-error');
    });
}

function loadImage(file) {
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


function toggleProfileMenu() {
    const menu = document.querySelector('.profile-menu');
    menu.classList.toggle('hidden');
}

function logout() {
    const form = document.getElementById('logoutForm');
    if (form) {
        form.submit();
    }
}


const editForm = document.getElementById('editProjectForm');
editForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearErrorMessages(editForm);

    document.getElementById('editHiddenDescription').value = quillEdit.root.innerHTML.trim();
    const formData = new FormData(editForm);

    try {
        const res = await fetch(editForm.action, {
            method: 'POST',
            body: formData
        });

        const data = await res.json();

        if (res.ok) {
            const updatedName = editForm.querySelector('[name="ProjectName"]').value;
            const updatedClient = editForm.querySelector('[name="ClientName"]').value;
            const updatedDescription = quillEdit.root.innerHTML;

            const card = document.querySelector(`.card[data-project-name="${updatedName}"]`);
            if (card) {
                card.querySelector('.title').textContent = updatedName;
                card.querySelector('.subtitle').textContent = updatedClient;
                card.querySelector('.description').innerHTML = updatedDescription;

                // uppdatera dataset
                card.dataset.clientName = updatedClient;
                card.dataset.description = updatedDescription;
            }

            editForm.reset();
            document.getElementById('editProjectModal').classList.remove('show');
            quillEdit.setText('');
        } else if (data.errors) {
            Object.entries(data.errors).forEach(([key, messages]) => {
                const input = editForm.querySelector(`[name="${key}"]`);
                const span = editForm.querySelector(`[data-valmsg-for="${key}"]`);
                if (input) input.classList.add('input-validation-error');
                if (span) span.innerText = messages.join(', ');
            });
        }
    } catch (err) {
        console.error('Error submitting edit form', err);
    }
});
