import "./style.scss";
import "./ani.scss";

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



