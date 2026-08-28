---
title: Java 程式設計(基礎)-While迴圈Demo實作
description: While迴圈實作
pubDate: 2019-09-30
topic: software
wpId: 920
slug: java-while-demo-920
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/09/30/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-while%e8%bf%b4%e5%9c%88demo%e5%af%a6%e4%bd%9c/"
---

While迴圈實作

```
`public class WhileDemo {

	public static void main(String[] args) {
		System.out.println("輸入可執行次數");
		int input = new java.util.Scanner(System.in).nextInt();

		int count = 0;
		while (count < input) {
			System.out.println("hello world!");
			count++;
		}
	}
}`
```
