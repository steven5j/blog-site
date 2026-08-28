---
title: "[C#][.NET Core]多線程中使用依賴注入於 數據保存時Context被釋放的問題"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2021-07-13
topic: software
series: csharp
wpId: 6335
slug: c-net-core-context-6335
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2021/07/13/c-net-core%e5%a4%9a%e7%b7%9a%e7%a8%8b%e4%b8%ad%e4%bd%bf%e7%94%a8%e4%be%9d%e8%b3%b4%e6%b3%a8%e5%85%a5%e6%96%bc-%e6%95%b8%e6%93%9a%e4%bf%9d%e5%ad%98%e6%99%82context%e8%a2%ab%e9%87%8b%e6%94%be/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2021/01/netcorestudynotes-1024x576.jpg)

環境與版本

作業系統：Window10 64x 版本：2004

開發軟件(IDE)：Visual Studio 2019 Community

.NET版本：ASP.NET Core 3.1

專案架構：MVC

發生Context已經被釋放

新建線程或多線程(多執行緒)中使用 .Net Core所帶的依賴注入 用於 數據保存(SavaChange方法)時，會發生Context已經Disposed(釋放)

錯誤訊息大致如下：

Object name: ‘DbContext’. —>System.ObjectDisposedException: Cannot access a disposed object.

嘗試改為通過構造 函數注入 又發生

Cannot access a disposed object.\r\nObject name: ‘IServiceProvider’.

New 新實例，代碼中有調用Async 非同步函式 再次出現

Cannot access a disposed object.\r\nObject name: ‘IServiceProvider’.

最後是使用以下網路查詢到的內容方式再加上全部調整回同步函式才解決!

以下為網路查詢並經實測可處理的方式：

問題來自博問的一個提問 [.net core多線程數據保存的時候DbContext被釋放 。](https://q.cnblogs.com/q/108166/)

TCPService通過構造函數注入了ContentService ， ContentService的實例依賴了AppDbContext （繼承自EF Core的DbContext）。在TCPService中通過Thread.Start啟動了一個新的線程執行了TCPService中的Receive方法，在Receive方法中通過ContentService進行保存[數據庫](http://www.codercto.com/category/database.html)的操作，而在訪問AppDbContext的實例時出現對像已被Disposed的錯誤。

Object name: ‘AppDbContext’. —>System.ObjectDisposedException: Cannot access a disposed object. A common cause of this error is disposing a context that was resolved from dependency injection and then later trying to use the same context instance elsewhere in your application. This may occur if you are calling Dispose() on the context, or wrapping the context in a using statement. If you are using dependency injection, you should let the dependency injection container take care of disposing context instances.

針對這個問題，嘗試改為通過構造函數注入 IServiceProvider ，在TCPService.Receive （在新線程中執行的方法）中通過IServiceScope 解析

```
using ( var scope = _serviceProvider.CreateScope()) 
{ 
    var contentService = scope.ServiceProvider.GetRequiredService<ContentService> ();
    // ... 
}
```

結果發現 IServiceProvider 也被Disposed

```
System.ObjectDisposedException: Cannot access a disposed object. Object name: 'IServiceProvider'.
```

由此可以推断在 ASP.NET Core 中在新建的线程中无法通过依赖注入的方式访问实现了 IDisposable 接口的对象（单例对象除外，但实现 IDisposable 接口的类型通常不会注册为单例），也就是只要请求一结束，实现 IDisposable 接口的对象的 Dispose 方法就会被调用。

那如何解決這個問題呢？

1）最下下策的解決方法是將DbContext 註冊為單例

```
services.AddDbContext<AppDbContext>(options => { }, ServiceLifetime.Singleton);

```

實測可用，但是它會帶來很多副作用，不考慮。

2）在保存數據至數據庫的實現方法中基於 DbContextOptions （它是單例(singleton)）手工new AppDbContext ，用這個DbContext 實例進行保存操作。

※注意第5-8行 和 24-32行

```
public class AyomarContentService : Repository<AyomarContents>, IService.IAyomarContentService
{
    private readonly DbContextOptions<AppDbContext> _options;

    public AyomarContentService(AppDbContext Context, DbContextOptions<AppDbContext> options) : base(Context)
    {
        _options = options;
    }

    public override async Task<bool> SaveAsync(AyomarContents entity, bool IsCommit = true)
    {
        using (var context = new AppDbContext(_options))
        {
            context.Set<AyomarContents>().Add(entity);
            if (IsCommit)
                return await context.SaveChangesAsync() > 0;
            else
                return false;
        }
    }

    public override async Task<bool> UpdateAsync(AyomarContents entity, bool IsCommit = true)
    {
        using (var context = new AppDbContext(_options))
        {
            context.Set<AyomarContents>().Attach(entity);
            context.Entry<AyomarContents>(entity).State = EntityState.Modified;
            if (IsCommit)
                return await context.SaveChangesAsync() > 0;
            else
                return false;
        }
    }
}
```

參考或引用資料來源：

ASP.NET Core 新建線程中使用依賴注入的問題：[https://www.cnblogs.com/dudu/p/9353369.html](https://www.cnblogs.com/dudu/p/9353369.html)

.net core 多线程,数据保存的时候Context被释放：[https://q.cnblogs.com/q/108166/](https://q.cnblogs.com/q/108166/)
