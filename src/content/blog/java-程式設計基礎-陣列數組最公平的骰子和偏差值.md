---
title: "Java 程式設計(基礎)-陣列(數組):最公平的骰子和偏差值"
description: "用JAVA製作陣列(數組): 最公平的骰子和偏差值"
pubDate: 2019-09-28
topic: software
wpId: 906
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/09/28/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-%e9%99%a3%e5%88%97%e6%95%b8%e7%b5%84%e6%9c%80%e5%85%ac%e5%b9%b3%e7%9a%84%e9%aa%b0%e5%ad%90%e5%92%8c%e5%81%8f%e5%b7%ae%e5%80%bc/"
---

用JAVA製作陣列(數組): 最公平的骰子和偏差值

```
`import java.util.Scanner;

//公平骰子並計算誤差
public class java06 {

	public static void main(String[] args) {
		int[] DiceConter = new int[6];
		Scanner scanner=new Scanner(System.in);
		
		System.out.print("請輸入骰子總共要投的次數：");
		int usetotal=scanner.nextInt();//讓使用者輸入要投的次數;
		
		float average = (float)usetotal/6.0f;
		
		for(int i=0 ; i<usetotal; i++) {
			int randomnum=(int) (Math.random()*5.9999999d);
			
			DiceConter[randomnum]+=1;
		}
		for(int i=0; i<6;i++) {
			System.out.println("骰子點數"+(i+1)+"="+DiceConter[i]+"次"+"   偏離值"+(((float)DiceConter[i]-average)/average)*100.0f+"%");
		}//列印出每個面的骰子 投出來的次數

//		System.out.println("骰子點數2="+DiceConter[1]+"次"+"   偏離值"+(((float)DiceConter[1]-average)/average)*100.0f+"%");
//		System.out.println("骰子點數3="+DiceConter[2]+"次"+"   偏離值"+(((float)DiceConter[2]-average)/average)*100.0f+"%");
//		System.out.println("骰子點數4="+DiceConter[3]+"次"+"   偏離值"+(((float)DiceConter[3]-average)/average)*100.0f+"%");
//		System.out.println("骰子點數5="+DiceConter[4]+"次"+"   偏離值"+(((float)DiceConter[4]-average)/average)*100.0f+"%");
//		System.out.println("骰子點數6="+DiceConter[5]+"次"+"   偏離值"+(((float)DiceConter[5]-average)/average)*100.0f+"%");
		
	}

}`
```
