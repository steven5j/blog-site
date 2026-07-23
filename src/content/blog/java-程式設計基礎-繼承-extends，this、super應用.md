---
title: Java 程式設計(基礎)-繼承 extends，this、super應用
description: "1、當一個類沒有繼承任何一個類時，系統預設繼承Object。 2、父類又被稱為基類、超類、super類，子類又 [&hellip;]"
pubDate: 2019-10-09
topic: software
wpId: 3291
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/09/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-%e7%b9%bc%e6%89%bf-extends%ef%bc%8cthis%e3%80%81super%e6%87%89%e7%94%a8/"
---

1、當一個類沒有繼承任何一個類時，系統預設繼承Object。

2、父類又被稱為基類、超類、super類，子類又被稱為派生類，這是由於翻譯問題而導致的。

3、Java的繼承是單一性的。

4、子類不能繼承父類的構造方法，但是可以繼承構造方法類的引數。

5、子類可以擁有自己的屬性和方法，即子類可以對父類進行擴充套件。但子類不能繼承父類private修飾的屬性和方法。

系統預設繼承

class 類名 extends Object{/*程式碼塊*/}

```
`//繼承 extends  
package extendsDemo;
class Father{ //Father 父類別
	private int a=100;
	
	public int getInt() {
		return a;
	}
}
class Son extends Father{//Son 繼承father
}
public class extentDemo {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Son tt = new Son();   //宣告son`,而son傭有father的所有屬性方法
		System.out.println("a="+tt.getInt());//列印出來測試 是Father的屬性
	}
}
`
```

this()：呼叫同一類別內的其他建構式。

super()：從子類別呼叫其父類別的建構式、方法。

```
`package extendsDemo;
class Father2{ //父類別
	public int a;  //宣告A
	private String name; //私人private修飾元的name
	private Integer age;//私人private修飾元的age
	protected void setname(String name) { //protected視同一個package底下才能存取的
		this.name=name; //因為參考值是name 而第四行的變數名稱也是name，所以必須要有一個方式讓系統分辨得出來這兩個name 用this代表的是這個類別class底下的name
	

	}
	protected void setage(int age) {
		this.age=age;
	}
	protected void print() {
	System.out.println("name="+name+"\nage="+age);	
	}
}

public class thissuperDemo extends Father2{
	public void print() {
		System.out.println("Demothis&Supper=");
		super.print();//因為這個類別Class也有一個方法method 名稱叫做print，所以用super的方式告訴系統是處理父代的print
	}
	
	public static void main(String[] args) {
		thissuperDemo d= new thissuperDemo();
			d.setname("steven");
			d.setage(26);
			d.print();
	}
}
`
```
