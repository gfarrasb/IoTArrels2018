# Projecte IOT 2018
# Lectura de dades del port serie d'Arduino
# Dades a mongodb

# import pymongo
from pymongo import MongoClient
import serial, time

arduino=serial.Serial('COM4',9600)
time.sleep(2)

client = MongoClient('mongodb://192.168.1.251:27017/')
db = client.iotDB
collection = db.Machines

 

while True:
    s1,s2,s3,s4,s5 = arduino.readline().decode().strip().split(',')
    print("Corrent Fase 1: ",s1)
    print("Corrent Fase 2: ",s2)
    print("Corrent Fase 3: ",s3)
    print("Nivell: ",s4)
    print("Fluxe: ",s5)
    print("Temperatura: ")
    print("")

    collection.insert_one({
        "Mach_Num":"1",
        "Corrent_Fase1": s1,
        "Corrent_Fase2": s2,
        "Corrent_Fase3": s3,
        "Nivell": s4,
        "Fluxe": s5
        
        })    
    
arduino.close()

