import "./style.scss";
import "./ani.scss";
import axios from 'axios'
import Swiper from 'swiper'
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

// 底下的轮播图
new Swiper('.swiper-container',{
    lazy: true,
    zoom:true,
    spaceBetween:30
}) 

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

axios.get(`http://sunrise.tojike.com/hawk-api/wechat/signature?url=${encodeURIComponent(location.href)}`).then((res)=>{
    const {jsapi_ticket,noncestr,signature,timestamp} = res.data.data
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx0a6c14eccd76ea7a', // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: noncestr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名
        jsApiList: [
            'updateTimelineShareData',
            'updateAppMessageShareData',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ] // 必填，需要使用的JS接口列表
    });
})
wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
    const title = '梁俊和韦晓霞的婚礼'
    const link = location.href
    const imageUrl = 'http://sunrise.tojike.com/wedding/img/HRQ11517.08741350.jpg'
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



