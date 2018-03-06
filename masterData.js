import State from 'redux/state'
import targetSuggestions from './TargetSuggestions'
import ethnities from './Ethnities'

// ------------------------------------
// Action Handlers
// ------------------------------------

const loadMasterDataStarted = (state, action) => ({
  ...initialState,
  state: State.loading,
  error: null
})

const loadMasterDataSuccess = (state, action) => ({
  ...state,
  ...action.payload,
  state: State.present
})

const loadMasterDataFailure = (state, action) => ({
  state: State.failure,
  error: action.payload
})

// ------------------------------------
// Action Handler Mapregister
// ------------------------------------

const ACTION_HANDLERS = {
  LOAD_MASTER_DATA_STARTED: loadMasterDataStarted,
  LOAD_MASTER_DATA_SUCCESS: loadMasterDataSuccess,
  LOAD_MASTER_DATA_FAILURE: loadMasterDataFailure
}

// ------------------------------------
// Reducer
// ------------------------------------

export const initialState = {
  state: State.initial,
  error: null,
  // server response below
  competences: [],
  countries: [],
  contactGroup: [
    { id: 0,
      label: 'Integrationsmanager/-innen, Integrationsbeauftragte oder andere spezifische Integrationsdienste' },
    { id: 1, label: 'Behörden intern (z.B. eigene Verwaltung, Ausländerbehörde, Leistungsbehörde)' },
    { id: 2, label: 'Behörden extern (z.B. Jobcenter, BA, BAMF)' },
    { id: 3, label: 'Soziale Dienstleister (z.B. Wohlfahrtsverbände)' },
    { id: 4, label: 'Vereine / Organisationen / Ehrenamt speziell für Geflüchtete' },
    { id: 5, label: 'sonstige Vereine/Ehrenamtliche' },
    { id: 6, label: 'Privatunternehmen / -personen' },
    { id: 7, label: 'Kirchen  / Religionsgemeinschaften' },
    { id: 8, label: 'Flüchtlingssozialarbeit' },
    { id: 9, label: 'Andere Kontakte (Vernetzungen)' }
  ],
  educationGrades: [],
  educations: [],
  employabilities: [
    { id: 'None', label: 'Nein' },
    { id: 'Restricted', label: 'Nur Hospitation' },
    { id: 'Open', label: 'Ja' }
  ],
  enumActivityType: [],
  enumAsylumDecision: [],
  enumAsylumStatus: [],
  enumAutonomy: [],
  enumDriverLicenses: [],
  enumEducationTypes: [],
  enumEmployment: [],
  enumGender: [],
  enumLanguageLevels: [],
  enumPermitLimited: [],
  enumSkillLevels: [],
  enumBenefitPayment: [
    { id: 'Unspecified', label: 'Wählen' },
    { id: 'ABLG', label: 'AsylBLG' },
    { id: 'SGB2', label: 'SGB II' },
    { id: 'SGB7', label: 'SGB VII' },
    { id: 'Youth', label: 'Jugendhilfe' }
  ],
  enumHousing: [
    { id: 'Unspecified', label: 'Wählen' },
    { id: 'CommunalAccommodation', label: 'vorläufige Unterbringung' },
    { id: 'TerminalAccommodation', label: 'Anschlussunterbringung' }
  ],
  enumRelative: [
    { id: 'Unspecified', label: 'Wählen' },
    { id: 'Wife', label: 'Ehefrau' },
    { id: 'Husband', label: 'Ehemann' },
    { id: 'Father', label: 'Vater' },
    { id: 'Mother', label: 'Mutter' },
    { id: 'Child', label: 'Kind' },
    { id: 'Brother', label: 'Bruder' },
    { id: 'Sister', label: 'Schwester' },
    { id: 'Grandfather', label: 'Großvater' },
    { id: 'Grandmother', label: 'Großmutter' },
    { id: 'Uncle', label: 'Onkel' },
    { id: 'Aunt', label: 'Tante' },
    { id: 'Nephew', label: 'Neffe' },
    { id: 'Niece', label: 'Nichte' },
    { id: 'Grandchild', label: 'Enkel' },
    { id: 'Guardian', label: 'Vormund' },
    { id: 'Ward', label: 'Mündel' }
  ],
  enumRelativeAsylumStatus: [
    { id: 'Unspecified', label: 'Wählen' },
    { id: 'None', label: 'Keine Antragstellung' },
    { id: 'Application', label: 'Aufenthaltsgestattung' },
    { id: 'Permit', label: 'Aufenthaltserlaubnis' },
    { id: 'Suspension', label: 'Duldung' },
    { id: 'Denial', label: 'Keine Duldung' },
    { id: 'OtherEU', label: 'Asyl in anderem EU Land' },
    { id: 'AtOrigin', label: 'Im Herkunftsland' }
  ],
  enumPersonRole: [
    { id: 'Unspecified', label: 'Wählen' },
    { id: 'Other', label: 'Andere' },
    { id: 'Jobcenter', label: 'Jobcenter' },
    { id: 'Socialworker', label: 'Flüchtlingssozialarbeit' },
    { id: 'Volunteer', label: 'Ehrenamtliche / Helferkreise' },
    { id: 'Integrator', label: 'Integrationsmanager' },
    { id: 'Company', label: 'Unternehmen' },
    { id: 'Family', label: 'Familienmitglied' },
    { id: 'DepartmentOfEmployment', label: 'Agentur für Arbeit' },
    { id: 'AliensRegistrationAuthority', label: 'Ausländerbehörde' },
    { id: 'MigrationAuthority', label: 'BAMF' },
    { id: 'RefugeeOrganisation', label: 'Flüchtlingshilfsorganisationen' },
    { id: 'ChamberOfIndustryAndCommerce', label: 'IHK, Handwerkskammer o.ä.' },
    { id: 'IntegrationsOfficer', label: 'Integrationsbeauftragte' },
    { id: 'SocialSecurityOffice', label: 'Sozialamt' },
    { id: 'LanguageSchool', label: 'Sprachkursträger (z.B. VHS)' },
    { id: 'EducationAuthority', label: 'Staatliches Schulamt' },
    { id: 'ForeignEducationAuthority', label: 'Zentralstelle für ausländisches Bildungswesen (ZAB)' },
    { id: 'SocialService', label: 'Wohlfahrtsverbände / Soziale Dienstleister' },
    { id: 'SportsClub', label: 'Sportmittler' },
    { id: 'DebtAdviceService', label: 'Schuldnerberatung' },
    { id: 'DisabilityAdviceService', label: 'Beratungsstellen für Menschen mit Behinderung' },
    { id: 'LGBTTQService', label: 'Beratungsnetzwerke im Bereich LSBTTIQ' },
    { id: 'NursingService', label: 'Pflegedienst' },
    { id: 'Club', label: 'Verein' },
    { id: 'YouthWelfareOffice', label: 'Jugendamt' },
    { id: 'Healthcare', label: 'Arzt / medizinischer Dienst' }
  ],
  enumPersonalStatus: [
    { id: 'Unspecified', label: 'Wählen' },
    { id: 'Single', label: 'Ledig' },
    { id: 'Married', label: 'Verheiratet' },
    { id: 'CivilUnion', label: 'eingetragene Lebenspartnerschaft' },
    { id: 'Splitted', label: 'Getrennt lebend' },
    { id: 'Divorced', label: 'Geschieden' },
    { id: 'Widowed', label: 'Verwitwet' }
  ],
  enumRegistrationStatus: [
    { id: 'No', label: 'Nein' },
    { id: 'Yes', label: 'Ja' },
    { id: 'Pending', label: 'Anmeldung erfolgt' },
    { id: 'Waiting', label: 'Warteliste' }
  ],
  disabiltyStatus: [
    { id: 0, label: 'keine' },
    { id: 1, label: 'G' },
    { id: 2, label: 'aG' },
    { id: 3, label: 'B' },
    { id: 4, label: 'H' },
    { id: 5, label: 'RF' },
    { id: 6, label: 'BI' },
    { id: 7, label: 'GI 3' }
  ],
  religions: [
    { id: 0, label: 'Wählen' },
    { id: 1, label: 'Keine Religion' },
    { id: 2, label: 'Atheisten' },
    { id: 3, label: 'Bahái-Religion' },
    { id: 4, label: 'Buddhismus' },
    { id: 5, label: 'Chinesisches Volk Religionen' },
    { id: 6, label: 'Christentum' },
    { id: 7, label: 'Hinduismus' },
    { id: 8, label: 'Islam' },
    { id: 9, label: 'Jainismus' },
    { id: 10, label: 'Judentum' },
    { id: 11, label: 'Konfuzianismus' },
    { id: 12, label: 'Neue Asiatische Religionen' },
    { id: 13, label: 'Schamanisten' },
    { id: 14, label: 'Schintoismus' },
    { id: 15, label: 'Sikhismus' },
    { id: 16, label: 'Spiritismus' },
    { id: 17, label: 'Stammesreligionen' },
    { id: 18, label: 'Zoroastrismus' },
    { id: 19, label: 'Andere' }
  ],
  ethnities,
  targetSuggestions,
  targetCategories: [
    { id: 0, label: 'Wählen' },
    { id: 1, label: 'Sprache (Deutsch)' },
    { id: 2, label: 'Schulbildung' },
    { id: 3, label: 'Ausbildung/Studium' },
    { id: 4, label: 'Weiterqualifizierung' },
    { id: 5, label: 'Arbeitsmarkt' },
    { id: 6, label: 'Wohnung' },
    { id: 7, label: 'Gesundheit' },
    { id: 8, label: 'Gesellschaftliche Teilhabe' },
    { id: 9, label: 'Kinder' }
  ],
  counsellingGroup: [
    // { id: 0, label: 'Wählen' },
    { id: 1, label: 'Einzelperson' },
    { id: 2, label: 'Famlienberatung' }
  ],
  counsellingPlace: [
    // { id: 0, label: 'Wählen' },
    { id: 1, label: 'Aufsuchend' },
    { id: 2, label: 'Begleitung' },
    { id: 3, label: 'Im Büro' }
  ],
  networkingGroup: [
    // { id: 0, label: 'Wählen' },
    { id: 1, label: 'Integrationsmanager/-innen, Integrationsbeauftragte oder andere spezifische Integrationsdienste' },
    { id: 2, label: 'Behörden intern (z.B. eigene Verwaltung, Ausländerbehörde, Leistungsbehörde)' },
    { id: 3, label: 'Behörden extern (z.B. Jobcenter, BA, BAMF)' },
    { id: 4, label: 'Soziale Dienstleister (z.B. Wohlfahrtsverbände)' },
    { id: 5, label: 'Vereine / Organisationen / Ehrenamt speziell für Geflüchtete' },
    { id: 6, label: 'sonstige Vereine/Ehrenamtliche' },
    { id: 7, label: 'Privatunternehmen / -personen' },
    { id: 8, label: 'Kirchen  / Religionsgemeinschaften' },
    { id: 9, label: 'Flüchtlingssozialarbeit' },
    { id: 10, label: 'Andere Kontakte (Vernetzungen)' }
  ],
  enumTargetState: [
    { id: 'New', label: 'Neu', icon: 'asterisk' },
    { id: 'Proposed', label: 'Vorgeschlagen', icon: 'question' },
    { id: 'Agreed', label: 'Vereinbart', icon: 'handshake-o' },
    { id: 'InProgress', label: 'In Umsetzung', icon: 'cogs' },
    { id: 'Suspended', label: 'Angehalten', icon: 'pause' },
    { id: 'Fulfilled', label: 'Ziel erreicht', icon: 'check' },
    { id: 'Missed', label: 'Ziel verfehlt', icon: 'ban' }
  ],
  enumWeeklyHours: [],
  enumYesNo: [],
  externalLogins: [],
  hobbies: [],
  languages: [],
  languageProficiencyLevels: [
    { id: 'None', label: 'Kein' },
    { id: 'Beginner', label: 'Anfänger' },
    { id: 'A1', label: 'Zertifiziert A1' },
    { id: 'A2', label: 'Zertifiziert A2' },
    { id: 'Intermediate', label: 'Fortgeschritten' },
    { id: 'B1', label: 'Zertifiziert B1' },
    { id: 'B2', label: 'Zertifiziert B2' },
    { id: 'Expert', label: 'Experte' },
    { id: 'C1', label: 'Zertifiziert C1' },
    { id: 'C2', label: 'Zertifiziert C2' },
    { id: 'MotherTongue', label: 'Muttersprache' }
  ],
  occupations: [],
  schoolClusters: [],
  schoolCourses: [],
  schoolsByCountry: [],
  strengths: [
    { id: 3, name: 'concentration', label: 'Konzentration' },
    { id: 2, name: 'algebra', label: 'Algebra' },
    { id: 8, name: 'percentages', label: 'Prozentrechnen' },
    { id: 9, name: 'geometry', label: 'Geometrie' },
    { id: 7, name: 'ruleofthree', label: 'Dreisatz' },
    { id: 1, name: 'logic', label: 'Logik' }
  ],
  permits: [
    { id: 'None', label: 'Keine' },
    { id: 'InProgress', label: 'In Bearbeitung' },
    { id: 'InQuestion', label: 'Rückfrage' },
    { id: 'Done', label: 'Abgeschlossen' }
  ],
  universitiesByCountry: []
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
