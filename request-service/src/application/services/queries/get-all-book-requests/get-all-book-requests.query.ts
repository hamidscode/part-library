export class GetAllBookRequestsQuery {
  constructor(
    public requesterName?: string,
    public requestedBook?: string,
    public skip?: number,
    public limit?: number,
  ) {}
}
