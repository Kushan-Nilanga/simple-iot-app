import paho.mqtt.client as mqtt
from gpiozero import MotionSensor
from signal import pause
import datetime

pir1 = MotionSensor(14)
pir2 = MotionSensor(15)

host_name = "13.236.90.194"

client = mqtt.Client("motion sensor client")
client.connect(host_name)

def change(sensor):
    client.publish(f"motion/{sensor.pin}", f"Motion: {sensor.is_active}, Trigger Time: {datetime.datetime.now()}")
    print(sensor)

pir1.when_motion = change
pir1.when_no_motion = change

pir2.when_motion = change
pir2.when_no_motion = change

pause()
