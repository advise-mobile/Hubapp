import { all, takeLatest } from 'redux-saga/effects';

/* Types */
import { AuthTypes } from 'store/ducks/Auth';
import { UserTypes } from 'store/ducks/User';
import { FolderUnreadTypes } from 'store/ducks/FolderUnread';
import { FolderKeywordsTypes } from 'store/ducks/FolderKeywords';
import { FolderProcessesTypes } from 'store/ducks/FolderProcesses';
import { MovementTypes } from 'store/ducks/Movement';
import { MovementsTypes } from 'store/ducks/Movements';
import { ProcessTypes } from 'store/ducks/Process';
import { DeadlinesTypes } from 'store/ducks/Deadlines';
import { JournalTypes } from 'store/ducks/Journal';
import { KeywordsTypes } from 'store/ducks/Keywords';
import { FontsTypes } from 'store/ducks/Fonts';
import { TribunalTypes } from 'store/ducks/Tribunal';
import { DeadlineAddTypes } from 'store/ducks/DeadlineAdd';
import { SelectTypes } from 'store/ducks/Select';
import { PeopleTypes } from 'store/ducks/People';
import { CustomerTypes } from 'store/ducks/Customer';

/* Saga */
import { login, logout, forgot } from './Auth';
import { getPerson, changePassword, updatePerson, updateProfile } from './User';
import { getCustomer } from './Customer';
import { getFolderKeywords } from './FolderKeywords';
import { getFolderProcesses } from './FolderProcesses';
import { getMovement, movementRead } from './Movement';
import { getMovements, getDiaries } from './Movements';
import { getProcess } from './Process';
import { getPeople } from './People';
import {
  getDeadlines,
  putDeadlineConcluded,
  putDeadlineImportant,
  putDeadlineInnactive,
} from './Deadlines';
import { getScheduleId, postDeadline, putDeadline } from './DeadlineAdd';
import { getJournal } from './Journal';
import { getKeywords } from './Keywords';
import { getFonts } from './Fonts';
import { getTribunal } from './Tribunal';
import { fetchSelectOptions } from './Select';

export default function* rootSaga() {
  return yield all([
    // Auth
    takeLatest(AuthTypes.LOGIN_REQUEST, login),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logout),
    takeLatest(AuthTypes.FORGOT_REQUEST, forgot),

    // User
    takeLatest(UserTypes.PERSON_REQUEST, getPerson),
    takeLatest(UserTypes.PERSON_UPDATE, updatePerson),
    takeLatest(UserTypes.CHANGE_PASSWORD_REQUEST, changePassword),
    takeLatest(UserTypes.UPDATE_PROFILE, updateProfile),

    // Customer
    takeLatest(CustomerTypes.CUSTOMER_REQUEST, getCustomer),

    // Folders
    takeLatest(FolderKeywordsTypes.FOLDER_KEYWORDS_REQUEST, getFolderKeywords),
    takeLatest(FolderProcessesTypes.FOLDER_PROCESSES_REQUEST, getFolderProcesses),

    // Movement
    takeLatest(MovementTypes.MOVEMENT_READ_REQUEST, movementRead),

    // Movements
    takeLatest(MovementsTypes.MOVEMENTS_REQUEST, getMovements),
    takeLatest(MovementsTypes.DIARIES_REQUEST, getDiaries),
    takeLatest(ProcessTypes.PROCESS_REQUEST, getProcess),

    //PEOPLE
    takeLatest(PeopleTypes.PEOPLE_REQUEST, getPeople),

    // Add Deadline
    takeLatest(DeadlineAddTypes.POST_DEADLINE, postDeadline),
    takeLatest(DeadlineAddTypes.PUT_DEADLINE, putDeadline),
    takeLatest(DeadlineAddTypes.GET_SCHEDULE_ID, getScheduleId),

    // Deadlines
    takeLatest(DeadlinesTypes.DEADLINES_REQUEST, getDeadlines),

    // Deadline
    takeLatest(DeadlinesTypes.PUT_DEADLINE_IMPORTANT, putDeadlineImportant),
    takeLatest(DeadlinesTypes.PUT_DEADLINE_CONCLUDED, putDeadlineConcluded),
    takeLatest(DeadlinesTypes.PUT_DEADLINE_INNACTIVE, putDeadlineInnactive),

    // Filters
    takeLatest(JournalTypes.JOURNAL_REQUEST, getJournal),
    takeLatest(KeywordsTypes.KEYWORDS_REQUEST, getKeywords),
    takeLatest(FontsTypes.FONTS_REQUEST, getFonts),
    takeLatest(TribunalTypes.TRIBUNAL_REQUEST, getTribunal),

    // Select
    takeLatest(SelectTypes.FETCH_SELECT_OPTIONS, fetchSelectOptions),
  ]);
}
