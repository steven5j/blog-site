---
title: Java 程式設計(基礎)-多載(Overload)、覆寫(Override)、多型(Polymorphism)
description: "多載(Overload)指在一個類別(class)中，定義多個名稱相同，但參數(Parameter)不同的方法 [&hellip;]"
pubDate: 2019-10-10
topic: software
wpId: 3308
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/10/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-%e5%a4%9a%e8%bc%89overload%e3%80%81%e8%a6%86%e5%af%aboverride%e3%80%81%e5%a4%9a%e5%9e%8bpolymorphism/"
---

多載(Overload)指在一個類別(class)中，定義多個名稱相同，但參數(Parameter)不同的方法(Method)。 

覆寫(Override)是指子類別可以覆寫父類別的方法內容，使該方法擁有不同於父類別的行為。

多型(Polymorphism)是指父類別可透過子類別衍伸成多種型態，而父類別為子類別的通用型態，再透過子類別可覆寫父類別的方法來達到多型的效果，也就是同樣的方法名稱會有多種行為。

```
`//創立物件名稱:circle，多載
public class Circle {
	   private double radius;
	   private String color;
	   
	   
	public Circle(){
		radius = 1.0d;
		color = "red";
	}
	public Circle(double d){
		radius = d;
		color = "red";
	}
	public Circle(double d,String r){
		radius = d;
		color = r;
	}
	public double getRadius() {
		      return radius;
		   }
	public String getColor() {
		      return color;
		   }
	public double getArea() {
		      return radius * radius * Math.PI;
		   }
	
}
`
```

```
`//呼叫circle 出來使用
public class TestCircle {

	public static void main(String[] args) {

		   double radius = 1000;
		   String color ="green";
		
		   Circle c = new Circle(radius,color);
		   System.out.println("Area:"+c.getArea());
		   System.out.println("Color:"+c.getColor());
		   System.out.println("Radius:"+c.getRadius());
		
	}

}`
```
