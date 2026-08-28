---
title: Java (Thread)-Runnable實作
description: "Program, Process, Thread 的不同 用Java產生 Thread Java 的 Thre [&hellip;]"
pubDate: 2019-10-14
topic: software
wpId: 3356
slug: java-thread-runnable-3356
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/14/java-thread-runnable%e5%af%a6%e4%bd%9c/"
---

Program, Process, Thread 的不同

用Java產生 Thread

Java 的 Thread 被定義在 java.lang.Thread
Thread 的 Constructor 有兩種：

- Thread()

- Thread(Runnable)

Thread(Runnable)實作

若本身類別已經繼承了其他父類別，但又想繼承Thread類別，這時就會遇到Java無法多重繼承。

想到多重繼承就會想到介面，在［JAVA］多重繼承中提到：透過介面就能達到多重繼承。

Java提供了Runnable介面，有抽象函數run（）；因此我們只需要定義run（）即可。

```
`//實作Thread的runable介面

package ThreadDemo;

class MyThread1 implements Runnable {
	int x; // 宣告x

	MyThread1(int x) {// 建構元
		this.x = x;
	}

	public void run() {// Runnable 介面(interfce)，有抽象函數 run()，因此我們需要定義 run()
		for (int i = 1; i <= x; i++) {
			System.out.println(Thread.currentThread().getName() + "=" + i);// currentThread是Thread內部類(class)：獲得當前線程的
			// currentThread()是指獲取當前運行的線程對象
			// currentThread().getName()就是指獲取當前運行的線程的名稱
		}
	}
}

public class ThreadRunnableDemo {

	public static void main(String[] args) {
		Thread t1 = new Thread(new MyThread1(10), "執行續1");
		Thread t2 = new Thread(new MyThread1(5), "執行續2");

		t1.start();
		t2.start();
		//這兩個執行續沒有先後優先權，所以會同時執行，他們的執行順序就是電腦自己隨機的排序
	}

}
`
```

 輸出結果：

```
`執行續1=1
執行續1=2
執行續1=3
執行續2=1
執行續1=4
執行續1=5
執行續1=6
執行續2=2
執行續2=3
執行續2=4
執行續2=5
執行續1=7
執行續1=8
執行續1=9
執行續1=10
`
```

Ｑ：使用 Thread類別 還是 Runnable介面呢？
 Ａ：其實都可以，了解該類別是否有繼承其他類別。因為類別只能繼承一個類別。如果使用多執行緒的類別已經繼承其他類別，就必須實作。

參考資料：[https://kknews.cc/code/nekq2k3.html](https://kknews.cc/code/nekq2k3.html)
