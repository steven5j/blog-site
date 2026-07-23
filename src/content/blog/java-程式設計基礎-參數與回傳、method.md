---
title: Java 程式設計(基礎)-參數與回傳、method
description: Java 程式設計(基礎)-參數與回傳、method
pubDate: 2019-09-27
topic: software
wpId: 901
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/09/27/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-%e5%8f%83%e6%95%b8%e8%88%87%e5%9b%9e%e5%82%b3%e3%80%81method/"
---

```
`
public class java04 {
//進入點
	public static void main(String[] args) {
		
		start();
		System.out.println("<Hello!>");
		System.out.println(end(10));//會印出型態下 return的值
		end(20);//不會印出型態下 return的值
	}
	
//	method裡面不能再放一個method
	public static void start(){ //start() method(方法)
		for(int i=0 ; i < 20 ; i++) {
			System.out.print("$");//印出20個$字號
		}
		System.out.print("<start>");
		System.out.print("\n");
	}
	
	public static String end(int num) { //end() method(方法)
		for(int o=0 ; o < num ; o++) {
			System.out.print("$");//印出num個$字號
		}
		return "<end>";//return 一個字串，所以這fuction得型態改為string 而非void
	}
	
	
}`
```
