amkTest('[优酷iPad冒烟测试]播放页缓存',function(target, app){
        UIALogger.logMessage('返回首页');
        UIAPage.currentPage().backToRoot();
        target.delay(2.0);

        var currentPageElement = UIAPage.currentPageElement();
        var searchTextField = currentPageElement.withName('searchLeft@2x');
        searchTextField.tap();
        target.delay(2.0);
        app.keyboard().typeString('海底小纵队');
        app.keyboard().tapReturnKey();
        target.delay(2.0);

        var playBtn = UIAPage.currentPageElement().withName('播放');
        playBtn.tap();
        target.delay(2.0);

        var downLoad = UIAPage.currentPageElement().withName('缓存');
        downLoad.tap();
        target.delay(2.0);

        UIALogger.logMessage('播放页 缓存');
        var downLoadBod = UIAPage.currentPageElement().collectionViews()[2];
        downLoadBod.tap();
        target.delay(2.0);

        UIALogger.logMessage('进入缓存独立页');
        var toDownLoadCenter = UIAPage.currentPageElement().withName('downloadCenter');
        toDownLoadCenter.tap();
        target.delay(2.0);
        target.captureScreenWithName('缓存独立页.png');

        UIALogger.logMessage('长按第一个海报 删除操作');
        target.touchAndHold({x:30.0, y:192.0}, 3.0);
        target.delay(1.0);
        target.tap({x:30, y:192});
        target.delay(1.0);

        //var deleteOneBtn = UIAPage.currentPageElement().withName('删除(1)');
        //deleteOneBtn.tap();
        target.tap({x:722, y:81});
        target.delay(1.0);
        target.captureScreenWithName('缓存独立页空.png');
        target.delay(2.0);









        


});