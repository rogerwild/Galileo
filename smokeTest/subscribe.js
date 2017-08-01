amkTest('[优酷iPad冒烟测试]订阅',function(target, app){
        UIALogger.logMessage('返回首页');
        UIAPage.currentPage().backToRoot();
        target.delay(2.0);

        UIALogger.logMessage('进入订阅模块');
        target.tap({x:584, y:701});
        target.delay(2.0);
        target.captureScreenWithName('订阅模块.png');

        UIALogger.logMessage('进入质量榜');
        UIAPage.currentPageElement().collectionViews()[0].cells()[0].tap();
        target.delay(2.0);
        target.captureScreenWithName('质量榜');
       

        UIAPage.currentPageElement().withName('返回').tap();
        target.delay(2.0);

        UIALogger.logMessage('点击订阅第一个自频道');
        target.tap({x:1004, y:235});
        target.delay(1.0);
        target.captureScreenWithName('订阅了一个自频道.png');

        UIALogger.logMessage('上滑页面查看');
        UIAPage.currentPageElement().collectionViews()[0].scrollToBottom();
        target.captureScreenWithName('上滑页面.png');

        



});
