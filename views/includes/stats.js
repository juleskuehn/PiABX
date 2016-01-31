function rnd6(x)
{
if(x>=.000001){return Math.round(x*1000000)/1000000}
else{return "<0.000001"}
}<!--end.f.rnd6-->

function rnd12(x)
{
if(x>=.000000000001){return Math.round(x*1000000000000)/1000000000000}
else{return "<0.000000000001"}
}<!--end.f.rnd12-->


function rnd4(x){return Math.round(x*10000)/10000}


function corrn()
{document.n.elements[0].value=Math.floor(document.n.elements[0].value)}

function corrk()
{document.r.elements[0].value=Math.floor(document.r.elements[0].value)}

function corrp()
{
if(eval(document.p.elements[0].value)<0){document.p.elements[0].value=1*0}
if(eval(document.p.elements[0].value)>1){document.p.elements[0].value=1*1}
}


var n = 1*0;
var r = 1*0;
var p = 1*0;
var q = 1*0;
var mx = 1*0;
var varx = 1*0;
var sdx = 1*0;


function calc()
{
semi();
n = document.n.elements[0].value*1;
r = document.r.elements[0].value*1;
p = eval(document.p.elements[0].value);
q = 1-p;
document.q.elements[0].value = q;

var tjp = "";
var tjz = document.p.elements[0].value;

if(tjz.indexOf("/")>-1)
{
tjp = tjz.split("/");
tjp[0] = tjp[1]-tjp[0];
document.q.elements[0].value = tjp[0]+"/"+tjp[1];
}
else{document.q.elements[0].value = q}

document.show.elements[0].value = "P: exactly "+r+" out of "+n;
document.show.elements[8].value = "P: "+r+" or more out of "+n;
document.show.elements[4].value = "P: "+r+" or fewer out of "+n;

if(r>=n*p)
{document.show.elements[12].value = "P: "+r+" or more out of "+n}
else
{document.show.elements[12].value = "P: "+r+" or fewer out of "+n}

mx = n*p;
varx = n*p*q;
sdx = Math.sqrt(varx);
document.param.elements[0].value = rnd4(mx);
document.param.elements[1].value = rnd4(varx);
document.param.elements[2].value = rnd4(sdx);

if(n<1001){exact()}

if(n*p>=5&&n*q>=5){norm()}

if(n>149&&varx>=.9*mx){pois()}

}<!--end.f.calc-->

function wipe() {
document.n.elements[0].value = "";
document.r.elements[0].value = "";
document.p.elements[0].value = "";
document.q.elements[0].value = "";
semi();
}<!--end.f.wipe-->

function semi() {
for (var i=0; i<4; i++){document.param.elements[i].value=""}
for (var i=0; i<19; i++){document.show.elements[i].value=""}
document.show.elements[0].value = "P: exactly k out of n";
document.show.elements[4].value = "P: k or fewer out of n";
document.show.elements[8].value = "P: k or more out of n";
}<!--end.f.wipe-->


function exact()
{
var tabz = new Array(n+1);
var a = 1*0;
var b = 1*0;
var sum = 1*0;
var prob = 1*0;
var nr = 1*0;
var xct = 1*0;
var pt1 = 1*0;
var pt2 = 1*0;

for(i=1, factn=0; i<n; i++, factn+=Math.log(i));

for (var j=0; j<n+1; j++)
{

for(i=1, factr=0; i<j; i++, factr+=Math.log(i));
nr = n-j;
for(i=1, factnr=0; i<nr; i++, factnr+=Math.log(i));
a = factn-(factr+factnr);
a = Math.exp(a);
b = Math.pow(p, j)*Math.pow(q, n-j);
tabz[j] = a*b;
if(j==r)
{
xct = tabz[j];
document.show.elements[1].value=rnd12(tabz[j]);
}
}<!--end.for-->


var ltx = 0*1;
var gtx = 0*1;

for (var j=0; j<r+1; j++){ltx+=tabz[j]*1}
document.show.elements[5].value = rnd12(ltx);

for (var j=r; j<n+1; j++){gtx+=tabz[j]*1}
document.show.elements[9].value = rnd12(gtx);

if(document.show.elements[5].value>=1*1){document.show.elements[5].value=">.999999"}

if(document.show.elements[9].value>=1*1){document.show.elements[9].value=">.999999"}


if (r == n) {document.show.elements[5].value = "1.0"};
if (r == 0) {document.show.elements[9].value = "1.0"};
if(r==0){document.show.elements[5].value=document.show.elements[1].value}
if(r==n){document.show.elements[9].value=document.show.elements[1].value}
if(r>=n*p)
{
document.show.elements[12].value=document.show.elements[8].value;
document.show.elements[13].value=document.show.elements[9].value;
}
else
{
document.show.elements[12].value=document.show.elements[4].value;
document.show.elements[13].value=document.show.elements[5].value;
}

pt1 = document.show.elements[13].value*1;

var lcg = Math.abs((n*p)-r);
var tkk = 1*0;

for (var j=((n*p)-lcg+1); j<((n*p)+lcg); j++){tkk+=tabz[j]*1}

pt2 = pt1*2;
if(pt2>0.9999999999){pt2="1.0"}

document.show.elements[14].value = pt2;

}<!--end.f.exact-->


function pois()
{
var sum = 1*0;
var sumx = 1*0;
var e = Math.E;
for(i=1, factr=1; i<r; i++, factr*=i);
sumx = (Math.pow(e, -mx)*Math.pow(mx, r))/factr;
document.show.elements[3].value = sumx;
for (var j = 0; j < r+1; j++) {
for(i=1, factr=1; i<j; i++, factr*=i);
sum+= (Math.pow(e, -mx)*Math.pow(mx, j))/factr;
}<!--end.for.j-->
document.show.elements[7].value = sum;
var more = 1-sum+sumx;

if(more>-1)
{
document.show.elements[11].value = more;
document.show.elements[11].value=rnd6(document.show.elements[11].value);
}else
{document.show.elements[11].value = "Cannot be calculated."};


if (r == n) {document.show.elements[7].value = "1.0"};
if (r == 0) {document.show.elements[11].value = "1.0"};
if(r>=n*p)
{
document.show.elements[12].value=document.show.elements[8].value;


document.show.elements[17].value=document.show.elements[11].value;


document.show.elements[18].value=document.show.elements[17].value*2;
}
else
{
document.show.elements[12].value=document.show.elements[4].value;
document.show.elements[17].value=document.show.elements[7].value;
document.show.elements[18].value=document.show.elements[17].value*2;
}

document.show.elements[3].value=rnd6(document.show.elements[3].value);
document.show.elements[7].value=rnd6(document.show.elements[7].value);
document.show.elements[17].value=rnd6(document.show.elements[17].value);
document.show.elements[18].value=rnd6(document.show.elements[18].value);

if(document.show.elements[18].value>1*1){document.show.elements[18].value="1.0"}
if(document.show.elements[7].value>.999999*1){document.show.elements[7].value=">.999999"}


}<!--end.f.pois-->


function norm()
{
var diff = r-mx;
var z = 1*0;
if(r>mx)
{
z = (diff-.5)/sdx;
z = Math.round(100*z)/100;
document.param.elements[3].value = "+"+ z;
document.show.elements[12].value = "P: "+r+" or more out of "+n;
}
if (r<mx)
{
z = (1*diff+.5)/sdx;
z = Math.round(100*z)/100;
document.param.elements[3].value = z;
document.show.elements[12].value = "P: "+r+" or fewer out of "+n;
}
if (r==mx)
{
z = 1*0;
document.param.elements[3].value = z;
document.show.elements[12].value = "P: "+r+" or more out of "+n;
}

z = Math.abs(z);
var p2 = (((((.000005383*z+.0000488906)*z+.0000380036)*z+.0032776263)*z+.0211410061)*z+.049867347)*z+1;
p2 = Math.pow(p2, -16);
var p1 = p2/2;
document.show.elements[15].value = p1;
document.show.elements[16].value = p2;

var otr = 1*0;
z = z+(1/sdx)*1;
var p2x = (((((.000005383*z+.0000488906)*z+.0000380036)*z+.0032776263)*z+.0211410061)*z+.049867347)*z+1;
p2x = Math.pow(p2x, -16);
otr = p2-p2x;
otr = otr/2;
document.show.elements[2].value = otr;

if(r>mx)
{
document.show.elements[10].value=document.show.elements[15].value;
document.show.elements[6].value=1-document.show.elements[15].value+document.show.elements[2].value*1;
}
if(r<mx)
{
document.show.elements[6].value=document.show.elements[15].value;
document.show.elements[10].value=1-document.show.elements[15].value+document.show.elements[2].value*1;
}

document.show.elements[2].value=rnd6(document.show.elements[2].value);
document.show.elements[6].value=rnd6(document.show.elements[6].value);
document.show.elements[10].value=rnd6(document.show.elements[10].value);
document.show.elements[15].value=rnd6(document.show.elements[15].value);
document.show.elements[16].value=rnd6(document.show.elements[16].value);


if(r==mx)
{
document.show.elements[15].value=.5+(document.show.elements[2].value/2)*1;
document.show.elements[16].value="1.0";
document.show.elements[10].value=document.show.elements[15].value;
document.show.elements[6].value=document.show.elements[15].value;
}

if(document.show.elements[6].value>.999999*1){document.show.elements[6].value=">.999999"}
if(document.show.elements[10].value>.999999*1){document.show.elements[10].value=">.999999"}
}<!--end.f.norm-->