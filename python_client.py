#
#  Author: M.Dibay 
#  Date: June, 28, 16
#

from websocket import create_connetion 

WEB_SOCKET_URL = 'ws://localhost:8080'

print("Connecting socket")

ws = create_connetion(WEB_SOCKET_URL)

print("Socket is connected")

try: 
	while 1: 
		#here we get the data in json format 
		# data = {
		#   app: "app1", 
		#   user: "user1", 
		#   data: {}
		# }
		# Now we send the data to the websocket server
		ws.send(data)
except KeyboardInterrupt: 
	println("Stopped.")
	sys.exit()