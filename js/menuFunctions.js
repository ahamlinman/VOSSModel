$(function() {
    var loadHandler = function() {
        // The flythrough video starts out as a placeholder that explains the Flash requirement
        // If Flash player is installed, we can get rid of that and embed Popcorn Maker instead
        var flythruPlaceholder = $("#fly-thru-placeholder");
        if(flythruPlaceholder.length > 0 && swfobject.getFlashPlayerVersion().major !== 0) {
            flythruPlaceholder.replaceWith(
                $("<iframe>")
                    .attr("src", flythruPlaceholder.attr("data-src"))
                    .attr("mozallowfullscreen", true)
                    .attr("webkitallowfullscreen", true)
                    .attr("allowfullscreen", true)
                    .addClass("fly-thru")
            );
        }

        // The loading curtain is a full-page animation shown on page load
        $(".loading-curtain").fadeTo("slow", 0, function() {
            $(".loading-curtain").css("z-index","-100");
        });
    }
    
    loadHandler();
    
    var planetNames = [
        "sun", "mercury", "venus", "earth", "mars",
        "asteroid", "jupiter", "saturn",
        "uranus", "neptune", "kuiper"
    ];

/***********************************
 * Navigation and history handling *
 **********************************/

    /**
     * Function called whenever history state changes. This includes when navbar
     * links are clicked, when the back button is used, etc. The callback function
     * is called when the page load is complete and can be used to ensure that the
     * page is ready to be properly viewed.
     */
    var loadPage = function(url) {
        $("#mainContainer").load(encodeURI(url) + " #wrapper", "", function(responseText) {
        	// Ensure that the Twitter plugin is visible wherever it is used
            // Without this, it will not load when the homepage is loaded via this function
            if(typeof twttr !== "undefined") {
                twttr.widgets.load();
            }
            
            // If on mobile, ensure that any expanded navigation is hidden
            $(".collapse").each(function() {
                if($(this).attr("class").split(" ").indexOf("in") >= 0) {
                    $(this).collapse("hide");
                }
            });
            
            // Call functions required on every page load
            loadHandler();
            
            // Reset the title of the page
            var dummyElement = $(document.createElement("dummy")).html(responseText);
            var title = $(dummyElement).find("title").text();
            document.title = title;
        });
    };

    /**
     * Handler to ensure that inner link clicks utilize the XHR loading technique
     * This is especially important for the orb animation on planet links
     */
    $("header a, .actionbox .btn").click(function(event) {
        var data = {};
        
        // If this is a planet link, include info required for orb animation
        var link = event.currentTarget;
        if(planetNames.indexOf(link.parentElement.id) > -1) {
            data["planet"] = link.parentElement.id;
        }
        
        if(window.scrollY > 0) {
            $("html, body").animate({ scrollTop: 0 });
        }
        
        History.pushState(data, null, this.href);
        event.preventDefault();
    });

    /**
     * Handler called whenever the history state of the page is pushed or popped.
     * For the record, this isn't how HTML5's history API works, but it's how History.js
     * is set up. This means that the same loading code is used whether we are clicking
     * a link or using the back/forward buttons in the browser.
     *
     * There has been much gnashing of teeth about this online, but some concerns
     * are quite valid: e.g. if the user is on a slow connection, they will see the
     * URL change in their browser with no new content to show for it. I think the
     * intent is that we will display some sort of loading spinner immediately when
     * the handler is called, which means that we need to look into changing the
     * spinner implementation.
     *
     * This loads whatever new content is necessary by calling loadPage and performs
     * any necessary animation tasks.
     */
    $(window).bind("statechange", function() {
        var state = History.getState();
        
        loadPage(state.url);
        
        // Perform orb animation if this state is a planet page
        if(state.data && "planet" in state.data) {
            showOrb(state.data["planet"]);
        } else {
            hideOrb();
        }
    });

    /**
     * Ensure that the proper page is loaded when the History.js HTML 4 hash fallback
     * is used and a link is copy-pasted into the URL bar.
     */
    if(History.getState().hash !== "/index.php") {
        loadPage(History.getState().url);
    }

/***********************************
 * Animation for planet links menu *
 **********************************/
    
    /**
     * Make the orb visible and animate it to its proper color, size, and position.
     */
    var showOrb = function(planetName) {
        $("#orb").attr("class", "active " + planetName);
    };
    
    /**
     * Make the orb invisible when we are not viewing a planet page.
     */
    var hideOrb = function() {
        $("#orb").removeClass("active").addClass("inactive");
    };

/**************************************
 * Twitter widget initialization code *
 *************************************/
	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0],
			p = /^http:/.test(d.location) ? 'http' : 'https';
		if (!d.getElementById(id)) {
			js = d.createElement(s);
			js.id = id;
			js.src = p + "://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js, fjs);
		}
	})(document, "script", "twitter-wjs");

/********************************
 * Add js class to root element *
 ********************************/
 	$("html").removeClass("no-js").addClass("js");

});