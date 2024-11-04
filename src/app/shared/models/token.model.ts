import { ItokenResponse } from '../interfaces/apikey.interface';

export class Token {
  _id: string;
  date: string;
  description: string;
  apiToken: string;

  constructor(data?: ItokenResponse) {
    this._id = data?._id ? data._id : '';
    this.date = data?.date ? data.date : '';
    this.description = data?.description ? data.description : '';
    this.apiToken = data?.apiToken ? data.apiToken : '';
  }
}
