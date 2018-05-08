window.onload = function(){
    
    /**
    * Menu overlay
    */
    (function(){
        
        var menu_desktop = document.getElementById('desktop-menu-btn'),
            menu_mobile = document.getElementById('mobile-menu-btn'),
            menu_overlay = document.getElementById('menu-overlay'),
            menu_close = document.getElementById('menu-close');

        menu_desktop.onclick = toggleMenu;
        menu_mobile.onclick = toggleMenu;

        menu_close.onclick = closeMenu;

        function toggleMenu(e){
            e.preventDefault();
            if(!menu_overlay.classList.contains('open')){
                menu_overlay.classList.add('open');
            } else {
                menu_overlay.classList.remove('open');
            }
        }

        function closeMenu(e){
            e.preventDefault();
            menu_overlay.classList.remove('open');
        }
        
    })();
    
    /**
    * Benefits splash
    */
    (function(){
        
        var bgs = Array.prototype.slice.call(document.getElementsByClassName('opacity-anim')),
            texts = Array.prototype.slice.call(document.getElementsByClassName('opacity-anim-text')),
            current = 0,
            max = bgs.length,
            interval = 10000;
        
        if(bgs.length > 0){
            setInterval(function(){
                for(var i = 0; i < max; i++){
                    if(current === i){
                        bgs[i].style.opacity = 1;
                        texts[i].style.opacity = 1;
                    } else {
                        bgs[i].style.opacity = 0;
                        texts[i].style.opacity = 0;
                    }
                }
                current = ++current % max;
            }, interval);
        }
        
    })();
    
    /*
    * Learn more
    */
    (function(){
        
        var learn_more = document.getElementById('learn-more'),
            below_fold = document.getElementById('below-fold');
        
        if(learn_more){
            learn_more.onclick = function(e){
                e.preventDefault();
                if(window.innerWidth > 800){
                    animScrollTo(window, below_fold.offsetTop, 600);
                } else {
                    animScrollTo(window, below_fold.offsetTop - 60, 600);
                }
            };
        }
        
    })();
    
    /**
    * Logo scroll
    */
    (function(){
        
        var logo = document.getElementById('logo');
        
        window.addEventListener('scroll', function(){
            
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
            
            if(scrollY > window.innerHeight){
                logo.classList.add('collapsed');
            } else {
                logo.classList.remove('collapsed');
            }
            
        });
        
    })();
    
    /**
    * Animated scroll
    */
    function animScrollTo(element, to, duration){
        
        var start = element === window ? window.scrollY : element.scrollTop,
            change = to - start,
            increment = 20;
        
        var animateScroll = function(elapsedTime){
            
            elapsedTime += increment;
            
            var position = easeInOut(elapsedTime, start, change, duration);   
            
            if(element === window){
                
                window.scrollTo(0, position);
                
            } else {
                
                element.scrollTop = position; 
                
            }
            
            if (elapsedTime < duration){
                
                setTimeout(function(){
                    
                    animateScroll(elapsedTime);
                    
                }, increment);
                
            }
            
        };
        
        animateScroll(0);
        
    }
    
    function easeInOut(currentTime, start, change, duration){
        currentTime /= duration / 2;
        if (currentTime < 1) {
            return change / 2 * currentTime * currentTime + start;
        }
        currentTime -= 1;
        return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }
    
    /**
    * Site loader
    */
    (function(){
        
        var loader = document.getElementById('site-loader');
        
        if(loader){
            loader.classList.add('stage1');
            
            setTimeout(function(){
                loader.classList.add('stage2');
            }, 200);
            
            setTimeout(function(){
                loader.classList.add('stage3');
            }, 400);
            
            setTimeout(function(){
                loader.classList.add('stage4');
            }, 600);
            
            setTimeout(function(){
                loader.parentElement.removeChild(loader);
            }, 1000);
        }
        
    })();
    
};