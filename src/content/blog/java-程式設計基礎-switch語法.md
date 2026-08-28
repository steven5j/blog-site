---
title: Java 程式設計(基礎)-Switch語法
description: "Java 程式設計(基礎)-Switch語法 Switch題目： // 撰寫一個成績分級程式 // 輸入分數, [&hellip;]"
pubDate: 2019-09-27
topic: software
wpId: 878
slug: java-switch-878
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/09/27/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-switch%e8%aa%9e%e6%b3%95/"
---

Java 程式設計(基礎)-Switch語法

Switch題目：

//        撰寫一個成績分級程式
 //        輸入分數,若90以上,則show 得A,
 //        若大於80分,小於90分,則show 得B,
 //        若大於70分,小於80分,則show得C,
 //        若大於60分,小於70分,則show得D.
 //        其餘的則show 得 E(不及格)

```
`/額外方法import進來
import java.math.BigDecimal;
import java.util.Scanner;

public class java02 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		撰寫一個成績分級程式
//		輸入分數,若90以上,則show 得A,
//		若大於80分,小於90分,則show 得B,
//		若大於70分,小於80分,則show得C,
//		若大於60分,小於70分,則show得D.
//		其餘的則show 得 E(不及格)
		Scanner t=new Scanner(System.in);
		System.out.println("請輸入分數:");

		int score =t.nextInt();
		int level =score /10;
//		列印Level
		System.out.println(level);
//		依照level的值是，列印出不同的結果
		switch (level) {
		case 10:
		case 9:
			System.out.println("得A");
			break;
		case 8:
			System.out.println("得B");
			break;
		case 7:
			System.out.println("得C");
			break;
		case 6:
			System.out.println("得D");
			break;
		default:
			System.out.println("得E");
			break;
		}
		

	}

}`
```
