---
title: Java 程式設計(初階)-BigDecimal
description: "一般來說，提到Java裡面的商業計算，我們都知道不能用float和double，因為他們無法進行精確計算。但是 [&hellip;]"
pubDate: 2019-09-27
topic: software
wpId: 880
slug: java-bigdecimal-880
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/09/27/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%88%9d%e9%9a%8e-bigdecimal/"
---

一般來說，提到Java裡面的商業計算，我們都知道不能用float和double，因為他們無法進行精確計算。但是Java的設計者給編程人員提供了一個很有用的類BigDecimal，他可以完善float和double類無法進行精確計算的缺憾。 BigDecimal類位於java.maths類包下。

```
`//BigDecimal 和Scanner導入
import java.math.BigDecimal;
import java.util.Scanner;

public class java03 {
//進入點
	public static void main(String[] args) {
//		輸入數字存在score1
		System.out.print("請輸入第一個數字:");
		Scanner scanner1=new Scanner(System.in);
		BigDecimal score1 =scanner1.nextBigDecimal();
//		輸入數字存在score2
		System.out.print("請輸入第二個數字:");
		Scanner scanner2=new Scanner(System.in);
		BigDecimal score2 =scanner2.nextBigDecimal();

		BigDecimal bignum1 = new BigDecimal("0"); 
		BigDecimal bignum2 = new BigDecimal("0"); 
		BigDecimal bignum3 = null; 

		
		bignum1 = score1;
		bignum2 = score2;
//		加法 和
		bignum3 = bignum1.add(bignum2);
		System.out.println("add 加法的\"和\"是->"+bignum3);
//		減法 差
		bignum3 = bignum1.subtract(bignum2);
		System.out.println("subtract 減法的\"差\"是->"+bignum3);
//		乘法 積
		bignum3 = bignum1.multiply(bignum2);
		System.out.println("multiply 乘法的\"積\"是->"+bignum3);
//		除法 商
		bignum3 = bignum1.divide(bignum2);
		System.out.println("divide 除法的\"商\"是->"+bignum3);

		
	}

}
`
```
