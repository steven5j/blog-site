---
title: Java工具-Junit4編寫單元測試-jUnit4初測試使用
description: JUnit是一個Java語言的單元測試框架。
pubDate: 2019-10-12
topic: software
wpId: 3317
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/12/java%e5%b7%a5%e5%85%b7-junit4%e7%b7%a8%e5%af%ab%e5%96%ae%e5%85%83%e6%b8%ac%e8%a9%a6-junit4%e5%88%9d%e6%b8%ac%e8%a9%a6%e4%bd%bf%e7%94%a8/"
---

JUnit是一個Java語言的單元測試框架。

```
`package junit4test;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class test5 {
	String result;
	int score;
	
	@Before
	public void test1() throws Exception {
		score=66;
	}
	@Test
	public void test2() {
		
		if(score>=60) {
			result="合格";
		}
		else if(score<60){
			result="不合格";
		}
	}
	@After
	public void test3() {
		System.out.println(result);
	}

}
`
```
