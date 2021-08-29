import fetch from "node-fetch";
import { RESTConstants } from '../constants/constants';

export class CoinbaseAPIClient {


    private async fetchPostWrapper(url, requestBody, header) {
        return fetch(url, { method: RESTConstants.requestTypes.post, body: requestBody, headers: header })
            .then(res => res.ok ? { result: res, contentType: res.headers.get(RESTConstants.headers.contentType) } : {
                errorCode: res.status, errorMessage: res.statusText
            }).then(okRes => {
                if (okRes.errorCode) {
                    throw okRes;
                } else {
                    return okRes.contentType.includes(RESTConstants.contentTypes.json) ? okRes.result.json() : okRes.result.text();
                }
            });
    }
}