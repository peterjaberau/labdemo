

import { Observable } from 'rxjs';
import { first, last } from 'rxjs/operators';

export function firstValueFrom<T>(source: Observable<T>) {
  // we can't use SafeSubscriber the same way that RxJS 7 does, so instead we
  return source.pipe(first()).toPromise();
}

export function lastValueFrom<T>(source: Observable<T>) {
  return source.pipe(last()).toPromise();
}
