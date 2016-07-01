#
#  Author: Mohammad Dibay 
#  Date: June, 26, 16
#
import websocket
from websocket import create_connection
import time
import sys


WEB_SOCKET_URL = 'ws://127.0.0.1:9090'

print("Connecting socket")

ws = create_connection(WEB_SOCKET_URL)

print("Socket is connected")
try: 
	while 1: 
		#here we get the data in json format 
		# data shuold include the client type. 
		# Node server distinguesh clients (python, web) based on this value. 
		# Since this is a one to one communication throw websocket, we need to pass 
		# the username along to the node server. 
		# data = {
		#   "client": "python", "user" : "username"...
		# }
		# Now we send the data to the websocket server
		ws.send(data)
		time.sleep(1)
except KeyboardInterrupt: 
	println("Stopped.")
	sys.exit()
