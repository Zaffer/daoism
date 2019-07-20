function getw3w (wordNum1, wordNum2, wordNum3) {
    var str = "frog,lion,zebra,horse,fox,lake,ocean,car,bus,train,table,chair,sky,area,book,business,case,child,company,country,day,eye,fact,family,government,group,hand,home,job,life,lot,man,money,month,mother,Mr,night,number,part,people,place,point,problem,program,question,right,room,school,state,story,student,study,system,thing,time,water,way,week,woman,word,work,world,year,paper";
    var str2 = str.split(",");
    var str3 = ["","",""];
    str3[0] = str2[Math.trunc(wordNum1*str2.length)];
    str3[1] = str2[Math.trunc(wordNum2*str2.length)];
    str3[2] = str2[Math.trunc(wordNum3*str2.length)];
    return str3;
}
