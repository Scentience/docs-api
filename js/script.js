// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', function() {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside (optional enhancement)
document.addEventListener('click', function(e) {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// Simple alert on form submit (replace with real functionality if needed)
document.querySelector('form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent! (This is a demo; add real backend for forms.)');
});