---
title: Java 程式設計(基礎)-Math.random Math終極密碼遊戲
description: 用JAVA製作終極密碼小遊戲！
pubDate: 2019-09-27
topic: software
wpId: 904
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/09/27/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-math-random-math%e7%b5%82%e6%a5%b5%e5%af%86%e7%a2%bc%e9%81%8a%e6%88%b2/"
---

用JAVA製作終極密碼小遊戲！

```
`//終極密碼1~100
//Math的所有方法 http://www.51gjie.com/java/580.html
import java.util.Scanner;

public class java05 {

	// 進入點
	public static void main(String[] args) {
		double pcnumber = Math.random(); // 電腦隨機0.000...~1.00000..

		pcnumber *= 100; // 電腦隨機的數字從0.000~100.000
		int number = (int) pcnumber;// 把隨機數字轉成只留下整數

		Scanner scanner = new Scanner(System.in);

		System.out.println("請輸入數字0~100：");
		int result = 0;
		while (result == 0) {// 可以一直重複讓使用者輸入數字和跑if
			int mennumber = scanner.nextInt();

			if (mennumber < number) {
				System.out.println("數字太小too small");
			} else if (mennumber > number) {
				System.out.println("數字太大too large");
			} else if (mennumber == number) {
				System.out.println("蹦蹦蹦!Bingo!!");
				result = 1; // 當bingo了以後，就停止While迴圈，使用者也不能輸入了!
			}
		}
	}
}`
```
