---
title: Java 程式設計(基礎)-Sring字串物件 認識測試
description: Sring字串物件 認識測試
pubDate: 2019-09-30
topic: software
wpId: 922
slug: java-sring-922
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/09/30/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-sring%e5%ad%97%e4%b8%b2%e7%89%a9%e4%bb%b6-%e8%aa%8d%e8%ad%98%e6%b8%ac%e8%a9%a6/"
---

Sring字串物件 認識測試

```
`//字串認識測試
public class Stringtest1 {

	public static void main(String[] args) {
		String name1 = "justin";
		String name2 = "justin";
		String name3 = new String("justin");// 創造新的字串物件
		String name4 = new String("justin");// 創造新的字串物件
		String name5 = "steven";// 不同的文字字串等於用不同的記憶體空間
		String name6 = name1 + name5; //

		System.out.println(name6);
		System.out.println(name1 == "justin");// true
		System.out.println(name2 == "justin");// true
		System.out.println(name3 == "justin");// false
		System.out.println(name1.substring(3));// 從第3個開始印出
		System.out.println(name1.substring(2, 6));// 從第2個印到第6個
		// ------------------------------------------------------
		System.out.println("----------------------------------");

		System.out.println(name1 == name2);// ture
		System.out.println(name1 == name3);// false
		System.out.println(name3 == name4);// false
		System.out.println(name1 == name5);// false
		System.out.println(name1.equals(name2));// ture 字串內容的比對用equals
		System.out.println(name1.equals(name3));// ture 字串內容的比對用equals
		System.out.println(name1.equals(name5));// false 字串內容的比對用equals

		System.out.println("----------------------------------");
		// compareTo比較
		System.out.println(name1.compareTo(name2));
		System.out.println(name1.compareTo(name5));// 比字串大小會比較英文首字的機器編碼順序大小
		System.out.println("----------------------------------");

		String text = "Java Everywhere";

		System.out.println("第一個 a 字元:" + text.indexOf('a'));
		System.out.println("最後一個 a 字元:" + text.lastIndexOf('a'));
		System.out.println("第一個 Every:" + text.indexOf("Every"));
		System.out.println("最後一個 Every:" + text.lastIndexOf("Every"));
		System.out.println("包括 Java:" + text.contains("Java"));// true
		System.out.println("以 Java 為開始:" + text.startsWith("Java"));// true
		System.out.println("以 Java 為結束:" + text.endsWith("Java"));// false

		System.out.println("----------------------------------");
		
		// split 使用 分割字串
		String text1 = "peter,Java,programming,is,,funny,,justin,steven";	// 假如中間有空字串
		String[] str = text1.split(",");
		for (String s : str) {
//			if (s.equals("")) {
//				continue;
//			} else {
//				System.out.println(s);
//			}

			if(!"".equals(s)) {// 用來判斷空字串並讓他不顯示出來
				System.out.println(s);
			}
		}

	}
}
`
```
