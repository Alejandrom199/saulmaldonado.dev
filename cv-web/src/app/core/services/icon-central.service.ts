import { inject, Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faDownload,
  faFilePdf,
  faCopy,
  faGraduationCap,
  faCertificate,
  faBriefcase,
  faUser,
  faLayerGroup,
  faCheck,
  faMoon,
  faSun,
  faArrowUpRightFromSquare,
  faShieldHalved,
  faMicrochip,
  faCubes,
  faCode,
  faServer,
  faDatabase,
  faTerminal,
  faClock,
  faBuilding,
  faCalendarCheck,
  faExternalLinkAlt,
  faCheckCircle,
  faLanguage
} from '@fortawesome/free-solid-svg-icons';
import {
  faAngular,
  faReact,
  faNodeJs,
  faPython,
  faJava,
  faPhp,
  faDocker,
  faAws,
  faGitAlt,
  faGithub,
  faLinkedin,
  faLinkedinIn,
  faJs,
  faHtml5,
  faCss3Alt,
  faLinux
} from '@fortawesome/free-brands-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconCentralService {
  private readonly library = inject(FaIconLibrary);

  public initIcons(): void {
    // Register solid icons
    this.library.addIcons(
      faEnvelope,
      faPhone,
      faLocationDot,
      faDownload,
      faFilePdf,
      faCopy,
      faGraduationCap,
      faCertificate,
      faBriefcase,
      faUser,
      faLayerGroup,
      faCheck,
      faMoon,
      faSun,
      faArrowUpRightFromSquare,
      faShieldHalved,
      faMicrochip,
      faCubes,
      faCode,
      faServer,
      faDatabase,
      faTerminal,
      faClock,
      faBuilding,
      faCalendarCheck,
      faExternalLinkAlt,
      faCheckCircle,
      faLanguage,
      // Brands
      faAngular,
      faReact,
      faNodeJs,
      faPython,
      faJava,
      faPhp,
      faDocker,
      faAws,
      faGitAlt,
      faGithub,
      faLinkedin,
      faLinkedinIn,
      faJs,
      faHtml5,
      faCss3Alt,
      faLinux
    );
  }
}
