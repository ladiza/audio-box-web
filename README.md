# 🎵 Vinyl Audio Box

A modern audio switching hub built on Raspberry Pi Zero 2 W that seamlessly blends analog vinyl listening with digital streaming services.

## Project Vision

Create a unified audio control system that bridges the gap between vintage vinyl records and modern wireless streaming, providing effortless switching between multiple audio sources with a clean, mobile-first web interface.

## Current Features ✅

### Audio Sources
- **Spotify Connect** - Stream directly from any Spotify app
- **AirPlay** - Stream from iPhone/Mac devices
- **Vinyl Input** - Via Behringer UFO 202 USB audio interface with built-in phono preamp

### Web Interface
- Real-time service status monitoring
- Source selection and switching
- Service restart functionality
- Mobile-responsive design
- Auto-refresh status updates

### Hardware
- Raspberry Pi Zero 2 W (WiFi + Bluetooth)
- Behringer UFO 202 USB Audio Interface
- Studio monitor output via RCA connections

## Planned Features 🚧

### Short Term (v1.0)
- [ ] **Bluetooth Audio Receiver** - Accept audio from paired phones
- [ ] **React + Chakra UI Migration** - Mobile-first component library
- [ ] **Software Volume Control** - System-wide volume management
- [ ] **Progressive Web App (PWA)** - Install to phone home screen
- [ ] **Device Naming** - Custom names for Bluetooth/Spotify devices
- [ ] **Connection Status** - Show which devices are actively connected

### Medium Term (v2.0)
- [ ] **Bluetooth Audio Transmitter** - Send vinyl to wireless headphones
- [ ] **Smart Source Switching** - Auto-detect when vinyl starts/stops
- [ ] **Multi-room Audio** - Snapcast integration for synchronized playback
- [ ] **Internet Radio** - Preset streaming radio stations
- [ ] **Voice Control** - Basic voice commands for source switching
- [ ] **Audio Processing** - EQ, crossfade, volume normalization

### Long Term (v3.0)
- [ ] **Multiple Output Zones** - Different audio to different rooms
- [ ] **Advanced Audio DSP** - Real-time audio effects and processing
- [ ] **Vinyl Digitization** - Automatic recording and cataloging
- [ ] **Smart Home Integration** - Home Assistant, Alexa compatibility
- [ ] **Professional Enclosure** - Custom 3D printed or aluminum housing
- [ ] **Multiple Turntable Support** - Input switching between decks

## Technical Architecture

### Backend
- **Flask (Python)** - REST API for system control
- **SystemD Services** - Raspotify, Shairport-sync management
- **PulseAudio** - Audio routing and mixing
- **BlueZ** - Bluetooth audio stack

### Frontend (Current)
- **Vanilla HTML/CSS/JS** - Simple proof of concept
- **Responsive Design** - Mobile-optimized interface

### Frontend (Planned)
- **React + TypeScript** - Component-based architecture
- **Chakra UI** - Mobile-first component library
- **PWA Features** - Offline support, home screen installation

### Hardware Integration
- **GPIO Controls** - Physical buttons for source switching (optional)
- **LED Indicators** - Visual status feedback
- **IR Remote** - Traditional remote control support
- **Hardware Volume** - Rotary encoder integration

## Development Phases

### Phase 1: Core Functionality ✅
- [x] Basic Flask web interface
- [x] Spotify Connect integration
- [x] AirPlay integration
- [x] USB audio interface setup
- [x] Service management

### Phase 2: Mobile Optimization 🔄
- [ ] React/Chakra UI migration
- [ ] PWA implementation
- [ ] Touch-optimized controls
- [ ] Bluetooth audio receiver

### Phase 3: Advanced Features
- [ ] Bluetooth transmitter
- [ ] Audio processing
- [ ] Multi-room capabilities
- [ ] Voice control

### Phase 4: Polish & Production
- [ ] Professional enclosure design
- [ ] Installation automation
- [ ] Documentation and setup guides
- [ ] Performance optimization

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
sudo apt install python3-flask
# or use virtual environment:
python3 -m venv venv
source venv/bin/activate
pip install flask

# Install audio services
curl -sS https://dtcooper.github.io/raspotify/install.sh | sh
sudo apt install shairport-sync

# Run web interface
python app.py
```

Access via: `http://audio-box.local:8080`

## Contributing

This project is currently in active development. Contributions welcome for:
- Mobile UI/UX improvements
- Audio processing features
- Hardware integration
- Documentation

## Hardware Requirements

### Minimum Setup
- Raspberry Pi Zero 2 W (£15)
- USB Audio Interface with phono input (£25)
- MicroSD card (£8)
- Basic enclosure and cables (£15)
- **Total: ~£65**

### Recommended Setup
- Raspberry Pi 4 for better performance
- Higher-quality USB audio interface
- Custom enclosure with physical controls
- LED status indicators

## Future Hardware Considerations

- **USB Bluetooth Adapter** - For improved Bluetooth audio reliability
- **Pi HAT Audio Interfaces** - Higher quality DAC/ADC integration
- **GPIO Expansion** - Physical buttons and rotary encoders
- **Display Integration** - Small OLED for status display
- **Power Management** - Smart power switching for connected devices

## Project Goals

1. **Simplicity** - One-button source switching
2. **Quality** - Audiophile-grade audio path where possible
3. **Accessibility** - Mobile-first, intuitive interface
4. **Extensibility** - Modular design for future features
5. **Cost-Effective** - DIY alternative to expensive commercial solutions

## License

MIT License - Open source hardware and software project

## Acknowledgments

- Raspotify project for Spotify Connect integration
- Shairport-sync for AirPlay functionality
- Behringer for affordable USB audio interfaces
- Raspberry Pi Foundation for accessible computing hardware