---
title: Java(概念)-Java Bean基本概念及使用
description: "JavaBeans是Java中一種特殊的類，可以將多個對象封裝到一個對象（bean）中。特點是可序列化，提供無 [&hellip;]"
pubDate: 2019-10-30
topic: software
wpId: 3558
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/30/java%e6%a6%82%e5%bf%b5-java-bean%e5%9f%ba%e6%9c%ac%e6%a6%82%e5%bf%b5%e5%8f%8a%e4%bd%bf%e7%94%a8/"
---

![](https://lh3.googleusercontent.com/tEL4sFBle73uCotwzkArtqWHopm6f5VmvWc-JFco9FsuKMsZGWNt4ZxZOvSmdx5i7Rf4_fBgsg6p7QRNnlNqEbfQTnsdKpkK-_gSKW71uAXi2bPs8zBO_R9JlyIC1R3IEqelpIVHgjgTJcICqYJ4thTG-LfDqcOxRE397xqLAeKpy60vBGFxz9J_OykagSkAx66fOa64_oYiGGk5HTbAD2H0pEDarioC5u7TTIafq5PmrqY6k9hY5wYRKWjzRpXELlknWcT_SwlitC1VHcBenfDIUNJCbMN-bxlHYKMr7I2j08stZRz3PhKiVjk2qc7zyaRi6EChQ6vbXeeJQkcww-i6k_vGMhjWy_qGydyJ3_XZwpbtXV10dwrs5luGogtzJJyastIGMabht19uKDsvoGWwbAAWJLIc4_M0UQYAMvQ60Scx5mBrJhTv9laQHVZMfVRB1Je0uYFCwkZ8sXVl4gS8YkvgiCBx_ReRuvTqDoOvBWbWqRquv5BU0OLTRmp3_YslWefIHKnXFWcQP8bIRjIE1e_UIkKX1OaMWbr4ot4wgLwwFkWNDMA4XOXB9RN3Yq6FMfzfdebQmQ0hmQ9Jyq4PpCuSRco1I0CBLi-ZxJqErPOXnaLOf3v2x-61Kokp7YBj89jmTRsYy73JbCFzJdvc3ZW99XZsDhSpkMKJIF8Xq9TM8yh2GlC0GNreFJJeCf07I0cQ9TSbOQzBI4YUDJh1lh19d425DBKgmEWO0d2yUNw3=w410-h243-no)

JavaBeans是Java中一種特殊的類，可以將多個對象封裝到一個對象（bean）中。
特點是可序列化，提供無參建構元，提供getter方法和setter方法訪問對象的屬性。
名稱中的「Bean」是用於Java的可重用軟體組件的慣用叫法。

程式設計師想在程序中實現一些面向對象編程的常見需求，只能手寫大量膠水代碼。
而Java bean就是編寫這套膠水代碼的慣用模式或約定。
當類遵守了這些約定時就可以用於若干工具或庫，這些約定包括getXxx、setXxx、isXxx、addXxxListener、XxxEvent等。

JavaBean  : 可重用的元件，在jsp程式中常用來封裝業務邏輯和資料庫操作的物件。
JavaBean 實際上就是一個java類，一般需要滿足以下要求：
   《1》是一個公有類，並提供無參的公有的構造方法
   《2》屬性私有
   《3》具有公有的get和set方法

練習實例：

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

JavaBean就是一個中轉載體。這就是所謂的增刪改查。

最多就是，我們根據業務需求，通過寫Java代碼，來進行一些邏輯的控制，一般來說就是：

數據不是想增就能增。數據不是想刪就能刪。數據不是想改就能改。數據不是想查就能查。
而是對於整個專案或網站來說要先查個權限，設定個判斷，做一層過濾..等。

參考資源：[https://www.jianshu.com/p/6fb9c075d239](https://www.jianshu.com/p/6fb9c075d239)
