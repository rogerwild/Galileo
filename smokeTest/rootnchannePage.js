amkTest('[优酷iPad冒烟测试]首页&频道页',function(target, app){
        UIALogger.logMessage('返回首页');
        UIAPage.currentPage().backToRoot();
        target.delay(2.0);

        var currentPageElement = UIAPage.currentPageElement();
        var scrollView = currentPageElement.scrollViews()[1];
        UIALogger.logMessage('滑动首页到底部');
        scrollView.scrollToBottom();
        target.delay(2.0);       
        target.captureScreenWithName('滑动首页到底部.png');

        UIALogger.logMessage('右滑切换频道');
        for(var i=0 ; i<3 ; i++){
                target.dragFromToForDuration({x:1004.0, y:550.0}, {x:30.0, y:550.0}, 0.5);
                target.delay(2.0);
                target.captureScreenWithName('切换频道页.png' + i);

        }
        

});