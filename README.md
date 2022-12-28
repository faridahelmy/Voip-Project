# Voip-Project
Voip Application using SIP API

## Project Description 
In this project, the aim is to create an application using the SIP.js API. This application should allow a sip connection between two different users where different media types are being shared. The first step in our implementation is to be able to use one of the online phone services provided. Following the sip.js guide, we used onsip.com to create two accounts to be used in our application. We then construct in our implementation two simpleUsers: the caller and the callee, to experiment with the API to establish the connection between those two users. Our implemented application allows users to establish video calls over the internet with different features. The users have the option to close the camera to continue having an audio call instead.
## Important Diagrams
Important diagrams that highlight how our application operates. 
The following diagram shows the hierarchy of out project and how we rely on the SIP API and onsip server to form the VOIP call. 
![diagram files](https://drive.google.com/uc?id=1JltfoUL3Z4ltZ-e6LgPlfWEMHuccAOjP)

The next diagram shows how the session initiation is established and how the call is made. 
![call diagram](https://drive.google.com/uc?id=1ioH5paIp7mvzPz5asPM2y9lxoRY9cAJw)

## Source Code 
### SIP.js API 
The SIP API is the tool that helps us connect the caller to the callee, by initializing the caller in the user agent method provided in the SIP library, by using the method SIP.Web.Simple where we pass our simpleUser that will play the role of the caller. We specify the callee by using the method ua.call() that enables the initialized user agent to call the other user. We also use from the SIP library the function ua.hangup(), ua.mute() and ua.unmute() when building the functionalities of our application.
### Main.js
This is the driver class of our application, where we call the SIP Api and identify the caller and the callee, alongside the multiple functionalities in our applications, the source code of our Main class could be devided as follows
**Creating a user agent and connecting**
```
var inviteButton = document.getElementById('invite');
var body = document.getElementById('bodytext');
var remoteMedia = document.getElementById('remote');
var remoteVideo = document.getElementById('remote-video');
var ua = new SIP.Web.Simple({
ua: {
traceSip: true,
uri: 'sip:faridahelmy@faridahelmy.onsip.com',
displayName: 'Farida Helmy',
from: 'sip:faridahelmy@faridahelmy.onsip.com'
},
media: {
remote: {
audio: remoteMedia,
video: remoteVideo,
}
}
});
remoteMedia.volume = 0.5;
var session;
```
**Send invite on button click**
```
inviteButton.addEventListener('click', function () {
inviteButton.disabled = true;
session = ua.call('salmakishk@salmakishk.onsip.com');
addListeners();
}, true);
```
**The addListeners() Function**
```
function addListeners() {
// Let's get some status events.
session.on('progress', function () {
body.innerHTML = 'Ringing...';
});
session.on('accepted', function () {
body.innerHTML = 'Connected!';
});
session.on('failed', function () {
body.innerHTML = 'Call failed. Try again?';
inviteButton.disabled = false;
});
session.on('bye', function () {
body.innerHTML = 'Bye! Invite Another?';
inviteButton.disabled = false;
});
}
```
**Hanging up on button click**
```
var hangupButton = document.getElementById('hangup');
hangupButton.addEventListener('click', function () {
ua.hangup();
// inviteButton.innerHTML = 'Invite';
inviteButton.disabled = false;
}, false);
```
**Mute and unmute on button click**
```
var mute = document.getElementById('mute');
mute.addEventListener('click', function () {
if (mute.classList.contains('on')) {
ua.unmute();
mute.classList.remove('on');
} else {
ua.mute();
mute.classList.add('on');
}
}, false);
```
### index.html 
This is the file that constructs the frontend of our application, where we initialize the buttons and the way we incorporate the video and audio call and we include in its script the sip.js API. The code of out html page is as follows: 
```
<!DOCTYPE  html>
<html>
<head>
<link  rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
VOIP call
<!-- 1. HTML boilerplate code -->
</head>
<body>
<link  rel="stylesheet"  type="text/css"  href="styles.css">
<div  class="button-container">
<video  id="remote-video"  autoplay></video>
<!-- 2. Let's make our user interface -->
<button  id="invite">  <i  class="fa fa-user-plus"></i>  </button>
<audio  id="remote"></audio>
<button  id="mute"  class="off">  <i  class="fa fa-microphone-slash"></i></button>
<button  id="hangup">  <i  class="fa fa-phone-slash"></i></button>
</div>
<div  id="bodytext"></div>
<!-- 3. Include SIP.js -->
<script  src="http://sipjs.com/download/sip-0.13.5.js"></script>
<script  src="main.js"></script>
<script>
if (window.location.hash === '#dev') {
var i = 1;
window.setInterval(function () { console.log(i); i++; }, 950);
window.setTimeout(function () { window.location.reload(); }, 10000);
}
// Reload the page after 10 seconds if the #dev hash is present
if (window.location.hash === '#dev') {
var i = 1;
window.setInterval(function () { console.log(i); i++; }, 950);
window.setTimeout(function () { window.location.reload(); }, 10000);
}
</script>
</body>
</html>
```
### styles.css
The css file styles the layout of our html file by specifying the look of the buttons and the outline of our application
```
/* Set the default font and background color */
body {
    font-family: Arial, sans-serif;
    background-color: #87a7bee0;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
  }
  
  .video-component{
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
  }
  
  #bodytext{
    font-size: 20pt;
    padding-bottom: 5px;

  }
  /* Style the video element */
  #remote-video {
    width: auto;
    height: 500px;
    border-radius: 4px;
    box-shadow: 0 7px 7px rgba(0, 0, 0, 0.1);
    margin: auto;
    justify-content: center;
    background-color: white;

  }
  
  /* Style the buttons */
  button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #0072c6;
    color: white;
    font-size: 16px;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
    
  }
  #mute {
    background-color: #0052cc;
    margin: 10px;
  }

  #mute:hover {
    background-color: #003d99;
  }

 #mute:focus:not(:active),
  button[aria-pressed="true"]:focus {
    background-color: #002b66; /* press color */
  }
  
  /* use the :checked pseudo-class to toggle the aria-pressed attribute on the button */
  input[type="checkbox"]:checked + label[for] {
    aria-pressed: not(aria-pressed);
  }
    
  /* Style the mute button */
  #hangup {
    background-color: #cc3333;
    margin: 10px;
  }
  
  #hangup:hover {
    background-color: #990000;
  }
  
  #invite {
    background-color: #2ecc71;
    margin: 10px;

  }
    
  #invite:hover {
    background-color: #27ae60;
  }

  /* Add a header */
  header {
    background-color: #00b0f0;
    background-repeat: no-repeat;
    background-position: center;
    color: white;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;  }
  
  /* Style the header elements */
  h1 {
    margin: auto;
    font-size: 50px;
    font-weight:bold;
    text-align: center;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 10px;
  }
  
  header h2 {
    margin: 0;
    font-size: 16px;
    font-weight: normal;
  }
  
  /* Style the button container */
  .button-container {
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:center;
    bottom: 0;      
  }
  
  button:before {
    content: "";
    display: inline-block;
    width: 25px;
    height: 25px;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
```
## Tests 
The following screenshot shows the initializing of the call and how it prompts to the user to allow access to the camera and the microphone to initiate the call. 

![allow](https://drive.google.com/uc?id=1RcEIAEZEWkSGC1ctcHmhmGowHTHe2PvA)

The following screenshot shows the ringing procedure to our end, indicating the initiation of the session and that the request is sent to the other end.

![ringing](https://drive.google.com/uc?id=1unWohT6yWMsYh_tjITG_yD_AFcfIvMjg)

The following screenshot shows the call request from the caller, in this case Farida, that was sent from our web page. 

![call from farida](https://drive.google.com/uc?id=14EclywuPNGRDwJkb2v8whycfsGjdann7)

The following screenshots show the call in progress on both ends, denoting a successful connection. 

![call from web end](https://drive.google.com/uc?id=1i5RdJbgYI8lE9ysbzT9_1swWTxMvpo6T)

![call on salma's end](https://drive.google.com/uc?id=12ywAWzEhYIXXWtXHCyys2p3oeluaBej4)

Once we end the call, the connection will terminate and the status of our web page will change as follows: 

![endcall](https://drive.google.com/uc?id=1HzZb-bJGNzkeMVIkv2Ik0Ggg5QHW3G2T)

If the call was canceled from any of the users, the status of our web page will change as follows:

![failed](https://drive.google.com/uc?id=1qPX6wtIbgVeQCwAG3SzTjm4kwOhEdZn4)

## Performance 
We noticed that the performance of our established call is great, audio and video are clear however it lags depending on the internet speed which is expected since this is a Voip call. 
## Conclusions and Limitations

To conclude, our project successfully establishes a connection between the two simpleusers that we initiated. And an audio and video call is well connected. Transfer of data using the SIP.js API is great, however we note that it has its own limitations such as we cannot do call transfers and we need to have one simultaneous call at a time. 
## Group Contributions

## References 
https://www.onsip.com/
https://sipjs.com/guides/simple-user/
https://developer.onsip.com/docs/guides/b-webrtc-phone

