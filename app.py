from flask import Flask, render_template, jsonify
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)