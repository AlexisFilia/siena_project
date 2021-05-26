// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";

// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';
// import { timTests } from '../components/timTests';
// import { gameController } from '../components/gameController';
// import { stolenCode } from '../components/stolenCode';
// import { sideNav } from '../components/sideNav';
// import { sideNavLinks } from '../components/sideNavLinks';
import { publicTeamChoiceToggle } from '../components/publicTeamChoiceToggle';
import { handlePollOptions } from '../components/handlePollOptions';
import { handlePollVotes } from '../components/handlePollVotes';
import { handleMainMenu } from '../components/handleMainMenu';
import { handleTchatModal } from '../components/handleTchatModal';
import { handleTqlModal } from '../components/handleTqlModal';
import { tchatScroll } from '../components/tchatScroll';
import { handleGalleryModal } from '../components/handleGalleryModal';
import { roulette } from '../components/roulette';
import { draggables } from '../components/draggables';
import { initCarousel } from '../components/initCarousel';
import { handleValidationModal } from '../components/handleValidationModal';
import { typeMission } from '../components/typeMission';
import { uploadQuestMedia } from '../components/uploadQuestMedia';
import { particlesHome } from '../components/particlesHome';

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2();
  // timTests();
  // gameController();
  // stolenCode();
  // sideNav();
  // sideNavLinks();
  particlesHome();
  publicTeamChoiceToggle();

  handlePollOptions();
  handlePollVotes();
  handleMainMenu();

  handleTchatModal();
  handleTqlModal();
  handleGalleryModal();
  handleValidationModal();

  tchatScroll();
  roulette();
  draggables();
  initCarousel();
  typeMission();
  uploadQuestMedia();

});


import "controllers"

