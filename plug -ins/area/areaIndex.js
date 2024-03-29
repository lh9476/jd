// 第一个分号的作用   是防止插件前面的代码漏了分号结尾而做的处理

;(function(){
    // 实现插件的功能
    var obj = {
        // 初始化函数
        init:function(option){
            this.parent = option.parent;
            this.items = option.items;
            this.rowNum = option.rowNum || 5;
            this.nowItem = option.nowItem || this.items[0].name || '';
            this.nowItemImg = option.nowItemImg || '';
            this.createDom();
            this.bindEvent();
        },
        createDom:function(){
            var wrap = $('<div class="areaContent"></div>');
            var nowArea = $('<div class="nowArea"></div>');
            var itemList = $('<div class="itemList"></div>');

            if(this.nowItemImg){
                var img = new Image();
                img.src = this.nowItemImg;
                img.onload = function(){
                    $(img).prependTo(nowArea);
                }
            }
            $('<span class="item-name"></span>').html(this.nowItem).appendTo(nowArea);

            this.items.forEach(function(ele, index){
                var str = '<a href="' + ele.href + '">' + ele.name + '</a>';
                $('<div class="item"></div>').append(str).appendTo(itemList);
            });
            wrap.append(nowArea).append(itemList);
            this.parent.append(wrap);
            $('#location .itemList').css({
                'width': $('.item').innerWidth() * this.rowNum +'px',
                'top':$(this.parent).height() - 2 +'px'
            })
        },
        bindEvent:function(){
            $('.itemList').on('click', '.item', function(){
                $('.itemList .active').removeClass('active');
                $(this).addClass('active');
                $('span.item-name').text($(this).text());
            })
        }
    }
    
    $.fn.extend({
        areaList:function(opt){
            opt.parent = this;
            obj.init(opt);
        }
    })
})();