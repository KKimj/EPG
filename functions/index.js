const functions = require('firebase-functions');
var bodyParser = require('body-parser')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


exports.helloWorld_2 = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.blk = functions.https.onRequest((request, response) => {
    response.send( request.body.text + "Hello");
});
   
   
exports.problems = functions.https.onRequest( (resquest, response) =>
{
    //

});


var shuffleRandom = function (n)
{
    var ar = [];
    var temp = 0;
    var rnum = 0.0;
    var i = 0;
    //전달받은 매개변수 n만큼 배열 생성 ( 1~n )
    for(i=1; i<=n; i++){
        ar.push(i);
    }

    //값을 서로 섞기
    for(i=0; i< ar.length ; i++)
    {
        rnum = Math.floor(Math.random() *n); //난수발생
        temp = ar[i];
        ar[i] = ar[rnum];
        ar[rnum] = temp;
    }

    return ar;
}



// 빈칸 read
var input_blk = function(filename) 
{
    var ans = [];
    ans[0] = []; // 기본유형

    var idx_problem = data.indexOf('\n');

    var arr_problem =data.split(/\r?\n/);

    var pv_problem = 0;
    var ans_problem;
    var num_problem = 0;

    for(var i = 0; i< arr_problem.length; i++)
    {
        // 그냥 빈 줄 일 때 예외 처리.
        if(arr_problem[i].length<5) continue;
        num_problem++;
        ans[0].push(makeproblem_blk0(arr_problem[i], filename, num_problem));    
    }
   
}


var makeproblem_blk0 = function(proString, filename, num_problem)
{
    var fs = require('fs');
    
    var string = proString;
    var idx_start = string.indexOf('[');
    var idx_end = string.indexOf(']');

    var problem_nums = 0;
    var ans = [];
    var tmp = [];

    while(idx_start !== -1 && idx_end !== -1)
    {     
        problem_nums++;

        ans.push(string.substring(idx_start+1, idx_end));
        const string_ = string.substring(0, idx_start) + '_'.repeat(idx_end-idx_start)+ string.substring(idx_end+1, string.length);
        string = string_;

        idx_start = string.indexOf('[', idx_start+1);
        idx_end = string.indexOf(']', idx_end+1);
    }


   var sengi = shuffleRandom(problem_nums);

   var sengi_str = ''; 
   var ans_str = '';

   for(var i = 1; i<=problem_nums; i++)
   {
       sengi_str+=i+") "+ans[sengi[i-1]-1]+'\n';
      
       tmp[sengi[i-1]] = i;
      //ans_str += sengi[i-1]+')';
       
   }

   // eslint-disable-next-line no-redeclare
   for(var i = 1; i<=problem_nums; i++)
   {
      ans_str += tmp[i]+')';
      if(i<problem_nums) ans_str+=' - ';
   }
    return ans_str;
}
