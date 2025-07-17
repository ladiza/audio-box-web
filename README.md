# 🎵 Vinyl Audio Box

A modern audio switching hub built on Raspberry Pi Zero 2 W that seamlessly blends analog vinyl listening with digital streaming services.

## Project Vision

Create a unified audio control system that bridges the gap between vintage vinyl records and modern wireless streaming, providing effortless switching between multiple audio sources with a clean, mobile-first web interface.

## Architecture Decisions

### Why These Technologies?

**Backend: Flask + Flask-SocketIO**
- Already implemented and working well for system control
- Excellent for systemctl/ALSA integration
- Simple to extend with WebSocket support for real-time updates
- Lightweight enough for Pi Zero 2 W

**Frontend: Vue 3 + Quasar (Planned)**
- Mobile-first component library designed for touch interfaces
- Lighter than Vuetify with better mobile optimization
- Built-in PWA support for home screen installation
- Professional look suitable for audio equipment
- Smaller bundle size critical for Pi Zero performance

**Communication: WebSockets**
- Eliminates need for polling
- Instant status updates across multiple devices
- Enables future features like vinyl auto-detection
- More efficient than REST polling on limited hardware

### Design Philosophy

**"One Service at a Time" Approach**
- Only one audio service (Spotify/AirPlay) runs simultaneously
- Prevents audio conflicts and resource competition
- Simplifies debugging and state management
- More reliable on Pi Zero's limited resources
- Can be revisited if upgrading to Pi 4

**Bluetooth Strategy**
- Output only (vinyl → Pi → wireless headphones)
- Input capability skipped as redundant with Spotify Connect
- Reduces complexity and resource usage
- Aligns with 95% use case (Spotify from phone)

## Current Features ✅

### Audio Sources
- **Spotify Connect** - Stream directly from any Spotify app
- **AirPlay** - Stream from iPhone/Mac devices (mainly for SoundCloud)
- **Vinyl Input** - Via Behringer UFO 202 USB audio interface with built-in phono preamp

### Web Interface
- Real-time service status monitoring
- Source selection and switching
- Service restart functionality
- Mobile-responsive design
- Auto-refresh status updates (30-second polling)

### Hardware
- Raspberry Pi Zero 2 W (WiFi + Bluetooth)
- Behringer UFO 202 USB Audio Interface
- Studio monitor output via RCA connections

## Planned Features 🚧

### Phase 1: Mobile-First UI (Next Priority)
- [ ] **Vue 3 + Quasar Migration** - Touch-optimized components
- [ ] **WebSocket Integration** - Real-time updates, no more polling
- [ ] **Progressive Web App** - Install to phone home screen
- [ ] **Software Volume Control** - System-wide volume management
- [ ] **Visual Feedback** - Loading states, smooth transitions

### Phase 2: Enhanced Audio
- [ ] **Bluetooth Transmitter** - Send any source to wireless headphones
- [ ] **Smart Vinyl Detection** - Auto-switch when vinyl starts playing
- [ ] **Source Priorities** - Vinyl always takes precedence when detected

### Phase 3: Advanced Features
- [ ] **Multi-room Audio** - Snapcast integration
- [ ] **Internet Radio** - Preset streaming stations
- [ ] **Audio Processing** - Basic EQ, normalization
- [ ] **Hardware Controls** - Physical buttons via GPIO

### Future Considerations
- [ ] **Multiple Source Mixing** - If hardware upgraded to Pi 4
- [ ] **Voice Control** - Basic commands
- [ ] **Home Assistant Integration** - Smart home compatibility

## Technical Architecture

### Backend Stack
- **Flask** - REST API and system control
- **Flask-SocketIO** - WebSocket support for real-time updates
- **SystemD** - Service management (raspotify, shairport-sync)
- **ALSA/PulseAudio** - Audio device control

### Frontend Stack (Current)
- **Vanilla HTML/CSS/JS** - Proof of concept
- **30-second polling** - Status updates

### Frontend Stack (Planned)
- **Vue 3** - Reactive UI framework
- **Quasar Framework** - Mobile-first components
- **TypeScript** - Type safety
- **WebSocket Client** - Real-time communication
- **PWA Features** - Offline support, installable

### Communication Flow
1. User action → WebSocket event to Flask
2. Flask executes system command (stop/start service)
3. Flask monitors service status (2-3 second internal polling)
4. Status change → WebSocket broadcast to all clients
5. Vue updates UI reactively

### State Management
- Backend is single source of truth
- Frontend uses optimistic updates with rollback
- No complex state management needed (no Vuex/Pinia)
- Simple reactive object updated by WebSocket events

## Development Rationale

### Why Not Multiple Simultaneous Services?
- Pi Zero 2 W resource constraints
- Audio conflict complexity with PulseAudio
- Unnecessary for primary use cases
- Can revisit with hardware upgrade

### Why Quasar Over Other Frameworks?
- Better mobile components than Vuetify
- Smaller bundle size than Material frameworks
- Touch-first design philosophy
- Built-in PWA and mobile app options

### Why WebSockets?
- Multiple device synchronization
- Instant service status updates
- Foundation for future auto-detection features
- More efficient than REST polling

## Installation

### Prerequisites
- Raspberry Pi Zero 2 W with Raspberry Pi OS Lite
- Behringer UFO 202 USB Audio Interface
- Studio monitors or powered speakers
- WiFi network access

### Quick Setup
```bash
# Clone repository
git clone [repo-url] audio-box-web
cd audio-box-web

# Install dependencies
sudo apt install python3-flask python3-flask-socketio
# or use virtual environment:
python3 -m venv venv
source venv/bin/activate
pip install flask flask-socketio

# Install audio services
curl -sS https://dtcooper.github.io/raspotify/install.sh | sh
sudo apt install shairport-sync

# Configure audio output
# Set USB audio as default in /etc/asound.conf

# Run web interface
python app.py
```

Access via: `http://audio-box.local:8080`

## Hardware Setup

### Audio Signal Flow
1. **Vinyl**: Turntable → Behringer UFO 202 (phono preamp) → Pi USB
2. **Digital**: Spotify/AirPlay → Pi → USB Audio Out
3. **Output**: Pi USB → Behringer UFO 202 Out → Studio Monitors

### Cost Breakdown
- Raspberry Pi Zero 2 W: £15
- Behringer UFO 202: £25
- MicroSD card (32GB): £8
- Power supply & cables: £15
- **Total: ~£63**

### Future Hardware Upgrades
- Raspberry Pi 4 (4GB) - Better multi-service performance
- HiFiBerry DAC+ ADC - Higher quality audio I/O
- Rotary encoder - Physical volume control
- Small OLED display - Status without phone

## Project Goals

1. **Simplicity** - One-tap source switching
2. **Reliability** - Stable audio playback without dropouts
3. **Mobile-First** - Designed for phone control
4. **Cost-Effective** - Under £100 total investment
5. **Extensible** - Clean architecture for future features

## Known Limitations

- Only one digital source at a time (by design)
- ~2-3 second switching delay between sources
- No Bluetooth input (Spotify Connect preferred)
- Basic web interface until Vue migration

## Contributing

Areas where help is welcome:
- Vue.js/Quasar UI implementation
- WebSocket optimization
- Audio level detection for vinyl
- Documentation improvements

## License

MIT License - Open source hardware and software project

## Acknowledgments

- Raspotify project for Spotify Connect integration
- Shairport-sync for AirPlay functionality
- Behringer for affordable USB audio interfaces
- Raspberry Pi Foundation for accessible computing hardware