var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
}
if (isIE()) {
    document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
    document.querySelector('body').classList.add('_touch');
}

function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function() {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function(support) {
    if (support == true) {
        document.querySelector('body').classList.add('_webp');
    } else {
        document.querySelector('body').classList.add('_no-webp');
    }
});

function ibg() {
    if (isIE()) {
        let ibg = document.querySelectorAll("._ibg");
        for (var i = 0; i < ibg.length; i++) {
            if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
                ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
            }
        }
    }
}
ibg();

if (document.querySelector('.wrapper')) {
    document.querySelector('.wrapper').classList.add('_loaded');
}

let unlock = true;


//BodyLock
function body_lock(delay) {
    let body = document.querySelector("body");
    if (body.classList.contains('_lock')) {
        body_lock_remove(delay);
    } else {
        body_lock_add(delay);
    }
}

function body_lock_remove(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            body.classList.remove("_lock");
        }, delay);

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, delay);
    }
}

function body_lock_add(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        body.classList.add("_lock");

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, delay);
    }
}



//Menu
let iconMenu = document.querySelector(".menu__icon");
let menulist = document.querySelector(".menu__list");
let body = document.querySelector("body");
let menuBody = document.querySelector(".menu__body");
let menu = document.querySelector(".menu");

let closeButton = document.querySelector('.menu__close')
if (closeButton) closeButton.onclick = () => {
    clickOff(event)
}

function clickOff(event) {
    console.log(event);
    iconMenu.classList.remove("_active");
    menuBody.classList.remove("_active");
    menu.classList.remove("_active");
    html.classList.remove("lock");
}

if (iconMenu) {
    iconMenu.addEventListener("click", function() {
        iconMenu.classList.toggle("_active");
        html.classList.toggle("lock");
        menuBody.classList.toggle("_active");
        menu.classList.toggle("_active");
    });
    menulist.addEventListener("mouseup", clickOff);

    document.addEventListener('click', function(e) {
        var target = e.target;
        var its_menu = target == menuBody || menuBody.contains(target);
        var its_iconMenu = target == iconMenu || iconMenu.contains(target);
        var menu_is_active = menuBody.classList.contains('_active');

        if (!its_menu && !its_iconMenu && menu_is_active) {
            clickOff();
        }
    });
}

// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = `${target.offsetHeight}px`;
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = !showmore ? true : false;
            !showmore ? target.style.removeProperty('height') : null;
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            !showmore ? target.style.removeProperty('overflow') : null;
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
            // Создаем событие 
            document.dispatchEvent(new CustomEvent("slideUpDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}
let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.hidden = target.hidden ? false : null;
        showmore ? target.style.removeProperty('height') : null;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
            // Создаем событие 
            document.dispatchEvent(new CustomEvent("slideDownDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}
// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains('lock')) {
        bodyUnlock(delay);
    } else {
        bodyLock(delay);
    }
}
let bodyUnlock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            document.documentElement.classList.remove("lock");
        }, delay);
        bodyLockStatus = false;
        setTimeout(function() {
            bodyLockStatus = true;
        }, delay);
    }
}
let bodyLock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        document.documentElement.classList.add("lock");

        bodyLockStatus = false;
        setTimeout(function() {
            bodyLockStatus = true;
        }, delay);
    }
}


//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// Получение хеша в адресе сайта
function getHash() {
    if (location.hash) {
        return location.hash.replace('#', '');
    }
}

// FLS (Full Logging System)
function FLS(message) {
    setTimeout(() => {
        if (window.FLS) {
            console.log(message);
        }
    }, 0);
}
// Получить цифры из строки
function getDigFromString(item) {
    return parseInt(item.replace(/[^\d]/g, ''))
}
// Форматирование цифр типа 100 000 000
function getDigFormat(item) {
    return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
// Убрать класс из всех элементов массива
function removeClasses(array, className) {
    for (var i = 0; i < array.length; i++) {
        array[i].classList.remove(className);
    }
}
// Уникализация массива
function uniqArray(array) {
    return array.filter(function(item, index, self) {
        return self.indexOf(item) === index;
    });
}
// Функция получения индекса внутри родителя
function indexInParent(parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};
// Обработа медиа запросов из атрибутов 
function dataMediaQueries(array, dataSetValue) {
    // Получение объектов с медиа запросами
    const media = Array.from(array).filter(function(item, index, self) {
        if (item.dataset[dataSetValue]) {
            return item.dataset[dataSetValue].split(",")[0];
        }
    });
    // Инициализация объектов с медиа запросами
    if (media.length) {
        const breakpointsArray = [];
        media.forEach(item => {
            const params = item.dataset[dataSetValue];
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });
        // Получаем уникальные брейкпоинты
        let mdQueries = breakpointsArray.map(function(item) {
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
        });
        mdQueries = uniqArray(mdQueries);
        const mdQueriesArray = [];

        if (mdQueries.length) {
            // Работаем с каждым брейкпоинтом
            mdQueries.forEach(breakpoint => {
                const paramsArray = breakpoint.split(",");
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);
                // Объекты с нужными условиями
                const itemsArray = breakpointsArray.filter(function(item) {
                    if (item.value === mediaBreakpoint && item.type === mediaType) {
                        return true;
                    }
                });
                mdQueriesArray.push({
                    itemsArray,
                    matchMedia
                })
            });
            return mdQueriesArray;
        }
    }
}
//================================================================================================================================================================================================================================================================================================================
var html, scrollToTopButton;
window.onload = function() {
    html = document.documentElement;
}
let addWindowScrollEvent = false;
//====================================================================================================================================================================================================================================================================================================
// Плавная навигация по странице
function pageNavigation() {
    // data-goto - указать ID блока
    // data-goto-header - учитывать header
    // data-goto-top - недокрутить на указанный размер
    // data-goto-speed - скорость (только если используется доп плагин)
    // Работаем при клике на пункт
    document.addEventListener("click", pageNavigationAction);
    // Если подключен scrollWatcher, подсвечиваем текущий пукт меню
    document.addEventListener("watcherCallback", pageNavigationAction);
    // Основная функция
    function pageNavigationAction(e) {
        if (e.type === "click") {
            const targetElement = e.target;
            if (targetElement.closest('[data-goto]')) {
                const gotoLink = targetElement.closest('[data-goto]');
                const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
                const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
                const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                e.preventDefault();
            }
        } else if (e.type === "watcherCallback" && e.detail) {
            const entry = e.detail.entry;
            const targetElement = entry.target;
            // Обработка пунктов навигации, если указано значение navigator подсвечиваем текущий пукт меню
            if (targetElement.dataset.watch === 'navigator') {
                const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
                let navigatorCurrentItem;
                if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
                    navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
                } else if (targetElement.classList.length) {
                    for (let index = 0; index < targetElement.classList.length; index++) {
                        const element = targetElement.classList[index];
                        if (document.querySelector(`[data-goto=".${element}"]`)) {
                            navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                            break;
                        }
                    }
                }
                if (entry.isIntersecting) {
                    // Видим объект
                    // navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
                    navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
                } else {
                    // Не видим объект
                    navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
                }
            }
        }
    }
    // Прокрутка по хешу
    if (getHash()) {
        let goToHash;
        if (document.querySelector(`#${getHash()}`)) {
            goToHash = `#${getHash()}`;
        } else if (document.querySelector(`.${getHash()}`)) {
            goToHash = `.${getHash()}`;
        }
        goToHash ? gotoBlock(goToHash, true, 500, -100) : null;
    }
}
// Работа с шапкой при скроле
function headerScroll() {
    addWindowScrollEvent = true;
    const header = document.querySelector('header.header');
    const headerShow = header.hasAttribute('data-scroll-show');
    const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
    const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
    let scrollDirection = 0;
    let timer;
    document.addEventListener("windowScroll", function(e) {
        const scrollTop = window.scrollY;
        clearTimeout(timer);
        if (scrollTop >= startPoint) {
            !header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
            if (headerShow) {
                if (scrollTop > scrollDirection) {
                    // downscroll code
                    header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
                } else {
                    // upscroll code
                    !header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
                }
                timer = setTimeout(() => {
                    !header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
                }, headerShowTimer);
            }
        } else {
            header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
            if (headerShow) {
                header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
            }
        }
        scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
    });
}
// Прилипающий блок
function stickyBlock() {
    addWindowScrollEvent = true;
    // data-sticky для родителя внутри которого прилипает блок *
    // data-sticky-header для родителя, учитываем высоту хедера
    // data-sticky-top="" для родителя, можно указать отступ сверху
    // data-sticky-bottom="" для родителя, можно указать отступ снизу
    // data-sticky-item для прилипающего блока *
    function stickyBlockInit() {
        const stickyParents = document.querySelectorAll('[data-sticky]');
        if (stickyParents.length) {
            stickyParents.forEach(stickyParent => {
                let stickyConfig = {
                    media: stickyParent.dataset.sticky ? parseInt(stickyParent.dataset.sticky) : null,
                    top: stickyParent.dataset.stickyTop ? parseInt(stickyParent.dataset.stickyTop) : 0,
                    bottom: stickyParent.dataset.stickyBottom ? parseInt(stickyParent.dataset.stickyBottom) : 0,
                    header: stickyParent.hasAttribute('data-sticky-header') ? document.querySelector('header.header').offsetHeight : 0
                }
                stickyBlockItem(stickyParent, stickyConfig);
            });
        }
    }

    function stickyBlockItem(stickyParent, stickyConfig) {
        const stickyBlockItem = stickyParent.querySelector('[data-sticky-item]');
        const headerHeight = stickyConfig.header;
        const offsetTop = headerHeight + stickyConfig.top;
        const startPoint = stickyBlockItem.getBoundingClientRect().top + scrollY - offsetTop;

        document.addEventListener("windowScroll", stickyBlockActions);
        //window.addEventListener("resize", stickyBlockActions);

        function stickyBlockActions(e) {
            const endPoint = (stickyParent.offsetHeight + stickyParent.getBoundingClientRect().top + scrollY) - (offsetTop + stickyBlockItem.offsetHeight + stickyConfig.bottom);
            let stickyItemValues = {
                position: "relative",
                bottom: "auto",
                top: "0px",
                left: "0px",
                width: "auto"
            }
            if (!stickyConfig.media || stickyConfig.media < window.innerWidth) {
                if (offsetTop + stickyConfig.bottom + stickyBlockItem.offsetHeight < window.innerHeight) {
                    if (scrollY >= startPoint && scrollY <= endPoint) {
                        stickyItemValues.position = `fixed`;
                        stickyItemValues.bottom = `auto`;
                        stickyItemValues.top = `${offsetTop}px`;
                        stickyItemValues.left = `${stickyBlockItem.getBoundingClientRect().left}px`; // Учесть разницу в ширине экрана?
                        stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
                    } else if (scrollY >= endPoint) {
                        stickyItemValues.position = `absolute`;
                        stickyItemValues.bottom = `${stickyConfig.bottom}px`;
                        stickyItemValues.top = `auto`;
                        stickyItemValues.left = `0px`;
                        stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
                    }
                }
            }
            stickyBlockType(stickyBlockItem, stickyItemValues);
        }
    }

    function stickyBlockType(stickyBlockItem, stickyItemValues) {
        stickyBlockItem.style.cssText = `position:${stickyItemValues.position};bottom:${stickyItemValues.bottom};top:${stickyItemValues.top};left:${stickyItemValues.left};width:${stickyItemValues.width};`;
    }
    stickyBlockInit();
}
// При подключении модуля обработчик события запустится автоматически
setTimeout(() => {
    if (addWindowScrollEvent) {
        let windowScroll = new Event("windowScroll");
        window.addEventListener("scroll", function(e) {
            document.dispatchEvent(windowScroll);
        });
    }
}, 0);
// Подключение дополнения для увеличения возможностей
// import SmoothScroll from 'smooth-scroll';
//==============================================================================================================================================================================================================================================================================================================================

// Модуль плавной проктутки к блоку
let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
    const targetBlockElement = document.querySelector(targetBlock);
    if (targetBlockElement) {
        let headerItem = '';
        let headerItemHeight = 0;
        if (noHeader) {
            headerItem = 'header.header';
            headerItemHeight = document.querySelector(headerItem).offsetHeight;
        }
        let options = {
            speedAsDuration: true,
            speed: speed,
            header: headerItem,
            offset: offsetTop,
            easing: 'easeOutQuad',
        };
        // Закрываем меню, если оно открыто
        document.documentElement.classList.contains("menu-open") ? menuClose() : null;

        if (typeof SmoothScroll !== 'undefined') {
            // Прокрутка с использованием дополнения
            new SmoothScroll().animateScroll(targetBlockElement, '', options);
        } else {
            // Прокрутка стандартными средствами
            let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
            targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
            targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
            window.scrollTo({
                top: targetBlockElementPosition,
                behavior: "smooth"
            });
        }
        FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
    } else {
        FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
    }
};

pageNavigation();