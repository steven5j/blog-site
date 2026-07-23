---
title: Java 程式設計(初階)-抽象類別abstract、抽象類別實作
description: "抽象類別 可定義「一般函數」與「抽象函數」 抽象類別 不能用來建立物件 抽象函數 不定義其處理方式 子類別繼承 [&hellip;]"
pubDate: 2019-10-10
topic: software
wpId: 3301
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/10/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%88%9d%e9%9a%8e-%e6%8a%bd%e8%b1%a1%e9%a1%9e%e5%88%a5abstract%e3%80%81%e6%8a%bd%e8%b1%a1%e9%a1%9e%e5%88%a5%e5%af%a6%e4%bd%9c/"
---

抽象類別 可定義「一般函數」與「抽象函數」
 抽象類別 不能用來建立物件
 抽象函數 不定義其處理方式
 子類別繼承而來的抽象函數 與改寫overriding 技術相同
 針對子類別會使用到的條件，可以在父類別中定義抽象函數來使用

最後要注意的還有：

抽象函數 只能宣告為 公有public 或 保護protected，
因為子類別必須取用，所以不能宣告成 私有private！

```
`package abstractDimo;

abstract class Father{ //抽象類別 在class前面加上abstract
	abstract void amethod();//建立一個無實作區塊的抽象方法
	
	public void bmethod() {//在抽象類別裡面一樣可以建立一般函數方法
		System.out.println("bmethod");
	}
}

class Son extends Father{//用擴充或繼承的方式 才能使用abstract抽象類別的方法
	void amethod() { //抽象方法需要用擴充的方式才能加以實作
		System.out.println("amethod");
	}
}

public class abstractDimo {

	public static void main(String[] args) {
		Father s = new Son();//宣告father的規則，son的實體去測試使用
		s.amethod(); //amethod是son繼承下來的
		s.bmethod(); //bmethod災抽象類別的一般函數method方法
	}

}
`
```

 抽象類別實作案例

```
`package abstractDimo;

abstract class Father1{ //定義抽象類別
	protected String color;
	public void setcolor(String color){ //一般函數方法
		this.color=color;
	}
	public abstract void show(); //只定義函數名稱的 抽象函數
}
class Son1 extends Father1{ //子類別 去繼承Father抽象類別
	protected double raduis;
	protected Son1(double raduis) { //建構元
		this.raduis=raduis;
	}
	public void show() { //定義繼承來的抽象類別裡面 show() 的處理方式
		System.out.println("color="+color);
		System.out.println("area="+3.14*raduis*raduis);
	}
}

public class abstractDimo2 {

	public static void main(String[] args) {
		
		Son1 s=new Son1(2.0);//直接傳double值進去
		s.setcolor("red"); //呼叫父類別的steolor()
		s.show();//乎叫子類別所處理的show()

	}

}
`
```
