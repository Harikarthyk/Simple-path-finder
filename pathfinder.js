var totalBlocks = 20 ;
var blockId ;
var endRow = totalBlocks-1 , endCol = totalBlocks-1 ;
var endId ;
var maze = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];
var dr = [ -1 , 1 , 0 , 0 ] ;
var dc = [ 0 , 0, 1, -1 ] ;
function createBlock(){
	var board = "" ;
	blockId = 0 ;
	for( var i=0;i<totalBlocks;i++ ){
		board = "<div class=cls-row id_row="+i+">" ;
		for( var j=0 ; j<totalBlocks; j++ , blockId++ ) 
			board += "<div class=cls-box id="+blockId+" id_col="+j+"></div>" ;
		board += "</div>" ;
		$('.borad').append(board) ;
		board="" ;			
	}
}
var timer = 0 ; 
function dfs( row , col , dfsVisited ) {
        if( row<0 || col<0 || col>=totalBlocks || row>=totalBlocks || dfsVisited[row][col]|| maze[row][col]==1  ) 
            return false ;
        dfsVisited[row][col] = true ;
		if( maze[row][col]==9 ) {
        	flag = true ;
        	return true ;
        }
        var l1 = dfs( row+1 , col , dfsVisited ) ;
    	var l2 = dfs( row , col+1 , dfsVisited ) ;
        var l3 = dfs( row-1 , col , dfsVisited ) ;
        var l4 = dfs( row , col-1 , dfsVisited ) ;
        if( l1 || l2 ||  l3 || l4 ){
        	var bg = "#"+( row*totalBlocks+col )
 			var delay = (timer*10) +"ms" ;
			$(bg).css( 'transition-delay',delay ) ;
		    $(bg).css('background-color','#8bc34a');
		 	timer+=4;
	    }
        return l1 || l2 ||  l3 || l4 ;
 }
function bfs( ){
	var temp = [] ;
	var parent = [] ;
	var bfsVisited = [] ;
	var minDist = [] ; 
	for( var i=0;i<totalBlocks;i++ ) 
		bfsVisited[i] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false] ;
	for( var i=0;i<totalBlocks;i++ ) 
		parent[i] = ["","","","","","","","","","","","","","","","","","","",""] ;
	for( var i=0;i<totalBlocks;i++ ) 
		minDist[i] = [999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999] ;
	var qr = [] ;
	var qc = [] ;
	qr.push( 0 ) ;
	minDist[0][0] = 0 ;
	parent[0][0] = "S" ;
 	qc.push( 0 ) ;
 	var flag = false ;
	var c = 1;
	while( qr.length!=0 ) {
		var currRow = qr.shift() ;
		var currCol = qc.shift() ;
		if( bfsVisited[endRow][endCol]==true ) {
			flag = true ;
			break ; 
		}
		if( bfsVisited[currRow][currCol]==true ) continue ;
		bfsVisited[currRow][currCol] = true ;
		var bg = "#"+( currRow*totalBlocks+currCol ) ;
		var delay = (c*5) +"ms" ;
		$(bg).css( 'transition-delay',delay ) ;
		$(bg).addClass( 'cls-box-effect' );
		if( maze[currRow][currCol]==0  ) $(bg).css( 'background-color' , '#00bcd4' ) ;
		
		if( currCol-1>=0 && maze[currRow][currCol]!=1 ) {
			qr.push(currRow) ;
			qc.push(currCol-1) ;
			if( minDist[currRow][currCol-1]>minDist[currRow][currCol]+1 ){
				parent[currRow][currCol-1] = currRow+","+currCol ;
				minDist[currRow][currCol-1] = minDist[currRow][currCol]+1 ;
			}
			c++ ;
		}
		if( currCol+1<maze.length && maze[currRow][currCol]!=1 ) {
			qc.push(currCol+1) ;
			qr.push(currRow) ;
			if(  minDist[currRow][currCol+1]>minDist[currRow][currCol]+1 ){
				parent[currRow][currCol+1] = currRow+","+currCol ;
				minDist[currRow][currCol+1] = minDist[currRow][currCol]+1 ;
			}
	    	c++ ;
		}
		if( currRow-1>=0 && maze[currRow][currCol]!=1 ) {
			qc.push(currCol) ;
			qr.push(currRow-1);
			if( minDist[currRow-1][currCol]>minDist[currRow][currCol]+1 ){
				parent[currRow-1][currCol] = currRow+","+currCol ;
				minDist[currRow-1][currCol] = minDist[currRow][currCol]+1 ;
			}
			c++ ;
		}
		if( currRow+1<maze[0].length && maze[currRow][currCol]!=1 ) {
			qr.push(currRow+1) ;
			qc.push(currCol) ;
			if( minDist[currRow+1][currCol]>minDist[currRow][currCol]+1  ){
				parent[currRow+1][currCol] = currRow+","+currCol ;
				minDist[currRow+1][currCol] = minDist[currRow][currCol]+1 ;
			}
			c++ ;
		}
		
	} 
	setTimeout(function() {
		if( flag ) {
			var ro = endRow , co = endCol ; 
			var i = 1 ;
			while( ro>=0 || co>=0 ) {
				var path = parent[ro][co].split(',') ;
				ro = Number( path[0] ) ;
				co = Number( path[1] );
				var bg = "#"+( ro*totalBlocks+co ) ;
				var delay = (i*10) +"ms" ;
				i+=2 ;
				$(bg).css( 'transition-delay',delay ) ;
				$(bg).css('background-color','#8bc34a') ;
			}
		}	
	}, c*5);
	
}
// function reset(){
			
// 	for( var i=0;i<totalBlocks;i++ ){
// 		for( var j=0;j<totalBlocks;j++ ) {
// 			if( maze[i][j]==0 ) {
// 				var bg = "#"+( i*totalBlocks+j ) ;
// 				$(bg).css('transition-delay','0s') ;
// 				$(bg).css('background-color','#effcfd') ;
// 			}
// 		}
// 	}
// }
$(document).ready(function(){
	createBlock() ;	
	$('.btn-reset').on('click',function(){
		location.reload( true ) ;
	});
	// var isDragging = false ;
		// var row = $(this).parent().attr('id_row');
		// var col = $(this).attr('id_col');	
		// console.log( row+" "+col ) ;
		// maze[row][col] = 1 ;
		// $(this).css( 'background-color','black' ) ;
	
    $("#0").css( 'background-color','#8bc34a' ) ;
	var btn_wall , btn_end , endCount = 0 ;
	$('#btn-walls').on('click',function(){
		btn_wall = 1 ;
		btn_end = 0 ;
	});
	$('#btn-end').on('click',function(){
		btn_wall = 0 ;
		btn_end = 1 ;
	});
	$('body').on( 'click','.cls-box' ,function(event){
		var row = $(this).parent().attr('id_row');
		var col = $(this).attr('id_col');	
		console.log( row +" "+col ) ;
		// $('.cls-box').on('cl')
		if( btn_wall==1  ) {
			if( maze[row][col]==0 ){
				maze[row][col] = 1 ;
				$(this).css( 'background-color','black' ) ;
			}
			else{
				maze[row][col] = 0 ;
				$(this).css( 'background-color',' #effcfd' ) ;
			}
		}
		else if( btn_end==1 && endCount==0 ) {
			endCount ++ ;
			endRow = row ;
			endCol = col ;
			$(this).css( 'background-color','red' ) ;
		}
	});
	$('#btn-path-dfs').on('click',function(){
		
		btn_wall = 0 ;
		btn_end = 0 ;
		var dfsVisited = [] ;
		maze[endRow][endCol] = 9 ;
		endId = "#"+( endRow*totalBlocks+endCol ) ;
		$(endId).css('background-color','red') ;	
		for( var i=0;i<totalBlocks;i++ ) 
			dfsVisited[i] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false] ;
		dfs( 0 , 0 , dfsVisited ) ;
		$("#0").css( 'background-color','#8bc34a' ) ;
		$('.btns').hide();
		$('.btn-reset').show();
	});
	$('#btn-path-bfs').on('click',function(){
		btn_wall = 0 ;
		btn_end = 0 ;
		maze[endRow][endCol] = 9 ;
		endId = "#"+( endRow*totalBlocks+endCol ) ;
		$(endId).css('background-color','red') ;
		bfs();
		$("#0").css( 'background-color','#8bc34a' ) ;
		$('.btns').hide();
		$('.btn-reset').show();
	});

});