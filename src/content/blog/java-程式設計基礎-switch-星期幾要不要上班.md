---
title: "Java 程式設計(基礎)-Switch 星期幾要不要上班!"
description: 商品比價 java09檔案，輸入星期幾，得知要不要上班
pubDate: 2019-09-30
topic: software
wpId: 914
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/09/30/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-switch-%e6%98%9f%e6%9c%9f%e5%b9%be%e8%a6%81%e4%b8%8d%e8%a6%81%e4%b8%8a%e7%8f%ad/"
---

商品比價 java09檔案，輸入星期幾，得知要不要上班

```
`//星期幾要不要上班
import java.util.Scanner;

public class java09 {

	public static void main(String[] args) {
		System.out.println("請輸入星期幾！?：");
		String week = new Scanner(System.in).nextLine();

		switch (week) {
			case "星期一":
			case "星期二":
			case "星期三":
			case "星期四":
			case "星期五":
				System.out.println("要上班!");
				break;
			case "星期六":
			case "星期日":
				System.out.println("不用上班!放假!");
				break;
		}
	}
}`
```
