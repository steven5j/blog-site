---
title: Java 程式設計(基礎)-物件類別Enum的方式
description: "一般的方式 ->輸入1,2,3->得知向左轉向右轉 使用的自創物件ActionConstants [&hellip;]"
pubDate: 2019-09-30
topic: software
wpId: 917
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/09/30/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-switch-enum%e7%9a%84%e6%96%b9%e5%bc%8f/"
---

一般的方式 ->輸入1,2,3->得知向左轉向右轉

```
`import java.util.Scanner;
public class SwitchEnum {
	public static void main(String[] args) {

		System.out.println("請輸入數字1 , 2 , 3：");
		int num = new Scanner(System.in).nextInt();

		switch (num) {
			case ActionConstants.TURN_LEFT:
				System.out.println("向左轉");
				break;
			case ActionConstants.TURN_RIGHT:
				System.out.println("向右轉");
				break;
			case ActionConstants.SHOT:
				System.out.println("射擊");
				break;
		}
	}`
```

使用的自創物件ActionConstants

```
`
public class ActionConstants {
	    public static final int TURN_LEFT = 1; 
	    public static final int TURN_RIGHT = 2; 
	    public static final int SHOT = 3; 
	
}
`
```

利用Enum這種簡化的方式枚舉物件代表值，導入Enum的類別進來

```
`import java.util.Scanner;

public class SwitchEnum2 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println("請輸入數字1 , 2 , 3：");
		int num = new Scanner(System.in).nextInt();

		ActionSwitch(Action.TURN_LEFT);
		ActionSwitch(Action.TURN_RIGHT);
		ActionSwitch(Action.SHOT);
	}
	private static void ActionSwitch(Action num) {
		switch (num) {
		case TURN_LEFT:
			System.out.println("向左轉");
			break;
		case TURN_RIGHT:
			System.out.println("向右轉");
			break;
		case SHOT:
			System.out.println("射擊");
			break;
	}`
```

自創物件Enum這個類別的來使用 跟一般class不一樣

```
`public enum Action {
	TURN_LEFT,TURN_RIGHT,SHOT;
}`
```
