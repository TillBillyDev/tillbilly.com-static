window.onload = function(){
    
    RunSplashCanvas();
    
};

(function(){
    
    var canvas, context,
        particles, 
        width, height, xmin, xmax,
        visibility_range;
    
    function init(){
        canvas = document.getElementById('splash-canvas');
        context = canvas.getContext('2d');
        setResize();
        animate();
    }
    
    function setResize(){
        setup();
        window.addEventListener('resize', setup);
    }
    
    function setup(){
        var parent = canvas.parentElement;
        
        width = canvas.width = parent.offsetWidth;
        height = canvas.height = parent.offsetWidth;// Math.floor(window.innerHeight / 2);
        
        visibility_range = width / 4;
        xmin = width / 2 - visibility_range;
        xmax = width / 2 + visibility_range;
        
        context.fillStyle = "#fff";
        
        particles = [];
        
        var p = Math.floor(window.innerWidth * .15);
        
        for(var i = 0; i < p; i++){
            particles.push( new Particle(Math.random() * .0009, Math.random() * .0009) );
        }
        
    }
    
    function Particle(sx, sy){
        this.x = 0;
        this.y = 0;
        this.opacity = 0;
        this.centerX = width / 2 + (Math.floor(Math.random() * visibility_range ) - visibility_range);
        this.centerY = Math.floor(Math.random() * height);
        this.radiusX = width / 2 * Math.random();
        this.radiusY = height / 2 * Math.random();
        this.xangle =  2 * Math.PI * Math.random();
        this.yangle =  2 * Math.PI * Math.random();
        this.xspeed = sx;
        this.yspeed = sy;
        this.size = .5 + Math.random();
    }
    
    function animate(){
        
        context.clearRect(0, 0, width, height);
        
        for(var i = 0; i < particles.length; i++){
            
            var p = particles[i];
            
            p.x = p.centerX + Math.cos(p.xangle) * p.radiusX;
            p.y = p.centerY + Math.sin(p.yangle) * p.radiusY;
            
            context.save();
            
            context.beginPath();
            
            context.globalAlpha = getAlpha(p.x);
            
            context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
            context.fill();
            
            context.restore();
            
            p.xangle += p.xspeed;
            p.yangle += p.yspeed;
            
        }
        
        requestAnimationFrame(animate);
    }
    
    function getAlpha(x){
        var alpha = 0;
            
        if(x < xmax && x > xmin){
            alpha = 0.7 * (1 - Math.abs(x - width / 2) / (visibility_range));
        }
        
        return alpha;
    }
    
    function range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    };
    
    window.RunSplashCanvas = init;
    
})();