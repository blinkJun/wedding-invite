import "./style.scss";
import "./ani.scss";
import axios from 'axios'
const wx = require('weixin-js-sdk')


// 设置初始化高度
const bannerElement = document.querySelector('.banner') as HTMLDivElement
bannerElement.style.height = window.innerHeight + 'px'
const startTime = Date.now()

const closeLoading = function(){
    const loadingEl = document.querySelector('.loading') as HTMLDivElement
    loadingEl.classList.add('hide')
    setTimeout(()=>{
        loadingEl.remove()
    },200)
}

const heartScale = function(){
    const allHeart = document.querySelectorAll('.hearts img');
    const width = window.innerWidth
    const height = window.innerHeight
    setInterval(()=>{
        const randomIndex = Math.floor(allHeart.length*Math.random()) 
        const randomTop = Math.floor(height*Math.random())
        const randomLeft = Math.floor(width*Math.random())

        const focusEl = allHeart[randomIndex] as HTMLElement
        if(focusEl.classList.contains('active')){
            return false
        }
        // reset 
        focusEl.style.top = randomTop + 'px'
        focusEl.style.left = randomLeft + 'px'

        focusEl.classList.add('active')
        focusEl.onanimationend = ()=>{
            focusEl.onanimationend=()=>{
                focusEl.classList.remove('active')
            }
        }
    },400)
}
heartScale()

// 监听时间
const flowTimeListen = function(){
    const flow = [
        new Date('2021-05-01 00:00:00').getTime(),
        new Date('2021-05-01 08:00:00').getTime(),
        new Date('2021-05-01 11:00:00').getTime(),
        new Date('2021-05-01 12:00:00').getTime(),
        new Date('2021-05-01 14:00:00').getTime(),
        new Date('2021-05-01 16:00:00').getTime(),
        new Date('2021-05-02 00:00:00').getTime(),
    ]
    setInterval(()=>{
        const now = Date.now()
        const steps = document.querySelectorAll('.step')
        let active = false
        for(let i = steps.length-1;i>=0;i--){
            const stepEl = steps[i];
            const stepMaxTime = flow[i]
            stepEl.classList.remove('active')
            if(active){
                if(!stepEl.classList.contains('past')){
                    stepEl.classList.add('past')
                }
            }else if(now>stepMaxTime){
                if(!stepEl.classList.contains('active')){
                    stepEl.classList.add('active')
                    active = true
                }
            }
        }
    },1000)
}
flowTimeListen()

// 资源加载完成时移除loading
window.addEventListener('load',()=>{
    const endTime = Date.now()
    const minDuration = 2000
    if(endTime-startTime<minDuration){
        setTimeout(()=>{
            closeLoading()
            startElementInSight()
        },minDuration - (endTime-startTime))
    }else{
        closeLoading()
        startElementInSight()
    }
})

const isInSight = function(img:HTMLElement) {
    const bound = img.getBoundingClientRect();
    const clientHeight = window.innerHeight;
    //如果只考虑向下滚动加载
    //const clientWidth = window.innerWeight;
    return bound.top <= clientHeight - 100; // +100延迟加载
}

const initElAniState = (el:Element)=>{
    if(!el.classList.contains('active-ani')){
        el.classList.add('active-ani')
    }
}

const startElementInSight = ()=>{
    let allWillAniEl = Array.from(document.querySelectorAll('.ready-ani'));
    // 两种监听方式
    if ('IntersectionObserver' in window) {
        const ob = new IntersectionObserver((changes) => {
            for (const change of changes) {
                if (0 < change.intersectionRatio && change.intersectionRatio <= 1) {
                    initElAniState(change.target);
                    ob.unobserve(change.target);
                }
            }
        })
        allWillAniEl.forEach((el:Element) => {
            ob.observe(el);
        })
    } else {
        window.addEventListener('scroll',()=>{
            allWillAniEl.forEach((el:HTMLElement) => {
                if (isInSight(el)) {
                    initElAniState(el);
                }
            })
        })
    }

    // 直接进行一次判断
    allWillAniEl.forEach((el:HTMLElement) => {
        if (isInSight(el)) {
            initElAniState(el);
        }
    })
}
const query = location.search
const initWxConfig = function(res:any){
    const {appId,noncestr,signature,timestamp} = res.data.data
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: noncestr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名
        jsApiList: [
            'updateTimelineShareData',
            'updateAppMessageShareData',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'openLocation'
        ] // 必填，需要使用的JS接口列表
    });
}
if(query.includes('share')){
    axios.get(`http://sunrise.tojike.com/hawk-api/wechat/signature-test?url=${encodeURIComponent(location.href)}`).then(initWxConfig)
}else{
    axios.get(`http://sunrise.tojike.com/hawk-api/wechat/signature?url=${encodeURIComponent(location.href)}`).then(initWxConfig)
}


wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
    const title = '梁俊&韦晓霞婚礼邀请函'
    const link = 'http://sunrise.tojike.com/wedding/'
    const imageUrl = 'http://suncdn.tojike.com/images/HRQ11517.jpg'
    const desc = '欢迎您来参加我们的婚礼'

    wx.updateTimelineShareData({ 
      title:title , // 分享标题
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl:imageUrl , // 分享图标
    })
    wx.updateAppMessageShareData({ 
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imageUrl, // 分享图标
    })
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imageUrl, // 分享图标
    })
    wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imageUrl // 分享图标
    });
});
document.querySelector('.address-jun').addEventListener('click',()=>{
    wx.openLocation({
        latitude: 23.330177, // 纬度，浮点数，范围为90 ~ -90
        longitude: 108.795106, // 经度，浮点数，范围为180 ~ -180。
        name: '宾阳县新圩镇金恩药店', // 位置名
        address: '宾阳县新圩镇金恩药店（邮政银行对面）', // 地址详情说明
        scale: 15, // 地图缩放级别,整型值,范围从1~28。默认为最大
        infoUrl: 'https://map.baidu.com/poi/%E6%96%B0%E5%9C%A9%E6%9D%8F%E6%9E%97%E6%98%A5%E8%8D%AF%E5%BA%97/@12111873.125,2655653,19z?uid=6c4c0c802a6691314e776edd&ugc_type=3&ugc_ver=1&device_ratio=1&compat=1&querytype=detailConInfo&da_src=shareurl' // 在查看位置界面底部显示的超链接,可点击跳转
    });
})
document.querySelector('.address-res').addEventListener('click',()=>{
    wx.openLocation({
        latitude: 23.215273, // 纬度，浮点数，范围为90 ~ -90
        longitude: 108.814324, // 经度，浮点数，范围为180 ~ -180。
        name: '宾阳县蒙记食府', // 位置名
        address: '南宁市宾阳县思远路与金和路交叉路口往西南约100米(祥和小区北侧)', // 地址详情说明
        scale: 15, // 地图缩放级别,整型值,范围从1~28。默认为最大
        infoUrl: 'https://map.baidu.com/poi/%E8%92%99%E8%AE%B0%E9%A3%9F%E5%BA%9C/@12114002.085,2641844.37,19z?uid=61e1a918549ab543a0acc479&ugc_type=3&ugc_ver=1&device_ratio=1&compat=1&querytype=detailConInfo&da_src=shareurl' // 在查看位置界面底部显示的超链接,可点击跳转
    });
})
document.querySelector('.address-sunrise').addEventListener('click',()=>{
    wx.openLocation({
        latitude: 23.25911, // 纬度，浮点数，范围为90 ~ -90
        longitude: 108.820465, // 经度，浮点数，范围为180 ~ -180。
        name: '宾阳县北街', // 位置名
        address: '（勒马红绿灯西环路益霖彩砖厂路口进去200米）', // 地址详情说明
        scale: 15, // 地图缩放级别,整型值,范围从1~28。默认为最大
        infoUrl: 'http://weixin.qq.com' // 在查看位置界面底部显示的超链接,可点击跳转
    });
})

const musicBtn = document.querySelector('.play-toggle')
const btnPlay = musicBtn.querySelector('.play')
const btnMute = musicBtn.querySelector('.mute')
const player = document.querySelector('#audio') as HTMLAudioElement
musicBtn.addEventListener('click',()=>{
    if(player.paused){
        btnPlay.classList.remove('hide')
        btnMute.classList.add('hide')
        player.play()
    }else{
        player.pause()
        btnMute.classList.remove('hide')
        btnPlay.classList.add('hide')
    }
})
document.addEventListener('WeixinJSBridgeReady',()=>{
    player.play()
    btnPlay.classList.remove('hide')
    btnMute.classList.add('hide')
})

