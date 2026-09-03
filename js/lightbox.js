/* ===== Lightbox pour les galeries de schémas ===== */
(function(){
  var lb=document.createElement("div"); lb.className="lightbox";
  var im=document.createElement("img"); lb.appendChild(im); document.body.appendChild(lb);
  document.body.addEventListener("click",function(e){
    var t=e.target;
    if(t.tagName==="IMG"&&t.closest(".gfig, .cfig")){ im.src=t.src; lb.classList.add("show"); }
    else if(t===lb||t===im){ lb.classList.remove("show"); im.src=""; }
  });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape"){lb.classList.remove("show");im.src="";} });
})();
