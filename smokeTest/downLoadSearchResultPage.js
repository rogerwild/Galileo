amkTest('[优酷iPad冒烟测试]搜索结果页缓存',function(target, app){
        UIALogger.logMessage('返回首页');
        UIAPage.currentPage().backToRoot();
        target.delay(2.0);

        var currentPageElement = UIAPage.currentPageElement();
        var searchTextField = currentPageElement.withName('searchLeft@2x');
        searchTextField.tap();
        target.delay(2.0);
        app.keyboard().typeString('小猪佩奇');
        app.keyboard().tapReturnKey();
        target.delay(2.0);

        UIALogger.logMessage('搜索结果页 下载');
        currentPageElement = UIAPage.currentPageElement();
        var downLoadBtn = currentPageElement.withName('SKBDown');
        downLoadBtn.tap();
        target.delay(2.0);

        currentPageElement = UIAPage.currentPageElement();
        UIALogger.logMessage('缓存全部');
        var downLoadAllBtn = currentPageElement.withName('缓存全部');
        downLoadAllBtn.tap();
        target.delay(1.0);
        var downSure = UIAPage.currentPageElement().withName('确定');
        downSure.tap();
        target.delay(4.0);
        //截图
        target.captureScreenWithName('搜索结果页 缓存全部.png');
        var cancel = UIAPage.currentPageElement().withName('取消');
        cancel.tap();
        target.delay(2.0);



});
