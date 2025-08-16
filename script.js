// preloader
document.body.style.overflow = 'hidden';
const loader = () => {
    document.body.style.overflow = '';
    const preloader = document.getElementById('preloader');
    const fadeout = setInterval(() => {
        const opacity = getComputedStyle(preloader).opacity;
        opacity > 0 ? preloader.style.opacity = opacity - 0.1000 : (clearInterval(fadeout), preloader.remove());
    }, 15);
}


setTimeout(() => loader(), 2000);  

if (window.innerWidth < 1000) {
  
  const classesToExclude = [
      // Добавляйте дополнительные классы, если нужно
  ];

  function getCurrentScale() {
      const body = document.body;
      const transform = window.getComputedStyle(body).transform;
      if (transform && transform !== 'none') {
          const matrix = transform.match(/matrix\(([^)]+)\)/);
          if (matrix) {
              const values = matrix[1].split(',');
              return parseFloat(values[0]) || 1;
          }
      }
      return 1;
  }
  
  // Переменная для отслеживания текущего масштаба
  let currentScale = getCurrentScale();
  
  // Инициализация Lenis с обновленными настройками
  const lenis = new Lenis({
      duration: 1.8,                                            // Время анимации скролла
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Свойство easing для большей плавности
      orientation: 'vertical',                                  // Вертикальный скролл (было direction)
      smoothWheel: true,                                        // Включаем плавный скролл (было smooth)
      wheelMultiplier: 1,                                       // Коэффициент скролла колесом мыши (было mouseMultiplier)
      touchMultiplier: 1.5,                                     // Коэффициент скролла на сенсорных устройствах
      infinite: false,                                          // Отключение бесконечного скролла
      autoRaf: true,                                            // Автоматический RAF (новый параметр)
      autoResize: true,                                         // Автоматическое изменение размеров
      syncTouch: false,                                         // Синхронизация с touch событиями
      
      // Функция предотвращения скролла для определенных элементов
      prevent: (node) => {
          return classesToExclude.some(className => 
              node.classList.contains(className) || 
              node.closest(`.${className}`)
          );
      },
      
      // Виртуальный скролл для обработки автоскейла
      virtualScroll: (e) => {
          const newScale = getCurrentScale();
          
          // Если масштаб изменился, корректируем события скролла
          if (newScale !== currentScale) {
              currentScale = newScale;
          }
          
          // Корректируем скорость скролла в зависимости от масштаба
          if (currentScale !== 1) {
              e.deltaY = e.deltaY / currentScale;
              e.deltaX = e.deltaX / currentScale;
          }
          
          return true; // Продолжаем обработку скролла
      }
  });
  
  // Обработка изменения размеров окна для пересчета масштаба
  let resizeTimeout;
  window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
          currentScale = getCurrentScale();
          lenis.resize(); // Обновляем размеры Lenis
      }, 100);
  });
  
  // Добавляем атрибуты для предотвращения скролла после загрузки страницы
  window.addEventListener('load', () => {
      classesToExclude.forEach((className) => {
          document.querySelectorAll(`.${className}`).forEach((element) => {
              element.setAttribute('data-lenis-prevent', '');
          });
      });
  });
  
  // Слушаем события скролла (опционально, для отладки)
  lenis.on('scroll', (e) => {
      // console.log('Scroll event:', e);
  });
}


// document.body.style.overflow = 'hidden';

// const loadStartTime = Date.now();
// const MIN_DISPLAY_TIME = 2000; 

// window.addEventListener('load', function() {
//     const preloader = document.getElementById('preloader');
//     const video = document.getElementById('#slider-video-1');
    
    
//     if (!video) {
//         waitMinimumTime(() => fadeOutPreloader(preloader));
//         return;
//     }
    
//     checkVideoReadyState();

    
//     video.addEventListener('loadedmetadata', checkVideoReadyState);
//     video.addEventListener('loadeddata', checkVideoReadyState);
//     video.addEventListener('canplaythrough', checkVideoReadyState);
//     video.addEventListener('error', handleVideoError);

    
//     const videoLoadTimeout = setTimeout(() => {
//         console.warn("Видео не загрузилось в течение 10 секунд");
//         waitMinimumTime(() => fadeOutPreloader(preloader));
//         removeEventListeners();
//     }, 10000);

//     function checkVideoReadyState() {
//         if (video.readyState >= 3 && video.duration > 0) { 
//             clearTimeout(videoLoadTimeout);
//             waitMinimumTime(() => fadeOutPreloader(preloader));
//             removeEventListeners();
//         }
//     }

//     function handleVideoError() {
//         console.error("Ошибка загрузки видео");
//         clearTimeout(videoLoadTimeout);
//         waitMinimumTime(() => fadeOutPreloader(preloader));
//         removeEventListeners();
//     }

//     function removeEventListeners() {
//         video.removeEventListener('loadedmetadata', checkVideoReadyState);
//         video.removeEventListener('loadeddata', checkVideoReadyState);
//         video.removeEventListener('canplaythrough', checkVideoReadyState);
//         video.removeEventListener('error', handleVideoError);
//     }
// });


// function waitMinimumTime(callback) {
//     const elapsed = Date.now() - loadStartTime;
//     const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsed);
    
//     setTimeout(callback, remainingTime);
// }


// function fadeOutPreloader(preloader) {
//     if (!preloader) return;
    
//     document.body.style.overflow = '';
//     let opacity = 1;
    
//     const fadeInterval = setInterval(() => {
//         opacity -= 0.05;
//         preloader.style.opacity = opacity;
        
//         if (opacity <= 0) {
//             clearInterval(fadeInterval);
//             preloader.remove();
//         }
//     }, 30);
// }




//slider
// Инициализация Swiper
// const swiper = new Swiper('.slider-inner', {
//   direction: 'horizontal',
//   loop: true,
//   speed: 2000,
//   spaceBetween: 22,
//   lazy: {
//     loadPrevNext: true,
//   },
//   pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//       renderBullet: function (index, className) {
//           return `<span class="${className}" data-video-index="${index}"></span>`;
//       },
//   },
// });

// const videos = document.querySelectorAll('.slider-video');
// let currentPlayPromise = null;

// function createProgressBar(bullet) {
//   let progressFill = bullet.querySelector('.progress-fill');
//   if (!progressFill) {
//       progressFill = document.createElement('div');
//       progressFill.className = 'progress-fill';
//       bullet.appendChild(progressFill);
//   }
//   return progressFill;
// }

// function updateProgressBar(video, bullet) {
//   if (!video || !bullet) return;

//   const updateProgress = () => {
//       if (bullet.classList.contains('swiper-pagination-bullet-active')) {
//           const progress = video.duration ? (video.currentTime / video.duration) * 100 : 0;
//           const progressFill = createProgressBar(bullet);
//           if (window.innerWidth >= 1200) {
//               bullet.style.height = window.innerWidth >= 1920 ? '50px' : '42px';
//               bullet.style.width = window.innerWidth >= 1920 ? '15px' : '12px';
//               bullet.style.borderRadius = window.innerWidth >= 1920 ? '15px' : '12px';
//               progressFill.style.height = `${progress}%`;
//               progressFill.style.width = '100%';
//           } else {
//               bullet.style.width = '50px';
//               bullet.style.height = '15px';
//               bullet.style.borderRadius = '15px';
//               progressFill.style.width = `${progress}%`;
//               progressFill.style.height = '100%';
//           }
//           bullet.style.background = '#3C3C3C';
//           bullet.style.position = 'relative';
//           bullet.style.overflow = 'hidden';
//       }
//   };

//   video.removeEventListener('timeupdate', video._timeupdateHandler);
//   video._timeupdateHandler = updateProgress;
//   video.addEventListener('timeupdate', updateProgress);
// }

// function resetBulletStyles() {
//   const bullets = document.querySelectorAll('.swiper-pagination-bullet');
//   bullets.forEach(bullet => {
//       bullet.style.width = window.innerWidth >= 1920 ? '15px' : window.innerWidth >= 1200 ? '12px' : '15px';
//       bullet.style.height = window.innerWidth >= 1920 ? '15px' : window.innerWidth >= 1200 ? '12px' : '15px';
//       bullet.style.borderRadius = '50%';
//       bullet.style.background = '#fff';
//       const progressFill = bullet.querySelector('.progress-fill');
//       if (progressFill) {
//           progressFill.style.width = '0';
//           progressFill.style.height = '0';
//       }
//   });
// }

// function safePlay(video) {
//   if (!video.paused) return Promise.resolve();
//   currentPlayPromise = video.play();
//   if (currentPlayPromise !== undefined) {
//       return currentPlayPromise.catch(error => {
//           console.error(`Ошибка воспроизведения видео ${video.id}:`, error);
//           throw error;
//       });
//   }
//   return Promise.resolve();
// }

// function safePause(video) {
//   if (video.paused) return Promise.resolve();
//   video.pause();
//   if (currentPlayPromise) {
//       return currentPlayPromise.then(() => {}).catch(() => {});
//   }
//   return Promise.resolve();
// }

// async function playActiveVideo(index, resetTime = true) {
//   if (swiper.realIndex === index && !resetTime) {
//       const activeVideo = videos[index];
//       const activeBullet = document.querySelectorAll('.swiper-pagination-bullet')[index];
//       if (activeVideo && activeBullet && !activeVideo.paused) {
//           updateProgressBar(activeVideo, activeBullet);
//           return;
//       }
//   }

//   for (const video of videos) {
//       await safePause(video);
//       if (resetTime) {
//           video.currentTime = 0;
//       }
//       video.removeEventListener('timeupdate', video._timeupdateHandler);
//       video.removeEventListener('ended', video._endedHandler);
//   }
//   resetBulletStyles();

//   const activeVideo = videos[index];
//   const activeBullet = document.querySelectorAll('.swiper-pagination-bullet')[index];

//   if (activeVideo && activeBullet) {
//       if (activeVideo.readyState >= 2) {
//           await safePlay(activeVideo);
//           updateProgressBar(activeVideo, activeBullet);
//       } else {
//           activeVideo.addEventListener('canplay', async () => {
//               await safePlay(activeVideo);
//               updateProgressBar(activeVideo, activeBullet);
//           }, { once: true });
//       }

//       activeVideo._endedHandler = () => {
//           resetBulletStyles();
//           swiper.slideNext();
//       };
//       activeVideo.addEventListener('ended', activeVideo._endedHandler);
//   }
// }

// async function initializeVideos() {
//   for (const [index, video] of Array.from(videos).entries()) {
//       video.loop = false;
//       video.muted = true;
//       if (index === swiper.realIndex) {
//           if (video.readyState >= 2) {
//               await safePlay(video);
//               const initialBullet = document.querySelector('.swiper-pagination-bullet-active');
//               updateProgressBar(video, initialBullet);
//           } else {
//               video.addEventListener('canplay', async () => {
//                   await safePlay(video);
//                   const initialBullet = document.querySelector('.swiper-pagination-bullet-active');
//                   updateProgressBar(video, initialBullet);
//               }, { once: true });
//           }
//       }
//   }
// }

// swiper.on('slideChange', () => {
//   playActiveVideo(swiper.realIndex);
// });

// document.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, index) => {
//   bullet.addEventListener('click', async () => {
//       if (swiper.realIndex === index) {
//           playActiveVideo(index, false);
//       } else {
//           await swiper.slideToLoop(index);
//           playActiveVideo(index, true);
//       }
//   });
// });

// window.addEventListener('resize', () => {
//   resetBulletStyles();
//   playActiveVideo(swiper.realIndex, false);
// });

// initializeVideos();



//cards

if (window.innerWidth < 1000) {
  const scaleMax = gsap.utils.mapRange(1, document.querySelectorAll(".cards__block").length - 1, 0.8, 1);
  const time = 3; 


  gsap.set('.cards__block', {
    y: 0,
    transformStyle: "preserve-3d",
    transformPerspective: 800,
    transformOrigin: "center top"
  });

  gsap.set('.cards__block:not(:first-child)', {
    y: (i) => 20 * (i + 1)
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".cards-inner",
      start: "center center",
      end: "+=300%",
      scrub: 0.8,
      pin: true,
      markers: true,
      pinSpacing: true,
      anticipatePin: 1,
      onRefresh: self => {
        if (self.progress === 1) {
          gsap.set(cards, { clearProps: "all" });
        }
      }
    }
  });

  tl.from(".cards__block:not(:first-child)", {
    y: () => window.innerHeight,
    duration: time,
    stagger: {
      each: time,
      from: "start" 
    }
  }, 0); 

  tl.to(".cards__block:not(:last-child)", {
    rotationX: -20,
    scale: (i) => scaleMax(i),
    stagger: {
      each: time,
      from: "start"
    }
  }, time * 0.5);

  tl.to(".cards__block", {
    rotationX: 0,
    scale: 1,
    duration: 1,
    ease: "power2.out",
  }, ">0.5"); 
}


//Fade-in

gsap.utils.toArray(".fade-in-blur").forEach((element) => {
    gsap.from(element, {
        opacity: 0,
        y: -10,
        duration: 1,
        scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none", 
        },
    });
    
    // Отдельная анимация для размытия
    gsap.from(element, {
        filter: "blur(10px)",
        duration: 0.8,
        scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none", 
        },
    });
});

gsap.utils.toArray(".fade-in").forEach((element) => {
    gsap.from(element, {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none none", 
        },
    });
});


 // popup

const buttonContact = document.querySelector('.header__button-contact');

const popupOverlay = document.getElementById("popup-overlay");
const popup = document.getElementById("popup");

function showPopup() {
  popupOverlay.style.display = "block";
  popup.style.display = "block";
}

function closePopup() {
  popupOverlay.style.display = "none";
  popup.style.display = "none";
}




//video

const isMobile = window.innerWidth < 1000;


const sliderVideo1 = document.getElementById("slider-video-1");
if (sliderVideo1) {
    sliderVideo1.src = isMobile ? "./assets/head1-mobile.mp4" : "./assets/head1.mp4";
}


const sliderVideo2 = document.getElementById("slider-video-2");
if (sliderVideo2) {
    sliderVideo2.src = isMobile ? "./assets/head2-mobile.mp4" : "./assets/head2.mp4";
}


const sliderVideo3 = document.getElementById("slider-video-3");
if (sliderVideo3) {
    sliderVideo3.src = isMobile ? "./assets/head3-mobile.mp4" : "./assets/head3.mp4";
}

const solutionVideo = document.querySelector(".solution-video-item");
if (solutionVideo) {
    solutionVideo.src = isMobile ? "./assets/benefits-mobile.mp4" : "./assets/benefits.mp4";

}



//slider
const partnersSlider = new Swiper('#partners-slider', {
  direction: 'horizontal',
  // loop: true,

  navigation: {
    nextEl: '.partners-button-next',
    prevEl: '.partners-button-prev',
  },

  slidesPerView: 1.3,
  spaceBetween: 18,
  speed: 500,

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
  },
  simulateTouch: true,
  allowTouchMove: true,
});



// burger-menu

const burgerBtn = document.querySelector('.burger-btn');
const menu = document.querySelector('.menu');
const closeBtn = document.querySelector('.close-btn');
const body = document.body;
const menuLinks = document.querySelectorAll('.burger__list-link a');

burgerBtn.addEventListener('click', () => {
    menu.classList.add('active');
    body.classList.add('menu-open'); 
});

closeBtn.addEventListener('click', () => {
    menu.classList.remove('active');
    body.classList.remove('menu-open'); 
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        body.classList.remove('menu-open'); 
    });
});


        
