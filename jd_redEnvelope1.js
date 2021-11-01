/*
双十一无门槛红包
cron 0 0,12,20 * * * https://raw.githubusercontent.com/star261/jd/main/scripts/jd_red.js
返利变量：FLCODE，默认给脚本作者返利，若需要返利给自己，请自己修改返利变量FLCODE；例：FLCODE="你的返利code"
* */
const $ = new Env('双11红包');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
console.log('使用返利软件/有特殊需求者,请自己设置返利变量或者停用脚本!请阅读群内置顶!')
let author = ['yMi62Zo', 'yMi62Zo', 'yMi62Zo']
author = author[Math.floor((Math.random() * author.length))]
const flCode = $.isNode() ? (process.env.FLCODE ? process.env.FLCODE : author) : author;
let cookiesArr = [];
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
    };
} else {
    cookiesArr = [
        $.getdata("CookieJD"),
        $.getdata("CookieJD2"),
        ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
let cookie = '';
$.code = flCode;
$.shareCode = '';
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
			await $.wait(8000);
            $.nickName = '';
            await TotalBean();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            await main()
        }
    }
})().catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
}).finally(() => {
    $.done();
});

async function main() {
    let userName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
    $.UA = `jdapp;iPhone;10.2.0;13.1.2;${randomString(40)};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460622;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    $.max = false;
    $.hotFlag = false;
    for (let i = 0; i < 10 && !$.max; i++) {
        $.newCookie = '';
        $.url1 = '';
        $.url2 = '';
        $.eid = '';
        await getInfo1();
		await $.wait(8000);
        if(!$.url1){console.log(`${userName},初始化1失败,可能黑号`);$.hotFlag = true;break;}
        await getInfo2();
		await $.wait(8000);
        if(!$.url2){console.log(`${userName},初始化2失败,可能黑号`);$.hotFlag = true;break;}
        $.actId = $.url2.match(/mall\/active\/([^/]+)\/index\.html/) && $.url2.match(/mall\/active\/([^/]+)\/index\.html/)[1] || '2GdKXzvywVytLvcJTk2K3pLtDEHq';
        let arr = await getBody($.UA,$.url2);
		await $.wait(8000);
        await getEid(arr)
        console.log(`$.actId:`+$.actId)
        if($.eid){
            if(i === 0 && $.shareCode){
                await getCoupons($.shareCode);
            }else{
                await getCoupons("");
            }
        }
        await $.wait(5000)
    }
    if($.index === 1 && !$.hotFlag){
        await $.wait(5000)
        await mainInfo()
    }
}
function mainInfo() {
    return new Promise(resolve => {
        let opts = {
            url: `https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=u&_=${Date.now()}&loginType=2&body={%22unionActId%22:%2231134%22,%22actId%22:%22${$.actId}%22,%22platform%22:4,%22unionShareId%22:%22${$.shareCode}%22,%22d%22:%22${$.code}%22,%22supportPic%22:2,%22supportLuckyCode%22:0,%22eid%22:%22${$.eid}%22}&client=apple&clientVersion=8.3.6`,
            headers: {
                "Accept-Language": "zh-cn",
                "Accept-Encoding": "gzip, deflate, br",
                'Cookie': `${$.newCookie} ${cookie}`,
                "User-Agent": $.UA ,
            }
        }
        $.get(opts, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.toStr(err)}`)
                } else {
                    let res = $.toObj(data,data);
                    if(typeof res == 'object'){
                        if(res.code == 0 && res.data && res.data.shareUrl){
                            // $.shareCode = res.data.shareUrl.match(/$.code\?s=([^&]+)/) && res.data.shareUrl.match(/$.code\?s=([^&]+)/)[1] || ''
                            $.shareCode = res.data.shareUrl.match(/\?s=([^&]+)/) && res.data.shareUrl.match(/\?s=([^&]+)/)[1] || ''
                            console.log('助力码:'+$.shareCode)
                        }
                    }else{
                        console.log(data)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
function getEid(arr) {
    return new Promise(resolve => {
        const options = {
            url: `https://gia.jd.com/fcf.html?a=${arr.a}`,
            body: `d=${arr.d}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "User-Agent": $.UA
            }
        }
        $.post(options, async (err, resp, data) => {
            try {
                if (err) {
                    throw new Error(err);
                } else {
                    if (data.indexOf("*_*") > 0) {
                        data = data.split("*_*", 2);
                        data = JSON.parse(data[1]);
                        $.eid = data.eid
                    } else {
                        console.log(`京豆api返回数据为空，请检查自身原因`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}
function randomString(e) {
    e = e || 32;
    let t = "abcdef0123456789", a = t.length, n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}
async function getCoupons(shareCode){
    return new Promise(resolve => {
        let opts = {
            url: `https://api.m.jd.com/api?functionId=getCoupons&appid=u&_=${Date.now()}&loginType=2&body={%22platform%22:4,%22unionActId%22:%2231134%22,%22actId%22:%22${$.actId}%22,%22d%22:%22${$.code}%22,%22unionShareId%22:%22${shareCode}%22,%22type%22:1,%22eid%22:%22${$.eid}%22}&client=apple&clientVersion=8.3.6&h5st=undefined`,
            headers: {
                "Accept-Language": "zh-cn",
                "Accept-Encoding": "gzip, deflate, br",
                'Cookie': `${$.newCookie} ${cookie}`,
                'user-agent': $.UA
            }
        }
        $.get(opts, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.toStr(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    let res = $.toObj(data,data);
                    if(typeof res == 'object'){
                        if(res.msg){
                            console.log('异常：'+res.msg)
                        }
                        if(res.msg.indexOf('上限') !== -1){
                            $.max = true;
                        }
                        if($.shareId && typeof res.data !== 'undefined' && typeof res.data.joinNum !== 'undefined'){
                            console.log(`当前${res.data.joinSuffix}:${res.data.joinNum}`)
                        }
                        if(res.code == 0 && res.data){
                            if(res.data.type == 1){
                                console.log(`获得红包：${res.data.discount}元`)
                            }else if(res.data.type == 3){
                                console.log(`获得优惠券：️满${res.data.quota}减${res.data.discount}`)
                            }else if(res.data.type == 6){
                                console.log(`获得打折券：满${res.data.quota}打${res.data.discount*10}折`)
                            }else{
                                console.log(`获得未知${res.data.quota || ''} ${res.data.discount}`)
                                console.log(data)
                            }
                        }
                    }else{
                        console.log(data)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
async function getInfo2() {
    return new Promise(resolve => {
        const options = {
            url: $.url1,
            followRedirect:false,
            headers: {
                'Cookie': `${$.newCookie} ${cookie}`,
                'user-agent': $.UA
            }
        }
        $.get(options, async (err, resp, data) => {
            try {
                let setcookies = resp && resp['headers'] && (resp['headers']['set-cookie'] || resp['headers']['Set-Cookie'] || '') || ''
                let setcookie = ''
                if(setcookies){
                    if(typeof setcookies != 'object'){
                        setcookie = setcookies.split(',')
                    }else setcookie = setcookies
                    for (let ck of setcookie) {
                        let name = ck.split(";")[0].trim()
                        if(name.split("=")[1]){
                            if($.newCookie.indexOf(name.split("=")[1]) == -1) $.newCookie += name.replace(/ /g,'')+'; '
                        }
                    }
                }
                $.url2 = resp && resp['headers'] && (resp['headers']['location'] || resp['headers']['Location'] || '') || ''
                $.url2 = decodeURIComponent($.url2)
                $.url2 = $.url2.match(/(https:\/\/prodev\.m\.jd\.com\/mall[^'"]+)/) && $.url2.match(/(https:\/\/prodev\.m\.jd\.com\/mall[^'"]+)/)[1] || ''
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}
async function getInfo1(cookie){
    return new Promise(resolve => {
        const options = {
            url: `https://u.jd.com/${$.code}?s=${$.shareCode}`,
            followRedirect:false,
            headers: {
                'Cookie': cookie,
                'user-agent': $.UA
            }
        }
        $.get(options, async (err, resp, data) => {
            try {
                let setcookies = resp && resp['headers'] && (resp['headers']['set-cookie'] || resp['headers']['Set-Cookie'] || '') || '';
                let setcookie = ''
                if(setcookies){
                    if(typeof setcookies != 'object'){
                        setcookie = setcookies.split(',')
                    }else setcookie = setcookies
                    for (let ck of setcookie) {
                        let name = ck.split(";")[0].trim()
                        if(name.split("=")[1]){
                            if($.newCookie.indexOf(name.split("=")[1]) == -1) $.newCookie += name.replace(/ /g,'')+'; '
                        }
                    }
                }
                $.url1 = data.match(/(https:\/\/u\.jd\.com\/jda[^']+)/) && data.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1] || ''
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}
const navigator = {
    userAgent: require('./USER_AGENTS').USER_AGENT,
    plugins: { length: 0 },
    language: "zh-CN",
};
const screen = {
    availHeight: 812,
    availWidth: 375,
    colorDepth: 24,
    height: 812,
    width: 375,
    pixelDepth: 24,

}
const window = {

}
const document = {
    location: {
        "ancestorOrigins": {},
        "href": "https://prodev.m.jd.com/mall/active/3BbAVGQPDd6vTyHYjmAutXrKAos6/index.html",
        "origin": "https://prodev.m.jd.com",
        "protocol": "https:",
        "host": "prodev.m.jd.com",
        "hostname": "prodev.m.jd.com",
        "port": "",
        "pathname": "/mall/active/3BbAVGQPDd6vTyHYjmAutXrKAos6/index.html",
        "search": "",
        "hash": ""
    }
};
var start_time = (new Date).getTime(),
    _jdfp_canvas_md5 = "",
    _jdfp_webgl_md5 = "",
    _fingerprint_step = 1,
    _JdEid = "",
    _eidFlag = !1,
    risk_jd_local_fingerprint = "",
    _jd_e_joint_;
function t(a) {
    if (null == a || void 0 == a || "" == a) return "NA";
    if (null == a || void 0 == a || "" == a) var b = "";
    else {
        b = [];
        for (var c = 0; c < 8 * a.length; c += 8) b[c >> 5] |= (a.charCodeAt(c / 8) & 255) << c % 32
    }
    a = 8 * a.length;
    b[a >> 5] |= 128 << a % 32;
    b[(a + 64 >>> 9 << 4) + 14] = a;
    a = 1732584193;
    c = -271733879;
    for (var l = -1732584194, h = 271733878, q = 0; q < b.length; q += 16) {
        var z = a,
            C = c,
            D = l,
            B = h;
        a = v(a, c, l, h, b[q + 0], 7, -680876936);
        h = v(h, a, c, l, b[q + 1], 12, -389564586);
        l = v(l, h, a, c, b[q + 2], 17, 606105819);
        c = v(c, l, h, a, b[q + 3], 22, -1044525330);
        a = v(a, c, l, h, b[q + 4], 7, -176418897);
        h = v(h, a, c, l, b[q + 5], 12, 1200080426);
        l = v(l, h, a, c, b[q + 6], 17, -1473231341);
        c = v(c, l, h, a, b[q + 7], 22, -45705983);
        a = v(a, c, l, h, b[q + 8], 7, 1770035416);
        h = v(h, a, c, l, b[q + 9], 12, -1958414417);
        l = v(l, h, a, c, b[q + 10], 17, -42063);
        c = v(c, l, h, a, b[q + 11], 22, -1990404162);
        a = v(a, c, l, h, b[q + 12], 7, 1804603682);
        h = v(h, a, c, l, b[q + 13], 12, -40341101);
        l = v(l, h, a, c, b[q + 14], 17, -1502002290);
        c = v(c, l, h, a, b[q + 15], 22, 1236535329);
        a = x(a, c, l, h, b[q + 1], 5, -165796510);
        h = x(h, a, c, l, b[q + 6], 9, -1069501632);
        l = x(l, h, a, c, b[q + 11], 14, 643717713);
        c = x(c, l, h, a, b[q + 0], 20, -373897302);
        a = x(a, c, l, h, b[q + 5], 5, -701558691);
        h = x(h, a, c, l, b[q + 10], 9, 38016083);
        l = x(l, h, a, c, b[q + 15], 14, -660478335);
        c = x(c, l, h, a, b[q + 4], 20, -405537848);
        a = x(a, c, l, h, b[q + 9], 5, 568446438);
        h = x(h, a, c, l, b[q + 14], 9, -1019803690);
        l = x(l, h, a, c, b[q + 3], 14, -187363961);
        c = x(c, l, h, a, b[q + 8], 20, 1163531501);
        a = x(a, c, l, h, b[q + 13], 5, -1444681467);
        h = x(h, a, c, l, b[q + 2], 9, -51403784);
        l = x(l, h, a, c, b[q + 7], 14, 1735328473);
        c = x(c, l, h, a, b[q + 12], 20, -1926607734);
        a = u(c ^ l ^ h, a, c, b[q + 5], 4, -378558);
        h = u(a ^ c ^ l, h, a, b[q + 8], 11, -2022574463);
        l = u(h ^ a ^ c, l, h, b[q + 11], 16, 1839030562);
        c = u(l ^ h ^ a, c, l, b[q + 14], 23, -35309556);
        a = u(c ^ l ^ h, a, c, b[q + 1], 4, -1530992060);
        h = u(a ^ c ^ l, h, a, b[q + 4], 11, 1272893353);
        l = u(h ^ a ^ c, l, h, b[q + 7], 16, -155497632);
        c = u(l ^ h ^ a, c, l, b[q + 10], 23, -1094730640);
        a = u(c ^ l ^ h, a, c, b[q + 13], 4, 681279174);
        h = u(a ^ c ^ l, h, a, b[q + 0], 11, -358537222);
        l = u(h ^ a ^ c, l, h, b[q + 3], 16, -722521979);
        c = u(l ^ h ^ a, c, l, b[q + 6], 23, 76029189);
        a = u(c ^ l ^ h, a, c, b[q + 9], 4, -640364487);
        h = u(a ^ c ^ l, h, a, b[q + 12], 11, -421815835);
        l = u(h ^ a ^ c, l, h, b[q + 15], 16, 530742520);
        c = u(l ^ h ^ a, c, l, b[q + 2], 23, -995338651);
        a = w(a, c, l, h, b[q + 0], 6, -198630844);
        h = w(h, a, c, l, b[q + 7], 10, 1126891415);
        l = w(l, h, a, c, b[q + 14], 15, -1416354905);
        c = w(c, l, h, a, b[q + 5], 21, -57434055);
        a = w(a, c, l, h, b[q + 12], 6, 1700485571);
        h = w(h, a, c, l, b[q + 3], 10, -1894986606);
        l = w(l, h, a, c, b[q + 10], 15, -1051523);
        c = w(c, l, h, a, b[q + 1], 21, -2054922799);
        a = w(a, c, l, h, b[q + 8], 6, 1873313359);
        h = w(h, a, c, l, b[q + 15], 10, -30611744);
        l = w(l, h, a, c, b[q + 6], 15, -1560198380);
        c = w(c, l, h, a, b[q + 13], 21, 1309151649);
        a = w(a, c, l, h, b[q + 4], 6, -145523070);
        h = w(h, a, c, l, b[q + 11], 10, -1120210379);
        l = w(l, h, a, c, b[q + 2], 15, 718787259);
        c = w(c, l, h, a, b[q + 9], 21, -343485551);
        a = A(a, z);
        c = A(c, C);
        l = A(l, D);
        h = A(h, B)
    }
    b = [a, c, l, h];
    a = "";
    for (c = 0; c < 4 * b.length; c++) a += "0123456789abcdef".charAt(b[c >> 2] >> c % 4 * 8 + 4 & 15) +
        "0123456789abcdef".charAt(b[c >> 2] >> c % 4 * 8 & 15);
    return a
}
function u(a, b, c, l, h, q) {
    a = A(A(b, a), A(l, q));
    return A(a << h | a >>> 32 - h, c)
}
function v(a, b, c, l, h, q, z) {
    return u(b & c | ~b & l, a, b, h, q, z)
}
function x(a, b, c, l, h, q, z) {
    return u(b & l | c & ~l, a, b, h, q, z)
}
function w(a, b, c, l, h, q, z) {
    return u(c ^ (b | ~l), a, b, h, q, z)
}
function A(a, b) {
    var c = (a & 65535) + (b & 65535);
    return (a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535
}
_fingerprint_step = 2;
var y = "",
    n = navigator.userAgent.toLowerCase();
n.indexOf("jdapp") && (n = n.substring(0, 90));
var e = navigator.language,
    f = n; - 1 != f.indexOf("ipad") || -1 != f.indexOf("iphone os") || -1 != f.indexOf("midp") || -1 != f.indexOf(
    "rv:1.2.3.4") || -1 != f.indexOf("ucweb") || -1 != f.indexOf("android") || -1 != f.indexOf("windows ce") ||
f.indexOf("windows mobile");
var r = "NA",
    k = "NA";
try {
    -1 != f.indexOf("win") && -1 != f.indexOf("95") && (r = "windows", k = "95"), -1 != f.indexOf("win") && -1 !=
    f.indexOf("98") && (r = "windows", k = "98"), -1 != f.indexOf("win 9x") && -1 != f.indexOf("4.90") && (
        r = "windows", k = "me"), -1 != f.indexOf("win") && -1 != f.indexOf("nt 5.0") && (r = "windows", k =
        "2000"), -1 != f.indexOf("win") && -1 != f.indexOf("nt") && (r = "windows", k = "NT"), -1 != f.indexOf(
        "win") && -1 != f.indexOf("nt 5.1") && (r = "windows", k = "xp"), -1 != f.indexOf("win") && -1 != f
        .indexOf("32") && (r = "windows", k = "32"), -1 != f.indexOf("win") && -1 != f.indexOf("nt 5.1") && (r =
        "windows", k = "7"), -1 != f.indexOf("win") && -1 != f.indexOf("6.0") && (r = "windows", k = "8"),
    -1 == f.indexOf("win") || -1 == f.indexOf("nt 6.0") && -1 == f.indexOf("nt 6.1") || (r = "windows", k =
        "9"), -1 != f.indexOf("win") && -1 != f.indexOf("nt 6.2") && (r = "windows", k = "10"), -1 != f.indexOf(
        "linux") && (r = "linux"), -1 != f.indexOf("unix") && (r = "unix"), -1 != f.indexOf("sun") && -1 !=
    f.indexOf("os") && (r = "sun os"), -1 != f.indexOf("ibm") && -1 != f.indexOf("os") && (r = "ibm os/2"),
    -1 != f.indexOf("mac") && -1 != f.indexOf("pc") && (r = "mac"), -1 != f.indexOf("aix") && (r = "aix"),
    -1 != f.indexOf("powerpc") && (r = "powerPC"), -1 != f.indexOf("hpux") && (r = "hpux"), -1 != f.indexOf(
        "netbsd") && (r = "NetBSD"), -1 != f.indexOf("bsd") && (r = "BSD"), -1 != f.indexOf("osf1") && (r =
        "OSF1"), -1 != f.indexOf("irix") && (r = "IRIX", k = ""), -1 != f.indexOf("freebsd") && (r =
        "FreeBSD"), -1 != f.indexOf("symbianos") && (r = "SymbianOS", k = f.substring(f.indexOf(
        "SymbianOS/") + 10, 3))
} catch (a) { }
_fingerprint_step = 3;
var g = "NA",
    m = "NA";
try {
    -1 != f.indexOf("msie") && (g = "ie", m = f.substring(f.indexOf("msie ") + 5), m.indexOf(";") && (m = m.substring(
        0, m.indexOf(";")))); - 1 != f.indexOf("firefox") && (g = "Firefox", m = f.substring(f.indexOf(
        "firefox/") + 8)); - 1 != f.indexOf("opera") && (g = "Opera", m = f.substring(f.indexOf("opera/") + 6,
        4)); - 1 != f.indexOf("safari") && (g = "safari", m = f.substring(f.indexOf("safari/") + 7)); - 1 != f.indexOf(
        "chrome") && (g = "chrome", m = f.substring(f.indexOf("chrome/") + 7), m.indexOf(" ") && (m = m.substring(
        0, m.indexOf(" ")))); - 1 != f.indexOf("navigator") && (g = "navigator", m = f.substring(f.indexOf(
        "navigator/") + 10)); - 1 != f.indexOf("applewebkit") && (g = "applewebkit_chrome", m = f.substring(f.indexOf(
        "applewebkit/") + 12), m.indexOf(" ") && (m = m.substring(0, m.indexOf(" ")))); - 1 != f.indexOf(
        "sogoumobilebrowser") && (g = "\u641c\u72d7\u624b\u673a\u6d4f\u89c8\u5668");
    if (-1 != f.indexOf("ucbrowser") || -1 != f.indexOf("ucweb")) g = "UC\u6d4f\u89c8\u5668";
    if (-1 != f.indexOf("qqbrowser") || -1 != f.indexOf("tencenttraveler")) g = "QQ\u6d4f\u89c8\u5668"; - 1 !=
    f.indexOf("metasr") && (g = "\u641c\u72d7\u6d4f\u89c8\u5668"); - 1 != f.indexOf("360se") && (g =
        "360\u6d4f\u89c8\u5668"); - 1 != f.indexOf("the world") && (g =
        "\u4e16\u754c\u4e4b\u7a97\u6d4f\u89c8\u5668"); - 1 != f.indexOf("maxthon") && (g =
        "\u9068\u6e38\u6d4f\u89c8\u5668")
} catch (a) { }
class JdJrTdRiskFinger {
    f = {
        options: function (){
            return {}
        },
        nativeForEach: Array.prototype.forEach,
        nativeMap: Array.prototype.map,
        extend: function (a, b) {
            if (null == a) return b;
            for (var c in a) null != a[c] && b[c] !== a[c] && (b[c] = a[c]);
            return b
        },
        getData: function () {
            return y
        },
        get: function (a) {
            var b = 1 * m,
                c = [];
            "ie" == g && 7 <= b ? (c.push(n), c.push(e), y = y + ",'userAgent':'" + t(n) + "','language':'" +
                e + "'", this.browserRedirect(n)) : (c = this.userAgentKey(c), c = this.languageKey(c));
            c.push(g);
            c.push(m);
            c.push(r);
            c.push(k);
            y = y + ",'os':'" + r + "','osVersion':'" + k + "','browser':'" + g + "','browserVersion':'" +
                m + "'";
            c = this.colorDepthKey(c);
            c = this.screenResolutionKey(c);
            c = this.timezoneOffsetKey(c);
            c = this.sessionStorageKey(c);
            c = this.localStorageKey(c);
            c = this.indexedDbKey(c);
            c = this.addBehaviorKey(c);
            c = this.openDatabaseKey(c);
            c = this.cpuClassKey(c);
            c = this.platformKey(c);
            c = this.hardwareConcurrencyKey(c);
            c = this.doNotTrackKey(c);
            c = this.pluginsKey(c);
            c = this.canvasKey(c);
            c = this.webglKey(c);
            b = this.x64hash128(c.join("~~~"), 31);
            return a(b)
        },
        userAgentKey: function (a) {
            a.push(navigator.userAgent), y = y + ",'userAgent':'" + t(
                navigator.userAgent) + "'", this.browserRedirect(navigator.userAgent);
            return a
        },
        replaceAll: function (a, b, c) {
            for (; 0 <= a.indexOf(b);) a = a.replace(b, c);
            return a
        },
        browserRedirect: function (a) {
            var b = a.toLowerCase();
            a = "ipad" == b.match(/ipad/i);
            var c = "iphone os" == b.match(/iphone os/i),
                l = "midp" == b.match(/midp/i),
                h = "rv:1.2.3.4" == b.match(/rv:1.2.3.4/i),
                q = "ucweb" == b.match(/ucweb/i),
                z = "android" == b.match(/android/i),
                C = "windows ce" == b.match(/windows ce/i);
            b = "windows mobile" == b.match(/windows mobile/i);
            y = a || c || l || h || q || z || C || b ? y + ",'origin':'mobile'" : y + ",'origin':'pc'"
        },
        languageKey: function (a) {
            '' || (a.push(navigator.language), y = y + ",'language':'" + this.replaceAll(
                navigator.language, " ", "_") + "'");
            return a
        },
        colorDepthKey: function (a) {
            '' || (a.push(screen.colorDepth), y = y + ",'colorDepth':'" +
                screen.colorDepth + "'");
            return a
        },
        screenResolutionKey: function (a) {
            if (!this.options.excludeScreenResolution) {
                var b = this.getScreenResolution();
                "undefined" !== typeof b && (a.push(b.join("x")), y = y + ",'screenResolution':'" + b.join(
                    "x") + "'")
            }
            return a
        },
        getScreenResolution: function () {
            return this.options.detectScreenOrientation ? screen.height > screen.width ? [screen.height,
                screen.width] : [screen.width, screen.height] : [screen.height, screen.width]
        },
        timezoneOffsetKey: function (a) {
            this.options.excludeTimezoneOffset || (a.push((new Date).getTimezoneOffset()), y = y +
                ",'timezoneOffset':'" + (new Date).getTimezoneOffset() / 60 + "'");
            return a
        },
        sessionStorageKey: function (a) {
            !this.options.excludeSessionStorage && this.hasSessionStorage() && (a.push("sessionStorageKey"),
                y += ",'sessionStorage':true");
            return a
        },
        localStorageKey: function (a) {
            !this.options.excludeSessionStorage && this.hasLocalStorage() && (a.push("localStorageKey"), y +=
                ",'localStorage':true");
            return a
        },
        indexedDbKey: function (a) {
            !this.options.excludeIndexedDB && this.hasIndexedDB() && (a.push("indexedDbKey"), y +=
                ",'indexedDb':true");
            return a
        },
        addBehaviorKey: function (a) {
            document.body && !this.options.excludeAddBehavior && document.body.addBehavior ? (a.push(
                "addBehaviorKey"), y += ",'addBehavior':true") : y += ",'addBehavior':false";
            return a
        },
        openDatabaseKey: function (a) {
            !this.options.excludeOpenDatabase && window.openDatabase ? (a.push("openDatabase"), y +=
                ",'openDatabase':true") : y += ",'openDatabase':false";
            return a
        },
        cpuClassKey: function (a) {
            this.options.excludeCpuClass || (a.push(this.getNavigatorCpuClass()), y = y + ",'cpu':'" + this
                .getNavigatorCpuClass() + "'");
            return a
        },
        platformKey: function (a) {
            this.options.excludePlatform || (a.push(this.getNavigatorPlatform()), y = y + ",'platform':'" +
                this.getNavigatorPlatform() + "'");
            return a
        },
        hardwareConcurrencyKey: function (a) {
            var b = this.getHardwareConcurrency();
            a.push(b);
            y = y + ",'ccn':'" + b + "'";
            return a
        },
        doNotTrackKey: function (a) {
            this.options.excludeDoNotTrack || (a.push(this.getDoNotTrack()), y = y + ",'track':'" + this.getDoNotTrack() +
                "'");
            return a
        },
        canvasKey: function (a) {
            if (!this.options.excludeCanvas && this.isCanvasSupported()) {
                var b = this.getCanvasFp();
                a.push(b);
                _jdfp_canvas_md5 = t(b);
                y = y + ",'canvas':'" + _jdfp_canvas_md5 + "'"
            }
            return a
        },
        webglKey: function (a) {
            if (!this.options.excludeWebGL && this.isCanvasSupported()) {
                var b = this.getWebglFp();
                _jdfp_webgl_md5 = t(b);
                a.push(b);
                y = y + ",'webglFp':'" + _jdfp_webgl_md5 + "'"
            }
            return a
        },
        pluginsKey: function (a) {
            this.isIE() ? (a.push(this.getIEPluginsString()), y = y + ",'plugins':'" + t(this.getIEPluginsString()) +
                "'") : (a.push(this.getRegularPluginsString()), y = y + ",'plugins':'" + t(this.getRegularPluginsString()) +
                "'");
            return a
        },
        getRegularPluginsString: function () {
            return this.map(navigator.plugins, function (a) {
                var b = this.map(a, function (c) {
                    return [c.type, c.suffixes].join("~")
                }).join(",");
                return [a.name, a.description, b].join("::")
            }, this).join(";")
        },
        getIEPluginsString: function () {
            return window.ActiveXObject ? this.map(
                "AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);Scripting.Dictionary;SWCtl.SWCtl;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;Skype.Detection;TDCCtl.TDCCtl;WMPlayer.OCX;rmocx.RealPlayer G2 Control;rmocx.RealPlayer G2 Control.1"
                    .split(";"),
                function (a) {
                    try {
                        return new ActiveXObject(a), a
                    } catch (b) {
                        return null
                    }
                }).join(";") : ""
        },
        hasSessionStorage: function () {
            try {
                return !!window.sessionStorage
            } catch (a) {
                return !0
            }
        },
        hasLocalStorage: function () {
            try {
                return !!window.localStorage
            } catch (a) {
                return !0
            }
        },
        hasIndexedDB: function () {
            return true
            return !!window.indexedDB
        },
        getNavigatorCpuClass: function () {
            return navigator.cpuClass ? navigator.cpuClass : "NA"
        },
        getNavigatorPlatform: function () {
            return navigator.platform ? navigator.platform : "NA"
        },
        getHardwareConcurrency: function () {
            return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "NA"
        },
        getDoNotTrack: function () {
            return navigator.doNotTrack ? navigator.doNotTrack : "NA"
        },
        getCanvasFp: function () {
            return '';
            var a = navigator.userAgent.toLowerCase();
            if ((0 < a.indexOf("jdjr-app") || 0 <= a.indexOf("jdapp")) && (0 < a.indexOf("iphone") || 0 < a
                .indexOf("ipad"))) return null;
            a = document.createElement("canvas");
            var b = a.getContext("2d");
            b.fillStyle = "red";
            b.fillRect(30, 10, 200, 100);
            b.strokeStyle = "#1a3bc1";
            b.lineWidth = 6;
            b.lineCap = "round";
            b.arc(50, 50, 20, 0, Math.PI, !1);
            b.stroke();
            b.fillStyle = "#42e1a2";
            b.font = "15.4px 'Arial'";
            b.textBaseline = "alphabetic";
            b.fillText("PR flacks quiz gym: TV DJ box when? \u2620", 15, 60);
            b.shadowOffsetX = 1;
            b.shadowOffsetY = 2;
            b.shadowColor = "white";
            b.fillStyle = "rgba(0, 0, 200, 0.5)";
            b.font = "60px 'Not a real font'";
            b.fillText("No\u9a97", 40, 80);
            return a.toDataURL()
        },
        getWebglFp: function () {
            var a = navigator.userAgent;
            a = a.toLowerCase();
            if ((0 < a.indexOf("jdjr-app") || 0 <= a.indexOf("jdapp")) && (0 < a.indexOf("iphone") || 0 < a
                .indexOf("ipad"))) return null;
            a = function (D) {
                b.clearColor(0, 0, 0, 1);
                b.enable(b.DEPTH_TEST);
                b.depthFunc(b.LEQUAL);
                b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                return "[" + D[0] + ", " + D[1] + "]"
            };
            var b = this.getWebglCanvas();
            if (!b) return null;
            var c = [],
                l = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, l);
            var h = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
            b.bufferData(b.ARRAY_BUFFER, h, b.STATIC_DRAW);
            l.itemSize = 3;
            l.numItems = 3;
            h = b.createProgram();
            var q = b.createShader(b.VERTEX_SHADER);
            b.shaderSource(q,
                "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"
            );
            b.compileShader(q);
            var z = b.createShader(b.FRAGMENT_SHADER);
            b.shaderSource(z,
                "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"
            );
            b.compileShader(z);
            b.attachShader(h, q);
            b.attachShader(h, z);
            b.linkProgram(h);
            b.useProgram(h);
            h.vertexPosAttrib = b.getAttribLocation(h, "attrVertex");
            h.offsetUniform = b.getUniformLocation(h, "uniformOffset");
            b.enableVertexAttribArray(h.vertexPosArray);
            b.vertexAttribPointer(h.vertexPosAttrib, l.itemSize, b.FLOAT, !1, 0, 0);
            b.uniform2f(h.offsetUniform, 1, 1);
            b.drawArrays(b.TRIANGLE_STRIP, 0, l.numItems);
            null != b.canvas && c.push(b.canvas.toDataURL());
            c.push("extensions:" + b.getSupportedExtensions().join(";"));
            c.push("extensions:" + b.getSupportedExtensions().join(";"));
            c.push("w1" + a(b.getParameter(b.ALIASED_LINE_WIDTH_RANGE)));
            c.push("w2" + a(b.getParameter(b.ALIASED_POINT_SIZE_RANGE)));
            c.push("w3" + b.getParameter(b.ALPHA_BITS));
            c.push("w4" + (b.getContextAttributes().antialias ? "yes" : "no"));
            c.push("w5" + b.getParameter(b.BLUE_BITS));
            c.push("w6" + b.getParameter(b.DEPTH_BITS));
            c.push("w7" + b.getParameter(b.GREEN_BITS));
            c.push("w8" + function (D) {
                var B, F = D.getExtension("EXT_texture_filter_anisotropic") || D.getExtension(
                    "WEBKIT_EXT_texture_filter_anisotropic") || D.getExtension(
                    "MOZ_EXT_texture_filter_anisotropic");
                return F ? (B = D.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === B && (B = 2),
                    B) : null
            }(b));
            c.push("w9" + b.getParameter(b.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
            c.push("w10" + b.getParameter(b.MAX_CUBE_MAP_TEXTURE_SIZE));
            c.push("w11" + b.getParameter(b.MAX_FRAGMENT_UNIFORM_VECTORS));
            c.push("w12" + b.getParameter(b.MAX_RENDERBUFFER_SIZE));
            c.push("w13" + b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS));
            c.push("w14" + b.getParameter(b.MAX_TEXTURE_SIZE));
            c.push("w15" + b.getParameter(b.MAX_VARYING_VECTORS));
            c.push("w16" + b.getParameter(b.MAX_VERTEX_ATTRIBS));
            c.push("w17" + b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
            c.push("w18" + b.getParameter(b.MAX_VERTEX_UNIFORM_VECTORS));
            c.push("w19" + a(b.getParameter(b.MAX_VIEWPORT_DIMS)));
            c.push("w20" + b.getParameter(b.RED_BITS));
            c.push("w21" + b.getParameter(b.RENDERER));
            c.push("w22" + b.getParameter(b.SHADING_LANGUAGE_VERSION));
            c.push("w23" + b.getParameter(b.STENCIL_BITS));
            c.push("w24" + b.getParameter(b.VENDOR));
            c.push("w25" + b.getParameter(b.VERSION));
            try {
                var C = b.getExtension("WEBGL_debug_renderer_info");
                C && (c.push("wuv:" + b.getParameter(C.UNMASKED_VENDOR_WEBGL)), c.push("wur:" + b.getParameter(
                    C.UNMASKED_RENDERER_WEBGL)))
            } catch (D) { }
            return c.join("\u00a7")
        },
        isCanvasSupported: function () {
            return true;
            var a = document.createElement("canvas");
            return !(!a.getContext || !a.getContext("2d"))
        },
        isIE: function () {
            return "Microsoft Internet Explorer" === navigator.appName || "Netscape" === navigator.appName &&
            /Trident/.test(navigator.userAgent) ? !0 : !1
        },
        getWebglCanvas: function () {
            return null;
            var a = document.createElement("canvas"),
                b = null;
            try {
                var c = navigator.userAgent;
                c = c.toLowerCase();
                (0 < c.indexOf("jdjr-app") || 0 <= c.indexOf("jdapp")) && (0 < c.indexOf("iphone") || 0 < c
                    .indexOf("ipad")) || (b = a.getContext("webgl") || a.getContext("experimental-webgl"))
            } catch (l) { }
            b || (b = null);
            return b
        },
        each: function (a, b, c) {
            if (null !== a)
                if (this.nativeForEach && a.forEach === this.nativeForEach) a.forEach(b, c);
                else if (a.length === +a.length)
                    for (var l = 0, h = a.length; l < h && b.call(c, a[l], l, a) !== {}; l++);
                else
                    for (l in a)
                        if (a.hasOwnProperty(l) && b.call(c, a[l], l, a) === {}) break
        },
        map: function (a, b, c) {
            var l = [];
            if (null == a) return l;
            if (this.nativeMap && a.map === this.nativeMap) return a.map(b, c);
            this.each(a, function (h, q, z) {
                l[l.length] = b.call(c, h, q, z)
            });
            return l
        },
        x64Add: function (a, b) {
            a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
            b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
            var c = [0, 0, 0, 0];
            c[3] += a[3] + b[3];
            c[2] += c[3] >>> 16;
            c[3] &= 65535;
            c[2] += a[2] + b[2];
            c[1] += c[2] >>> 16;
            c[2] &= 65535;
            c[1] += a[1] + b[1];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[0] += a[0] + b[0];
            c[0] &= 65535;
            return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
        },
        x64Multiply: function (a, b) {
            a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
            b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
            var c = [0, 0, 0, 0];
            c[3] += a[3] * b[3];
            c[2] += c[3] >>> 16;
            c[3] &= 65535;
            c[2] += a[2] * b[3];
            c[1] += c[2] >>> 16;
            c[2] &= 65535;
            c[2] += a[3] * b[2];
            c[1] += c[2] >>> 16;
            c[2] &= 65535;
            c[1] += a[1] * b[3];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[1] += a[2] * b[2];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[1] += a[3] * b[1];
            c[0] += c[1] >>> 16;
            c[1] &= 65535;
            c[0] += a[0] * b[3] + a[1] * b[2] + a[2] * b[1] + a[3] * b[0];
            c[0] &= 65535;
            return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
        },
        x64Rotl: function (a, b) {
            b %= 64;
            if (32 === b) return [a[1], a[0]];
            if (32 > b) return [a[0] << b | a[1] >>> 32 - b, a[1] << b | a[0] >>> 32 - b];
            b -= 32;
            return [a[1] << b | a[0] >>> 32 - b, a[0] << b | a[1] >>> 32 - b]
        },
        x64LeftShift: function (a, b) {
            b %= 64;
            return 0 === b ? a : 32 > b ? [a[0] << b | a[1] >>> 32 - b, a[1] << b] : [a[1] << b - 32, 0]
        },
        x64Xor: function (a, b) {
            return [a[0] ^ b[0], a[1] ^ b[1]]
        },
        x64Fmix: function (a) {
            a = this.x64Xor(a, [0, a[0] >>> 1]);
            a = this.x64Multiply(a, [4283543511, 3981806797]);
            a = this.x64Xor(a, [0, a[0] >>> 1]);
            a = this.x64Multiply(a, [3301882366, 444984403]);
            return a = this.x64Xor(a, [0, a[0] >>> 1])
        },
        x64hash128: function (a, b) {
            a = a || "";
            b = b || 0;
            var c = a.length % 16,
                l = a.length - c,
                h = [0, b];
            b = [0, b];
            for (var q, z, C = [2277735313, 289559509], D = [1291169091, 658871167], B = 0; B < l; B += 16)
                q = [a.charCodeAt(B + 4) & 255 | (a.charCodeAt(B + 5) & 255) << 8 | (a.charCodeAt(B + 6) &
                    255) << 16 | (a.charCodeAt(B + 7) & 255) << 24, a.charCodeAt(B) & 255 | (a.charCodeAt(
                    B + 1) & 255) << 8 | (a.charCodeAt(B + 2) & 255) << 16 | (a.charCodeAt(B + 3) & 255) <<
                24], z = [a.charCodeAt(B + 12) & 255 | (a.charCodeAt(B + 13) & 255) << 8 | (a.charCodeAt(
                    B + 14) & 255) << 16 | (a.charCodeAt(B + 15) & 255) << 24, a.charCodeAt(B + 8) &
                255 | (a.charCodeAt(B + 9) & 255) << 8 | (a.charCodeAt(B + 10) & 255) << 16 | (a.charCodeAt(
                    B + 11) & 255) << 24], q = this.x64Multiply(q, C), q = this.x64Rotl(q, 31), q =
                    this.x64Multiply(q, D), h = this.x64Xor(h, q), h = this.x64Rotl(h, 27), h = this.x64Add(h,
                    b), h = this.x64Add(this.x64Multiply(h, [0, 5]), [0, 1390208809]), z = this.x64Multiply(
                    z, D), z = this.x64Rotl(z, 33), z = this.x64Multiply(z, C), b = this.x64Xor(b, z), b =
                    this.x64Rotl(b, 31), b = this.x64Add(b, h), b = this.x64Add(this.x64Multiply(b, [0, 5]), [0,
                    944331445]);
            q = [0, 0];
            z = [0, 0];
            switch (c) {
                case 15:
                    z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 14)], 48));
                case 14:
                    z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 13)], 40));
                case 13:
                    z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 12)], 32));
                case 12:
                    z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 11)], 24));
                case 11:
                    z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 10)], 16));
                case 10:
                    z = this.x64Xor(z, this.x64LeftShift([0, a.charCodeAt(B + 9)], 8));
                case 9:
                    z = this.x64Xor(z, [0, a.charCodeAt(B + 8)]), z = this.x64Multiply(z, D), z = this.x64Rotl(
                        z, 33), z = this.x64Multiply(z, C), b = this.x64Xor(b, z);
                case 8:
                    q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 7)], 56));
                case 7:
                    q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 6)], 48));
                case 6:
                    q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 5)], 40));
                case 5:
                    q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 4)], 32));
                case 4:
                    q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 3)], 24));
                case 3:
                    q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 2)], 16));
                case 2:
                    q = this.x64Xor(q, this.x64LeftShift([0, a.charCodeAt(B + 1)], 8));
                case 1:
                    q = this.x64Xor(q, [0, a.charCodeAt(B)]), q = this.x64Multiply(q, C), q = this.x64Rotl(
                        q, 31), q = this.x64Multiply(q, D), h = this.x64Xor(h, q)
            }
            h = this.x64Xor(h, [0, a.length]);
            b = this.x64Xor(b, [0, a.length]);
            h = this.x64Add(h, b);
            b = this.x64Add(b, h);
            h = this.x64Fmix(h);
            b = this.x64Fmix(b);
            h = this.x64Add(h, b);
            b = this.x64Add(b, h);
            return ("00000000" + (h[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h[1] >>> 0).toString(
                16)).slice(-8) + ("00000000" + (b[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (b[
                1] >>> 0).toString(16)).slice(-8)
        }
    };
}
var JDDSecCryptoJS = JDDSecCryptoJS || function (t, u) {
    var v = {},
        x = v.lib = {},
        w = x.Base = function () {
            function g() {}
            return {
                extend: function (m) {
                    g.prototype = this;
                    var a = new g;
                    m && a.mixIn(m);
                    a.hasOwnProperty("init") || (a.init = function () {
                        a.$super.init.apply(this, arguments)
                    });
                    a.init.prototype = a;
                    a.$super = this;
                    return a
                },
                create: function () {
                    var m = this.extend();
                    m.init.apply(m, arguments);
                    return m
                },
                init: function () {},
                mixIn: function (m) {
                    for (var a in m) m.hasOwnProperty(a) && (this[a] = m[a]);
                    m.hasOwnProperty("toString") && (this.toString = m.toString)
                },
                clone: function () {
                    return this.init.prototype.extend(this)
                }
            }
        }(),
        A = x.WordArray = w.extend({
            init: function (g, m) {
                g = this.words = g || [];
                this.sigBytes = m != u ? m : 4 * g.length
            },
            toString: function (g) {
                return (g || n).stringify(this)
            },
            concat: function (g) {
                var m = this.words,
                    a = g.words,
                    b = this.sigBytes;
                g = g.sigBytes;
                this.clamp();
                if (b % 4)
                    for (var c = 0; c < g; c++) m[b + c >>> 2] |= (a[c >>> 2] >>> 24 - c % 4 * 8 & 255) <<
                        24 - (b + c) % 4 * 8;
                else if (65535 < a.length)
                    for (c = 0; c < g; c += 4) m[b + c >>> 2] = a[c >>> 2];
                else m.push.apply(m, a);
                this.sigBytes += g;
                return this
            },
            clamp: function () {
                var g = this.words,
                    m = this.sigBytes;
                g[m >>> 2] &= 4294967295 << 32 - m % 4 * 8;
                g.length = t.ceil(m / 4)
            },
            clone: function () {
                var g = w.clone.call(this);
                g.words = this.words.slice(0);
                return g
            },
            random: function (g) {
                for (var m = [], a = 0; a < g; a += 4) m.push(4294967296 * t.random
