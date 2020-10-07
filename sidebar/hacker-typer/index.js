/*
*(c) Copyright 2011 Simone Masiero. Some Rights Reserved. 
*This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 License
*/

$(
	function () {
	    $(document).keydown(
			function (event) {
			    Typer.addText(event); //Capture the keydown event and call the addText, this is executed on page load
			}
		);
	}
);

var Typer = {
    text: null,
    accessCountimer: null,
    index: 0, // current cursor position
    speed: 2, // speed of the Typer
    file: "", //file, must be setted
    accessCount: 0, //times alt is pressed for Access Granted
    deniedCount: 0, //times caps is pressed for Access Denied
    init: function () {// inizialize Hacker Typer
        accessCountimer = setInterval(function () { Typer.updLstChr(); }, 500); // inizialize timer for blinking cursor
        $.get(Typer.file, function (data) {// get the text file
            Typer.text = data;// save the textfile in Typer.text
        });
    },

    content: function () {
        return $("#console").html();// get console content
    },

    write: function (str) {// append to console content
        $("#console").append(str);
        return false;
    },

    makeAccess: function () {//create Access Granted popUp      FIXME: popup is on top of the page and doesn't show is the page is scrolled
        Typer.hidepop(); // hide all popups
        Typer.accessCount = 0; //reset count
        var ddiv = $("<div id='gran'>").html(""); // create new blank div and id "gran"
        ddiv.addClass("accessGranted"); // add class to the div
        ddiv.html("<h1>ACCESS GRANTED</h1>"); // set content of div
        $(document.body).prepend(ddiv); // prepend div to body
        return false;
    },
    makeDenied: function () {//create Access Denied popUp      FIXME: popup is on top of the page and doesn't show is the page is scrolled
        Typer.hidepop(); // hide all popups
        Typer.deniedCount = 0; //reset count
        var ddiv = $("<div id='deni'>").html(""); // create new blank div and id "deni"
        ddiv.addClass("accessDenied");// add class to the div
        ddiv.html("<h1>ACCESS DENIED</h1>");// set content of div
        $(document.body).prepend(ddiv);// prepend div to body
        return false;
    },

    hidepop: function () {// remove all existing popups
        $("#deni").remove();
        $("#gran").remove();
    },

    addText: function (key) {//Main function to add the code
        if (key.keyCode == 18) {// key 18 = alt key
            Typer.accessCount++; //increase counter 
            if (Typer.accessCount >= 3) {// if it's presed 3 times
                Typer.makeAccess(); // make access popup
            }
        } else if (key.keyCode == 20) {// key 20 = caps lock
            Typer.deniedCount++; // increase counter
            if (Typer.deniedCount >= 3) { // if it's pressed 3 times
                Typer.makeDenied(); // make denied popup
            }
        } else if (key.keyCode == 27) { // key 27 = esc key
            Typer.hidepop(); // hide all popups
        } else if (Typer.text) { // otherway if text is loaded
            var cont = Typer.content(); // get the console content
            if (cont.substring(cont.length - 1, cont.length) == "|") // if the last char is the blinking cursor
                $("#console").html($("#console").html().substring(0, cont.length - 1)); // remove it before adding the text
            if (key.keyCode != 8) { // if key is not backspace
                Typer.index += Typer.speed;	// add to the index the speed
            } else {
                if (Typer.index > 0) // else if index is not less than 0 
                    Typer.index -= Typer.speed;//	remove speed for deleting text
            }
            var text = $("<div/>").text(Typer.text.substring(0, Typer.index)).html();// parse the text for stripping html enities
            var rtn = new RegExp("\n", "g"); // newline regex
            var rts = new RegExp("\\s", "g"); // whitespace regex
            var rtt = new RegExp("\\t", "g"); // tab regex
            $("#console").html(text.replace(rtn, "<br/>").replace(rtt, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(rts, "&nbsp;"));// replace newline chars with br, tabs with 4 space and blanks with an html blank
            window.scrollBy(0, 50); // scroll to make sure bottom is always visible
        }
        if (key.preventDefault && key.keyCode != 122) { // prevent F11(fullscreen) from being blocked
            key.preventDefault()
        };
        if (key.keyCode != 122) { // otherway prevent keys default behavior
            key.returnValue = false;
        }
    },

    updLstChr: function () { // blinking cursor
        var cont = this.content(); // get console 
        if (cont.substring(cont.length - 1, cont.length) == "|") // if last char is the cursor
            $("#console").html($("#console").html().substring(0, cont.length - 1)); // remove it
        else
            this.write("|"); // else write it
    }
}ss the send button to send the message that we write 
   $ ( '# bt-send' ) . click ( function ( event )  { 
       enviarMensaje ( $ ( '#MSG' ) . val ( ) ) ; 
       $ ( '#MSG' ) . val ( '' ) ; 
   } ) ;
 
    //Creamos un onjeto Pusher que recibe como parametro la KEY
    var pusher = new Pusher('9cc0bc2e04c995ae545e');
    //Suscribirnos a un canal de comunicacion...en este caso llamado chat
    var channel = pusher.subscribe('chat');
    //Escuchamos un evento...en este caso llamado mensaje... cuando escuche por el evento entonces mostrara el mensaje recibido
    channel.bind('mensaje', function(data) {
        //Sacamos la fecha del mensaje
        fecha = new Date();
        //de la fecha tomamos nadamas la hora
        hora = fecha.toString().split(' ');
        //Formamos nuestro mensaje 
        cad = '<li class="left clearfix"><span class="chat-img pull-left">'+
              '<img src="http://placehold.it/50/FA6F57/fff&text=CHAT" alt="User Avatar" class="img-circle" />'+
                '</span>'+
                '<div class="chat-body clearfix">'+
                '<div class="header">'+
                '<strong class="primary-font">'+data.usuario+'</strong> <small class="pull-right text-muted">'+
                '<span class="glyphicon glyphicon-time"></span>'+hora[4]+'</small>'+
                '</div>'+
                '<p>'+data.mensaje+
                '</p>'+
                '</div>'+
                '</li>';
 
        // We add the message to the div 
        $ ( '#mensajes' ) . append ( ch ) ; 
        // We ... Automatic scroll to see the last mensake 
        $ ( "#divmsg" ) . scrollTop ( $ ( "#mensajes" ) [ 0 ] . scrollHeight + 50 ) ; 
        // If Nostros send the message that we do not title flashes 
        if ( user =! data. user ) startFlashTitle ( 'New Message' ) ; 
    } ) ;
 
    // When we click on a face formed the message to send 
    $ ( '.emo' ) . click ( function ( event )  { 
        msg =  "<img src =" ' + esta . src + '"width =" 40 "height = "40" /> ' ; 
        enviarMensaje ( msg , true ) ; 
    } ) ;
 
} ) ;
 
 
/ * This function sends a message by clicking "Send Message", it first checks if there is already a user name
If not, then create one (unique ID), after the jQuery $ .get function is used to send the message to the server * /
 
function enviarMensaje(msg,emo){
    if(emo == undefined)emo = false;
 
    // Comprovamos that the message is empty ... if we do not send anything haci 
    if ( trim ( msg ) . length  ==  0 ) return ; 
    // We check if a name was already chosen 
    the message to the server using AJAX 
    $. get ( 'server.php' , { user : user , message : msg , emoticone : emo } , function ( data ) { } ) ; }
        
    
    
        
     
    

 
// Function that removes the spaces from a string 
function trim ( string ) { 
       string = string. replace ( / ^ \ s + / , '' ) . replace ( / \ s + $ / , '' ) ; 
       return ( string ) ; 
}
