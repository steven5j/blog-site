---
title: Java 程式設計(職場)-Java的記錄檔記錄工具Log4j-Logger
description: "簡介 : Log4j 是一套開放源碼的工具,方便編程人員在程式中加入 log 機制,並輸出到各種目標上。Log [&hellip;]"
pubDate: 2019-10-12
topic: software
wpId: 3322
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/12/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e8%81%b7%e5%a0%b4-java%e7%9a%84%e8%a8%98%e9%8c%84%e6%aa%94%e8%a8%98%e9%8c%84%e5%b7%a5%e5%85%b7log4j-logger/"
---

簡介 :

Log4j 是一套開放源碼的工具,方便編程人員在程式中加入 log 機制,並輸出到各種目標上。
Log4j 能夠透過外部的設定檔(properites 或 XML)進行設定。
Log4j 能夠將 log message 寫到 console, 檔案,串流,TCP 協定的伺服器, Unix Syslog daemon 等。
Log4j 具有 5 種 log 層級(DEBUG, INFO, WARN, ERROR, FATAL),可用於不同的系統狀態下所產生的訊息。

組成 Log4j 的三大元件 :

Logger – 由編程人員在程式中使用,進行 logging 的元件
Appender – 負責將 log message 輸出到各種裝置上
Layout – 決定 log message 的格式

Logger :

Logger 可以被指派等級。能夠指派給 Logger 的等級有 : DEBUG, INFO, WARN, ERROR, FATAL 5 種,定義在 org.apache.log4j.Level 類別中。這 5 種等級的高低順序為 FATAL > ERROR > WARN > INFO > DEBUG。

設定安裝

需要安裝log4j工具lib/log4j-*-*.**.jar

然後編輯設定檔resoures/log4j.properties

![](https://lh3.googleusercontent.com/GYv8uqhGCRfD_6j5j-waC4Fn2cSH7Xn903WkZ3v0q_IM7X4l_vBolpKAWc13fvwkjHc-c2YgDG0IhgexsyAwnbHPOQ_Y536FzjBX9mkM7cgLdLdPxiPHXQmD5s1FgQRAaYv2LSkPwTb8WtLmH_Y9ojIuUq-04kAeeMpHmcKoUqODTSHtvKteHd0dKF-ZpREutyRkT_ssejCfNYeiZLf5HH8Pv5nxV0f0nBaWUFQ_upzunhBD87xCa8gAMeDtjahEivJ4dJtx_P53cTsCdHoz1vI-qPKGX9LDc6aJmcUAQ-dUpbrrOpJr1RgfwqmJV55hxgiOaB9jrZa380K8GjGaKZpbgTW2pqrTV1kPKmIAkrfrd47avWT1IYZS0ObMvlkJHWLpZR3CSJxS0Wo_pnxIktkrvWPCnV5OG0F27Ifhiqmk60N2x6Grzy622YoDnVoywPxIr0m7m0gMKAzY4DmCegErjB7a11SeoVHFwCBldm4ObnZamOMBrSzos81dyezvk-2QLgQNueqMG9vrYv2NfbiefDeplkNb8yCacneweWjKX-ST6ENMTeZ_USeWuf1fGz8nJuNyLi_-n41vJ2ffOlONlttvWk1nvhncqKxvm4g5nREAoW-Ipky5XnADfLMp9o_8pjkoxhXaJdroq6OV1lk95j5bQ0NwcflLTAm50skChlPnp7V9pAQiKhHiC7x_6uV8ccUWYU4KGekmTiVZUr0Ro0DYLgBR0HVApz9EGm4dN2E=w1605-h903-no)

設定檔 log4j.properties 簡單設定

這 5 種等級的高低順序為 FATAL > ERROR > WARN > INFO > DEBUG。

```
`#FATAL > ERROR > WARN > INFO > DEBUG
log4j.rootLogger=debug, console, logfile
#console is set to be a ConsoleAppender
log4j.appender.console=org.apache.log4j.ConsoleAppender
log4j.appender.console.layout=org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=%d %-5p %l - %m%n
log4j.appender.console.encoding=UTF-8
#logfile is set to be a file
log4j.appender.logfile=org.apache.log4j.RollingFileAppender
log4j.appender.logfile.layout=org.apache.log4j.PatternLayout
log4j.appender.logfile.layout.ConversionPattern=%d{MM-dd HH:mm:ss} %-5p %l - %m%n
log4j.appender.logfile.File=D:/log/log.txt
log4j.appender.logfile.MaxFileSize=3MB
log4j.appender.logfile.MaxBackupIndex=5
log4j.appender.logfile.encoding=UTF-8

log4j.logger.org.apache.commons=INFO
log4j.logger.org.apache.jasper=INFO
log4j.logger.org.apache.catalina=INFO`
```

![](https://lh3.googleusercontent.com/wzendCQEm9KFrzNZXTeHTnLIgz_EtHM6P9gr3qudLtXzUTWtj8LNVg9aFvVKKx4Zdo3EdguS7UF6pHpBRliyVKP-uTZFbmAHUIR20fYdD_E2tI11il7u8r52-HjavSapu7jj2SvGMJ6QlTZ8z0VeYf8ive2VY5JpapBfqnhBn3_UP__8aScVo4i2pPiiB4wHJXtwQjCDKRBDye_dYWRCU_8UMuHlVp99qPwsaaD1_YdXpTcqScE9gFQRbWoBpyltpCFZWSfZqbQZ7Klag1tvQn11ucTy46h64OHB0SOGM28TTnXMgHJ_rYBM8yWO83mqxdFrfV434Hx6AmwAch8B_XMtGupKrk-t6QDzn-HZTn-UIsqwBg_yPchwasCjjNWno54FtfY0P6en4XI6DRO84mcCaPB8wvfFEF5ix_PxtyHfaJK9yyqeGVRQr0AofWbJAg1hfs9NX8rMjpIWZlEU7lctkpiGcWY7JE6XcgAo70rv-8W-dabdgwvuT62eBkEnAq-LGCVZJwIy8T2tIpzDsIwU1Uw-m7JjUp64euBoU6uZ8APR1Rt5BVPZ2SJg-KSeNpOZH6_SHLn4p7-4eB7wsRHDSnqGi87H-lS86hhR2SrTgNv0bN8ioEGW2VqwK0NF07IefNayneW7rsBmk_h0ATWHe7DTKBLpZTZbtzvp4NhXuK6joRIUwUaPEhI2n6XsENaHZq9T9nFk3OzKkT_KBbK9UC-NSvOjEC4PKzVzvDqJp6k=w1605-h903-no)

Log4j使用實例

```
`package test2;
//log4j之使用

//Logger 跟 system.out 相似，但是logger可以把它再設定那邊設定成自己想要的路徑上去存起來
//import java.util.logging.Logger; //這是原本內建的logger，但是相較於log4j比較陽春一點

import org.apache.log4j.Logger;

public class TestA {
	private static Logger logger = Logger.getLogger("test1.class");

	public static void main(String[] args) {
		// logger 有順序性，有層級的方式error最嚴重，info其次,debug則可有可無，開發人在用，
		//	log4j的設定檔的第一行可以調整成ERROR(指顯示error的) WARN(顯示error和warn) INFO(顯示error和warn和info) DEBUG(都顯示)
		//這 5 種等級的高低順序為 FATAL > ERROR > WARN > INFO > DEBUG
		logger.fatal("FATAL");// 層級1 FATAL的動作
		logger.error("error");// 層級2 error的動作
		logger.warn("warn");// 層級3 warn的動作
		logger.info("info");// 層級4 info 類似做show的動作
		logger.debug("debug");// 層級5 做debug的動作

		//丟入變數測試
		String aa="good";
		logger.info("info:"+aa);//
	}

}`
```
