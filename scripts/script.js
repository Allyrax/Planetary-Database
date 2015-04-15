$(document).ready(function(e) {
    update();
});

window.setInterval(function() {
	update();
}, 5000);

function update() {
	$("#theTweets").empty();
	
	$.ajax({
        type: "GET",
        url: "/tweets",
        dataType: 'json',
        success: function (data) {
        	console.log('success', data);
			$.each(data, function(i, val) {
				$("#theTweets").append("<li>" + val.hashtag + " " + val.sentence + "</li>");
			});
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log('error', errorThrown);
      }
	});
}

function tweet() {
	hashtag = $("#hashtag").val();
	
	var illegalChars = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	while (illegalChars.test(hashtag)) {
	    hashtag = hashtag.replace(illegalChars, "");
		console.log(hashtag);
	}
	
	console.log(hashtag.indexOf('#'));
	
	if(hashtag.indexOf('#') == '-1') {
		console.log("does not contain hashtag");
	}
	
	else {
		id = "nothing";
		
		if(hashtag.indexOf(' ') == '-1') {
			sent = hashtag.substr(hashtag.indexOf('#'), hashtag.indexOf(' '));
			hash = hashtag.substr(hashtag.indexOf(' ')+1);
		}
		else {
			hash = hashtag.substr(hashtag.indexOf('#'), hashtag.indexOf(' '));
			sent = hashtag.substr(hashtag.indexOf(' ')+1);
		}
		
		$.ajax({
			
			type: "GET",
			url: "/tweets",
			dataType: 'json',
			success: function (data) {			
				$.each(data, function(i, val) {
					if( (val.hashtag == hash) && (val._id != id) ) {
						deleteIt(val._id);
					}
				});
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log('error', errorThrown);
		  }
		});
		
		$.ajax({
			type: "POST",
			url: "/tweets",
			data: { hashtag: hash, sentence: sent },
			success: function (data) {
				console.log(hash + ' ' + sent);
				console.log('success', data);
				stringId = data.message;
				id = stringId.substr(stringId.indexOf('!')+1);
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log('error', errorThrown);
		  }
		});
	}
};

function deleteIt(id) {
	$.ajax({
        type: "DELETE",
        url: "/tweets/" + id,
        success: function (data) {
        	console.log('success', id);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log('error', errorThrown);
      }
	});
}