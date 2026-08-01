let modalOverlay, closeModalBtn, videoContainer, modalVideo;

// 1. Function to dynamically inject the Modal HTML markup into the <body>
function ensureModalExists() {
    if (document.getElementById('modalOverlay')) {
        // Cache existing elements if already in DOM
        modalOverlay = document.getElementById('modalOverlay');
        closeModalBtn = document.getElementById('closeModalBtn');
        videoContainer = document.getElementById('videoContainer');
        modalVideo = document.getElementById('modalVideo');
        return;
    }

    // Auto-generate markup
    const modalMarkup = `
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal-content">
                <button class="close-btn" id="closeModalBtn" aria-label="Close modal">&times;</button>
                <div class="video-container" id="videoContainer">
                    <iframe id="modalVideo" src="" allow="autoplay; fullscreen; picture-in-picture" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalMarkup);

    // Cache elements after creation
    modalOverlay = document.getElementById('modalOverlay');
    closeModalBtn = document.getElementById('closeModalBtn');
    videoContainer = document.getElementById('videoContainer');
    modalVideo = document.getElementById('modalVideo');

    // Attach listeners to newly created modal controls
    setupModalListeners();
}

// 2. Dynamic aspect ratio calculator
function applyAspectRatio(ratio = '16:9') {
    const parts = ratio.split(':');
    if (parts.length === 2) {
        const width = parseFloat(parts[0]);
        const height = parseFloat(parts[1]);
        const paddingPercentage = (height / width) * 100;
        videoContainer.style.paddingBottom = `${paddingPercentage}%`;
    }
}

// 3. Open Modal Handler
function openVideoModal(videoId, aspectRatio = '16:9') {
    ensureModalExists();
    applyAspectRatio(aspectRatio);

    modalOverlay.style.visibility = "visible";
    modalOverlay.classList.add('active');

    const localOrigin = window.location.origin && window.location.origin !== 'null' ? window.location.origin : '*';
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(localOrigin)}`;
    
    modalVideo.setAttribute('src', embedUrl);
}

// 4. Close Modal Handler
function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalVideo.setAttribute('src', ''); 
}

// 5. Attach event listeners for closing/dismissing modal
function setupModalListeners() {
    closeModalBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    modalOverlay.addEventListener('transitionend', (e) => {
        if (!modalOverlay.classList.contains('active') && e.propertyName === 'opacity') {
            modalOverlay.style.visibility = "hidden";
        }
    });
}

// Global keydown handler for Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Helper to bind the modal to any element by ID or node
function bindVideoModal(triggerElement, videoId, aspectRatio = '16:9') {
    const element = typeof triggerElement === 'string' 
        ? document.getElementById(triggerElement) 
        : triggerElement;

    if (!element) return;

    element.addEventListener('click', (e) => {
        e.preventDefault();
        openVideoModal(videoId, aspectRatio);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-video-id]').forEach(button => {
        console.log(`Binding video modal for button with video ID: ${button.dataset.videoId}`);
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = button.dataset.videoId;
            const aspectRatio = button.dataset.aspectRatio || '16:9';
            openVideoModal(videoId, aspectRatio);
        });
    });
});