---
title: Java 程式設計(基礎)-使用者輸入 Scanner
description: Java 程式設計(基礎)-使用者輸入
pubDate: 2019-09-26
topic: software
wpId: 875
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/09/26/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-%e4%bd%bf%e7%94%a8%e8%80%85%e8%bc%b8%e5%85%a5/"
---

Java 程式設計(基礎)-使用者輸入

```
`import java.util.Scanner;

public class java01 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("hello!java");
		Scanner t =new Scanner(System.in);
		
		System.out.print("請輸入整數數字:");
		int i = t.nextInt();
		System.out.println("您輸入的數字是->"+i);
//	字串只能選一組 next or nextLine(跟很多輸入方式不相容)	
		System.out.print("請輸入字串:");
		String s = t.next();
		System.out.println("您輸入的字串是->"+s);
		
//		System.out.print("請輸入字串加上空白和字串:");
//		String o = t.nextLine();
//		System.out.println("您輸入的是->"+o);
		
		System.out.print("請輸入浮點數字:");
		Double y = t.nextDouble();
		System.out.println("您輸入的浮點點數是->"+y);
		
//		Boolean 布林數 => ture or false
	    System.out.print("輸入布林數(true or false):");
	    boolean p = t.nextBoolean();
		System.out.println("您輸入的布林數是->"+p);
		
	}

}`
```
