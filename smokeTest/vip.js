amkTest('[优酷iPad冒烟测试]会员',function(target, app){
        UIALogger.logMessage('返回首页');
        UIAPage.currentPage().backToRoot();
        target.delay(2.0);

        UIALogger.logMessage('进入会员模块');
        target.tap({x:474, y:701});
        target.delay(2.0);
        target.captureScreenWithName('会员模块.png');

        UIAPage.currentPageElement().scrollViews()[0].scrollToBottom();
        target.delay(2.0);
        target.captureScreenWithName('会员模块上滑页面.png');


        



});
