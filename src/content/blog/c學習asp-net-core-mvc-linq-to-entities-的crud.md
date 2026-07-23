---
title: "[C#][.NET]ASP.NET Core MVC  LINQ to Entities 的CRUD"
description: "環境與版本 作業系統：Window10 64x 版本：2004 開發軟件(IDE)：Visual Studio [&hellip;]"
pubDate: 2020-10-11
topic: software
series: csharp
heroImage: /public/uploads/wp/4739.jpg
wpId: 4739
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/10/11/c%e5%ad%b8%e7%bf%92asp-net-core-mvc-linq-to-entities-%e7%9a%84crud/"
---

環境與版本

作業系統：Window10 64x 版本：2004

開發軟件(IDE)：Visual Studio 2019 Community

.NET版本：ASP.NET Core 3.1

專案架構：MVC

LINQ to Entities

LINQ 查詢作業由三個動作構成：取得資料來源、建立查詢和執行查詢。LINQ to Entities 的查詢提供兩種語法：

- 以方法為基礎的查詢語法([Lambda 運算式](http://msdn.microsoft.com/zh-tw/library/bb397687.aspx))(預設)

- 查詢運算式語法(類似 Transact-SQL語法)

繼之前篇文章[[C#學習]ASP.NET CORE MVC 應用程式中的資料庫 使用與範本](https://wordpress-1652732-6572997.cloudwaysapps.com/2020/09/05/c%E5%AD%B8%E7%BF%92asp-net-core-mvc-%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F%E4%B8%AD%E7%9A%84%E8%B3%87%E6%96%99%E5%BA%AB-%E4%BD%BF%E7%94%A8%E8%88%87%E7%AF%84%E6%9C%AC/) 進行延續學習使用範本

1.以方法為基礎的查詢語法

以方法為基礎的查詢語法是對 LINQ 運算子方法之直接方法呼叫的序列，並傳遞 Lambda 運算式當做參數。Scaffold產生的程式碼，預設都是使用『以方法為基礎的查詢語法』方式來做

Lambda 運算式，大致上形式如下：

```
自訂義參數名稱 => 自訂義參數名稱.物件屬性
```

必須先建立DbContext才能以物件的方式查詢entity

```
		private readonly MvcMovieContext _context;

        public MoviesController(MvcMovieContext context)
        {
            _context = context;
        }
        //另一種方式
        //MvcMovieContext _context = new MvcMovieContext();
```

Create

Create，使用Add()方法

```
        // POST: Movies/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,ReleaseDate,Genre,Price")] Movie movie)
        {
            if (ModelState.IsValid)
            {
                _context.Add(movie);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(movie);
        }
```

Update

Update，使用Update()方法並搭配.SaveChanges()方法

```
		// POST: Movies/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,ReleaseDate,Genre,Price")] Movie movie)
        {
            if (id != movie.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(movie);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MovieExists(movie.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(movie);
        }
```

Read

Read，使用FirstOrDefaultAsync()方法

```
        // GET: Movies/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var movie = await _context.Movie
                .FirstOrDefaultAsync(m => m.Id == id);
            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }
```

欲執行Update和Delete的時候，裡面幾乎都會先設定使用FindAsync區找到該筆資料，然後後面再執行Update和Delete。

```
            var movie = await _context.Movie.FindAsync(id);
```

Delete

Delete，使用Remove()方法並搭配.SaveChanges()方法

```
        // POST: Movies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var movie = await _context.Movie.FindAsync(id);
            _context.Movie.Remove(movie);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
```

2.查詢運算式語法

查詢運算式是宣告式查詢語法。 這些語法可以讓開發人員以類似 Transact-SQL 格式的高階語言撰寫查詢。

SQL是結構化查詢語言，很多網頁開發的人員很不熟悉此語言體系，但是如果是比較常在接觸機房或是資料管控的，比如我就非常熟悉此語言。

```
        // GET: Movies
        public async Task<IActionResult> Index()
        {
            var movies = from m in _context.Movie
                         select m;

            return View(await _context.Movie.ToListAsync());
        }
```

參考資料：

認識Model – LINQ to Entities 與 導覽屬性：[https://ithelp.ithome.com.tw/articles/10161589](https://ithelp.ithome.com.tw/articles/10161589)

LINQ to Entities 中的查詢：[https://docs.microsoft.com/zh-tw/dotnet/framework/data/adonet/ef/language-reference/queries-in-linq-to-entities](https://docs.microsoft.com/zh-tw/dotnet/framework/data/adonet/ef/language-reference/queries-in-linq-to-entities)

深入探索LINQ | 2018 iT 邦幫忙鐵人賽：[https://ithelp.ithome.com.tw/users/20107789/ironman/1574?page=1](https://ithelp.ithome.com.tw/users/20107789/ironman/1574?page=1)

DAY 22 LINQ 查詢運算式：[https://ithelp.ithome.com.tw/articles/10207338](https://ithelp.ithome.com.tw/articles/10207338)

DAY 23 LINQ 查詢運算式(二)：[https://ithelp.ithome.com.tw/articles/10207576](https://ithelp.ithome.com.tw/articles/10207576)
