import { useDecoratedQuery } from '../hooks';

export interface IPagination {
  limit: number;
  page: number;
}

/** React query abstract class - high level helper for creation queries for details and filtered/paginated queries
 * Example:
 * class ExampleReactQueryRepository extends ReactQueryFactory<IExampleFilters> {
  constructor() {
    super('example');
  }

  onDetailedRequest(id: string) {
    return apiData.find((d) => d.id === id);
  }

  onListRequest(filters: IExampleFilters, pagination: IPagination) {
    const filtered = apiData.filter((d) => d.title === filters.title);
    const currentPage = pagination.limit * pagination.page;
    return filtered.slice(currentPage, currentPage + pagination.limit);
  }

  onAllRequest() {
    return apiData;
  }
}
 */
export abstract class ReactQueryFactory<TFilters> {
  /**
   * Create instance of the class.
   * @param {string} name - Base name of the query, used in class to create queryKeys for details, list, paginated query
   */
  constructor(private name: string) {}

  /**
   * Get all query key name.
   * @return {[string]} All query key name.
   */
  public allQueryKey() {
    return [this.name];
  }

  /**
   * Get detailed key name.
   * @param {string | number} id - Id of detailed entity
   * @return {[string]} Detailed query key name.
   */
  public detailedQueryKey(id: string | number) {
    return [this.name, id];
  }

  /**
   * Get filtered query key name.
   * @param {TFilters} filters - Filters which are available in the query.
   * @return {[string]} Filtered query key name.
   */
  public filteredQueryKey(filters: TFilters) {
    return [this.name, filters];
  }

  /**
   * Get paginated query key name.
   * @param {IPagination} pagination - Paginated params of the query.
   * @return {[string]} Paginated query key name.
   */
  public paginatedQueryKey(pagination: IPagination) {
    return [this.name, pagination];
  }

  /**
   * Use All query hook, use allQueryKey and onAllRequest template method.
   * To make it usable you should set onAllRequest handler first.
   * @return {R} Response of useQuery format
   */
  public useAllQuery<R>() {
    return useDecoratedQuery<R>(this.allQueryKey(), () => this.onAllRequest());
  }

  /**
   * Use Detailed query hook, use detailedQueryKey and onDetailedRequest template method.
   * To make it usable you should set onDetailedRequest handler first.
   * @param {string | number} id - Id of detailed entity
   * @return {R} Response of useQuery format
   */
  public useDetailedQuery<R>(id: string) {
    return useDecoratedQuery<R>(this.detailedQueryKey(id), () => this.onDetailedRequest(id));
  }

  /**
   * Use List query hook, use filteredQueryKey, paginatedQueryKey and onListRequest template method.
   * Automatically handle pagination caching logic, add strict format of applied filters, pagination interface.
   * @param {TFilters} filters - Filters which are available in the query.
   * @param {IPagination} pagination - Paginated params of the query.
   * To make it usable you should set onAllRequest handler first.
   * @return {R} Response of useQuery format
   */
  public useListQuery<R>(filters: TFilters, pagination: IPagination) {
    return useDecoratedQuery<R>(
      [...this.filteredQueryKey(filters), ...this.paginatedQueryKey(pagination)],
      () => this.onListRequest(filters, pagination),
      { keepPreviousData: true }
    );
  }

  /**
   * Template method which represent handler of useDetailedQuery.
   * Automatically handle pagination caching logic, add strict format of applied filters, pagination interface.
   * @param {string | number} id - Id of detailed entity
   * @return {any} Response could be anything but expect that it will be response from server.
   */
  abstract onDetailedRequest(id: string): any;

  /**
   * Template method which represent handler of useListQuery.
   * @param {TFilters} filters - Filters which are available in the query.
   * @param {IPagination} pagination - Paginated params of the query.
   * @return {any} Response could be anything but expect that it will be response from server.
   */
  abstract onListRequest(filters: TFilters, pagination: IPagination): any;

  /**
   * Template method which represent handler of useAllQuery.
   * @return {any} Response could be anything but expect that it will be response from server.
   */
  abstract onAllRequest(): any;
}
