import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

// // Intro
import Intro from '../pages/Intro';

// // Auth
import Login from '../pages/Login';
import Forgot from '../pages/Forgot';

// // Search Folders
// import Search from '../pages/Main/Search';

// // Account
import Account from '../pages/Account';
import Notifications from '../pages/Account/Notifications';
import Pushs from '../pages/Account/Notifications/Pushs';
import Emails from '../pages/Account/Notifications/Emails';
// import AccountProfile from '../pages/Account/Profile';
// import AccountOab from '../pages/Account/Oab';
// import AccountCompany from '../pages/Account/Company';
// import AccountPassword from '../pages/Account/Password';

// // Movements
import Folders from '../pages/Folders';
import Movements from '../pages/Movements';
import MovementDetail from '../pages/Movements/Details';

// // Jurisprudences
import Jurisprudence from '../pages/Jurisprudence';
import JurisprudenceList from '../pages/Jurisprudence/List';
import JurisprudenceDetail from '../pages/Jurisprudence/Details';
// import FilterSelect from '../pages/Jurisprudence/Filters/FilterSelect';

import Deadlines from '../pages/Deadlines';
import DeadlinesDetails from '../pages/Deadlines/Details';

// Menu Main
import MenuMain from './RoutesTab';

const AuthStack = createStackNavigator(
  {
    Forgot,
  },
  {
    header: null,
    headerMode: 'none',
  });

const AppStack = createStackNavigator(
  {
    MenuMain,
    Folders,
    Movements,
    MovementDetail,
    Deadlines,
    DeadlinesDetails,
    Account,
    Notifications,
    Pushs,
    Emails,
    // AccountUser,
    // AccountProfile,
    // AccountOab,
    // JurisFilterPage,
    // AccountCompany,
    // AccountPassword,
    // ProcessList,
    // Process,
    // Add,
    // Advogados,
    // Partes,
    // PublicationDetail,
    // FilterSelect,
    // Filters,
    // FilterFonts,
    // FilterKeywords,
    // FilterJournal,
    // FilterTribunal,
    // FilterDateOfAvailability,
    // SituationFilter,
    Jurisprudence,
    JurisprudenceList,
    JurisprudenceDetail,
  },
  {
    header: null,
    headerMode: 'none',
  }
);

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Intro,
      Login,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'Intro',
    }
  )
);

export default Routes;
