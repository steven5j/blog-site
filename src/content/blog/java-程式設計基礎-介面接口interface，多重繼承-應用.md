---
title: Java 程式設計(基礎)-介面(接口)Interface，多重繼承 應用
description: "介面為一種標準、規範，只要符合規則就可以和介面溝通資料成員 沒有建構子、必須設定初值只有方法宣告、沒有方法實作 [&hellip;]"
pubDate: 2019-10-10
topic: software
wpId: 3297
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/10/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-%e4%bb%8b%e9%9d%a2%e6%8e%a5%e5%8f%a3interface%ef%bc%8c%e5%a4%9a%e9%87%8d%e7%b9%bc%e6%89%bf-%e6%87%89%e7%94%a8/"
---

介面為一種標準、規範，只要符合規則就可以和介面溝通
資料成員 沒有建構子、必須設定初值
只有方法宣告、沒有方法實作
沒有一般函數，只有抽象函數
使用implement繼承，可以利用來製作多重繼承

```
`package interfaceDemo;
interface Mother{
	String name= "a";//初值設定
	void amethod();//沒有實作的方法Method，所以每個引用這個interface的類別都必須去實做這個方法Method
}
public class interfaceDemo1 implements Mother{//用implements去接承interface

	public void amethod() {//實作interface的amethod方法
		System.out.println("interface");
	}
	public static void main(String[] args) {
		interfaceDemo1 i = new interfaceDemo1();
		i.amethod();
	}
}
`
```

 多重繼承
 class 類別名稱 extends 父類名稱 implements 介面名稱1,介面名稱2,介面名稱3….{…} 

```
`package interfaceDemo;
interface Mother1{//介面
	String name="a";//初值設定
	
	void amethod();//宣告方法，沒有實作
}
class Father1{
	public void bmethod() {
		System.out.println("father1");
	}
}
public class interfaceDemo2 extends Father1 implements Mother1 {//extends繼承father1 用implement實作Mother1 可以多重使用interface的名稱
public void amethod() {//實作interface裡面的method方法
	System.out.println("interface Mother1");
}
public void bmethod() {//繼承 重寫override 父類別的method方法
	System.out.println("extends Father1");
}
	
	
	public static void main(String[] args) {
		interfaceDemo2 d =new interfaceDemo2();
		d.amethod();
		d.bmethod();
	}

}
`
```
