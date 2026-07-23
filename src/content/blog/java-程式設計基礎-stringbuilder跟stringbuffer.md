---
title: Java 程式設計(基礎)-StringBuilder跟StringBuffer
description: "[fusion_builder_container hundred_percent=”no&#82 [&hellip;]"
pubDate: 2019-10-03
topic: software
wpId: 3208
legacyUrl: "https://wordpress-1652732-6572997.cloudwaysapps.com/2019/10/03/java-%e7%a8%8b%e5%bc%8f%e8%a8%ad%e8%a8%88%e5%9f%ba%e7%a4%8e-stringbuilder%e8%b7%9fstringbuffer/"
---

[fusion_builder_container hundred_percent=”no” equal_height_columns=”no” menu_anchor=”” hide_on_mobile=”small-visibility,medium-visibility,large-visibility” class=”” id=”” background_color=”#f8f9fa” background_image=”” background_position=”center center” background_repeat=”no-repeat” fade=”no” background_parallax=”none” parallax_speed=”0.3″ video_mp4=”” video_webm=”” video_ogv=”” video_url=”” video_aspect_ratio=”16:9″ video_loop=”yes” video_mute=”yes” overlay_color=”” video_preview_image=”” border_size=”” border_color=”” border_style=”solid” padding_top=”” padding_bottom=”” padding_left=”” padding_right=””][fusion_builder_row][fusion_builder_column type=”1_1″ type=”1_1″ background_position=”left top” background_color=”” border_size=”” border_color=”” border_style=”solid” border_position=”all” spacing=”yes” background_image=”” background_repeat=”no-repeat” padding_top=”” padding_right=”” padding_bottom=”” padding_left=”” margin_top=”0px” margin_bottom=”0px” class=”” id=”” animation_type=”” animation_speed=”0.3″ animation_direction=”left” hide_on_mobile=”small-visibility,medium-visibility,large-visibility” center_content=”no” last=”true” min_height=”” hover_type=”none” link=”” first=”true”][fusion_text]


class主要是在字串串接很多字的時候，String字串池的關係會生出很多字串物件


StringBuilder跟StringBuffer




 



 

 

```
`
//這兩個class主要是在字串串接很多字的時候，
//由於String字串池的關係會生出很多字串物件，
//為了節省記憶體就會使用使用StringBuilder跟StringBuffer
//
//StringBuilder跟StringBuffer的方法幾乎一模一樣
//append() ：這個方法是將字串接在字串的最後方
//insert()：這個方法可以將字串接在你指定的位置
//indexOf()：這個方法是尋找某個字串在現在這段字的哪個位置，可以拿來搭配insert使用
//reverse()：可以將整個字串反轉順序，雖然我幾乎用不到
//toString()：就是將串好的字轉成字串輸出
//length()：現有的字串長度
public class StringbuilderDemo {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		  StringBuilder sb = new StringBuilder();

		  sb.append("This is ")
		  .append("a star");//專業術語叫做 chain(鍊) 起來 

		  System.out.println(sb.toString());//This is a star

		  System.out.println(sb.length());//14

		  System.out.println(sb.indexOf("star"));//10

		  sb.insert(sb.indexOf("star"), "new ");//找到star文字，然後在它前面載入new

		  System.out.println(sb.toString());//This is a new star

		  System.out.println(sb.reverse().toString());//rats wen a si sihT  //翻轉文字自序
		
		
	}

}
`
```

[/fusion_text][/fusion_builder_column][/fusion_builder_row][/fusion_builder_container]
