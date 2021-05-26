import { particles } from 'particles.js';
import particles_path from '../../assets/json/particles.json';


const particlesHome = () => {

  const particlesContainer = document.querySelector("#particles-container");
  if(!particlesContainer) return
  console.log("xyo");

  // console.log(particles_path);
  // /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  // particlesJS.load('particles-container', particles_path, function() {
  //   console.log('callback - particles-js config loaded');
  // });

  particlesJS('particles-container', particles_path);

}


export{particlesHome};
