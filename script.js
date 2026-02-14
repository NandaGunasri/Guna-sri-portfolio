const roles=["Frontend Developer","Future Software Engineer","Problem Solver"];
let i=0,j=0,current="",isDeleting=false;

function type(){
    current=roles[i];
    if(!isDeleting){
        document.getElementById("typing").textContent=current.slice(0,++j);
        if(j===current.length){
            isDeleting=true;
            setTimeout(type,1000);
            return;
        }
    } else {
        document.getElementById("typing").textContent=current.slice(0,--j);
        if(j===0){
            isDeleting=false;
            i=(i+1)%roles.length;
        }
    }
    setTimeout(type,100);
}
type();

function toggleTheme(){
    document.body.classList.toggle("light");
}

tsParticles.load("tsparticles",{
    particles:{
        number:{value:60},
        size:{value:3},
        move:{speed:1},
        links:{enable:true},
        color:{value:"#8b5cf6"}
    }
});
