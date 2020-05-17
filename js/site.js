var body = $('body');

var scrolled = false;

$(window).scroll(function() {
    if ($(window).scrollTop() > 10 && scrolled == false) {
        $('.bg').addClass('blur-bg');
        scrolled = true;
    } else if ($(window).scrollTop() == 0) {
        $('.bg').removeClass('blur-bg');
        scrolled = false;
    }
});

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top + 100;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).on('scroll', function() {
    if (isScrolledIntoView('#no-scrolled-nav')) {
        $('#scrolled-nav').addClass('hidden');
    } else {
        $('#scrolled-nav').removeClass('hidden');
    }
});

function toggle_back_to_top_visibility() {
    var ch = $('.content').height();
    var wh = $(window).height() - 50;

    if (ch > wh) {
        $('#back-to-top').removeClass('hidden');
    } else {
        $('#back-to-top').addClass('hidden');
    }
}

$('.nav a').on('click', function() {
    $('.nav a').removeClass('selected');

    let link_id = $(this).attr('href');

    $('.nav a[href="'+link_id+'"]').addClass('selected');

    link_id = link_id.replace('#', '.');
    $('.content-block').removeClass('visible');
    $('.content-block' + link_id).addClass('visible');
    toggle_back_to_top_visibility();
    $(window).scrollTop(0);
});

$(document).ready(function() {
    if ($('.bg').hasClass('blur-bg') && (body.scrollTop() === 0)) {
        $('.bg').removeClass('blur-bg');
    } else {
        $('.bg').addClass('blur-bg');
    }
    toggle_back_to_top_visibility();


    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        isMobile = true;
    }

    if (isMobile) {
        $('body').addClass('mobile--browser');
    } else {
        $('body').addClass('desktop--browser');
    }
});

var initPhotoSwipeFromDOM = function(gallerySelector) {
    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = $(el).find('.photoswipe-item:not(.isotope-hidden)').get(),
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for (var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes
            if (figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            // size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            if ($(linkEl).data('type') == 'video') {
                item = {
                    html: $(linkEl).data('video')
                };
            } else {
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
            }

            if (figureEl.children.length > 1) {
                // <figcaption> content
                item.title = $(figureEl).find('.caption').html();
            }

            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (hasClass(el, 'photoswipe-item'));
        });

        if (!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.closest('.photoswipe-wrapper'),
            childNodes = $(clickedListItem.closest('.photoswipe-wrapper')).find('.photoswipe-item:not(.isotope-hidden)').get(),
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }

            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }

        if (index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            closeOnScroll: false,

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width
                };
            }

        };

        // PhotoSwipe opened from URL
        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();

        gallery.listen('beforeChange', function() {
            var currItem = $(gallery.currItem.container);
            $('.pswp__video').removeClass('active');
            var currItemIframe = currItem.find('.pswp__video').addClass('active');
            $('.pswp__video').each(function() {
                if (!$(this).hasClass('active')) {
                    $(this).attr('src', $(this).attr('src'));
                }
            });
        });

        gallery.listen('close', function() {
            $('.pswp__video').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
        });

    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }

};

// execute above function

initPhotoSwipeFromDOM('.photoswipe-wrapper');

if ($('#back-to-top').length) {
    $('#back-to-top').on('click', function(e) {
        // e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 500);
    });
}


// soundcloud custom player

/*
 *   SoundCloud Custom Player jQuery Plugin
 *   Author: Matas Petrikas, matas@soundcloud.com
 *   Copyright (c) 2009  SoundCloud Ltd.
 *   Licensed under the MIT license:
 *   https://www.opensource.org/licenses/mit-license.php
 *
 *   Usage:
 *   <a href="soundcloud-link" class="sc-player">My new track</a>
 *   The link will be automatically replaced by the HTML based player
 */
// Modified script: Chris Chacholiades (2018)
(function($) {
    // Convert milliseconds into Hours (h), Minutes (m), and Seconds (s)
    var timecode = function(ms) {
        var hms = function(ms) {
                return {
                    h: Math.floor(ms / (60 * 60 * 1000)),
                    m: Math.floor((ms / 60000) % 60),
                    s: Math.floor((ms / 1000) % 60)
                };
            }(ms),
            tc = []; // Timecode array to be joined with '.'

        if (hms.h > 0) {
            tc.push(hms.h);
        }

        tc.push((hms.m < 10 && hms.h > 0 ? "0" + hms.m : hms.m));
        tc.push((hms.s < 10 ? "0" + hms.s : hms.s));

        return tc.join('.');
    };
    // shuffle the array
    var shuffle = function(arr) {
        arr.sort(function() {
            return 1 - Math.floor(Math.random() * 3);
        });
        return arr;
    };

    var debug = true,
        useSandBox = false,
        $doc = $(document),
        log = function(args) {
            try {
                if (debug && window.console && window.console.log) {
                    window.console.log.apply(window.console, arguments);
                }
            } catch (e) {
                // no console available
            }
        },
        domain = useSandBox ? 'sandbox-soundcloud.com' : 'soundcloud.com',
        secureDocument = (document.location.protocol === 'https:'),
        // convert a SoundCloud resource URL to an API URL
        scApiUrl = function(url, apiKey) {
            var resolver = (secureDocument || (/^https/i).test(url) ? 'https' : 'http') + '://api.' + domain + '/resolve?url=',
                params = 'format=json&consumer_key=' + apiKey + '&callback=?';

            // force the secure url in the secure environment
            if (secureDocument) {
                url = url.replace(/^http:/, 'https:');
            }

            // check if it's already a resolved api url
            if ((/api\./).test(url)) {
                return url + '?' + params;
            } else {
                return resolver + url + '&' + params;
            }
        };

    // TODO Expose the audio engine, so it can be unit-tested
    var audioEngine = function() {
        var html5AudioAvailable = function() {
                var state = false;
                try {
                    var a = new Audio();
                    state = a.canPlayType && (/maybe|probably/).test(a.canPlayType('audio/mpeg'));
                    // uncomment the following line, if you want to enable the html5 audio only on mobile devices
                    // state = state && (/iPad|iphone|mobile|pre\//i).test(navigator.userAgent);
                } catch (e) {
                    // there's no audio support here sadly
                }

                return state;
            }(),
            callbacks = {
                onReady: function() {
                    $doc.trigger('scPlayer:onAudioReady');
                },
                onPlay: function() {
                    $doc.trigger('scPlayer:onMediaPlay');
                },
                onPause: function() {
                    $doc.trigger('scPlayer:onMediaPause');
                },
                onEnd: function() {
                    $doc.trigger('scPlayer:onMediaEnd');
                },
                onBuffer: function(percent) {
                    $doc.trigger({
                        type: 'scPlayer:onMediaBuffering',
                        percent: percent
                    });
                }
            };

        var html5Driver = function() {
            var player = new Audio(),
                onTimeUpdate = function(event) {
                    var obj = event.target,
                        buffer = ((obj.buffered.length && obj.buffered.end(0)) / obj.duration) * 100;
                    // ipad has no progress events implemented yet
                    callbacks.onBuffer(buffer);
                    // anounce if it's finished for the clients without 'ended' events implementation
                    if (obj.currentTime === obj.duration) {
                        callbacks.onEnd();
                    }
                },
                onProgress = function(event) {
                    var obj = event.target,
                        buffer = ((obj.buffered.length && obj.buffered.end(0)) / obj.duration) * 100;
                    callbacks.onBuffer(buffer);
                };

            $('<div class="sc-player-engine-container"></div>').appendTo(document.body).append(player);

            // prepare the listeners
            player.addEventListener('play', callbacks.onPlay, false);
            player.addEventListener('pause', callbacks.onPause, false);
            // handled in the onTimeUpdate for now untill all the browsers support 'ended' event
            // player.addEventListener('ended', callbacks.onEnd, false);
            player.addEventListener('timeupdate', onTimeUpdate, false);
            player.addEventListener('progress', onProgress, false);


            return {
                load: function(track, apiKey) {
                    player.pause();
                    player.src = track.stream_url + (/\?/.test(track.stream_url) ? '&' : '?') + 'consumer_key=' + apiKey;
                    player.load();
                    player.play();
                },
                play: function() {
                    player.play();
                },
                pause: function() {
                    player.pause();
                },
                stop: function() {
                    if (player.currentTime) {
                        player.currentTime = 0;
                        player.pause();
                    }
                },
                seek: function(relative) {
                    player.currentTime = player.duration * relative;
                    player.play();
                },
                getDuration: function() {
                    return player.duration * 1000;
                },
                getPosition: function() {
                    return player.currentTime * 1000;
                },
                setVolume: function(val) {
                    player.volume = val / 100;
                }
            };

        };



        var flashDriver = function() {
            var engineId = 'scPlayerEngine',
                player,
                flashHtml = function(url) {
                    var swf = (secureDocument ? 'https' : 'http') + '://player.' + domain + '/player.swf?url=' + url + '&amp;enable_api=true&amp;player_type=engine&amp;object_id=' + engineId;
                    if ($.browser.msie) {
                        return '<object height="100%" width="100%" id="' + engineId + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" data="' + swf + '">' +
                            '<param name="movie" value="' + swf + '" />' +
                            '<param name="allowscriptaccess" value="always" />' +
                            '</object>';
                    } else {
                        return '<object height="100%" width="100%" id="' + engineId + '">' +
                            '<embed allowscriptaccess="always" height="100%" width="100%" src="' + swf + '" type="application/x-shockwave-flash" name="' + engineId + '" />' +
                            '</object>';
                    }
                };


            // listen to audio engine events
            // when the loaded track is ready to play
            soundcloud.addEventListener('onPlayerReady', function(flashId, data) {
                player = soundcloud.getPlayer(engineId);
                callbacks.onReady();
            });

            // when the loaded track finished playing
            soundcloud.addEventListener('onMediaEnd', callbacks.onEnd);

            // when the loaded track is still buffering
            soundcloud.addEventListener('onMediaBuffering', function(flashId, data) {
                callbacks.onBuffer(data.percent);
            });

            // when the loaded track started to play
            soundcloud.addEventListener('onMediaPlay', callbacks.onPlay);

            // when the loaded track is was paused
            soundcloud.addEventListener('onMediaPause', callbacks.onPause);

            return {
                load: function(track) {
                    var url = track.uri;
                    if (player) {
                        player.api_load(url);
                    } else {
                        // create a container for the flash engine (IE needs this to operate properly)
                        $('<div class="sc-player-engine-container"></div>').appendTo(document.body).html(flashHtml(url));
                    }
                },
                play: function() {
                    player && player.api_play();
                },
                pause: function() {
                    player && player.api_pause();
                },
                stop: function() {
                    player && player.api_stop();
                },
                seek: function(relative) {
                    player && player.api_seekTo((player.api_getTrackDuration() * relative));
                },
                getDuration: function() {
                    return player && player.api_getTrackDuration && player.api_getTrackDuration() * 1000;
                },
                getPosition: function() {
                    return player && player.api_getTrackPosition && player.api_getTrackPosition() * 1000;
                },
                setVolume: function(val) {
                    if (player && player.api_setVolume) {
                        player.api_setVolume(val);
                    }
                }

            };
        };

        return html5AudioAvailable ? html5Driver() : flashDriver();

    }();



    var apiKey,
        didAutoPlay = false,
        players = [],
        updates = {},
        currentUrl,
        loadTracksData = function($player, links, key) {
            var index = 0,
                playerObj = {
                    node: $player,
                    tracks: []
                },
                loadUrl = function(link) {
                    var apiUrl = scApiUrl(link.url, apiKey);
                    $.getJSON(apiUrl, function(data) {
                        // log('data loaded', link.url, data);
                        index += 1;
                        if (data.tracks) {
                            // log('data.tracks', data.tracks);
                            playerObj.tracks = playerObj.tracks.concat(data.tracks);
                        } else if (data.duration) {
                            // a secret link fix, till the SC API returns permalink with secret on secret response
                            data.permalink_url = link.url;
                            // if track, add to player
                            playerObj.tracks.push(data);
                        } else if (data.creator) {
                            // it's a group!
                            links.push({
                                url: data.uri + '/tracks'
                            });
                        } else if (data.username) {
                            // if user, get his tracks or favorites
                            if (/favorites/.test(link.url)) {
                                links.push({
                                    url: data.uri + '/favorites'
                                });
                            } else {
                                links.push({
                                    url: data.uri + '/tracks'
                                });
                            }
                        } else if ($.isArray(data)) {
                            playerObj.tracks = playerObj.tracks.concat(data);
                        }
                        if (links[index]) {
                            // if there are more track to load, get them from the api
                            loadUrl(links[index]);
                        } else {
                            // if loading finishes, anounce it to the GUI
                            playerObj.node.trigger({
                                type: 'onTrackDataLoaded',
                                playerObj: playerObj,
                                url: apiUrl
                            });
                        }
                    });
                };
            // update current API key
            apiKey = key;
            // update the players queue
            players.push(playerObj);
            // load first tracks
            loadUrl(links[index]);
        },
        artworkImage = function(track, usePlaceholder) {
            if (usePlaceholder) {
                return '<div class="sc-loading-artwork">Loading Artwork</div>';
            } else if (track.artwork_url) {
                return '<img src="' + track.artwork_url.replace('-large', '-t300x300') + '"/>';
            } else {
                return '<div class="sc-no-artwork">No Artwork</div>';
            }
        },
        updateTrackInfo = function($player, track) {
            // update the current track info in the player
            // log('updateTrackInfo', track);
            $('.sc-info', $player).each(function(index) {
                $('h3', this).html('<a href="' + track.permalink_url + '">' + track.title + '</a>');
                $('h4', this).html('by <a href="' + track.user.permalink_url + '">' + track.user.username + '</a>');
                $('p', this).html(track.description || 'no Description');
            });
            // update the artwork
            $('.sc-artwork-list li', $player).each(function(index) {
                var $item = $(this),
                    itemTrack = $item.data('sc-track');

                if (itemTrack === track) {
                    // show track artwork
                    $item
                        .addClass('active')
                        .find('.sc-loading-artwork')
                        .each(function(index) {
                            // if the image isn't loaded yet, do it now
                            $(this).removeClass('sc-loading-artwork').html(artworkImage(track, false));
                        });
                } else {
                    // reset other artworks
                    $item.removeClass('active');
                }
            });
            // update the track duration in the progress bar
            $('.sc-duration', $player).html(timecode(track.duration));
            // put the waveform into the progress bar
            $('.sc-waveform-container', $player).html('<img src="' + track.waveform_url + '" />');

            $player.trigger('onPlayerTrackSwitch.scPlayer', [track]);
        },
        play = function(track) {
            var url = track.permalink_url;
            if (currentUrl === url) {
                // log('will play');
                audioEngine.play();
            } else {
                currentUrl = url;
                // log('will load', url);
                audioEngine.load(track, apiKey);
            }
        },
        getPlayerData = function(node) {
            return players[$(node).data('sc-player').id];
        },
        updatePlayStatus = function(player, status) {
            if (status) {
                // reset all other players playing status
                $('div.sc-player.playing').removeClass('playing');
            }
            $(player)
                .toggleClass('playing', status)
                .trigger((status ? 'onPlayerPlay' : 'onPlayerPause'));
        },
        onPlay = function(player, id) {
            var track = getPlayerData(player).tracks[id || 0];
            updateTrackInfo(player, track);
            // cache the references to most updated DOM nodes in the progress bar
            updates = {
                $buffer: $('.sc-buffer', player),
                $played: $('.sc-played', player),
                position: $('.sc-position', player)[0]
            };
            updatePlayStatus(player, true);
            play(track);
        },
        onPause = function(player) {
            updatePlayStatus(player, false);
            audioEngine.pause();
        },
        onFinish = function() {
            var $player = updates.$played.closest('.sc-player'),
                $nextItem;
            // update the scrubber width
            updates.$played.css('width', '0%');
            // show the position in the track position counter
            updates.position.innerHTML = timecode(0);
            // reset the player state
            updatePlayStatus($player, false);
            // stop the audio
            audioEngine.stop();
            $player.trigger('onPlayerTrackFinish');
        },
        onSeek = function(player, relative) {
            audioEngine.seek(relative);
            $(player).trigger('onPlayerSeek');
        },
        onSkip = function(player) {
            var $player = $(player);
            // continue playing through all players
            log('track finished get the next one');
            $nextItem = $('.sc-trackslist li.active', $player).next('li');
            // try to find the next track in other player
            if (!$nextItem.length) {
                $nextItem = $player.nextAll('div.sc-player:first').find('.sc-trackslist li.active');
            }
            $nextItem.click();
        },
        soundVolume = function() {
            var vol = 80,
                cooks = document.cookie.split(';'),
                volRx = new RegExp('scPlayer_volume=(\\d+)');
            for (var i in cooks) {
                if (volRx.test(cooks[i])) {
                    vol = parseInt(cooks[i].match(volRx)[1], 10);
                    break;
                }
            }
            return vol;
        }(),
        onVolume = function(volume) {
            var vol = Math.floor(volume);
            // save the volume in the cookie
            var date = new Date();
            date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
            soundVolume = vol;
            document.cookie = ['scPlayer_volume=', vol, '; expires=', date.toUTCString(), '; path="/"'].join('');
            // update the volume in the engine
            audioEngine.setVolume(soundVolume);
        },
        positionPoll;

    // listen to audio engine events
    $doc
        .bind('scPlayer:onAudioReady', function(event) {
            log('onPlayerReady: audio engine is ready');
            audioEngine.play();
            // set initial volume
            onVolume(soundVolume);
        })
        // when the loaded track started to play
        .bind('scPlayer:onMediaPlay', function(event) {
            clearInterval(positionPoll);
            positionPoll = setInterval(function() {
                var duration = audioEngine.getDuration(),
                    position = audioEngine.getPosition(),
                    relative = (position / duration);

                // update the scrubber width
                updates.$played.css('width', (100 * relative) + '%');
                // show the position in the track position counter
                updates.position.innerHTML = timecode(position);
                // announce the track position to the DOM
                $doc.trigger({
                    type: 'onMediaTimeUpdate.scPlayer',
                    duration: duration,
                    position: position,
                    relative: relative
                });
            }, 500);
        })
        // when the loaded track is was paused
        .bind('scPlayer:onMediaPause', function(event) {
            clearInterval(positionPoll);
            positionPoll = null;
        })
        // change the volume
        .bind('scPlayer:onVolumeChange', function(event) {
            onVolume(event.volume);
        })
        .bind('scPlayer:onMediaEnd', function(event) {
            onFinish();
        })
        .bind('scPlayer:onMediaBuffering', function(event) {
            updates.$buffer.css('width', event.percent + '%');
        });


    // Generate custom skinnable HTML/CSS/JavaScript based SoundCloud players from links to SoundCloud resources
    $.scPlayer = function(options, node) {
        var opts = $.extend({}, $.scPlayer.defaults, options),
            playerId = players.length,
            $source = node && $(node),
            sourceClasses = $source[0].className.replace('sc-player', ''),
            links = opts.links || $.map($('a', $source).add($source.filter('a')), function(val) {
                return {
                    url: val.href,
                    title: val.innerHTML
                };
            }),
            $player = $('<div class="sc-player loading"></div>').data('sc-player', {
                id: playerId
            }),
            $artworks = $('<ol class="sc-artwork-list"></ol>').appendTo($player),
            $controls = $('<div class="sc-controls"></div>').appendTo($player),
            $info = $('<div class="sc-info"><h3></h3><h4></h4><p></p><a href="#" class="sc-info-close">X</a></div>').appendTo($player);

        // add the classes of the source node to the player itself
        // the players can be indvidually styled this way
        if (sourceClasses || opts.customClass) {
            $player.addClass(sourceClasses).addClass(opts.customClass);
        }


        // adding controls to the player
        $player
            .find('.sc-controls')
            .append('<a href="#play" class="sc-play">Play</a> <a href="#pause" class="sc-pause hidden">Pause</a>')
            .end()
            .append('<div class="sc-scrubber"></div>')
            .find('.sc-scrubber')
            .append('<div class="sc-volume-slider"><span class="sc-volume-status" style="width:' + soundVolume + '%"></span></div>')
            .append('<div class="sc-time-span"><div class="sc-waveform-container"></div><div class="sc-buffer"></div><div class="sc-played"></div></div>')
            .append('<div class="sc-time-indicators"><span class="sc-position"></span> | <span class="sc-duration"></span></div>');
        $list = $('<ol class="sc-trackslist"></ol>').appendTo($player);
        // load and parse the track data from SoundCloud API
        loadTracksData($player, links, opts.apiKey);
        // init the player GUI, when the tracks data was laoded
        $player.bind('onTrackDataLoaded.scPlayer', function(event) {
            // log('onTrackDataLoaded.scPlayer', event.playerObj, playerId, event.target);
            var tracks = event.playerObj.tracks;
            if (opts.randomize) {
                tracks = shuffle(tracks);
            }
            // create the playlist
            $.each(tracks, function(index, track) {
                var active = index === 0;
                // create an item in the playlist
                $('<li><a href="' + track.permalink_url + '">' + track.title + '</a><span class="sc-track-duration">' + timecode(track.duration) + '</span></li>').data('sc-track', {
                    id: index
                }).toggleClass('active', active).appendTo($list);
                // create an item in the artwork list
                $('<li></li>')
                    .append(artworkImage(track, index >= opts.loadArtworks))
                    .appendTo($artworks)
                    .toggleClass('active', active)
                    .data('sc-track', track);
            });
            // update the element before rendering it in the DOM
            $player.each(function() {
                if ($.isFunction(opts.beforeRender)) {
                    opts.beforeRender.call(this, tracks);
                }
            });
            // set the first track's duration
            $('.sc-duration', $player)[0].innerHTML = timecode(tracks[0].duration);
            $('.sc-position', $player)[0].innerHTML = timecode(0);
            // set up the first track info
            updateTrackInfo($player, tracks[0]);

            // if continous play enabled always skip to the next track after one finishes
            if (opts.continuePlayback) {
                $player.bind('onPlayerTrackFinish', function(event) {
                    onSkip($player);
                });
            }

            // announce the succesful initialization
            $player
                .removeClass('loading')
                .trigger('onPlayerInit');

            // if auto play is enabled and it's the first player, start playing
            if (opts.autoPlay && !didAutoPlay) {
                onPlay($player);
                didAutoPlay = true;
            }
        });


        // replace the DOM source (if there's one)
        $source.each(function(index) {
            $(this).replaceWith($player);
        });

        return $player;
    };

    // stop all players, might be useful, before replacing the player dynamically
    $.scPlayer.stopAll = function() {
        $('.sc-player.playing a.sc-pause').click();
    };

    // destroy all the players and audio engine, usefull when reloading part of the page and audio has to stop
    $.scPlayer.destroy = function() {
        $('.sc-player, .sc-player-engine-container').remove();
    };

    // plugin wrapper
    $.fn.scPlayer = function(options) {
        // reset the auto play
        didAutoPlay = false;
        // create the players
        this.each(function() {
            $.scPlayer(options, this);
        });
        return this;
    };

    // default plugin options
    $.scPlayer.defaults = $.fn.scPlayer.defaults = {
        customClass: null,
        // do something with the dom object before you render it, add nodes, get more data from the services etc.
        beforeRender: function(tracksData) {
            var $player = $(this);
        },
        // initialization, when dom is ready
        onDomReady: function() {
            $('a.sc-player, div.sc-player').scPlayer();
        },
        autoPlay: false,
        continuePlayback: true,
        randomize: false,
        loadArtworks: 5,
        // the default Api key should be replaced by your own one
        // get it here https://soundcloud.com/you/apps/new
        apiKey: 'htuiRd1JP11Ww0X72T1C3g'
    };


    // the GUI event bindings
    //--------------------------------------------------------

    // toggling play/pause
    $(document).on('click', 'a.sc-play, a.sc-pause', function(event) {
        var $list = $(this).closest('.sc-player').find('ol.sc-trackslist');
        // simulate the click in the tracklist
        $list.find('li.active').click();
        return false;
    });

    // displaying the info panel in the player
    $(document).on('click', 'a.sc-info-toggle, a.sc-info-close', function(event) {
        var $link = $(this);
        $link.closest('.sc-player')
            .find('.sc-info').toggleClass('active').end()
            .find('a.sc-info-toggle').toggleClass('active');
        return false;
    });

    // selecting tracks in the playlist
    $(document).on('click', '.sc-trackslist li', function(event) {
        var $track = $(this),
            $player = $track.closest('.sc-player'),
            trackId = $track.data('sc-track').id,
            play = $player.is(':not(.playing)') || $track.is(':not(.active)');
        if (play) {
            onPlay($player, trackId);
        } else {
            onPause($player);
        }
        $track.addClass('active').siblings('li').removeClass('active');
        $('.artworks li', $player).each(function(index) {
            $(this).toggleClass('active', index === trackId);
        });
        return false;
    });

    var scrub = function(node, xPos) {
        var $scrubber = $(node).closest('.sc-time-span'),
            $buffer = $scrubber.find('.sc-buffer'),
            $available = $scrubber.find('.sc-waveform-container img'),
            $player = $scrubber.closest('.sc-player'),
            relative = Math.min($buffer.width(), (xPos - $available.offset().left)) / $available.width();
        onSeek($player, relative);
    };

    var onTouchMove = function(ev) {
        if (ev.targetTouches.length === 1) {
            scrub(ev.target, ev.targetTouches && ev.targetTouches.length && ev.targetTouches[0].clientX);
            ev.preventDefault();
        }
    };


    // seeking in the loaded track buffer
    $(document)
        .on('click', '.sc-time-span', function(event) {
            scrub(this, event.pageX);
            return false;
        })
        .on('touchstart', '.sc-time-span', function(event) {
            this.addEventListener('touchmove', onTouchMove, false);
            event.originalEvent.preventDefault();
        })
        .on('touchend', '.sc-time-span', function(event) {
            this.removeEventListener('touchmove', onTouchMove, false);
            event.originalEvent.preventDefault();
        });

    // changing volume in the player
    var startVolumeTracking = function(node, startEvent) {
        var $node = $(node),
            originX = $node.offset().left,
            originWidth = $node.width(),
            getVolume = function(x) {
                return Math.floor(((x - originX) / originWidth) * 100);
            },
            update = function(event) {
                $doc.trigger({
                    type: 'scPlayer:onVolumeChange',
                    volume: getVolume(event.pageX)
                });
            };
        $node.bind('mousemove.sc-player', update);
        update(startEvent);
    };

    var stopVolumeTracking = function(node, event) {
        $(node).unbind('mousemove.sc-player');
    };

    $(document)
        .on('mousedown', '.sc-volume-slider', function(event) {
            startVolumeTracking(this, event);
        })
        .on('mouseup', '.sc-volume-slider', function(event) {
            stopVolumeTracking(this, event);
        });

    $doc.bind('scPlayer:onVolumeChange', function(event) {
        $('span.sc-volume-status').css({
            width: event.volume + '%'
        });
    });
    // -------------------------------------------------------------------

    // the default Auto-Initialization
    $(function() {
        if ($.isFunction($.scPlayer.defaults.onDomReady)) {
            $.scPlayer.defaults.onDomReady();
        }
    });

})(jQuery);