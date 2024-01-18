import { BookRequestInterface } from "./book-request.interface";

export interface BookProcessResultInterface extends BookRequestInterface {
  exists: boolean;
}
