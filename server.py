from flask import Flask
import socketio
import eventlet
import json
from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="latlngVerifying")

with open('server_config.json') as json_data_file:
    data_server = json.load(json_data_file)

SERVER = data_server.get('server')
REQUESTS = []

APP = Flask(__name__)
SIO = socketio.Server()
ADMIN_SID = ""

@SIO.on('connect')
def on_connect(sid, data):
    print('user connected ' + sid)

@SIO.on('saveAdminSid')
def on_saveAdminSid(sid):
    global ADMIN_SID
    global REQUESTS
    ADMIN_SID = sid
    if len(REQUESTS) > 0:
        SIO.emit('unhandledLocations', REQUESTS, room=ADMIN_SID)
        REQUESTS = []


@SIO.on('handleLatLng')
def on_handleLatLng(sid, data):
    locationString = str(data["lat"]) + ', ' + str(data["lng"])

    try:
        location = geolocator.reverse(locationString)
        address = location.address
    except:
        address = 'Unknown address'
    data = {
        'address': address,
        'sid': sid
    }
    if ADMIN_SID == '':
        global REQUESTS
        REQUESTS.append(data)
    else:
        SIO.emit('activateAddress', data, room=ADMIN_SID)

@SIO.on('activate')
def on_activate(sid, userSid):
    SIO.emit('changeMarkerColor', room=userSid)

@SIO.on('ignore')
def on_activate(sid, userSid):
    SIO.emit('ignore', room=userSid)

@SIO.on('disconnect')
def on_disconnect(sid):
    print('disconnect ' + sid)
    global ADMIN_SID
    if sid == ADMIN_SID:
        ADMIN_SID = ''

if __name__ == '__main__':
    APP = socketio.Middleware(SIO, APP)
    eventlet.wsgi.server(eventlet.listen((SERVER.get('host'), SERVER.get('port'))), APP)
