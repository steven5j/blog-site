---
title: Java 程式設計(初階)-內部類別Inner class或稱巢狀類別Nested class、一般、匿名、方法(區域)、靜態
description: "顧名思義，就是有個Class包在另一個Class裡面 一般內部類別 (成員內部類別 )Member inner [&hellip;]"
pubDate: 2019-10-10
topic: software
wpId: 3304
slug: java-inner-class-nested-class-3304
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/10/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%88%9d%e9%9a%8e-%e5%85%a7%e9%83%a8%e9%a1%9e%e5%88%a5inner-class%e6%88%96%e7%a8%b1%e5%b7%a2%e7%8b%80%e9%a1%9e%e5%88%a5nested-class%e3%80%81%e4%b8%80/"
---

顧名思義，就是有個Class包在另一個Class裡面

一般內部類別 (成員內部類別 )Member inner class
基本上是在一個類別中直接宣告另一個類別 

```
`package innerclassDemo;
//一般內部類別
class classDemo{
	class innerclass{//類別裡面在創造一個innerclass內部類別
		void amethod() {//內部類別裡面的amethod
			System.out.println("innerclass");
		}
	}
}
public class innerclassDemo {

	public static void main(String[] args) {
		classDemo a =new classDemo();
		classDemo.innerclass a1 = a.new innerclass();
		a1.amethod();
		new classDemo().new innerclass().amethod();//奏另一條 完整地宣告路徑
	}
}
`
```

 匿名內部類別 Anonymous inner class 

內部匿名類別可以不宣告類別名稱，而使用 “new” 直接產生一個物件，內部匿名類別可以是繼承某個類別或是實作某個介面

```
`package innerclassDemo;
//匿名內部類別Anonymous inner class
public class innerclassDemo2 {
	public static void main(String[] args) {
		int a=10;
		
		(new Object() { //匿名內部類別，直接把要執行的函式放在()內，然後這個類別沒有取名，字首要大寫!
			int b=1000; //匿名類別的成員
			public void amethod() {//匿名類別的方法
				System.out.println("匿名類別");
				System.out.println("this b="+b);
				System.out.println("public main() a="+a);
			}
		}).amethod();//直接執行類別裡面的方法
		
		
	}
}
`
```

方法內部類別(區域內部類別 )Local inner class

```
`package innerclassDemo;
//方法內部類別 區域內部類別
public class innerclassDemo3 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		new innerclassDemo3().aMethod();//創造一個aMethod
	}
void aMethod() {//方法 在方法裡面的東西只有在方法裡面可以使用，class也是 離開方法就沒有用處
	int x=100; //設定一個值
	class innerclass{//方法內部的類別
		void bMethod() {
			System.out.println("Method InnerClass");
			System.out.println("x="+x);//x到類別方法內還可以使用第10行的值
		}
	}
	innerclass i=new innerclass();//使用這個Method方法裡面的類Class別
	i.bMethod();
}

}`
```

靜態內部類別 (靜態巢狀類別)static Nested class 

就是在class內有static class
內部類別加上static修飾字就是靜態巢狀類別了
概念上比較像是static import

簡單來說內部類別加上static後就可以直接拜訪到
不需要先實體化外部類別, 就可以直接實體化該類別
就好像把該類別拉到最上層的層級一樣

 靜態外部類別的內部類別同樣是被放在Global記憶體區塊，
所以內部類別不管有沒有宣告static，都可互相看見而存取 。

 靜態類別本身是沒有this指標，也不需要new建立實體
但靜態內部類別的non-static成員會有this指標指向自己，
因此，也可用new來建立靜態內部類別的實體 

```
`package innerclassDemo;
//靜態內部類別
class StaticDemo{

static class Innerstaticclass{//靜態內部類別是已經被配置在GloBal的
	public void aMethod() {
		System.out.println("aMethod!");
	}
	public static void bMethod() {
		System.out.println("bMethod!");
	}
}

}

public class innerclassDemo4 {

	public static void main(String[] args) {

		StaticDemo.Innerstaticclass t =new StaticDemo.Innerstaticclass();
		t.aMethod();
		t.bMethod();
		StaticDemo.Innerstaticclass.bMethod();//靜態內部內別的完整呼叫方式

	}

}
`
```
