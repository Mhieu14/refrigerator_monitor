
$(function(){
   	//make connection
	var socket = io.connect('http://localhost:3003')
	console.log(socket)
	//buttons and inputs
	var message_humidity = $("#message_humidity")
	var message_temperature = $("#message_temperature")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")
	
	socket.emit('source', 'browser')
	
	//Emit message
	send_message.click(function(){
		socket.emit('monitor_parameter', {
			message_humidity : message_humidity.val(),
			message_temperature : message_temperature.val()
		});
	})

	//Listen on new_message
	socket.on("measurement_result", (data) => {
		console.log(data);
		feedback.html('');
		chatroom.append("<p class='message'> time: " + data.time + " - humidity: " + data.humidity + " - temperature: " + data.temperature + "</p>")
	})
});

function submitMessage() {
      alert("Saved value to ESP SPI Flash File System");
      setTimeout(function () { document.location.reload(false); }, 500);
    }


