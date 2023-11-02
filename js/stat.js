!function() {
    var r = document.getElementById("allrecords");
    function e() {
        var e = Math.floor(899999 * Math.random()) + 1e5;
        return (new Date).getTime() + "." + e
    }
    function n(e) {
        e = e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1"),
        e = new RegExp("(?:^|; )" + e + "=([^;]*)"),
        e = document.cookie.match(e);
        if (e)
            return decodeURIComponent(e[1])
    }
    function o(e, t, n) {
        if (i = n.expires) {
            "number" == typeof i && (o = (new Date).getTime() + 1e3 * i,
            (i = new Date(o)).toUTCString && (n.expires = i.toUTCString()));
            var o, i, a, r = e + "=" + (t = encodeURIComponent(t));
            for (a in n)
                r += "; " + a,
                !0 !== n[a] && (r += "=" + n[a]);
            document.cookie = r
        }
    }
    function a() {
        var e = window.pageYOffset
          , t = window.innerHeight
          , n = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
          , o = 0
          , i = 0
          , a = (m = !0,
        document.getElementById("t-header"))
          , r = document.getElementById("t-footer")
          , d = document.getElementById("tildacopy")
          , c = (a && (o = a.offsetHeight),
        r && (i = r.offsetHeight),
        d && (i += d.offsetHeight),
        Math.floor(100 * (e - o + t) / (n - o - i)));
        if (!(c < 10))
            for (var l = [10, 25, 50, 75, 90], s = 0; s < l.length; s++) {
                var u = l[s]
                  , p = l.length - 1;
                if (0 === s && u <= c && !w["p" + u])
                    g.page = "/tilda/scroll/" + u + "/",
                    window.tildastat("pageview"),
                    w["p" + u] = !0;
                else if (u - 1 <= c) {
                    if (0 === w["p" + u]) {
                        g.page = "/tilda/scroll/" + u + "/",
                        window.tildastat("pageview"),
                        w["p" + u] = setTimeout(function() {
                            clearTimeout(w["p" + u]),
                            w["p" + u] = -1
                        }, 5e3);
                        break
                    }
                    if ((s !== p && c < l[s + 1] || s === p) && -1 === w["p" + u]) {
                        w["p" + u] = 0;
                        break
                    }
                }
            }
    }
    function d() {
        var e = 0 === window.location.hostname.indexOf("www.") ? window.location.hostname.slice(4) : window.location.hostname;
        return (e = e.lastIndexOf(".") === e.length - 1 ? e.slice(0, -1) : e) + window.location.pathname
    }
    function c() {
        var e = (navigator.cookieEnabled ? "cT" : "cF") + (navigator.deviceMemory ? "dm" + navigator.deviceMemory : "dm") + (navigator.hardwareConcurrency ? "hc" + navigator.hardwareConcurrency : "hc") + (navigator.languages ? "l" + navigator.languages.join(",") : "l") + (navigator.platform ? "p" + navigator.platform : "p") + (navigator.vendor ? "v" + navigator.vendor : "v") + (navigator.appCodeName ? "a" + navigator.appCodeName : "a") + (navigator.appName ? "n" + navigator.appName : "n");
        if (navigator.plugins) {
            for (var t = "", n = 0; n < navigator.plugins.length; n++)
                t += navigator.plugins[n].filename;
            e += "pl" + t
        }
        return e = function(t) {
            for (var e = Array(t.length), n = 0; n < t.length; n++)
                e[n] = n;
            return Array.prototype.map.call(e, function(e) {
                return t.charCodeAt(e).toString(16)
            }).join("")
        }(e = (e += "pr" + window.devicePixelRatio) + ("w" + window.winWidth + "h" + window.winHeight))
    }
    function l() {
        v = n("tildauid"),
        y = n("tildasid"),
        y = f ? (v = v || "simple",
        y || "simple") : (v = v || e(),
        y || e())
    }
    function s() {
        f || (o("tildauid", v, {
            expires: 7776e3,
            path: "/"
        }),
        o("tildasid", y, {
            expires: 1800,
            path: "/"
        }))
    }
    function u() {
        if (!("" < g.user_agent && -1 != g.user_agent.indexOf("bot")))
            if ("http:" != window.location.protocol && "https:" != window.location.protocol)
                console.log("TildaStat: cannot work on local page");
            else {
                var t;
                l(),
                s(),
                g.page = d(),
                g.referrer = document.referrer || "",
                g.userid = v,
                g.sessionid = y,
                g.user_agent = window.navigator.userAgent,
                g.user_language = window.navigator.userLanguage || window.navigator.language,
                r && (g.projectid = r.getAttribute("data-tilda-project-id") || "0",
                g.pageid = r.getAttribute("data-tilda-page-id") || "0",
                g.pagealias = r.getAttribute("data-tilda-page-alias") || "",
                g.formskey = r.getAttribute("data-tilda-formskey") || ""),
                g.params = {};
                try {
                    n = decodeURIComponent(window.location.search)
                } catch (e) {
                    n = window.location.search
                }
                "?" < n && (g.pagequery = n.substring(1).toLowerCase(),
                ~g.pagequery.indexOf("utm_") && (n = g.pagequery.split("&"),
                Array.prototype.forEach.call(n, function(e) {
                    1 < (t = e.split("=")).length ? "utm_referrer" !== t[0] || g.referrer && !~g.referrer.indexOf("ohio8.v") ? g.params[t[0]] = t[1] : g.referrer = t[1] : g.params[t[0]] = ""
                })));
                var n = !1;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (n = !0),
                g.ismobile = n,
                document.getElementById("tildastatscript") && (g.tildastatcode = document.getElementById("tildastatscript").key),
                h)
                    try {
                        var e = function(e) {
                            m = !!e
                        }
                          , o = !0;
                        if (!e)
                            throw new Error("no callback given");
                        function i() {
                            o || e(o = !0)
                        }
                        function a() {
                            o && e(o = !1)
                        }
                        "hidden"in document && document.addEventListener("visibilitychange", function() {
                            (document.hidden ? a : i)()
                        }),
                        "mozHidden"in document && document.addEventListener("mozvisibilitychange", function() {
                            (document.mozHidden ? a : i)()
                        }),
                        "webkitHidden"in document && document.addEventListener("webkitvisibilitychange", function() {
                            (document.webkitHidden ? a : i)()
                        }),
                        "msHidden"in document && document.addEventListener("msvisibilitychange", function() {
                            (document.msHidden ? a : i)()
                        }),
                        "onfocusin"in document && (document.onfocusin = i,
                        document.onfocusout = a),
                        window.onpageshow = window.onfocus = i,
                        window.onpagehide = window.onblur = a,
                        document.body.addEventListener("mousewheel", t_throttle(function() {
                            m = !0
                        }, 1e3)),
                        document.body.addEventListener("mousemove", t_throttle(function() {
                            m = !0
                        }, 1e3)),
                        document.body.addEventListener("keypress", t_throttle(function() {
                            m = !0
                        }, 1e3)),
                        document.body.addEventListener("click", t_throttle(function() {
                            m = !0
                        }, 1e3))
                    } catch (e) {}
                g.fingerprint = c(),
                b = !0
            }
    }
    function p() {
        f || (n("tildasid") || "") != g.sessionid && o("tildasid", g.sessionid, {
            expires: 1800,
            path: "/"
        }),
        "" === g.referrer && (g.referrer = n("previousUrl") || ""),
        g.tildautm = n("TILDAUTM") || "",
        g.page || (console.log("TildaStat: page empty"),
        g.page = d(),
        window.location.hash && 0 === window.location.hash.indexOf("#!") && (g.page += window.location.hash)),
        "/" === g.page.substring(0, 1) && (g.page = window.location.hostname + g.page);
        var e = function(e) {
            var t, n = "";
            for (t in e)
                if ("" != n && "object" != typeof e[t] && (n += "&"),
                "object" == typeof e[t]) {
                    if (Object.keys(e[t]).length)
                        for (var o in e[t])
                            n += "&" + t + "[" + o + "]=" + encodeURIComponent(e[t][o])
                } else
                    n += t + "=" + encodeURIComponent(e[t]);
            return n
        }(g)
          , t = new XMLHttpRequest;
        t.open("POST", "https://stat.tildacdn.com/event/", !0),
        t.withCredentials = !1,
        t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
        t.onerror = function(e) {
            console.error("TildaStat: fail pageview "),
            console.error(e)
        }
        ,
        t.timeout = 3e3,
        t.send(e),
        g.page && -1 === g.page.indexOf("tilda/scroll") && -1 === g.page.indexOf("tilda/readtime") && -1 === g.page.indexOf("tilda/click") && -1 === g.page.indexOf("tilda/cookieenabled") && (g.referrer = g.page,
        f || o("previousUrl", g.page, {
            path: "/",
            expires: 1800
        })),
        g.page = "",
        window.tildastatload = !0
    }
    window.tildastat = function(e, t) {
        if (!e)
            return !1;
        if ("create" !== e && !b)
            return setTimeout(function() {
                window.tildastat(e, t)
            }, 1e3),
            !1;
        if (t) {
            var n, o = g, i = t;
            for (n in i)
                o[n] = i[n]
        }
        switch (e) {
        case "create":
            u();
            break;
        case "pageview":
            p();
            break;
        case "readtime":
            h && (m && (g.page = "/tilda/readtime/",
            m = !1,
            p()),
            setTimeout(function() {
                window.tildastat("readtime")
            }, 15e3));
            break;
        case "scroll":
            h && "function" == typeof t_throttle && window.addEventListener("scroll", t_throttle(a, 1e3));
            break;
        case "cookieenabled":
            f = !1,
            l(),
            s(),
            g.userid = v,
            g.sessionid = y,
            g.page = "/tilda/cookieenabled/",
            p();
            break;
        case "fingerprint":
            return c()
        }
    }
    ;
    var g = {}
      , w = {
        p10: 0,
        p25: 0,
        p50: 0,
        p75: 0,
        p90: 0
    }
      , m = !0
      , f = "no" === window.tildastatcookie
      , h = (window.tildastatcookie || r && (f = "no" === r.getAttribute("data-tilda-cookie")),
    "yes" === window.tildastatcookiegdpr && !1 === f && (f = !0) === n("t_cookiesConsentGiven") && "string" == typeof (i = n("t_cookiesCategories")) && -1 < i.indexOf("analytics") && (f = !1),
    "yes" === window.tildastatscroll)
      , v = (void 0 === window.tildastatscroll && r && (h = "yes" === r.getAttribute("data-tilda-stat-scroll")),
    "")
      , y = ""
      , b = !1
      , t = (window.tildastat("create"),
    setTimeout(function() {
        window.tildastat("pageview"),
        window.tildastat("readtime"),
        window.tildastat("scroll")
    }, 500),
    setInterval(function() {
        var e;
        ("object" == typeof window.t_jserrors && 0 < window.t_jserrors.length || "object" == typeof window.t_cdnerrors && 0 < window.t_cdnerrors.length || "object" == typeof window.t_ajaxerrors && 0 < window.t_ajaxerrors.length) && "function" != typeof t_errors__sendJSErrors && ((e = document.createElement("script")).src = "https://static.tildacdn.com/js/tilda-errors-1.0.min.js",
        e.async = !0,
        document.body.appendChild(e),
        clearInterval(t))
    }, 2e3))
      , i = document.querySelector("link[rel*='shortcut icon']")
      , k = (k = document.querySelectorAll("link[href*='tilda.ws/project']").length) || document.querySelectorAll("link[href*='ws.tildacdn.com/project']").length
      , x = i ? i.getAttribute("href") : ""
      , E = document.querySelector("script[src*='js/tilda-scripts']")
      , E = !!E && -1 === E.src.indexOf("tildacdn");
    E = E || i && -1 !== x.indexOf("static.tildacdn.com") && -1 !== x.indexOf("tilda.") && -1 !== x.indexOf("/tildafavicon.ico") && !document.querySelector("table#allrecords") && !(-1 !== window.location.hostname.indexOf(".tilda.ws")) && !k,
    void 0 === navigator.sendBeacon || /Bot/i.test(navigator.userAgent) || E || 1 === Math.floor(5 * Math.random()) && (i = function() {
        var e = document.createElement("script");
        e.async = !0,
        e.type = "text/javascript",
        e.src = "https://static.tildacdn.com/js/tilda-performance-1.0.min.js",
        document.body.insertAdjacentElement("beforeend", e)
    }
    ,
    "complete" === document.readyState ? i() : window.addEventListener("load", i))
}();
