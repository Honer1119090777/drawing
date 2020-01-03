var draw = {
    cav: $('#cav'),
    ctx: $('#cav').getContext('2d'),
    btn_all: $('ul'),
    color: $('#color'),
    lineRuler:$('#lineRuler'),
    imgsArr: [],
    bool: false,
    
    init: function () {
        this.ctx.lineCap = 'round',
        this.lineJoin = 'round'
       
        this.drawing();
        this.btns()
  
    },
    drawing: function () {
        var cav = this.cav;

        var self = this;

        var c_x = cav.offsetLeft;
        var c_y = cav.offsetTop;
        this.cav.onmousedown = function (e) {
      
            self.bool = true
            var m_x = e.pageX - c_x;
            var m_y = e.pageY - c_y;
            // 开始画
            console.log(m_x, c_x, e.pageX)
            self.ctx.beginPath()
            // 起始位置
            self.ctx.moveTo(m_x, m_y);

            var img = self.ctx.getImageData(0, 0, self.cav.offsetWidth, self.cav.offsetHeight);
            self.imgsArr.push(img);
            console.log(self.imgsArr)
        }
        this.cav.onmousemove = function (e) {
            if (self.bool) {
                self.ctx.lineTo(e.pageX - c_x, e.pageY - c_y)
                self.ctx.stroke();
            }
        }
        this.cav.onmouseup = function (e) {

            self.bool = false;
        }
        this.cav.onmouseleave = function (e) {
            self.bool = false;
        }
    },
    btns: function () {
        var self = this;
        this.btn_all.onclick = function (e) {
            switch (e.target.id) {
                case 'drawer':
                        self.ctx.strokeStyle = self.color.value
                       break
                case 'clean':
                    self.ctx.clearRect(0, 0, self.cav.offsetWidth, self.cav.offsetHeight)
                    break
                case 'eraser':
                    self.ctx.strokeStyle = '#ffffff';
                    break
                case 'rescind':
                    if (self.imgsArr.length > 0) {
                        self.ctx.putImageData(self.imgsArr.pop(), 0, 0);
                    }
                    break
            }
          
        }

        this.color.onchange = function () {
            self.ctx.strokeStyle = this.value
            
        }
        self.lineRuler.onchange = function(){
            
            
            self.ctx.lineWidth = this.value 
       
        }
    }

}


draw.init()

function $(dom) {
    return document.querySelector(dom)
}