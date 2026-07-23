---
title: "Java(Thread)-Program、Process 和 Thread其差別、單|多執行緒程式、Thread()應用extend的實作"
description: "Program, Process, Thread 的不同 Program(程式)： 還沒有被執行的程式，或是說 [&hellip;]"
pubDate: 2019-10-14
topic: software
wpId: 3350
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/14/javathread-program%e3%80%81process-%e5%92%8c-thread%e5%85%b6%e5%b7%ae%e5%88%a5%e3%80%81%e5%96%ae%e5%a4%9a%e5%9f%b7%e8%a1%8c%e7%b7%92%e7%a8%8b%e5%bc%8f%e3%80%81thread%e6%87%89%e7%94%a8extend/"
---

Program, Process, Thread 的不同 

Program(程式)：

還沒有被執行的程式，或是說可以驅動 / 命令電腦的指令集合，它可能是指令、可讀的程式碼、編譯過的位元碼 (bytecode) 或是機器碼。還尚未load入記憶體的 code，我們稱之為Program。可以想像成軟體開發者就如同建築師，要設計一座工廠，而這座工廠要如何建造、規劃的藍圖就是 Program。

相同 Program 的 Process 可以多個同時存在。

Process(程序)：

意旨已經執行並且 load 到記憶體中的 Program ，程序中的每一行程式碼隨時都有可能被CPU執行，所產生的執行個體，Program 被執行就會產生 Process，所以如果同時執行同一個 Program 十次，就會產生至少十個 Process。 

Process 是電腦中已執行 Program 的實體。
每一個 Process 是互相獨立的。
Process 本身不是基本執行單位，而是 Thread (執行緒)的容器。
Process 需要一些資源才能完成工作，如 CPU、記憶體、檔案以及I/O裝置。

Thread(執行緒 、線程  )：

 CPU 實際運算的部分。Process 是 Thread 的容器，在同一個 Process 中會有很多個 Thread ，每一個 Thread 負責某一項功能。Thread 就像是工廠內的工人，確保工廠的每項功能，並且共享工廠內的每一項資源。

同一個 Process 會同時存在多個 Thread。
同一個 Process 底下的 Thread 共享資源，如 記憶體、變數等，不同的Process 則否。
在多執行緒中(Multithreading)，兩個執行緒若同時存取或改變全域變數(Global Variable)，則可能發生同步(Synchronization)問題。若執行緒之間互搶資源，則可能產生死結(Deadlock)，

單|多執行續

單執行緒程式(single threading)

平常的程式如果沒有建其他 Thread 的話都是單執行緒，在 Java 中就是 main
 從 main 的頭開始跑，main 跑完了整個程式就結束，整個程式就只有 main 所在的那個 Thread，我們通常把 main 所在的那個 Thread 稱為 main thread

多執行緒程式(multithreading)

當你的程式有很多 thread 的時候，系統會把它排進一個 Queue(佇列)，然後每個 thread 就會排隊輪流執行
優先權高的優先執行，即使可能會執行比較久，優先權低的也會執行到，只是可能會一直被插隊

用Java產生 Thread

Java 的 Thread 被定義在 java.lang.Thread
Thread 的 Constructor 有兩種：

- Thread()

- Thread(Runnable)

 簡單Thread()使用

使用 class Thread 產生的 thread 物件，會從物件裡的 run() 開始執行，執行完了那個 thread 就結束，就像java的進入點 main() 一樣

```
`package ThreadDemo;

class MyThread extends Thread{
	@Override
	public void run() {
		System.out.println("In MyThread");
	}
}

public class ThreadDemo {
	//因為main是程式的進入點,main會優先整個執行完再去其他Thread執行
	public static void main(String[] args) {
		Thread t1=new MyThread();
		t1.start();//執行續Start
		System.out.println("In Main");//在main中的會先執行

	}

}
`
```

參考資料：  [https://blog.marksylee.com/2016/09/13/java-interview-01-program-process-thread/](https://blog.marksylee.com/2016/09/13/java-interview-01-program-process-thread/) 

參考資料：  [https://larry850806.github.io/2016/06/10/Java-Thread/](https://larry850806.github.io/2016/06/10/Java-Thread/) 

參考資料：   [https://medium.com/@totoroLiu/program-process-thread-%E5%B7%AE%E7%95%B0-4a360c7345e5](https://medium.com/@totoroLiu/program-process-thread-%E5%B7%AE%E7%95%B0-4a360c7345e5)
