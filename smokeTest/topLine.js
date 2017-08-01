amkTest('[优酷iPad冒烟测试]头条',function(target, app){
        UIALogger.logMessage('返回首页');
        UIAPage.currentPage().backToRoot();
        target.delay(2.0);

        UIALogger.logMessage('进入头条页面');
        target.tap({x:364, y:701});
        target.delay(2.0);
        target.captureScreenWithName('头条页面.png');

        UIALogger.logMessage('点击第一个视频');
        UIAPage.currentPageElement().collectionViews()[0].cells()[0].tap();
        target.delay(2.0);

        UIAPage.currentPageElement().scrollViews()[0].scrollToBottom();
        target.delay(2.0);


        



});
