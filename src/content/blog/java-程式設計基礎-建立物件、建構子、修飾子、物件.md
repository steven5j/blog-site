---
title: Java 程式設計(基礎)-建立物件、建構子、修飾子、物件封裝、非靜態變數 商品比價作品
description: "商品比價 java08檔案，主要進入點的檔案來呼叫Product物件 建立另外一個物件的java檔案 叫Pro [&hellip;]"
pubDate: 2019-09-29
topic: software
wpId: 910
slug: java-910
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/09/29/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-%e5%bb%ba%e7%ab%8b%e7%89%a9%e4%bb%b6%e3%80%81%e5%bb%ba%e6%a7%8b%e5%ad%90%e3%80%81%e4%bf%ae%e9%a3%be%e5%ad%90%e3%80%81%e7%89%a9%e4%bb%b6/"
---

商品比價 java08檔案，主要進入點的檔案來呼叫Product物件

```
`//商品比價
public class java08 {
//進入點
	public static void main(String[] args) {
		//建構商品物件
		Product aa = new Product();
		Product bb = new Product();
		Product cc = new Product();
		
		//建構商品資訊
		aa.name = "Milk";
		aa.originalprice = 50;
		aa.discount(9.0f);

		bb.name = "Cookie";
		bb.originalprice = 35;
		bb.discount(5.3f);
		
		cc.name = "Eag";
		cc.originalprice = 20;
		cc.discount(4.1f);
		
		//印出商品物件資訊
		aa.print();
		bb.print();
		cc.print();
		
		//比較商品物件價格便宜度並印出
		if(aa.endprice() < bb.endprice() && aa.endprice() < cc.endprice()) {
			System.out.println("["+aa.name+"] is cheapest!");
		}
		else if(bb.endprice() < aa.endprice() && bb.endprice() < cc.endprice()) {
			System.out.println("["+bb.name+"] is cheapest");
		}
		else if(cc.endprice() < aa.endprice() && cc.endprice() < bb.endprice()) {
			System.out.println("["+cc.name+"] is cheapest");
		}
		else  {
			System.out.println("Not cheapest");
		}
	}

}
`
```

建立另外一個物件的java檔案 叫Product

```
`//物件Product
public class Product {
	public String name;// 修飾子為public 的非靜態變數成員 型態為String 的name
	public int originalprice; // 修飾子為public 的非靜態變數成員 型態為int 的price
	private float discount;// 修飾子為private 的非靜態變數成員 型態為 float的discount

	public Product() { //這個class的建構子
		discount=10;//預設的折扣值
		originalprice = 0;//預設的價位
		name="???";//預設的商品名子
	}
	public void discount(float i) { //如果對方輸入不恰當的折扣數字 則會提醒說這是錯誤的折扣數字。並用預設的值去處理使用!
		if(i> 0 && i<10) {
			discount = i;
		}
		else {
			System.out.println("Invalid discount!");
		}
	}
	public void print() {//列印出商品資訊的方法method
		System.out.println("name：" + name + " ,price：" + originalprice + " ,折數:" + discount + " ,打折後價格"
				+ endprice()+"元");
	}
	public int endprice() { //物件封裝-計算打折後的價格
		return (int)(originalprice * (discount/10.0f));
	}
}
`
```
