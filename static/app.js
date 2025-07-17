async function getStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        // Update Spotify status
        const spotifyEl = document.getElementById('spotify-status');
        spotifyEl.textContent = data.spotify ? 'Active' : 'Inactive';
        spotifyEl.className = `status ${data.spotify ? 'active' : 'inactive'}`;
        
        // Update AirPlay status
        const airplayEl = document.getElementById('airplay-status');
        airplayEl.textContent = data.airplay ? 'Active' : 'Inactive';
        airplayEl.className = `status ${data.airplay ? 'active' : 'inactive'}`;
        
        console.log('Status updated:', data);
    } catch (error) {
        console.error('Error fetching status:', error);
        
        // Show error state
        document.getElementById('spotify-status').textContent = 'Error';
        document.getElementById('airplay-status').textContent = 'Error';
    }
}

function refreshStatus() {
    // Show loading state
    const statusElements = document.querySelectorAll('.status');
    statusElements.forEach(el => {
        el.textContent = 'Loading...';
        el.className = 'status loading';
    });
    
    getStatus();
}

// Load status when page loads
document.addEventListener('DOMContentLoaded', function() {
    getStatus();
    
    // Auto-refresh every 30 seconds
    setInterval(getStatus, 30000);
});