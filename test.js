

var matrix=[[0,0,0],
            [0,0,0],
            [0,0,0]]
tb=document.querySelector("table");
reset=document.querySelector("#reset");
reset.addEventListener("click",function(){
	location.reload();
});

//console.log(matrix)
l=document.querySelectorAll("table input");
var len=l.length;
for (var i=0;i<len;i++){
	l[i].addEventListener("click",function(){
	 if(utility()==9&&this.value==""){
			 this.value="O";
			 this.style.backgroundColor="green";
			 decrypt(this.id);


		    var cost=utility();
		    if(cost==1){
		    	document.getElementById("winner").innerHTML="YOU WIN!!";
		    }
		    else if (cost==-1){
		    	document.getElementById("winner").innerHTML="COMPUTER AI WIN";
		    	tb.style.backgroundColor="red";
		    }
			else if(cost==0){
				document.getElementById("winner").innerHTML="DRAW";
			}



			 choose_pc();
		     console.log(matrix);
    }
     //console.log(utility());
    });
}




function min_algo(){
	var alpha=+9999;
	var cost=utility();
	if(cost==1){
		return 1;
	}
	if(cost==-1){
		return -1;
	}
	if(cost==0){
		return 0
	}

	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(matrix[i][j]==0){
				matrix[i][j]=8;
                alpha=Math.min(alpha,max_algo());
				matrix[i][j]=0;
			}
		}
	}

return alpha;
}

function max_algo(){
	var alpha=-9999;
	var cost=utility();
	if(cost==1){
		return 1;
	}
	if(cost==-1){
		return -1;
	}
	if(cost==0){
		return 0
	}

	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(matrix[i][j]==0){
				matrix[i][j]=6;
				alpha=Math.max(alpha,min_algo());
				matrix[i][j]=0;
			}
		}
	}

return alpha;
}




function choose_pc(){
	var alpha=-9999;
	var st="";
	var x;
	var y;
	for (var i=0;i<3;i++){
		for (var j=0;j<3;j++){
			if(matrix[i][j]==0){
				matrix[i][j]=6;
				var val=min_algo();
				if(val>alpha){
					alpha=val;
					 x=i;
					 y=j;
					
				}
				matrix[i][j]=0;
			}
		}
	}
    matrix[x][y]=6;
    st=encrypt(x,y);
    console.log(st);
    document.getElementById(st).value="X";



    var cost=utility();
    if(cost==-1){
    	document.getElementById("winner").innerHTML="YOU WIN";
    }
    else if (cost==1){
    	document.getElementById("winner").innerHTML="COMPUTER AI WIN";
    	tb.style.backgroundColor="red";
    }
	else if(cost==0){
		document.getElementById("winner").innerHTML="DRAW";
	}
}


function decrypt(str){
matrix[parseInt(str[0])][parseInt(str[1])]=8;
}

function encrypt(a,b){
	var x=""+a.toString()+b.toString();
	return x;

}







function utility(){
	for (var i=0;i<3;i++){
		if (matrix[i][0]==matrix[i][1]&&matrix[i][1]==matrix[i][2]){
			if (matrix[i][0]==6){
				return 1;
			}
			else if(matrix[i][0]==8){
				return -1;
			}
		}
	}
	for (var i=0;i<3;i++){
		if (matrix[0][i]==matrix[1][i]&&matrix[1][i]==matrix[2][i]){
			if (matrix[0][i]==6){
				return 1;
			}
			else if(matrix[0][i]==8){
				return -1;
			}
		}
	}
	if (matrix[0][0]==matrix[1][1]&&matrix[1][1]==matrix[2][2]){
		if(matrix[0][0]==6){
			return 1;
		}
		else if(matrix[0][0]==8){
			return -1;
		}
	}
	if(matrix[2][0]==matrix[1][1]&&matrix[1][1]==matrix[0][2]){
		if(matrix[2][0]==6){
			return 1;
		}
		else if(matrix[2][0]==8){
			return -1;
		}
	}

	for(var i=0;i<3;i++){
		for (var j=0;j<3;j++){
			if(matrix[i][j]==0){
				return 9;
			}
		}
	}
	return 0;
}