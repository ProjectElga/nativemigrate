import { fork, all } from "redux-saga/effects";
import projectsSaga from "./projects/projectsSaga";
import singUpSaga from "./auth/singUpSaga";
import UserCategorySaga from "./onboard/UserCategorySaga";
import IdentitySaga from "./onboard/IdentitySaga";
import MoreSaga from "./onboard/MoreSaga";
import SocialsSaga from "./onboard/SocialsSaga";
import CitationSaga from "./profile/citations";
import ProfileSaga from "./profile/ProfileSaga";
import categorySaga from "./discover/categorySaga";
import collabSaga from "./actionButton/collab";
import SavedSaga from "./saved/saved";
import projectActionSaga from "./projects/projectActionSaga";
import circlesSaga from "./projects/circleSaga";
import SearchSaga from "./search/SearchSaga";
import GenreSaga from "./genres/genre";
import locationSaga from "./location/location";
import LinksSaga from "./profile/linksSaga";
import notificationSaga from "./notifications/notification";
import rewardSaga from "./rewards/rewards";
import FeedSaga from "./feed/FeedSaga";
export default function* rootSaga() {
  yield all([
    fork(projectsSaga),
    fork(singUpSaga),
    fork(UserCategorySaga),
    fork(IdentitySaga),
    fork(MoreSaga),
    fork(SocialsSaga),
    fork(CitationSaga),
    fork(ProfileSaga),
    fork(categorySaga),
    fork(collabSaga),
    fork(SavedSaga),
    fork(projectActionSaga),
    fork(circlesSaga),
    fork(SearchSaga),
    fork(GenreSaga),
    fork(locationSaga),
    fork(LinksSaga),
    fork(notificationSaga),
    fork(rewardSaga),
    fork(FeedSaga),
  ]);
}
