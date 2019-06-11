import { BehaviorSubject, empty, Observable } from 'rxjs';

const user = new BehaviorSubject({ username: 'Test User' });

const ajax = {
  getJSON: (url: string): Observable<any> => {
    switch (url) {
      case '/api/user/':
        return user.asObservable();
      default:
        return empty();
    }
  },
};

export default ajax;
