var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('../ha.db');

db.serialize(function(){
    db.run("CREATE TABLE IF NOT EXISTS device (device_id INTEGER NOT NULL, name TEXT NOT NULL, type TEXT, location TEXT, picture BLOB, PRIMARY KEY(device_id))");
    db.run("CREATE TABLE IF NOT EXISTS sensor (device_id INTEGER NOT NULL, sensor_id INTEGER NOT NULL, name TEXT, type TEXT, unit TEXT, PRIMARY KEY(device_id, sensor_id))");
    db.run("CREATE TABLE IF NOT EXISTS sensordata (device_id INTEGER NOT NULL, sensor_id INTEGER NOT NULL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, val_string TEXT, val_int INTEGER, val_real REAL)");    
});

db.run("INSERT OR IGNORE INTO device (device_id, name, type) VALUES (1, 'Wetter Station', 'Tinkerforge')");
db.run("INSERT OR IGNORE INTO sensor (device_id, sensor_id, name, type, unit) VALUES (1, 1, 'Temperatur Sensor', 'Tinkerforge', 'Grad')");
db.run("INSERT OR IGNORE INTO sensor (device_id, sensor_id, name, type, unit) VALUES (1, 2, 'Luftfeuchtigkeit', 'Tinkerforge', '%RH')");
db.run("INSERT OR IGNORE INTO sensor (device_id, sensor_id, name, type, unit) VALUES (1, 3, 'Luftdruck', 'Tinkerforge', 'mBar')");

db.run("INSERT OR IGNORE INTO device (device_id, name, type) VALUES (2, 'Solar Inverter', 'Sunways')");
db.run("INSERT OR IGNORE INTO sensor (device_id, sensor_id, name, type, unit) VALUES (2, 1, 'Solar Inverter', 'Sunways', 'kWH')");
