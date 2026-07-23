---
title: Java(基礎)-泛型(Generic)
description: "泛型，即「參數化型態」。一提到參數，最熟悉的就是定義方法時形式參數(formal parameter, par [&hellip;]"
pubDate: 2019-10-30
topic: software
wpId: 3570
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/30/java%e5%9f%ba%e7%a4%8e-%e6%b3%9b%e5%9e%8bgeneric/"
---

泛型，即「參數化型態」。
一提到參數，最熟悉的就是定義方法時形式參數(formal parameter, parameter, 參數)，然後調用此方法時傳遞實際參數(actual parameter, arguments, 引數)。
那麼參數化型態怎麼理解呢？顧名思義，就是將型態由原來具體的型態參數化，類似於方法中的變數參數，此時型態也定義成形式參數（可以稱之為形式型態參數），然後在使用/調用時傳入具體的型態（實際型態參數）。

泛型的本質是為了參數化型態（在不創建新型態的情況下，通過泛型指定的不同型態來控制形式參數具體限制的型態）。
也就是說在泛型使用過程中，操作的數據型態被指定為一個參數，這種參數型態可以用在類別、介面和方法中，分別被稱為泛型類別(Generic Class)、泛型介面(Generic Interface)、泛型方法(Generic Method)。

泛型類別(Generic Class)

在 JAVA 中的泛型相似於 C++ 中的樣板(Template)，我們同樣使用尖括號(angle brackets)「<>」來指定參數型態

// 建立一個泛型物件的實例
 BaseType obj = new BaseType();

注意：在參數型態中，我們不能使用基礎型態，如
   「int」`「char」、「double」等。

 泛型使用實例

```
`package test5;

public class Point<T> {
	T x;
	T y;
	
	public T getX() {
		return x;
	}

	public void setX(T x) {
		this.x = x;
	}

	public T getY() {
		return y;
	}

	public void setY(T y) {
		this.y = y;
	}
}`
```

Java Bean

```
`package test5;

public class Person {
	private String name;
	private Integer age;
	private String gender;
	private String hobe;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getHobe() {
		return hobe;
	}
	public void setHobe(String hobe) {
		this.hobe = hobe;
	}
}
`
```

主程序

用junit4 來做整個主程式

```
`package test5;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public class TestBean {
	Person person = null;
	Point<String> point = null;
	Point<Integer> pointInt=null;
	
	@Before
	public void setUp() throws Exception {
		person = new Person();
		person.setName("phillips");
		person.setAge(40);
		person.setGender("M");
		person.setHobe("music");
	}

	@Before
	public void setUp1() throws Exception {
		point = new Point<String>();
		point.setX("hellow");
	}
	
	@Before
	public void setUp2() throws Exception {
		pointInt = new Point<Integer>();
		pointInt.setX(100);
	}
	
	@Test
	public void test() {
		System.out.println(person.getName());
		System.out.println(person.getAge());
		System.out.println(person.getGender());
		System.out.println(person.getHobe());
	}

	@Test
	public void test1() {
		System.out.println("x:"+point.getX());
	}
	
	@Test
	public void test2() {
		System.out.println("x:"+pointInt.getX());
	}
	
	
	@After
	public void tearDown() throws Exception {
	}
}
`
```

輸出結果

```
`phillips
40
M
music
x:hellow
x:100
`
```

定義泛型：Point<T>

首先，大家可以看到 Point<T>，即在類名後面加一個尖括號，括號裡是一個大寫字母。這裡寫的是 T，其實這個字母可以是任何大寫字母，大家這裡先記著，可以是任何大寫字母，意義是相同的。

泛型類別中使用泛型

這個 T 表示繼承自 Object 類的任何類別，比如 String、Integer、Double 等等。這裡要注意的是，T 一定是繼承於 Object 類別的。為方便起見，大家可以在這裡把 T 當成 String，即 String 在類別中怎麼用，那 T 在類別中就可以怎麼用！所以下方的：定義變數、作為返回值、作為參數傳入的定義就很容易理解了。

// 定義變數
 private T x;

// 作為返回值
 public T getX(){
   return x;
 }

// 作為參數傳入
 public void setX(T x){
   this.x = x;
 }

外部類別使用泛型類別

下方為泛型類別的用法：

//IntegerPoint使用
 Point p1 = new Point();
 p1.setX(new Integer(100));
 System.out.println(p1.getX());

 //FloatPoint使用
 Point p2 = new Point();
 p2.setX(new Float(100.12f));
 System.out.println(p2.getX());

首先，是建立一個實例。

這裡與普通建立物件實例的不同之點在於，普通建立物件實例是這樣的：Point p = new Point();

但，因為我們構造類別時，是這樣寫的 class Point，所以在使用的時候也要在 Point 後加上型態來定義 T 代表的意義。建立物件實例如下：

//IntegerPoint使用
 Point p1 = new Point();

 //FloatPoint使用
 Point p2 = new Point();

尖括號中，你傳進去的是什麼，T 就代表什麼型態。
這就是泛型的最大作用，我們只需要考慮邏輯實現，就能拿給各種類別來使用。

總結

使用泛型的優勢有「不用強制轉型」和「使用型態不對時，在編譯時期會報錯」。

使用型態參數時，使用有意義的字母可提高可讀性。

可使用「限制泛型可用型態(T extends someClass)」規範可使用的物件實例型態，排除不需要的型態。

可在宣告物件變數時使用「型態通配字元(?)」，方便切換不同泛型物件實例；但會有一些副作用。

參考來源： [https://ethan-imagination.blogspot.com/2018/11/javase-gettingstarted-017.html](https://ethan-imagination.blogspot.com/2018/11/javase-gettingstarted-017.html)
