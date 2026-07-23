---
title: Java 程式設計(基礎)-重載建構子和方法 overloading
description: "重載建構子和方法 overloading 第一個有進入點的檔案 命名為overload.java 物件的jav [&hellip;]"
pubDate: 2019-10-01
topic: software
wpId: 926
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/01/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-%e9%87%8d%e8%bc%89%e5%bb%ba%e6%a7%8b%e5%ad%90%e5%92%8c%e6%96%b9%e6%b3%95-overloading/"
---

重載建構子和方法 overloading

第一個有進入點的檔案 命名為overload.java 

```
`//重載建構子和方法
public class overload {

	public static void main(String[] args) {

		Long aaa   = 10l;
		Float aaa2 = 99.1f;
		String aaa3= "166";
		
		
		overload2 bbb = new overload2(aaa);//把參數放入建構子，它會自動匹配
		
		//overload2的方法方式來做重載
//		bbb.set(aaa);
//		bbb.set(aaa2);
//		bbb.set(aaa3);
		
		bbb.print();
		
		
	}

}
`
```

物件的java檔 命名為overload2

```
`
public class overload2 {

	private long number;
	
	//當進入點main使用到overload2的建構子的時候，依照他的參數 java自動媒合使用到相對應的方法
	public overload2(int num) {
		number = num;
	}
	public overload2(float num) {
		number =(long)num;
	}
	public overload2(String num) {
		number =Long.valueOf(num); //字串轉long java自帶的方法
	}
	
	
	
	//當進入點main使用到set的方法的時候，依照他的參數 java自動媒合使用到相對應的方法
	public void set(int num) {
		number = num;
	}
	public void set(float num) {
		number =(long)num;
	}
	public void set(String num) {
		number =Long.valueOf(num); //字串轉long java自帶的方法
	}
	
	
	public void print() {
		System.out.println("Input number："+number);//列印出來
	}
}
`
```
