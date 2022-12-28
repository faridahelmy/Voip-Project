// 4. Create a user agent and connect.
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

// 5. Send invite on button click.
inviteButton.addEventListener('click', function () {
  inviteButton.disabled = true;
  session = ua.call('salmakishk@salmakishk.onsip.com');

  addListeners();
}, true);

function addListeners() {
  // TODO - This is being simplified next version.

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

  // 6. Keyboard input for DTMF.
document.addEventListener('keydown', function (e) {
  var dtmfTone = String.fromCharCode(e.keyCode);

  ua.sendDTMF(tone);
}, false);

var hangupButton = document.getElementById('hangup');
hangupButton.addEventListener('click', function () {
  ua.hangup();
  // inviteButton.innerHTML = 'Invite';
  inviteButton.disabled = false;
}, false);

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
