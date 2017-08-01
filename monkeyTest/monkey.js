function GalileoMonkey(config){
    this.duration = config.duration ? config.duration : 1800;
    this.interval = config.interval ? config.interval : 0.5;
    if(this.interval < 0.1){
        this.interval = 0.1;
    }
    this.page_time = config.page_time ? config.page_time : 30;
    this.monkey_mode = config.monkey_mode ? config.monkey_mode : "random";
    this.is_random_run_schema = config.is_random_run_schema ? config.is_random_run_schema : true;
    this.page_list = config.page_list;
    this.run_schema_list = config.run_schema_list;
    this.black_pages = config.black_pages;
    this.home_page_schema = config.home_page_schema;
    this.target = UIATarget.localTarget();
    this.window_tag = config.window_tag;
    this.app = this.target.frontMostApp();
    if(this.is_random_run_schema){
        this.random_resume_page_time = this.randomGenrandomResumePageTime();
        if(this.page_list && this.page_list.length > 0){
            this.random_page_list = this.shuffle(this.page_list);
            this.current_random_page_index = 0;
        }
    }
}

GalileoMonkey.prototype.shuffle = function(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

GalileoMonkey.prototype.randomGenrandomResumePageTime = function(){
    var time = new Date().getTime();
    var value = Math.random() * 20 + 10;
    return time + value * 1000;
}

GalileoMonkey.prototype.randomPoint = function(rc) {
	var min, max;	

	min = 0;
	max = rc.width;
    var x = Math.floor(Math.random() * (max - min) + min) + 1;

    min = 0;
	max = rc.height;
    var y = Math.floor(Math.random() * (max - min) + min) + 1;
    return {x: x, y: y};
};



GalileoMonkey.prototype.tapInElement = function(element){
    var rc = element.rect();
    var point = this.randomPoint(rc);
    point.x /= rc.width;
    point.y /= rc.height;
    dump(point);
    element.tapAtPoint(point);
}

GalileoMonkey.prototype.dragInWindow = function(window){
    var rc = window.rect();
    var dragDuration = Math.random() * (1.0 - 0.3) + 0.3;
    var from = this.randomPoint(rc);
    from.x /= rc.width;
    from.y /= rc.height;
    var to = this.randomPoint(rc);
    to.x /= rc.width;
    to.y /= rc.height;
    window.dragInsideWithOptions({duration: dragDuration, startOffset: from, endOffset: to});
}

GalileoMonkey.prototype.flickInWindow = function(window){
    var rc = window.rect();
    var from = this.randomPoint(rc);
    from.x /= rc.width;
    from.y /= rc.height;
    var to = this.randomPoint(rc);
    to.x /= rc.width;
    to.y /= rc.height;
    window.flickInsideWithOptions({startOffset: from, endOffset: to});

}

GalileoMonkey.prototype.goToHomePage = function(window){
    if(this.home_page_schema){
        this.app.openURL(this.home_page_schema);
    }
    else{
        window.currentPage().backToRoot();
    }
    this.target.delay(1.0);
}

GalileoMonkey.prototype.getMonkeyWindow = function(){
    if(this.window_tag == undefined){
        return this.app.mainWindow();
    }
    return this.app.windowWithTag(this.window_tag);
}

GalileoMonkey.prototype.runRandomMoneyOnceInWindow = function(window){
    var value = Math.random() * 20;
    if(value <= 10){
        this.tapInElement(window);
    }
    else if(value <= 17){
        this.dragInWindow(window);
    }
    else{
        this.flickInWindow(window);
    }
}



GalileoMonkey.prototype.runRandomMoney = function(){
    var beginTime = new Date().getTime();
    if(this.run_schema_list && this.run_schema_list.length > 0){
        for(var index = 0; index < this.run_schema_list.length; index++){
            this.app.openURL(this.run_schema_list[index]);
            this.target.delay(0.1);
        }
        this.target.delay(1.0);
    }
    var monkeyWindow = this.getMonkeyWindow();
    monkeyWindow.logElement();
    this.goToHomePage(monkeyWindow);
    while(1){
        this.handleAlert();
        this.handleBlackPage();

        if(this.is_random_run_schema){
            var time = new Date().getTime();
            if(time > this.random_resume_page_time){
                this.random_resume_page_time = this.randomGenrandomResumePageTime();
                this.goToHomePage(monkeyWindow);
                if(this.random_page_list && this.random_page_list.length > 0){
                    var url = this.random_page_list[this.current_random_page_index];
                    this.app.openURL(url);
                    this.target.delay(1.0);
                    this.current_random_page_index++;
                    if(this.current_random_page_index >= this.random_page_list.length){
                        this.random_page_list = this.shuffle(this.page_list);
                        this.current_random_page_index = 0;
                    }
                }
            }
        }

        this.runRandomMoneyOnceInWindow(monkeyWindow);
        this.target.delay(this.interval);

        if(this.target.isFinished()){
            UIALogger.logMessage('finish 1');
            return;
        }

        if((new Date().getTime() - beginTime) >= this.duration * 1000){
            UIALogger.logMessage('finish 2');
            return;
        }
    }
}

GalileoMonkey.prototype.handleAlert = function(){
    try {
        if(this.app.alert()){
            this.app.alert().dismissWithButtonAtIndex(0);
            this.target.delay(1.0);
        }
    } catch (error) {
        
    }
}

GalileoMonkey.prototype.handleBlackPage = function(){
    var monkeyWindow = this.getMonkeyWindow();
    var page = monkeyWindow.currentPage();

    if(page.title() && this.black_pages && this.black_pages.length > 0){
        var index = this.black_pages.indexOf(page.title());
        if(index >= 0){
            page.back();
            this.target.delay(1.0);
        }
    }
}

GalileoMonkey.prototype.runPageMonkey = function(){
    var beginTime = new Date().getTime();
    if(this.run_schema_list && this.run_schema_list.length > 0){
        for(var index = 0; index < this.run_schema_list.length; index++){
            this.app.openURL(this.run_schema_list[index]);
            this.target.delay(0.1);
        }
        this.target.delay(1.0);
    }
    if(this.page_list && this.page_list.length > 0){
        this.random_page_list = this.shuffle(this.page_list);
        this.current_random_page_index = 0;
    }
    var monkeyWindow = this.getMonkeyWindow();
    monkeyWindow.logElement();
    this.goToHomePage(monkeyWindow);
    while(1){
        this.handleAlert();
        this.handleBlackPage();

        if(this.random_page_list && this.random_page_list.length > 0){
            var url = this.random_page_list[this.current_random_page_index];
            this.app.openURL(url);
            this.target.delay(2.0);
            this.current_random_page_index++;
            if(this.current_random_page_index >= this.random_page_list.length){
                this.random_page_list = this.shuffle(this.page_list);
                this.current_random_page_index = 0;
            }
        }
        var page_begin_time = new Date().getTime();
        while(1){
            var page = monkeyWindow.currentPage();
            var pageId = page.pageId();
            var elements = page.rootElement().elements().toArray();
            var scrollViews = page.rootElement().scrollViews();
            elements = this.shuffle(elements);
            for(var index = 0; index < elements.length; index++){
                var ele = elements[index];
                this.tapInElement(ele);
                this.target.delay(this.interval);
                var curPage = monkeyWindow.currentPage();
                if(curPage.pageId != pageId){
                    monkeyWindow.currentPage().back();
                }
                this.target.delay(1.0);
                curPage = monkeyWindow.currentPage();
                if(curPage.pageId != pageId){
                    break;
                }

                var time = new Date().getTime();
                if(time - page_begin_time >= this.page_time * 1000){
                    break;
                }

                if(this.target.isFinished()){
                    UIALogger.logMessage('finish 1');
                    return;
                }
            }

            var time = new Date().getTime();
            if(time - page_begin_time >= this.page_time * 1000){
                break;
            }
            var curPage = monkeyWindow.currentPage();
            if(curPage.pageId != pageId){
                break;
            }

            for(var index = 0; index < scrollViews.length(); index++){
                var scrollView = scrollViews[index];
                scrollView.scrollDown();
                scrollView.scrollRight();

                if(this.target.isFinished()){
                    UIALogger.logMessage('finish 1');
                    return;
                }
            }
        }

        this.goToHomePage(monkeyWindow);

        if(this.target.isFinished()){
            UIALogger.logMessage('finish 1');
            return;
        }

        if((new Date().getTime() - beginTime) >= this.duration * 1000){
            UIALogger.logMessage('finish 2');
            return;
        }
    }
}

GalileoMonkey.prototype.run = function(){
    if(this.monkey_mode == 'random'){
        this.runRandomMoney();
    }
    else{
        this.runPageMonkey();
    }
}

amkTest('运行自动化压力测试', function(target, app){
//    target.dragFromToForDuration({x:30.0, y:500.0}, {x:30.0, y:100.0}, 1.0);
    var config = {};
    try{
        config = UIAEnvironment;
        if(config == undefined){
            config = {};
        }
    }
    catch(err){
    
    }
    
    UIALogger.logMessage('自动化环境变量: ');
    dump(config);
    var monkey = new GalileoMonkey(config);
    
    monkey.run();
});