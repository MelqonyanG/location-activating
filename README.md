# Location Activating

Location-Activating is app for activating users' selected locations.

  - if you are logged in as a user, you can select a location
  - if you are logged in as a admin, you can activate or ignore users' selected locations


### Tech

Location-Activating uses a number of open source projects to work properly:
##### client side
* React js
* react-leaflet
* socket.io-client
* Bootstrap

#####   server side
* Python3
* Flask
* eventlet
* socketio
* geopy

### Installation

Location-Activating requires [Node.js](https://nodejs.org/) v4+ and [npm](https://www.npmjs.com/).

Install the dependencies and start the server.
```sh
$ cd location-activating/
$ pip install -r requirements.txt
$ python server.py
```
Install the dependencies and start the client.
```sh
$ cd location-activating/
$ npm install
$ npm start
```
Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```
or
```sh
localhost:3000
```
* To log in as administrator enter **admin** in the username field.
* To log in as user enter any username, select username and click to **send location** button.
