$(document).ready(function(){
		document.getElementById("Table").oncontextmenu = function(e){  //禁用浏览器右键
　　			return false;
		}
		flag = 0; //全局状态变量，判断收尾
		
		var dblans,ans; //计算数据
		//var select = {}; //存储选中的点的className
		var hang,lie,i,j,k;
		
		$('a').click(function(){
			$("#Form").hide();  //隐藏生成框
			hang = $('#input2').val(); //获取行列值 
			hang = Number(hang) + 1;
			lie = $('#input3').val(); 
			lie = Number(lie)+4;
			console.log("行数为："+hang+" ,列数为："+lie);
			
			for(i=0; i<hang; i++){ //生成表格
				$('table').append("<tr class='"+i+"'></tr>");
				for(j=0; j<lie; j++){
					if(j== 2 || j== 3){ // 2,3列特殊处理 用于显示数据
						$('tr:last').append("<td class='"+j+"'></td>");
						continue;
					}
					if(i%2==0){ //偶数行不加样式
						$('tr:last').append("<td class='"+j+"'></td>");
						continue;
					}
					if(j==0){ // 1列特殊处理 用于选择
						$('tr:last').append("<td class='"+j+"'><div class='endBtn'></div></td>");
						continue;
					}
					if(j==1){ // 1列特殊处理 用于选择
						$('tr:last').append("<td class='"+j+"'><div class='btn'></div></td>");
						continue;
					}
					$('tr:last').append("<td class='"+j+"'><div></div></td>");
				}
			} 
			
			for(j=4; j<lie; j++){ //输入数字
				$("tr:first td").eq(j).text(j-3);
			}
			//i=0; j=0; 清空i ,可以递增。
			
			$("tr:first td").first().text("收尾");  //当需要开始收尾时，点击即可
			$("tr:first td").eq(1).text("选择");
			$("tr:first td").eq(2).text("红"); //最后两行计算数字
			$("tr:first td").eq(3).text("黑");
			
			$("tr:odd div").mousedown(function(event){
	             if(event.button == 0){ //左键为红色
						$(this).removeClass("BLANK"); //清除之前样式
	                    $(this).toggleClass('RED');  
	             }else if(event.button == 2){ //右键为黑色
						$(this).removeClass('RED');
	                    $(this).toggleClass('BLANK');
	            }
	      	});
	
			$(".endBtn").mousedown(function(event){ //判断收尾  收尾不判断 红黑
				flag = 1;
				console.log("====开始收尾====");
	      	});
	
			$(".btn").mousedown(function(event){
				var thisObj = $(this);
	            if(event.button == 0){ //左键为红色
					if(flag == 0){
						fun_blank(thisObj); 
					}else if(flag == 1){
						fun_end(thisObj);
					}
	            }else if(event.button == 2){ //右键为黑色
	             	if(flag == 0){
						fun_blank(thisObj); 
					}else if(flag == 1){
						fun_end(thisObj);
					}
	            }
	      	});
	
			function fun_end (thisObj){
				var fatherName,selfName;
				var show,showNumA,showB,showNumC;
				var judge,className,num;
				
				fatherName = thisObj.parent().parent().attr("class"); //判断是否是第一次点击
				//selftName = $(this).attr("class").substring(4);  undefine
				selfName = thisObj.prop("class").substring(4); //获取自己的样式名,第四位开始 
				//select[fatherName]=selfName;
				show = thisObj.parent().parent().children();
				showNumA = thisObj.parent().parent().next().children();
				showB = thisObj.parent().parent().next().next().children();
				showNumC = thisObj.parent().parent().next().next().next().children();
				
				for(i=4; i<lie; i++){
					className = show.eq(i).find("div").attr('class'); //决定下一行数值的className
					judge = showB.eq(i).find("div").attr('class'); //判断是否需要填值的className
					if(judge !="RED" && judge !="BLANK"){ //没有样式就跳过
						continue;
					}
					
					console.log("选择的是："+selfName);
					if(className==selfName){
						showNumC.eq(i).html("0"); //className相同为0
					}else{
						num =showNumA.eq(i).text(); //获得上上位的数字 $.type(num) String
						if(num == ""){
							showNumC.eq(i).html("1"); //如果等于空，则为1
						}else{
							showNumC.eq(i).html(num*2); //class 不同为2*i
						}
					}
				}
				result(show, showB, showNumC);
			}
	
			function fun_blank (thisObj){
				var fatherName,selfName;
				var show,showNumA,showB,showNumC;
				var judge,className,num;
				
				fatherName = thisObj.parent().parent().attr("class"); //判断是否是第一次点击
				//selftName = $(this).attr("class").substring(4);  undefine
				selfName = thisObj.prop("class").substring(4); //获取自己的样式名,第四位开始 
				//select[fatherName]=selfName;
				show = thisObj.parent().parent().children();
				showNumA = thisObj.parent().parent().next().children();
				showB = thisObj.parent().parent().next().next().children();
				showNumC = thisObj.parent().parent().next().next().next().children();
				
				if(fatherName == "1"){//第一次点击进行初始化
					//console.log("fatherName="+fatherName); //输出该数的类型String
					for(i=4; i<=lie; i++){
						 //获取第i个点的className
						className = show.eq(i).find("div").attr("class");
						if(className == "RED" || className == "BLANK"){ 
							showNumA.eq(i).html("1");
						}
					}
				}
				
				for(i=4; i<lie; i++){
					className = show.eq(i).find("div").attr('class'); //决定下一行数值的className
					judge = showB.eq(i).find("div").attr('class'); //判断是否需要填值的className
					if(judge !="RED" && judge !="BLANK"){ //没有样式就跳过
						continue;
					}
					
					console.log("选择的是："+selfName);
					if(className==selfName){
						showNumC.eq(i).html("1"); //className相同为1
					}else{
						num =showNumA.eq(i).text(); //获得上上位的数字 $.type(num) String
						if(num == ""){
							showNumC.eq(i).html("1"); //如果等于空，则为1
						}else{
							if(num=="64"){//超过64归1
								showNumC.eq(i).html("1");
							}else{
								showNumC.eq(i).html(num*2); //class 不同为2*i
							}
						}
					}
				}
				result(show, showB, showNumC);
			}
			
			function result(show, showB, showNumC){
				var count,ans;
				var clssName,judge;
				className = show.eq(i).find("div").attr('class'); //决定下一行数值的className
				judge = showB.eq(i).find("div").attr('class'); //判断是否需要填值的className

				//统计黑红结果
				//统计红色的结果
				count = Number(0); ans = 0;
				for(j=4; j<lie; j++){
					judge = showB.eq(j).find("div").attr('class');
					if(judge == "RED"){
						ans = showNumC.eq(j).text();
						count += Number(ans);
					}
				}
				console.log("红色count="+count);
				showNumC.eq(2).html(count); //写入红色总数
				
				//统计黑色的结果
				count = Number(0); ans = 0;
				for(j=4; j<lie; j++){
					judge = showB.eq(j).find("div").attr('class');
					if(judge == "BLANK"){
						ans = showNumC.eq(j).text();
						count += Number(ans);
					}
				}
				console.log("黑色count="+count);
				showNumC.eq(3).html(count); //写入黑色总数
				
			}
			
		});
});