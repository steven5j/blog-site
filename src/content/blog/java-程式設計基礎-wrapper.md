---
title: Java 程式設計(基礎)-Wrapper
description: "[fusion_builder_container hundred_percent=”no&#82 [&hellip;]"
pubDate: 2019-10-03
topic: software
wpId: 3210
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/03/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-wrapper/"
---

[fusion_builder_container hundred_percent=”no” equal_height_columns=”no” menu_anchor=”” hide_on_mobile=”small-visibility,medium-visibility,large-visibility” class=”” id=”” background_color=”#f8f9fa” background_image=”” background_position=”center center” background_repeat=”no-repeat” fade=”no” background_parallax=”none” parallax_speed=”0.3″ video_mp4=”” video_webm=”” video_ogv=”” video_url=”” video_aspect_ratio=”16:9″ video_loop=”yes” video_mute=”yes” overlay_color=”” video_preview_image=”” border_size=”” border_color=”” border_style=”solid” padding_top=”” padding_bottom=”” padding_left=”” padding_right=””][fusion_builder_row][fusion_builder_column type=”1_1″ type=”1_1″ background_position=”left top” background_color=”” border_size=”” border_color=”” border_style=”solid” border_position=”all” spacing=”yes” background_image=”” background_repeat=”no-repeat” padding_top=”” padding_right=”” padding_bottom=”” padding_left=”” margin_top=”0px” margin_bottom=”0px” class=”” id=”” animation_type=”” animation_speed=”0.3″ animation_direction=”left” hide_on_mobile=”small-visibility,medium-visibility,large-visibility” center_content=”no” last=”true” min_height=”” hover_type=”none” link=”” first=”true”][fusion_text]



```
`Wrapper詳細內容
http://www.codedata.com.tw/book/java-basic/index.php?p=ch8-1`
```


 

 





基本資料型態
Wrapper 類別



byte
java.lang.Byte



short
java.lang.Short



int
java.lang.Integer



long
java.lang.Long



float
java.lang.Float



double
java.lang.Double



char
java.lang.Character



boolean
java.lang.Boolean





```
`public class WrapperDemo {
	public static void main(String[] args) {

		//基本型態，首字大寫的話就是宣告的是物件型別的基本型態
		//基本型別，只能做強制轉型，物件型別則可以用軟性轉型
		
        Integer aa = new Integer(20);//Integer 是int的物件型態，物件型態就是要用new 來產生為主
        Double zzz= new Double(1.01);//Double 是double的物件型態，物件型態就是要用new 來產生為主
        

        System.out.print("原來的 int 值:");
        System.out.println(
                aa.intValue());//本來的int型態並列印出來
        
        System.out.print("double 型態:");
        System.out.println(
                aa.doubleValue());//轉換為Doule型態並列印出來
        
        float bb = aa.floatValue();//軟性轉換,較不會有錯誤顯示
        long cc = (long)aa;//硬性轉換，較容易有錯誤並顯示
        
        System.out.println(bb);//列印出來再java裡面 其實他是先轉換成字串
        System.out.println(cc);
	}
}`
```



[/fusion_text][/fusion_builder_column][/fusion_builder_row][/fusion_builder_container]
