const publicTeamChoiceToggle = () => {
  const publicTeamChoices = document.querySelectorAll(".public-team-choice");
  if(!publicTeamChoices) return;
  const span = document.querySelector(".public-team-choice-selected span");
  const pollPerimeterChoice = document.querySelector("#poll-perimeter-choice");

  publicTeamChoices.forEach(choice => {
    choice.addEventListener("click", (e) => {

      if(!choice.classList.contains("active")){
        publicTeamChoices.forEach(c => {
          c.classList.toggle("active");
        });

        if(span.innerText == "TEAM"){
          span.innerText = "PUBLIC";
          if(pollPerimeterChoice){pollPerimeterChoice.value = "public"} ;
        }else{
          span.innerText = "TEAM";
          if(pollPerimeterChoice){pollPerimeterChoice.value = "team"}
        }
      }
    });

  });


}

export{publicTeamChoiceToggle};
