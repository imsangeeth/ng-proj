var callObj1=null, callObj2=null;
var callmap={};
//1. Initializing the SDK
var cli = new AWL.client();

$(document).ready(function() {

    //var cli = AWL.client.getInstance();
        cli.enableLogging();
        var cfg = { 
            serviceType: "phone",
            enableVideo: true,
            Gateway: {ip: "ipose.inaipi.me",port: "9443"},
            Stunserver: {ip: "", port: "3478"},
            Turnserver: {ip: "", port: "3478", user: "shoftphone@ipose.inaipi.me", pwd: ""}
        };

        var tags = {
            localVideo : "lclVideo",
            remoteVideo : "rmtVideo"
        };

        var onCallListener = new CallListener();
        if(cli.setConfiguration(cfg, onConfigChanged, onRegistrationStateChanged)==="AWL_MSG_SETCONFIG_SUCCESS"){
            console.log("\nSETCONFIG SUCCESS");
        }

        if(cli.setConfiguration(cfg, onConfigChanged, onRegistrationStateChanged, onCallListener)==="AWL_MSG_SETCONFIG_SUCCESS"){
            console.log("\nSETCONFIG SUCCESS");
        }

        if(cli.setDomElements(tags)==="AWL_MSG_SETDOM_FAILED"){
            console.log("\nSETDOM FAILED");
        }
        else{
            console.log("\nSETDOM PASS");
        }

        cli.logIn('2006','602066', "true");
    

    $('#deviceList').click(function(){
        cli.getDeviceList(onDeviceListFound);
    });

    $("#deviceSelected").click(function(){
        console.log("Devices Selected ");
            var selectedDeviceIds = {
                audioInputID : $('input[name=audioInput]:checked').val(),
                videoInputID: $('input[name=videoInput]:checked').val(),
                audioOutputID: $('input[name=audioOutput]:checked').val(),
                defaultId : true
            };

            cli.setDeviceIds(selectedDeviceIds);

            $('#deviceListTable').hide();
            $("#audioInputTable,#videoInputTable,#audioOutputTable").children().remove();
    });

    $("#deviceListClose").click(function(){
        $('#deviceListTable').hide(); 
        $("#audioInputTable,#videoInputTable,#audioOutputTable").children().remove();
    });

    //first call
    $('#call').click(function() {
        callObj1=cli.makeCall("6616", "audio");
        console.log("callobj1 callId : "+callObj1.getCallId());
        console.log("callobj1 callState : "+callObj1.getCallState());
        callmap[callObj1.getCallId()]=callObj1;
    });

     function dailpad(sa)
     {
        alert(sa);

        callnumber = $('#calltocall').val();
        var num = item.toString();    
        callnumber += num;  
        $('#calltocall').val(callnumber);

     }





	
	$('#dailcall').click(function() {

        var callnumber = $('#calltocall').val();
		
        callObj1=cli.makeCall(callnumber, "audio");
        console.log("callobj1 callId : "+callObj1.getCallId());
        console.log("callobj1 callState : "+callObj1.getCallState());
        callmap[callObj1.getCallId()]=callObj1;
    });
	
	$('#dailcall2').click(function() {
		var dailcalls_au = $('#dailval').val();
        callObj1=cli.makeCall(""+dailcalls_au+"", "audio");
        console.log("callobj1 callId : "+callObj1.getCallId());
        console.log("callobj1 callState : "+callObj1.getCallState());
        callmap[callObj1.getCallId()]=callObj1;
    });

    $('#end').click(function() {
        cli.dropCall(callObj1.getCallId());
    });

    $('#mute').click(function(){
        if(cli.doMute(callObj1.getCallId())){
            console.log("Mute SUCCESS");
        }
    });

    $('#unmute').click(function(){
        if(cli.doUnMute(callObj1.getCallId())){
            console.log("UNmute SUCCESS");
        }
    });

    $('#hold').click(function(){
        cli.doHold(callObj1.getCallId());
    });
    
    $('#unhold').click(function(){
        cli.doUnHold(callObj1.getCallId());
    });    
    
    $('#pauseVid').click(function(){
        if(cli.pauseVideo(callObj1.getCallId())){
            console.log("video pause SUCCESS");
        }
    });
    
    $('#resumeVid').click(function(){
        if(cli.playVideo(callObj1.getCallId())){
            console.log("video resume SUCCESS");
        }
    });    

    $('#d1').click(function(){

        cli.sendDTMF(callObj1.getCallId(), 1);
    });

    $('#d9').click(function(){
        cli.sendDTMF(callObj1.getCallId(), 9);
    });

    $('#dA').click(function(){
        cli.sendDTMF(callObj1.getCallId(), 'A');
    });

    $('#answer').click(function(){
        $('#snackbarcall').hide();
        $('#snackbarcalladd').show();
        cli.answerCall(callObj1.getCallId());
       
    });

    $('#callUpgrade').click(function(){
        cli.addVideo(callObj1.getCallId());
    });     

    $('#callDowngrade').click(function(){
        cli.removeVideo(callObj1.getCallId());
    });
    
    //second call
    $('#call2').click(function() {
        callObj2=cli.makeCall("7003", "audio");
        console.log("callObj2 callId : "+callObj2.getCallId());
        callmap[callObj2.getCallId()]=callObj2;
    });

    $('#end2').click(function() {
        cli.dropCall(callObj2.getCallId());
    });

    $('#mute2').click(function(){
        if(cli.doMute(callObj2.getCallId())){
            console.log("Mute SUCCESS");
        }
    });

    $('#unmute2').click(function(){
        if(cli.doUnMute(callObj2.getCallId())){
            console.log("Unmute SUCCESS");
        }
    });

    $('#hold2').click(function(){
        cli.doHold(callObj2.getCallId());
    });
    
    $('#unhold2').click(function(){
        cli.doUnHold(callObj2.getCallId());
    });       


    $('#answer2').click(function(){
        cli.answerCall(callObj2.getCallId());
    });

    $('#logout').click(function(){
        cli.logOut();
    });

});


function onConfigChanged(resp){
    console.log('\n onConfigChanged :: RESULT = ' + resp.result);
    console.log('\n onConfigChanged :: reason = ' + resp.reason);
}

function onRegistrationStateChanged(resp){
    console.log('\n onRegistrationStateChange :: RESULT = ' + resp.result);
    console.log('\n onRegistrationStateChange :: reason = ' + resp.reason);
    if(resp.result === "AWL_MSG_LOGIN_SUCCESS") {
        $('#login').hide();
        $('#1stcall').show();
        $('#1stcall').css('display', 'inline-block');
        $('#dtmfpad').show();
        $('#dtmfpad').css('display', 'inline-block');
        $('#deviceList').show();
        $('#deviceList').css('display', 'block');
    }
    else{
        $('#1stcall').hide();
        $('#2ndcall').hide();
    }
}

function onDeviceListFound(deviceList){
     console.log('\n onDeviceListFound: '+deviceList);
     $('#deviceListTable').show();
     $('#deviceListTable').css('display', 'block');
     $("#audioInputTable,#videoInputTable,#audioOutputTable").children().remove();
     if(deviceList.length !== 0){
             $.each(deviceList, function (index, value) {
                 if(value[0] === "audioinput"){
                     $("#audioInputTable").append("<tr><td>"+value[1]+"</td><td><input type='radio' class='radioButton' style='float:right;' name='audioInput' value="+value[2]+" /></td></tr>");
                 }else if(value[0] === "videoinput"){
                     $("#videoInputTable").append("<tr><td>"+value[1]+"</td><td><input type='radio' class='radioButton' name='videoInput' value="+value[2]+" /></td></tr>");
                 }else if(value[0] === "audiooutput"){
                     $("#audioOutputTable").append("<tr><td>"+value[1]+"</td><td><input type='radio' class='radioButton' name='audioOutput' value="+value[2]+" /></td></tr>");
                 }
             });
         }
}

var CallListener = function () {
    var _onNewIncomingCall = function (callId, callObj, autoAnswer) {

        $('#snackbarcall').show();

        console.log("onCallListener : onNewIncomingCall");
        console.log("onNewIncomingCall : getFarEndNumber = "+callObj.getFarEndNumber());
        console.log("onNewIncomingCall : getFarEndName = "+callObj.getFarEndName());
        console.log("onNewIncomingCall : getSipUri = "+callObj.getSipUri());
		console.log("onNewIncomingCall : autoAnswer = "+autoAnswer);
		
        if (typeof(callmap[callId]) === 'undefined') {
            console.log("\n onCallStateChanged : New incoming CALL OBJECT ADDED");        
            if (callObj1 === null) {
                console.log("\n onCallStateChanged : CallObj assigned to callObj1");
                callObj1 = callObj;
                callmap[callObj1.getCallId()] = callObj1;
            }
            else if (callObj2 === null) {
                console.log("\n onCallStateChanged : CallObj assigned to callObj2");
                callObj2 = callObj;
                callmap[callObj2.getCallId()] = callObj;
            }
            else {
                console.log("\n onCallStateChanged : ALL LINES BUSY!!");
            }	
        }
    };
    var _onCallStateChange = function (callId, callObj, event) {
        console.log("\nSDK TEST: onCallStateChanged: ");
        console.log("\nSDK TEST: call Id " + callObj.getCallId());

        for (var key in callmap) {
            console.log("callMap[" + key + "]");
        }

        if (callObj.getCallId() === callObj1.getCallId()) {
            console.log("\nSDK TEST: callObj1: Call ID Matched");
            console.log("\n callObj1: callstate: " + callObj1.getCallState());
            switch (callObj1.getCallState()) {
                case "AWL_MSG_CALL_IDLE":
                    break;
                case "AWL_MSG_CALL_CONNECTED":
                    $('#2ndcall').show();
                    $('#2ndcall').css('display', 'inline-block');
                    break;
                case "AWL_MSG_CALL_RINGING":
                    break;
                case "AWL_MSG_CALL_DISCONNECTED":
                    break;
                case "AWL_MSG_CALL_FAILED":
					if(callmap[callObj1.getCallId()] !== null){
						delete callmap[callObj1.getCallId()];
						callObj1 = "";
					}				
                    break;
                case "AWL_MSG_CALL_INCOMING":
                    break;
                case "AWL_MSG_CALL_HELD":
                    break;
                case "AWL_MSG_CALL_FAREND_UPDATE":
                    console.log("onCallStateChange  : getFarEndNumber = "+callObj1.getFarEndNumber());
                    console.log("onCallStateChange  : getFarEndName = "+callObj1.getFarEndName());
                    console.log("onCallStateChange  : getSipUri = "+callObj1.getSipUri());
                    break;
                default:
                    console.log("\n CallState doesn't match");

            }

        }

        else if (callObj.getCallId() === callObj2.getCallId()) {
            console.log("\ncallObj2: Call ID Matched");
            console.log("\n callObj2: callstate: " + callObj2.getCallState());
            switch (callObj2.getCallState()) {
                case "AWL_MSG_CALL_IDLE":
                    break;
                case "AWL_MSG_CALL_RINGING":
                    break;
                case "AWL_MSG_CALL_CONNECTED":
                    break;
                case "AWL_MSG_CALL_DISCONNECTED":
                    $('#2ndcall').hide();
                    break;
                case "AWL_MSG_CALL_FAILED":
                    break;
                case "AWL_MSG_CALL_INCOMING":
                    break;
                case "AWL_MSG_CALL_HELD":
                    break;
                case "AWL_MSG_CALL_FAREND_UPDATE":
                    console.log("onCallStateChange : getFarEndNumber = "+callObj2.getFarEndNumber());
                    console.log("onCallStateChange : getFarEndName = "+callObj2.getFarEndName());
                    console.log("onCallStateChange : getSipUri = "+callObj2.getSipUri());
                    break;
                default:
                    console.log("\n CallState doesn't match");

            }

        }
        console.log("\nonCallStateChanged: Total Calls = " + Object.keys(callmap).length);
    };
    
    var _onCallTerminate = function(callObj, reason){
		if(callmap[callObj1.getCallId()] === callObj){
			delete callmap[callObj1.getCallId()];
			callObj1 = null;
		}	
		else if(callmap[callObj2.getCallId()] === callObj){
			delete callmap[callObj2.getCallId()];
			callObj2 = null;
		}	
		else{
			console.log("Call Id doesn't match ");
		}
        console.log("\n callTerminate Reason: "+reason);
        $('#snackbarcall').hide();
          
    };

    var _onVideoStreamsAvailable = function(callId, localStream, remoteStream){
        console.log("\n onVideoStreamsAvailable: callId: "+ callId);
        if(callId == callObj1.getCallId()){
            cli.setMediaStream("lclVideo",localStream,callId,"localVideo");
            cli.setMediaStream("rmtVideo",remoteStream,callId,"remoteVideo");
        }
    };

    var _onAudioStreamsAvailable = function(callId, localStream, remoteStream){
        console.log("\n onAudioStreamsAvailable: callId: "+ callId);
    };
    return{
        onNewIncomingCall: _onNewIncomingCall,
        onCallStateChange: _onCallStateChange,
        onCallTerminate: _onCallTerminate,
        onCallTerminate: _onCallTerminate,
        onVideoStreamsAvailable: _onVideoStreamsAvailable,
        onAudioStreamsAvailable: _onAudioStreamsAvailable
    };

};
