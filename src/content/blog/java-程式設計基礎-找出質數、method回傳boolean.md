---
title: Java 程式設計(基礎)- 找出質數、method回傳boolean
description: 找出質數、method回傳boolean
pubDate: 2019-09-29
topic: software
wpId: 908
slug: java-method-boolean-908
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/09/29/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-%e6%89%be%e5%87%ba%e8%b3%aa%e6%95%b8%e3%80%81method%e5%9b%9e%e5%82%b3boolean/"
---

找出質數、method回傳boolean

```
`
public class java07 {
	//進入點
	public static void main(String[] args) {
			int limit = 100;
			
			for(int i=2 ;i<=limit;i++) {
				if(isPrime(i)) {//印出有成功為true的值
					System.out.print(i+", ");
				};
			}
	}
	public static boolean isPrime(int number) { //用布林值來回傳
		for(int i=2 ;i<number;i++) {
			if(number%i ==0) {//如果跑一跑有能被除掉，餘數為零的就回傳false
				return false;
			}
		}
		return true;//如果都沒有被整除的，就會回傳true
	}
	
}
`
```
