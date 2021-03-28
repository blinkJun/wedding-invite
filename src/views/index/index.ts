import "./style.scss";

// 设置初始化高度
const bannerElement = document.querySelector('.banner') as HTMLDivElement
bannerElement.style.height = window.innerHeight + 'px'
const startTime = Date.now()

// const closeLoading = function(){
//     const loadingEl = document.querySelector('.loading') as HTMLDivElement
//     loadingEl.classList.add('hide')
//     setTimeout(()=>{
//         loadingEl.remove()
//     },200)
// }

// // 资源加载完成时移除loading
// window.addEventListener('load',()=>{
//     const endTime = Date.now()
//     const minDuration = 2000
//     if(endTime-startTime<minDuration){
//         setTimeout(()=>{
//             closeLoading()
//         },minDuration - (endTime-startTime))
//     }else{
//         closeLoading()
//     }
// })


