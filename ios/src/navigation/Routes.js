import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

// // Auth
import Login from '../pages/Login';
// import Forgot from '../pages/Forgot';

// // Search Folders
// import Search from '../pages/Main/Search';

// // Account
// import Account from '../pages/Account';
// import AccountUser from '../pages/Account/User';
// import AccountProfile from '../pages/Account/Profile';
// import AccountOab from '../pages/Account/Oab';
// import AccountCompany from '../pages/Account/Company';
// import AccountPassword from '../pages/Account/Password';

// // Movements
// import ProcessList from '../pages/Movements';
// import ProcessDetail from '../pages/Movements/Details/Process';
// import Add from '../pages/Process/Add';
// import PublicationDetail from '../pages/Movements/Details/Publication';
// import Process from '../pages/Process';
// import Advogados from '../pages/Movements/ProcessDetailTabs/Advogados';
// import Partes from '../pages/Movements/ProcessDetailTabs/Partes';

// // Movements Filters
// import Filters from '../pages/Movements/Filters';
// import FilterFonts from '../pages/Movements/Filters/Fonts';
// import FilterKeywords from '../pages/Movements/Filters/Keywords';
// import FilterJournal from '../pages/Movements/Filters/Journal';
// import FilterTribunal from '../pages/Movements/Filters/Tribunal';
// import FilterDateOfAvailability from '../pages/Movements/Filters/DateOfAvailability';
// import SituationFilter from '../pages/Movements/Filters/Situation';

// // Jurisprudences
// import JurisprudenceList from '../pages/Jurisprudence/List';
// import JurisprudenceDetails from '../pages/Jurisprudence/Details';
// import JurisFilterPage from '../pages/Jurisprudence/Filters';
// import FilterSelect from '../pages/Jurisprudence/Filters/FilterSelect';

// Menu Main
// import MenuMain from './RoutesTab';

// const AuthStack = createStackNavigator({
//   // Forgot,
// });

// const AppStack = createStackNavigator(
//   {
//     // MenuMain,
//     // Search,
//     // Account,
//     // AccountUser,
//     // AccountProfile,
//     // AccountOab,
//     // JurisFilterPage,
//     // AccountCompany,
//     // AccountPassword,
//     // ProcessList,
//     // Process,
//     // Add,
//     // Advogados,
//     // Partes,
//     // ProcessDetail,
//     // PublicationDetail,
//     // FilterSelect,
//     // Filters,
//     // FilterFonts,
//     // FilterKeywords,
//     // FilterJournal,
//     // FilterTribunal,
//     // FilterDateOfAvailability,
//     // SituationFilter,
//     // JurisprudenceList,
//     // JurisprudenceDetails,
//   },
//   {
//     header: null,
//     headerMode: 'none',
//   }
// );

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Login,
      // Auth: AuthStack,
      // App: AppStack,
    },
    {
      initialRouteName: 'Login',
    }
  )
);

export default Routes;
