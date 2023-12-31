function t_cover__parallax(t) {
    var o = window.innerHeight
      , r = (window.addEventListener("resize", function() {
        o = window.innerHeight
    }),
    document.body.style.webkitTransform && (t.style.position = "relative"),
    t_cover__getFullHeight(t));
    ["scroll", "resize"].forEach(function(e) {
        window.addEventListener(e, function() {
            t_cover__parallaxUpdate(t, .2, o, r)
        })
    }),
    "complete" !== document.readyState && window.addEventListener("load", function() {
        t_cover__parallaxUpdate(t, .2, o, r)
    }),
    t_cover__parallaxUpdate(t, .2, o, r)
}
function t_cover__parallaxUpdate(e, t, o, r) {
    var n = window.pageYOffset
      , i = e.getBoundingClientRect().top + n
      , c = e.getBoundingClientRect().top;
    i + r < n || n + o < i || (r = -1 * Math.round(c * t),
    document.body.style.webkitTransform ? e.style.webkitTransform = "translateY(" + r + "px)" : e.style.top = r + "px")
}
function cover_init(e) {
    var t = document.getElementById("allrecords")
      , t = !!t && "yes" === t.getAttribute("data-tilda-lazy")
      , o = document.getElementById("rec" + e)
      , r = document.getElementById("coverCarry" + e)
      , n = o ? o.querySelector("img[data-hook-clogo]") : null;
    if (r) {
        var i, c = {
            "cover-bg": "",
            "cover-height": "",
            "cover-parallax": "",
            "video-url-mp4": "",
            "video-url-webm": "",
            "video-url-youtube": "",
            "video-noloop": "",
            "video-nomute": "",
            "video-nocover": "",
            "bg-base64": ""
        };
        for (i in c) {
            var a = r.getAttribute("data-content-" + i);
            a && (c[i] = a)
        }
        o = o ? o.getAttribute("data-bg-color") : "",
        o = (o && (c["parent-bg"] = o),
        ["mp4", "webm", "youtube"]),
        o = ("yes" === c["video-nocover"] ? o.forEach(function(e) {
            c["video-url-" + e] = ""
        }) : c["video-nomute"] = "",
        o.some(function(e) {
            return !!c["video-url-" + e]
        }));
        (window.t_cover__isMobile || "ontouchend"in document) && o && !t && (r.style.backgroundImage = 'url("' + c["cover-bg"] + '")'),
        setTimeout(function() {
            t_cover__recalcContentHeight(e, !1, 0),
            t_cover__fixBgFixedNode(e)
        }, 300),
        n && (n.onload = function() {
            t_cover__recalcContentHeight(e, !1, 500)
        }
        ),
        window.t_cover__isMobile || "ontouchend"in document ? window.addEventListener("orientationchange", function() {
            t_cover__recalcContentHeight(e, !0, 200)
        }) : window.addEventListener("resize", function() {
            t_cover__recalcContentHeight(e, !1, 0)
        }),
        t_cover__setListenerToArrow(e),
        t_cover__setCoverParams(r, c, o),
        r.addEventListener("displayChanged", function() {
            t_cover__recalcContentHeight(e, !1, 0)
        })
    }
}
function t_cover__recalcContentHeight(e, t, o) {
    o ? setTimeout(function() {
        t_cover__fixBgFixedStyles(e),
        t_cover__recalcCoverHeight(e, t)
    }, o) : (t_cover__fixBgFixedStyles(e),
    t_cover__recalcCoverHeight(e, t))
}
function t_cover__setCoverParams(e, t, o) {
    var r, n, i, c = "fixed" === t["cover-parallax"], a = "dynamic" === t["cover-parallax"], d = "yes" === t["bg-base64"];
    t["parent-bg"] && (r = e.closest(".t-cover")) && r.classList.add("t-cover__transparent"),
    t_cover__setCoverVideoParams(e, t, o, c),
    c && window.isOpera && (e.style.transform = "unset"),
    a && !window.t_cover__isMobile && ((r = t_cover__getPureHeight(e)) < window.innerHeight && (c = .2 * window.innerHeight,
    e.style.height = r + c + "px"),
    t_cover__parallax(e)),
    d && t["cover-bg"] && !o && (n = !1,
    (i = document.createElement("img")).src = t["cover-bg"],
    i.onload = function() {
        i.parentElement && i.parentElement.removeChild(i),
        e.style.backgroundImage = 'url("' + t["cover-bg"] + '")',
        e.style.opacity = "1",
        n = !0
    }
    ,
    n || (e.style.backgroundImage = "",
    e.style.opacity = "0",
    e.style.transition = "opacity 25ms"))
}
function t_cover__setCoverVideoParams(e, t, o, r) {
    var n = Boolean(t["video-url-youtube"]);
    window.t_cover__isMobile || "ontouchend"in document || !o || (t_cover__setStylesForCoverVideo(e, n ? "youtube" : ""),
    n ? t_cover__processYouTubeVideo(e, t) : t_cover__processHTML5Video(e, t, r))
}
function t_cover__processYouTubeVideo(e, r) {
    "IntersectionObserver"in window ? new IntersectionObserver(function(e, o) {
        e.forEach(function(e) {
            var t;
            e.isIntersecting && (t = e.target,
            o.unobserve(t),
            t_onFuncLoad("processYoutubeVideo", function() {
                window.processYoutubeVideo(t, r["cover-height"])
            }))
        })
    }
    ).observe(e) : (t_cover__createYoutubeCover(e, r["cover-height"]),
    window.addEventListener("scroll", t_throttle(function() {
        t_cover__createYoutubeCover(e, r["cover-height"])
    }, 100)))
}

function t_cover__setStylesForCoverVideo(e, t) {
    e.style.backgroundColor = "#000000",
    e.style.backgroundImage = "youtube" === t ? "" : 'url("https://tilda.ws/img/spinner-white.gif")',
    e.setAttribute("data-content-cover-bg", "")
}
function t_cover__setListenerToArrow(e) {
    var t = document.getElementById("rec" + e);
    !t || (e = t.querySelector(".t-cover__arrow-wrapper")) && e.addEventListener("click", function() {
        t.offsetHeight && t_cover__scrollToNextSection(t.offsetHeight + t.getBoundingClientRect().top + window.pageYOffset)
    })
}
function t_cover__initCovers() {
    var e = document.querySelector(".t-records");
    !!e && "edit" === e.getAttribute("data-tilda-mode") || (e = document.querySelectorAll(".t-cover__carrier"),
    Array.prototype.forEach.call(e, function(e) {
        e = e.getAttribute("data-content-cover-id");
        e && cover_init(e)
    }),
    window.addEventListener("load", function() {
        var e = Array.prototype.slice.call(document.querySelectorAll(".t-cover__wrapper"))
          , t = window.t_cover__isMobile ? document.documentElement.clientWidth : window.innerWidth;
        e.forEach(function(e) {
            !e.closest(".t-slds") && Math.floor(e.getBoundingClientRect().right) > t && (e.style.wordBreak = "break-all")
        })
    }))
}

function t_cover__recalcCoverHeight(e, t) {
    var o, r, n, i, c, a, d, l, _ = document.getElementById("rec" + e);
    _ && (e = _.querySelector(".t-cover"),
    a = _.getAttribute("data-record-type"),
    e && "935" !== a && ((l = (o = _.querySelector(".t-cover__carrier")) ? o.getAttribute("data-content-cover-height") : "") || (l = (r = _.querySelector("[data-content-cover-height]")) ? r.getAttribute("data-content-cover-height") : ""),
    r = "y" === _.getAttribute("data-fixed-bg"),
    n = [".t-cover", ".t-cover__filter", ".t-cover__carrier", ".t-cover__wrapper"],
    "734" !== a && !_.querySelector(".t734") || n.push(".t-slds__items-wrapper"),
    i = "dynamic" === o.getAttribute("data-content-cover-parallax"),
    (c = t_cover__getHeightFromAttr(l)) && n.forEach(function(e) {
        i && ".t-cover__carrier" === e || Array.prototype.slice.call(_.querySelectorAll(e)).forEach(function(e) {
            e && (e.style.height = Math.round(c) + "px")
        })
    }),
    a = t_cover__getHeightFromAttr(l),
    l = t_cover__getPureHeight(e),
    a = a || l,
    r || (d = e.style.height,
    e.style.height = "",
    a = l,
    d && (e.style.height = d)),
    l = t_cover__getContentHeight(_),
    e = !!o && "100vh" === o.getAttribute("data-content-cover-height"),
    300 < l && a < l + 40 || r || (window.t_cover__isMobile || "ontouchend"in document) && t ? (t_cover__setRecalculatedHeight(_, l),
    t_cover__updateResizeElem(_)) : window.t_cover__isMobile && e && n.forEach(function(e) {
        e = _.querySelector(e);
        e && (e.style.height = document.documentElement.clientHeight + "px")
    })))
}
function t_cover__getContentHeight(e) {
    e = Array.prototype.slice.call(e.querySelectorAll("div[data-hook-content]"));
    if (e.length <= 1)
        return t_cover__getPureHeight(e[0]);
    e = e.map(function(e) {
        return t_cover__getPureHeight(e)
    });
    return e.sort(function(e, t) {
        return t - e
    }),
    e[0] || 0
}
function t_cover__getHeightFromAttr(e) {
    return e ? -1 !== e.indexOf("vh") ? parseInt(e, 10) * document.documentElement.clientHeight / 100 : parseInt(e, 10) : 0
}
function t_cover__setRecalculatedHeight(t, e) {
    var o = t.querySelector(".t-cover__carrier")
      , r = o ? o.getAttribute("data-content-cover-height") : ""
      , n = t_cover__getHeightFromAttr(r = r ? r : (n = t.querySelector("[data-content-cover-height]")) ? n.getAttribute("data-content-cover-height") : "0")
      , i = o ? "dynamic" === o.getAttribute("data-content-cover-parallax") : ""
      , r = "734" === t.getAttribute("data-record-type")
      , c = window.innerWidth <= 568 ? 40 : 120
      , a = window.innerWidth <= 568 ? 50 : 100
      , d = (r && (a = c = 0),
    1e3 < (e += c) && (e += a),
    n < e ? e : n)
      , l = 0
      , c = [".t-cover", ".t-cover__filter", ".t-cover__carrier", ".t-cover__wrapper"]
      , a = ((r || t.querySelector(".t734")) && c.push(".t-slds__items-wrapper"),
    c.forEach(function(e) {
        Array.prototype.slice.call(t.querySelectorAll(e)).forEach(function(e) {
            i && e && e.classList.contains("t-cover__carrier") && d < document.documentElement.clientHeight ? (l = .2 * document.documentElement.clientHeight,
            e.style.height = d + l + "px") : e && (e.style.height = d + "px")
        })
    }),
    o.setAttribute("data-content-cover-updated-height", d + l + "px"),
    document.createEvent("Event"));
    a.initEvent("coverHeightUpdated", !0, !0),
    o.dispatchEvent(a)
}
function t_cover__updateResizeElem(e) {
    var t, o = document.getElementById("allrecords");
    !o || "yes" !== o.getAttribute("data-tilda-lazy") || (t = e.querySelector(".t-cover__carrier"),
    t_onFuncLoad("t_lazyload_updateResize_elem", function() {
        t_lazyload_updateResize_elem(t)
    }))
}
function t_cover__checkIsFixForBgNeeded(e) {
    var e = document.getElementById("rec" + e)
      , t = e ? e.querySelector(".t-cover__carrier") : null;
    if (!t)
        return !1;
    var e = "y" === e.getAttribute("data-fixed-bg")
      , o = (o = ["mp4", "webm", "youtube"]).map(function(e) {
        return t.getAttribute("data-content-video-url-" + e)
    })
      , r = "fixed" === t.getAttribute("data-content-cover-parallax")
      , o = o.some(function(e) {
        return e
    })
      , n = window.t_cover__isMobile || "ontouchend"in document;
    return r && window.isSafari && !n && !o && !e
}
function t_cover__fixBgFixedNode(e) {
    var t, o, r, n = t_cover__checkIsFixForBgNeeded(e), e = document.getElementById("rec" + e);
    n && e && (n = e.getAttribute("data-record-type"),
    o = (r = e.querySelector(".t-cover")) ? r.parentElement : null,
    document.getElementById("fixed-bg-cover") || ((t = document.createElement("style")).id = "fixed-bg-cover",
    t.textContent = ".t-cover__container {position: relative;}.t-cover__container .t-cover {clip: rect(0, auto, auto, 0);position: absolute;top: 0;left: 0;width: 100%;height: 100% !important;}.t-cover__container .t-cover .t-cover__carrier {position: fixed;display: block;top: 0;left: 0;width: 100%;height: 100% !important;background-size: cover;background-position: center center;transform: translateZ(0);will-change: transform;}",
    document.head.insertAdjacentElement("beforeend", t)),
    (t = document.createElement("div")).classList.add("t-cover__container"),
    o.insertAdjacentElement("afterbegin", t),
    t.style.height = t_cover__getPureHeight(r) + "px",
    t.appendChild(r),
    (r = (o = {
        275: ".t256__video-container",
        286: ".t266__video-container",
        337: ".t-container",
        906: ".t906__video-container"
    }[n]) ? e.querySelector(o) : null) && t.appendChild(r))
}
function t_cover__fixBgFixedStyles(e) {
    var t = document.getElementById("rec" + e)
      , e = t_cover__checkIsFixForBgNeeded(e)
      , o = t ? t.querySelector(".t-cover") : null
      , r = t ? t.querySelector(".t-cover__container") : null;
    e && r && o && (e = o.style.height,
    o.style.height = 0,
    r.style.height = e,
    t.setAttribute("data-fixed-bg", "y"))
}
function t_cover__getPureHeight(e) {
    if (!e)
        return 0;
    var t = parseInt(e.style.paddingTop) || 0
      , o = parseInt(e.style.paddingBottom) || 0;
    return e.clientHeight ? e.clientHeight - (t + o) : parseInt(window.getComputedStyle(e).height, 10)
}
function t_cover__getFullHeight(e) {
    return e ? e.offsetHeight + (parseInt(e.style.marginTop) || 0) + (parseInt(e.style.marginBottom) || 0) : 0
}
function t_cover__scrollToNextSection(e) {
    var t = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight;
    if ((e = t < e ? t : e) === window.pageYOffset)
        return !1;
    var o = window.pageYOffset
      , r = (e - o) / 30
      , n = window.pageYOffset
      , i = setInterval(function() {
        n += r,
        window.scrollTo(0, n),
        document.body.setAttribute("data-scrollable", "true"),
        (e - o < 0 && window.pageYOffset <= e || 0 < e - o && window.pageYOffset >= e) && (clearInterval(i),
        document.body.removeAttribute("data-scrollable"))
    }, 10)
}
function cover_setRecalculatedCoverHeight(e, t) {
    t_cover__setRecalculatedHeight(e, t)
}
function t_cover__getHeightWithoutPadding(e) {
    return t_cover__getPureHeight(e)
}
window.t_cover__isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
t_onReady(t_cover__initCovers);
