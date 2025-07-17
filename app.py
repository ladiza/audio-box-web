from flask import Flask, render_template, jsonify, request
import subprocess

app = Flask(__name__)

def run_command(cmd):
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return result.stdout.strip()
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/status')
def api_status():
    spotify_status = run_command("systemctl is-active raspotify")
    airplay_status = run_command("systemctl is-active shairport-sync")
    
    return jsonify({
        'spotify': spotify_status == 'active',
        'airplay': airplay_status == 'active',
        'timestamp': run_command("date")
    })

@app.route('/api/set-source', methods=['POST'])
def set_source():
    import json
    data = json.loads(request.data)
    source = data.get('source')
    
    # Stop all services first
    run_command("sudo systemctl stop raspotify")
    run_command("sudo systemctl stop shairport-sync")
    
    # Start the selected service
    if source == 'spotify':
        result = run_command("sudo systemctl start raspotify")
    elif source == 'airplay':
        result = run_command("sudo systemctl start shairport-sync")
    
    return jsonify({'status': 'success', 'active_source': source})

@app.route('/api/restart-current')
def restart_current():
    # Find which service is currently active
    spotify_active = run_command("systemctl is-active raspotify") == 'active'
    airplay_active = run_command("systemctl is-active shairport-sync") == 'active'
    
    if spotify_active:
        run_command("sudo systemctl restart raspotify")
        return jsonify({'status': 'restarted', 'service': 'spotify'})
    elif airplay_active:
        run_command("sudo systemctl restart shairport-sync")
        return jsonify({'status': 'restarted', 'service': 'airplay'})
    else:
        return jsonify({'status': 'error', 'message': 'No active service'})

@app.route('/api/current-source')
def current_source():
    spotify_active = run_command("systemctl is-active raspotify") == 'active'
    airplay_active = run_command("systemctl is-active shairport-sync") == 'active'
    
    if spotify_active:
        return jsonify({'source': 'spotify', 'status': 'active'})
    elif airplay_active:
        return jsonify({'source': 'airplay', 'status': 'active'})
    else:
        return jsonify({'source': 'none', 'status': 'inactive'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)