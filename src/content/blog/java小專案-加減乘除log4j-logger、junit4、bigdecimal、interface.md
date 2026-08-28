---
title: Java小專案-加減乘除Log4j-Logger、Junit4、BigDecimal、interface
description: "主程式 承接interface 用implement實作 interface宣告的-加 interface宣告 [&hellip;]"
pubDate: 2019-10-12
topic: software
wpId: 3328
slug: java-log4j-logger-junit4-bigdecimal-interface-3328
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/12/java%e5%b0%8f%e5%b0%88%e6%a1%88-%e5%8a%a0%e6%b8%9b%e4%b9%98%e9%99%a4log4j-logger%e3%80%81junit4%e3%80%81bigdecimal%e3%80%81interface/"
---

主程式

```
`package test2;

import static org.junit.Assert.*;

import java.math.BigDecimal;
import java.util.InputMismatchException;
import java.util.Scanner;

import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import test2.service.implement1.impleMathCalculate;

public class TestMath {

	private static final Logger logger = Logger.getLogger(TestMath.class);
	impleMathCalculate mathcalculate = null;
	BigDecimal a = null;
	BigDecimal b = null;
	BigDecimal resultAdd = null;
	BigDecimal resultDiv = null;
	BigDecimal resultMulti = null;
	BigDecimal resultSub = null;

	@Before
	public void setUp() throws Exception {
		a = new BigDecimal("0");
		b = new BigDecimal("0");
		resultAdd = new BigDecimal("0");
		resultDiv = new BigDecimal("0");
		resultMulti = new BigDecimal("0");
		resultSub = new BigDecimal("0");
		
		
		Scanner scanner = new Scanner(System.in);
		logger.info("請輸入第一個數字:");
		checkValue(scanner, "1");

		logger.info("請輸入第二個數字:");
		checkValue(scanner, "2");

		mathcalculate = new impleMathCalculate();
	}

	private void checkValue(Scanner scanner, String flag) {

		try {
			if (flag.equals("1")) {
				a = scanner.nextBigDecimal();
			} else {
				b = scanner.nextBigDecimal();
			}

		} catch (InputMismatchException e) {
			logger.error("不得為文字!!");
		}
	}

	@Test
	public void test() {
		resultAdd = mathcalculate.Add(a, b);
		resultDiv = mathcalculate.Div(a, b);
		resultMulti = mathcalculate.Multi(a, b);
		resultSub = mathcalculate.Sub(a, b);
		
	}

	@After
	public void tearDown() throws Exception {
		logger.info(resultAdd);
		logger.info(resultDiv);
		logger.info(resultMulti);
		logger.info(resultSub);
	}

}
`
```

承接interface 用implement實作

```
`package test2.service.implement1;

import java.math.BigDecimal;

import test2.service.interface1.IAdd;
import test2.service.interface1.IDiv;
import test2.service.interface1.IMulti;
import test2.service.interface1.ISub;

public class impleMathCalculate implements IAdd, IDiv, IMulti, ISub {
	BigDecimal add	=	new BigDecimal("0.0");
	BigDecimal sub	=	new BigDecimal("0.0");
	BigDecimal multi=	new BigDecimal("0.0");
	BigDecimal div	=	new BigDecimal("0.0");
	
	@Override
	public BigDecimal Add(BigDecimal a, BigDecimal b) {
		this.add = a.add(b);
		return add;
	}
	@Override
	public BigDecimal Sub(BigDecimal a, BigDecimal b) {
		this.sub = a.subtract(b);
		return sub;
	}

	@Override
	public BigDecimal Multi(BigDecimal a, BigDecimal b) {
		this.multi = a.multiply(b);
		return multi;
	}

	@Override
	public BigDecimal Div(BigDecimal a, BigDecimal b) {
		this.div = a.divide(b);
		return div;
	}

}
`
```

interface宣告的-加

```
`package test2.service.interface1;

import java.math.BigDecimal;

public interface IAdd {
	public BigDecimal Add(BigDecimal a,BigDecimal b);
}
`
```

 interface宣告的-減

```
`package test2.service.interface1;

import java.math.BigDecimal;

public interface ISub {
	public BigDecimal Sub(BigDecimal a,BigDecimal b);
}

`
```

 interface宣告的-乘

```
`package test2.service.interface1;

import java.math.BigDecimal;

public interface IMulti {
	public BigDecimal Multi(BigDecimal a,BigDecimal b);
}
`
```

 interface宣告的-除

```
`package test2.service.interface1;

import java.math.BigDecimal;

public interface IDiv {
	public BigDecimal Div(BigDecimal a,BigDecimal b);
}`
```

檔案配置

![](https://lh3.googleusercontent.com/JbtGzh14gjnNGiFlxepmvtbWQvYzHH4qPEnpKbzFLr6B-FaSqdsCgJfLk4cT0kN4aRcwePYpQFC2ZKujaqWvMtZYjeZFPDvTy3IR0VKe-oMFu4gdT9I7k_-4Rxt7Ra5axSWZQfakfsU10GUPCW1ksFMlRp7Quga_V3NK-U3GYfVPEdVVNg1dJ4POr2yHyawzG3PuwMkAR9LWJRIC2lr5u3thIgIwVG8Fyn97P4KZntqssE_jnOFpURGLw3qY3U8V4rqu50W9cDJZw3xPvkzYA_DmPhMnRTcS0CwruOwfsMxwSZTtMnHbHOnD_HYzb8Qs0sqa9LQ5yv-r5UQWuUeIXobMM98nxRehyrfyntT8yWSw2SMnMZuq-cJeSp0A_EtYfvCOTRJGFPayt8iq5cFZkAjFrPyxkpf3NRVDGriTI5CdNl_Tr98P9_mciyNRF8WvHZ3Syy-ORK1zuEQPtbehQVtIZrYrw0ERfnYRJkVAJVOIn-sbpxeIAChooX5FegJA6P_FihhV9-_EoH71f1pmQf93YVLysVv4T9eq6v985Q-5Y1dIZHaFLQHeLlKqld6Cm8gqYNycrJdDpeDHWZWyK7__EeTE348Kw7Wokrg3nzQqOeLnmr25FcY7EEugj6PvTlBzgHMv-lcZFvWMqiX9y4zAJKboWkw5l-Y5drGP_UlxrjhFYi8HTb2b6UHAHU0-QlW-3A6zOuL4qw8WqYbD01cpQxB_W4OFNezodHeO0D1RZls=w1605-h903-no)

輸出情況

```
`2019-10-28 02:05:05,605 INFO  test2.TestMath.setUp(TestMath.java:38) - 請輸入第一個數字:
10
2019-10-28 02:05:09,402 INFO  test2.TestMath.setUp(TestMath.java:41) - 請輸入第二個數字:
10
2019-10-28 02:05:10,826 INFO  test2.TestMath.tearDown(TestMath.java:72) - 20
2019-10-28 02:05:10,826 INFO  test2.TestMath.tearDown(TestMath.java:73) - 1
2019-10-28 02:05:10,827 INFO  test2.TestMath.tearDown(TestMath.java:74) - 100
2019-10-28 02:05:10,827 INFO  test2.TestMath.tearDown(TestMath.java:75) - 0
`
```
