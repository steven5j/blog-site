---
title: Java(Thread)-優先權(Priority)控制
description: "每個執行緒都有一個優先順序，高優先順序執行緒的執行優先於低優先順序執行緒。（優先並不代表”優先執行 [&hellip;]"
pubDate: 2019-10-15
topic: software
wpId: 3368
slug: javathread-priority-3368
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/15/javathread-%e5%84%aa%e5%85%88%e6%ac%8apriority%e6%8e%a7%e5%88%b6/"
---

每個執行緒都有一個優先順序，高優先順序執行緒的執行優先於低優先順序執行緒。（優先並不代表”優先執行順序”）

在一個執行緒中開啟另外一個新執行緒，則新開執行緒稱為該執行緒的子執行緒，子執行緒初始優先順序與父執行緒相同

Java執行緒的優先順序是一個整數 (數字越大優先順序越高) 其取值範圍是 1 （Thread.MIN_PRIORITY ） – 10 （Thread.MAX_PRIORITY ）

新建執行緒的預設優先順序是 NORM_PRIORITY = 5

```
`package ThreadDemo;

class MyThread3 implements Runnable {
	int x; // 宣告x

	MyThread3(int x) {// 建構元
		this.x = x;
	}

	public void run() {// Runnable 介面(interfce)，有抽象函數 run()，因此我們需要定義 run()
		for (int i = 1; i <= x; i++) {
			System.out.println(Thread.currentThread().getName() + "=" + i);// currentThread是Thread內部類(class)：獲得當前線程的
		}
	}
}

public class ThreadPriorityDemo {

	public static void main(String[] args) {
		MyThread3 t= new MyThread3(3);
		Thread t1 = new Thread(new MyThread3(2),"執行緒-A");
		Thread t2 = new Thread(new MyThread3(3),"執行緒-B");
		//setPriority() 用來設定優先順序
//		getPriority() 用來取得順序之值
		t1.currentThread().setName("Top");
		t1.currentThread().setPriority(1);//1~10 預設是5 數字越小，優先順序越低
		
		t2.currentThread().setName("Second");
		t2.currentThread().setPriority(10);//1~10 預設是5 數字越大，優先順序越高
		
		
		t1.start();
		t2.start();
		
		System.out.println("Thread1 ="+t1.currentThread().getName());
		System.out.println("Thread2 ="+t2.currentThread().getName());
	
		int count=Thread.activeCount();//當前活動中的Thread執行續數量
		System.out.println("Thread Active 激活中的執行續數量 ="+count);
		
	}

}
`
```

輸出 狀況：

↓  可以看出 並沒有按照理想的順序執行  上面的程式碼並沒有什麼卵用…

```
`Thread1 =Second
Thread2 =Second
執行緒-A=1
執行緒-B=1
執行緒-A=2
Thread Active 激活中的執行續數量 =3
執行緒-B=2
執行緒-B=3`
```

執行緒的優先順序仍然無法保障執行緒的執行次序。

只不過，優先順序高的執行緒獲取CPU資源的概率較大，優先順序低的並非沒機會執行。

如果CPU有空閒，即使是低優先順序的執行緒，也可以得到足夠的執行時間，接近滿負荷執行。
如果CPU比較繁忙，優先順序的作用就體現出來了，優先順序高的執行緒能得到比較多的執行時間，優先順序比較低的執行緒也能得到一些執行時間，但會少一些；CPU越繁忙，差異通常越明顯。
