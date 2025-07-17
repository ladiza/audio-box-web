let currentSource = 'none';

async function getCurrentSource() {
    try {
        const response = await fetch('/api/current-source');
        const data = await response.json();
        
        currentSource = data.source;
        updateUI(data.source, data.status);
        
        // Update dropdown to match current state
        document.getElementById('source-select').value = data.source;
        
    } catch (error) {
        console.error('Error getting current source:', error);
        updateUI('none', 'error');
    }
}

async function changeSource() {
    const select = document.getElementById('source-select');
    const newSource = select.value;
    
    // Show loading state
    updateUI(newSource, 'loading');
    
    try {
        const response = await fetch('/api/set-source', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ source: newSource })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            currentSource = newSource;
            // Wait a moment for service to start, then check status
            setTimeout(getCurrentSource, 2000);
        } else {
            throw new Error('Failed to change source');
        }
        
    } catch (error) {
        console.error('Error changing source:', error);
        // Revert dropdown on error
        select.value = currentSource;
        updateUI(currentSource, 'error');
    }
}

async function restartCurrent() {
    if (currentSource === 'none') return;
    
    // Disable button and show loading
    const restartBtn = document.getElementById('restart-btn');
    const originalText = restartBtn.textContent;
    restartBtn.disabled = true;
    restartBtn.textContent = 'Restarting...';
    
    try {
        const response = await fetch('/api/restart-current');
        const data = await response.json();
        
        if (data.status === 'restarted') {
            updateServiceInfo(`${getServiceDisplayName(currentSource)} restarted successfully`);
            // Check status after restart
            setTimeout(getCurrentSource, 2000);
        } else {
            throw new Error(data.message || 'Restart failed');
        }
        
    } catch (error) {
        console.error('Error restarting service:', error);
        updateServiceInfo('Error restarting service');
    } finally {
        // Re-enable button
        setTimeout(() => {
            restartBtn.disabled = false;
            restartBtn.textContent = originalText;
        }, 2000);
    }
}

function updateUI(source, status) {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const restartBtn = document.getElementById('restart-btn');
    
    // Update status indicator
    if (status === 'active') {
        statusDot.className = 'status-dot active';
        statusText.textContent = `${getServiceDisplayName(source)} is running`;
        restartBtn.disabled = false;
    } else if (status === 'loading') {
        statusDot.className = 'status-dot inactive';
        statusText.textContent = 'Starting service...';
        restartBtn.disabled = true;
    } else {
        statusDot.className = 'status-dot inactive';
        statusText.textContent = source === 'none' ? 'No service active' : 'Service not running';
        restartBtn.disabled = true;
    }
    
    // Update service info
    updateServiceInfo(getServiceDescription(source, status));
}

function updateServiceInfo(message) {
    document.getElementById('service-info').textContent = message;
}

function getServiceDisplayName(source) {
    switch (source) {
        case 'spotify': return 'Spotify Connect';
        case 'airplay': return 'AirPlay';
        default: return 'None';
    }
}

function getServiceDescription(source, status) {
    if (status === 'loading') {
        return `Starting ${getServiceDisplayName(source)}...`;
    }
    
    switch (source) {
        case 'spotify':
            return status === 'active' 
                ? 'Ready for Spotify Connect. Open Spotify and select "raspotify" as your device.'
                : 'Spotify Connect is not running';
        case 'airplay':
            return status === 'active'
                ? 'Ready for AirPlay. Select "audio-box" from your iPhone/Mac AirPlay menu.'
                : 'AirPlay is not running';
        case 'none':
            return 'Select a service to begin streaming audio';
        default:
            return 'Unknown service state';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    getCurrentSource();
    
    // Auto-refresh every 30 seconds
    setInterval(getCurrentSource, 30000);
});