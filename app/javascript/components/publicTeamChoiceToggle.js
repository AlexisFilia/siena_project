const publicTeamChoiceToggle = () => {
  const publicTeamChoices = document.querySelectorAll(".public-team-choice");
  if(!publicTeamChoices) return;
  const span = document.getElementById("etb-title span");
  const pollPerimeterChoice = document.getElementById("poll-perimeter-choice");
  const messagePerimeterChoice = document.querySelectorAll(".message-perimeter-choice");
  const teamMessagesContainer = document.getElementById("team-messages-container");
  const publicMessagesContainer = document.getElementById("public-messages-container");

  publicTeamChoices.forEach(choice => {
    choice.addEventListener("click", (e) => {

      if(!choice.classList.contains("active")){
        publicTeamChoices.forEach(c => {
          c.classList.toggle("active");
        });

        if(span.innerText == "TEAM"){
          span.innerText = "PUBLIC";
          if(pollPerimeterChoice){pollPerimeterChoice.value = "public"} ;
          if(messagePerimeterChoice){
            // messagePerimeterChoice.value = "public";
            // publicMessagesContainer.style.display = "flex";
            // teamMessagesContainer.style.display = "none";

          };

        }else{
          span.innerText = "TEAM";
          if(pollPerimeterChoice){pollPerimeterChoice.value = "team"}
          if(messagePerimeterChoice){
            // messagePerimeterChoice.value = "team";
            // publicMessagesContainer.style.display = "none";
            // teamMessagesContainer.style.display = "flex";
          }
        }
      }
    });

  });


}

export{publicTeamChoiceToggle};




