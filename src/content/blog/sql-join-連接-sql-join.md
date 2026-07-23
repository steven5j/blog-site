---
title: "[SQL]-JOIN 連接 (SQL JOIN)"
description: "SQL JOIN 是結合多個資料表而組成一抽象的暫時性資料表以供資料查詢，在原各資料表中之紀錄及結構皆不會因此 [&hellip;]"
pubDate: 2020-01-18
topic: software
series: sql
wpId: 3793
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2020/01/18/sql-join-%e9%80%a3%e6%8e%a5-sql-join/"
---

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/01/sql-join-all.jpg)

SQL JOIN 是結合多個資料表而組成一抽象的暫時性資料表以供資料查詢，在原各資料表中之紀錄及結構皆不會因此連接查詢而改變。

一般引用兩個表

```
`SELECT ATable.Clumn1, ATable.Clumn2, BTable.Clumn3
FROM ATable, BTable
WHERE ATable.Id = BTable.Id`
```

一般引用表格連結方式 預設為 交叉連接(笛卡兒乘積連接)

SQL join的方式

基本語法

```
SELECT <list3>
FROM
  (SELECT <list1> FROM T) AS t1
<LEFT / RIGHT> JOIN
  (SELECT <list2> FROM C) AS c1 
ON 
t1.id = c1.id  AND  t1.name = c1.name
```

ON 為兩個表的連接點。

邏輯圖示

![](https://lh3.googleusercontent.com/dpbQe7dJLHUXG4h1IIq4-UUEdmHIkco5nf77VqGhFSPfkAO-fyD8OUdJRJqmF3a2LUKCupS7A6UN3udHonxbqqC4rTas2HqIG1cZvvMTqR3UVdN6hfVjs1YEP6y8OptSdyFcP44sl-3F_leExmArmkFr7BQD28oL-joat4uqGp9y26g4YtzQukEM46pmj7MgUG-aGf4PcQ4jALA5eUXbR0S9a6LGEzM79TE8W45iNqjPH6dCcyxlW-M9_XfTrmCNTnnnI7uusuoCkxChp6zSEjNFiHuHmQjRThDyx7DqCcml1Om8BpNR6BeqqfUrAUH1xO7d5Bg7EyJX7MOvSKXNWXGJllF4iMtISYP2gNYzWxJV5kVrc2HVlxxoqR6PO9_AzFC98A0ue4o300j3jWTy4sCUUGBeSjnGzUL4ov0wT_XrgL0DzP4kwsKiezJzorWi9RUV9kHJA_9EbA1eW3CDJtA9rMbrmad9bCkhvQiBCZW0bq1mo1CTLfRx4og_pomgafIv5LDsqko6SEND1bMzZcROLcdu2LMZeURbW07tN7D_X9EdrvT3lgL288jhMCivBJ6RZvIf9g-4rPRrT8-zkfLaafE6tdehzunmbxfR3AuwomqpSKzDScfwYPquymaQVGEzOYyzXQ9-qFP_Z0I9meGQKfq_eTe7RbC76_FVqa4Qi-yRX3Fxq0eFzmR0t6pn70AIC6PwrRrj3TQWtqDlbjvhAsGSXFJs0jJslqD2wPPTTp9x=w700-h817-no)

JOIN種類與邏輯說明

連接方式邏輯說明

JOIN(連接)預設即INNER JOIN 或  CROSS JOIN 。

INNER JOIN(內部連接) 將兩個表公共都有的部分組成新表。

FULL JOIN(全部外部連接)包含左右兩表的所有行， 對應左右表沒有的都為Null。

LEFT (OUTER) JOIN(左外連接 )左表的全集及右表有的值，無值則為Null。

RIGHT (OUTER)  JOIN (右外連接 )與LEFT JOIN 相反。

CROSS JOIN(交叉連接 或  笛卡兒連接)為兩個資料表間的笛卡兒乘積 (Cartesian product)，兩個資料表在結合時，不指定任何條件，即將兩個資料表中所有的可能排列組合出來，因此，當有 WHERE、ON、USING 條件時不建議使用。

NATURAL JOIN(自然連接)自然連接有 NATURAL JOIN、NATURAL LEFT JOIN、NATURAL RIGHT JOIN，兩個表格在進行 JOIN 時，加上 NATURAL 這個關鍵字之後，兩資料表之間同名的欄位會被自動結合在一起。

JOIN種類與基本語法範例

JOIN(連接)

```
SELECT table_column1, table_column2...
FROM table_name1
JOIN table_name2;
```

INNER JOIN(內部連接) 

```
`SELECT table_column1, table_column2...
FROM table_name1
INNER JOIN table_name2 
ON table_name1.column_name=table_name2.column_name;`
```

OR

```
`SELECT table_column1, table_column2...
FROM table_name1
INNER JOIN table_name2 
USING (column_name);`
```

FULL JOIN(全部外部連接)

```
`SELECT table_column1, table_column2...
FROM table_name1
FULL JOIN table_name2 
ON table_name1.column_name=table_name2.column_name;`
```

LEFT (OUTER) JOIN(左外連接 )

```
`SELECT table_column1, table_column2...
FROM table_name1
LEFT JOIN table_name2 
ON table_name1.column_name=table_name2.column_name;`
```

RIGHT (OUTER)  JOIN (右外連接 )

```
`SELECT table_column1, table_column2···
FROM table_name1
RIGHT JOIN table_name2 
ON table_name1.column_name=table_name2.column_name;`
```

CROSS JOIN(交叉連接 或  笛卡兒連接)

```
`SELECT table_column1, table_column2...
FROM table_name1
CROSS JOIN table_name2;`
```

OR

```
`SELECT table_column1, table_column2...
FROM table_name1, table_name2;`
```

OR

```
`SELECT table_column1, table_column2...
FROM table_name1
JOIN table_name2;`
```

NATURAL JOIN(自然連接)

```
`SELECT table_column1, table_column2...
FROM table_name1
NATURAL JOIN table_name2;`
```

JOIN組合用法圖示

![](https://wordpress-1652732-6572997.cloudwaysapps.com/wp-content/uploads/2020/01/sql-join-all.jpg)

參考資料：

SQL JOIN：[https://www.w3school.com.cn/sql/sql_join.asp](https://www.w3school.com.cn/sql/sql_join.asp)

SQL JOIN 逻辑： [https://www.gairuo.com/p/sql-join-sheet](https://www.gairuo.com/p/sql-join-sheet) 

JOIN 連接 (SQL JOIN)： [https://www.fooish.com/sql/join.html](https://www.fooish.com/sql/join.html)
