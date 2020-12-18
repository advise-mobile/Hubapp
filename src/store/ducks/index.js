import { combineReducers } from 'redux';

import { reducer as auth } from './Auth';
import { reducer as user } from './User';
import { reducer as folderUnread } from './FolderUnread';
import { reducer as folderKeywords } from './FolderKeywords';
import { reducer as folderProcesses } from './FolderProcesses';
import { reducer as process } from './Process';
import { reducer as movement } from './Movement';
import { reducer as movements } from './Movements';
import { reducer as deadlines } from './Deadlines';
import { reducer as deadlineAdd } from './DeadlineAdd';
import { reducer as select } from './Select';
import { reducer as journal } from './Journal';
import { reducer as keywords } from './Keywords';
import { reducer as fonts } from './Fonts';
import { reducer as tribunal } from './Tribunal';
import { reducer as toastNotify } from './ToastNotify';
import { reducer as people } from './People';
import { reducer as customer } from './Customer';

export default combineReducers({
  auth,
  user,
  folderUnread,
  folderKeywords,
  folderProcesses,
  movement,
  movements,
  process,
  deadlines,
  deadlineAdd,
  select,
  journal,
  keywords,
  fonts,
  tribunal,
  toastNotify,
  people,
  customer
});
