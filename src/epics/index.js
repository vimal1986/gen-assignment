import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {CANCEL_SEARCH, receiveBeers, searchBeersError, searchBeersLoading, SEARCHED_BEERS} from "../actions/index";

const beers  = `https://reqres.in/api/users/`;
const search = (term) => `${beers}/${term}`;

export function searchBeersEpic(action$, store, deps) {
  return action$.ofType(SEARCHED_BEERS)
    .debounceTime(500, deps.scheduler)
    .filter(action => action.payload !== '')
    .switchMap(({payload}) => {

      // loading state in UI
      const loading = Observable.of(searchBeersLoading(true));

      // external API call
      const request = deps.ajax.getJSON(search(payload))
        .takeUntil(action$.ofType(CANCEL_SEARCH))
        .map(receiveBeers)
        .catch(err => {
          return Observable.of(searchBeersError(err));
        });

      return Observable.concat(
        loading,
        request,
      );
    })
}

export const rootEpic = combineEpics(searchBeersEpic);

