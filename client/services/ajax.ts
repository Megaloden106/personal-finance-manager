import { BehaviorSubject, empty, Observable } from 'rxjs';

const user = new BehaviorSubject({
  username: 'Test User',
  accessLevel: 0,
});

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
