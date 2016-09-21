import { Injector, Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Session } from 'app/core';

@Injectable()
export class BaseApi {
  protected http: Http = this.injector.get(Http);
  protected session: Session = this.injector.get(Session);
  protected endpoint: string;

  constructor(
    private injector: Injector,
  ) {}

  get(pattern, params?) {
    let url = this._urlize(pattern, params);
    return this._get(this.endpoint + url);
  }

  private _get(url) {
    let { token } = this.session;

    if (!token) {
      return this.http.get(url)
    }

    let headers = new Headers({
      Authorization: `Bearer ${this.session.token}`,
    });

    let requestOptions: RequestOptionsArgs = {
      headers,
    };

    return this.http.get(url, requestOptions);
  }

  /**
   * merge params to url pattern
   * eg: http://abc/:id?q
   */
  private _urlize(str: string, params?: Object) {
    if (!params) {
      return str;
    }

    let url =  str.replace(/(\:|\?)([^\:\?\/]+)/g, (match, indicator, key) => {
      if (!/^\w+$/.test(key)) {
        throw 'Wrong url pattern';
      }

      let value = params[key];
      if (indicator === ':') {
        return value;
      }

      if (indicator === '?' && typeof value !== 'undefined') {
        return `&${key}=${value}`;
      }

      return '';
    });

    return url.replace(/&/, '?');
  }
}
