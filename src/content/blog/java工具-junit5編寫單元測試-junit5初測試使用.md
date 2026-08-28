---
title: Java工具-Junit5編寫單元測試-jUnit5初測試使用
description: "JUnit是Java中使用最廣泛的測試框架，之前Java8發布了最引人注目的lambda表達式，整個Java的 [&hellip;]"
pubDate: 2019-10-10
topic: software
wpId: 3311
slug: java-junit5-junit5-3311
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/10/java%e5%b7%a5%e5%85%b7-junit5%e7%b7%a8%e5%af%ab%e5%96%ae%e5%85%83%e6%b8%ac%e8%a9%a6-junit5%e5%88%9d%e6%b8%ac%e8%a9%a6%e4%bd%bf%e7%94%a8/"
---

JUnit是Java中使用最廣泛的測試框架，之前Java8發布了最引人注目的lambda表達式，整個Java的編碼風格發生巨大的變化，JUnit5主要在希望能夠適應Java8風格的編碼以及相關工程，這就是為什麼建議在Java8之後的項目中使用JUnit5來創建和執行測試。 

```
`//jUnit5初測試使用

package test2;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.Before;
//載入junit的物件method
import org.junit.FixMethodOrder;
import org.junit.Ignore;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.DEFAULT) // 讓junit依照順序 default(預設)去執行
class Test1 {
	
	@BeforeEach //junit5開始 改成BeforeEach  原本是before
	void start() {
		System.out.println("載入Before");
		
		String m_id = "a1111";
		String m_name = "steven";
		
		System.out.println(m_id+m_name);
	}
	
	@Test
	void test1() {
		System.out.println("載入第一個junit test");

		// assertEquals("aaa", "aaa11");//在junit裡面 用來對比兩個值 這邊會出錯 等於以下舉例
		// eg.
		// str1="aaa";
		// str2="aaa11";
		
		// System.out.println(str1.equal(atr2));
//		String str4 = "aaa";
//		assertTrue("aaa".equals(str4)); // 兩個比較是否為true
//
//		String str3 = null;
//		assertNotNull(str3);// 不能是null 主要用來防止null產生
	}

	@Test
	void test2() {
		System.out.println("載入第二個junit test");
	}

	@Ignore("尚未完成") // 這個單元 略過 不出現 大部分用在這個單元還未製作好的時候
	void test3() {
		System.out.println("hello3");
	}
	
	
	@AfterEach
	void end() {
		System.out.println("end");
	}
}
`
```
